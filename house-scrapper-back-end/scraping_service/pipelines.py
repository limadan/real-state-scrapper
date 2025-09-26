# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from itemadapter import ItemAdapter
from database.real_state_property_queries import insert_property
from database.log_queries import insert_log

class ScrapingServicePipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        property_data = dict(adapter)
        source_id = property_data.get('source_id')
        try:
            insert_property(property_data)
            message = f"Successfully inserted property: {source_id}"
            spider.logger.info(message)
        except Exception as e:
            if "UNIQUE constraint failed" in str(e):
                # Ignore duplicate primary key errors
                spider.logger.info(f"Duplicate property ignored: {source_id}")
            else:
                message = f"Error inserting property {source_id}: {e}"
                spider.logger.error(message)
                insert_log('ERROR', message, 'scraping')
        return item
