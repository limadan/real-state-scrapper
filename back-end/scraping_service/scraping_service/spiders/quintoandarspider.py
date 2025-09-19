import scrapy
from scrapy_playwright.page import PageMethod
from scrapy.http import HtmlResponse

class QuintoAndarSpider(scrapy.Spider):
    name = "quintoandar"
    allowed_domains = ["quintoandar.com.br"]
    start_urls = ["https://www.quintoandar.com.br/comprar/imovel/belo-horizonte-mg-brasil"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.seen = set()

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", 'div[data-testid="house-card-container"]')
                    ],
                    "playwright_include_page": True
                },
                callback=self.parse_page
            )

    async def parse_page(self, response):
        # extract all currently loaded properties
        for property in response.css('div[data-testid="house-card-container"]'):
            link = property.css("a").attrib.get("href")
            if link not in self.seen:
                self.seen.add(link)
                yield {
                    "price": property.css('p.CozyTypography.xih2fc.EKXjIf.EqjlRj::text').get(),
                    "location": property.css('h2.CozyTypography.xih2fc._72Hu5c.Ci-jp3::text').get(),
                    "amenities": property.css(
                        'h3.CozyTypography.FindHouseCard_amenitiesText__QNzFn.xih2fc.EKXjIf.A68t3o::text'
                    ).getall(),
                    "link": link,
                }

        load_more_button = response.css('button[data-testid="load-more-button"]')
        if load_more_button:
            page = response.meta["playwright_page"]
            await page.click('button[data-testid="load-more-button"]')
            await page.wait_for_timeout(2000)
            html = await page.content()
            yield scrapy.http.HtmlResponse(url=response.url, body=html, encoding='utf-8', request=response.request, meta={"playwright_page": page}, callback=self.parse_page)
