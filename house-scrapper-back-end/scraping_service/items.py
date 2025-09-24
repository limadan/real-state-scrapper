# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class RealStatePropertyItem(scrapy.Item):
    source_id = scrapy.Field()
    source_website = scrapy.Field()
    price = scrapy.Field()
    address = scrapy.Field()
    number_of_rooms = scrapy.Field()
    number_of_parking_spaces = scrapy.Field()
    photo_url = scrapy.Field()
    access_link = scrapy.Field()
    created_at = scrapy.Field()
