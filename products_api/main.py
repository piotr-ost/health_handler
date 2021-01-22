import time
import requests
import pickle
import os
import logging

from selenium import webdriver
from selenium.common import exceptions
from webdriver_manager.chrome import ChromeDriverManager

from django import setup
os.environ['DJANGO_SETTINGS_MODULE'] = 'products_api.settings'
setup()
from products.models import Product

logging.basicConfig(filename='debug.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s',
                    datefmt='%m/%d/%Y %I:%M:%S')
logging.getLogger().addHandler(logging.StreamHandler())


class Scraper:

    base_link = "https://www.sainsburys.co.uk/shop/gb/groceries"
    model = Product
    timeout = 15
    click_exceptions = (
        exceptions.ElementNotInteractableException,
        exceptions.ElementClickInterceptedException
    )

    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.links = []
        self.categories = self._category_generator()

    def go_on_sainsburys(self):
        self.driver.get(self.base_link)
        cookies_accepted = False
        timeout = time.time() + self.timeout
        while not cookies_accepted and time.time() < timeout:
            try:
                xpath = '//*[@id="onetrust-accept-btn-handler"]'
                self.driver.find_element_by_xpath(xpath).click()
                cookies_accepted = True
            except (self.click_exceptions, exceptions.NoSuchElementException):
                time.sleep(1)
                continue

    def go_to_next_page(self) -> bool:
        """
        :returns on_next_page: True on success, False if no more pages
        """
        on_next_page = False
        timeout = time.time() + self.timeout
        while not on_next_page and time.time() < timeout:
            try:
                next_btn = self.driver.find_element_by_class_name('next')
                next_btn.click()
                clicked = True
                on_next_page = True
            except self.click_exceptions:
                time.sleep(1)
                continue
            except exceptions.NoSuchElementException:
                return False
            if clicked:
                try:
                    next_btn.click()
                except exceptions.StaleElementReferenceException:
                    on_next_page = True
        return on_next_page

    def insert_products_from_page(self):
        gv = self.driver.find_element_by_class_name('productLister')
        products = gv.find_elements_by_class_name('product')
        for product in products:
            name, *_ = product.text.split('\n')
            price = product.find_elements_by_class_name('pricing')[0].text
            split = name.split(' ')
            if split[-1] == 'Loose' or any([i for i in split[-1]
                                            if i.isdigit()]):
                amount = split.pop(-1)
            else:
                amount = ''
            name = ' '.join(split)
            price, *_ = price.split(' ')
            price, unit = price.split('/')
            price_num = ''.join([i for i in price
                                 if i.isdigit() or i == '.' or i == ','])
            curr = ''.join(set([i for i in price]) - set([i for i in price_num]))
            price = float(price_num)
            try:
                img = product.find_elements_by_tag_name('img')[0]
                img_url = img.get_attribute('src')
                assert 'jpeg' in img_url or 'jpg' in img_url or 'png' in img_url
            except (IndexError, AssertionError):
                logging.error(f'no image found for product: {name}')
                img_url = ''
            self.model(store='sainsburys', name=name, img_url=img_url,
                       price=price, currency=curr, amount=amount,
                       unit=unit).save()
            logging.info(f'saving product: {name}\
                \n{img_url}\n{price}{curr} {amount}{unit}')

    def scrape(self):
        self.go_on_sainsburys()
        while True:
            next_category = next(self.categories)
            if next_category:
                self.driver.get(self.base_link + next_category)
            else:
                break
            self.insert_products_from_page()
            while self.go_to_next_page():
                self.insert_products_from_page()

    @staticmethod
    def _category_generator():
        for category in [
            '/fruit-veg/fruitandveg-essentials',
            '/meat-fish/meatandfish-essentials',
            '/dairy-eggs-and-chilled/dairy-and-chilled-essentials',
            '/bakery/bakery-essentials',
            '/food-cupboard/food-cupboard-essentials',
            '/frozen/frozen-essentials',
            False
        ]:
            yield category

    def get_product_links(self) -> None:
        """
        Retrieves and appends all the links from the current page
        page that the driver is on to the links list.
        """
        for i in self.driver.find_elements_by_tag_name("a"):
            link = i.get_attribute("href")
            if link:
                if 'product' in link and 'details' in link:
                    self.links.append(i.get_attribute("href"))

if __name__ == '__main__':
    Scraper().scrape()


# todo
# fix parentheses sometimes in product names
# fix bug that pound sign causes logging error
