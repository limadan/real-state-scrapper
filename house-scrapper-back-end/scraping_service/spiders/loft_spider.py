import scrapy
from datetime import datetime
from database.db_client import get_search_criteria
import json
import time

class LoftSpider(scrapy.Spider):
    name = "loft"
    allowed_domains = ["loft.com.br"]

    custom_settings = {
        "DEFAULT_REQUEST_HEADERS": {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"
        }
    }

    def start_requests(self):
        """
        Initializes requests for each search criterion for the first page.
        The page number is passed via request metadata.
        """
        criteria_list = get_search_criteria()
        for criteria in criteria_list:
            # Start each search from page 1
            page = 1
            url = self.build_url(criteria, page)
            yield scrapy.Request(
                url, 
                callback=self.parse, 
                meta={'criteria': criteria, 'page': page}
            )

    def build_url(self, criteria, page=1):
        """
        Constructs the URL for a given search criterion and page number.
        """
        state, city, neighbourhoods, min_price, max_price, min_rooms, min_parking = criteria
        
        state_path = state.lower().replace(" ", "-")
        city_path = city.lower().replace(" ", "-")
        
        url = f"https://loft.com.br/venda/imoveis/{state_path}/{city_path}"

        params = []
        if max_price:
            params.append(f"precoMax={int(max_price)}")
        if min_rooms:
            params.append(f"quartos={int(min_rooms)}")
        if min_parking:
            params.append(f"vagas={int(min_parking)}")
        if neighbourhoods:
            bairros_formatted = [f"{n.strip().replace(' ', '-')}_{city_path}_{state_path}" for n in neighbourhoods.split(',')]
            params.append(f"bairros={'~'.join(bairros_formatted)}")
        if page > 1:
            params.append(f"pagina={page}")
        if params:
            url += "?" + "&".join(params)

        return url

    def parse(self, response):
        criteria = response.meta['criteria']
        page = response.meta['page']

        state, city, neighbourhoods, min_price, *_ = criteria

        scripts = response.css('script[type="application/ld+json"]::text').getall()

        self.log(f"Found {len(scripts)} JSON scripts on page {page} for city {city}")

        amenities_selector = "span.MuiTypography-root.MuiTypography-body1.MuiTypography-noWrap"

        for script_text, prop in zip(scripts, response.css("a.MuiButtonBase-root")):
            try:
                data = json.loads(script_text)
            except json.JSONDecodeError:
                continue

            access_link = data.get('url')
            source_id = access_link.split("/")[-1] if access_link else None

            price = None
            description = data.get('description', '')
            import re
            match = re.search(r'R\$ ([\d\.,]+)', description)
            if match:
                price = float(match.group(1).replace('.', '').replace(',', '.'))

            if price is not None and min_price is not None and price < min_price:
                continue

            address_info = data.get('address', {})
            street = address_info.get('streetAddress')
            city_name = address_info.get('addressLocality')
            state_name = address_info.get('addressRegion')

            amenities = prop.css(amenities_selector).xpath("string()").getall()
            number_of_rooms = self.parse_int_from_string(amenities[1]) if len(amenities) > 1 else None
            number_of_parking_spaces = self.parse_int_from_string(amenities[2]) if len(amenities) > 2 else None

            photo_url = data.get('photo', {}).get('url')
            created_at = datetime.utcnow().isoformat()

            yield {
                "source_id": source_id,
                "source_website": "loft.com.br",
                "price": price,
                "city": city_name,
                "address": street,
                "number_of_rooms": number_of_rooms,
                "number_of_parking_spaces": number_of_parking_spaces,
                "photo_url": photo_url,
                "access_link": access_link,
                "created_at": created_at,
            }

        if scripts:
            next_page = page + 1
            next_page_url = self.build_url(criteria, next_page)
            self.log(f"Following to next page: {next_page} for city {city}")

            time.sleep(5)

            yield scrapy.Request(
                next_page_url,
                callback=self.parse,
                meta={'criteria': criteria, 'page': next_page}
            )


    def parse_price(self, price_text):
        if not price_text:
            return None
        price_text = price_text.replace("R$", "").replace(".", "").replace(",", ".").strip()
        try:
            return float(price_text)
        except (ValueError, TypeError):
            return None

    def parse_int_from_string(self, text):
        if not text:
            return None
        try:
            return int(''.join(filter(str.isdigit, text)))
        except (ValueError, IndexError):
            return None

