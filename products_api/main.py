

import pandas as pd
import time
import requests
import pickle
import os

from django import setup as setup
os.environ['DJANGO_SETTINGS_MODULE'] = 'products_api.settings'
setup()

from products.models import FruitVeg
from decimal import Decimal
from selenium import webdriver
from selenium.common.exceptions import ElementNotInteractableException


def product_links_sainsburys(driver: webdriver) -> pd.DataFrame:
    driver.get("https://www.sainsburys.co.uk/shop/gb/groceries")
    # handle cookies alert
    time.sleep(3)
    driver.find_element_by_xpath(
        '//*[@id="onetrust-accept-btn-handler"]'
    ).click()
    # click on groceries section
    driver.find_element_by_xpath(
        '//*[@id="0e70e793-2e05-4fd9-a1b7-0c8752b50c73"]/div[2]/div[1]/div/a/img'
    ).click()
    time.sleep(3)
    driver.find_element_by_xpath(
        '/html/body/div[8]/div[2]/div[1]/div[4]/div[2]/'
        'div[1]/form[2]/div[1]/div[2]/div/select/option[5]').click()
    links = []
    # scrape first page
    get_product_links(driver, links)
    time.sleep(3)
    # scrape next pages up until no next page no more
    while 1:
        try:
            driver.find_element_by_class_name('next').click()
            time.sleep(3)
            get_product_links(driver, links)
        except ElementNotInteractableException:
            print('all pages scraped')
            break
    return links


def get_product_links(driver: webdriver, links: list) -> None:
    """
    Retrieves and appends all the links from a given
    page that the driver is on to the links list.
    """
    for i in driver.find_elements_by_tag_name("a"):
        link = i.get_attribute("href")
        if link:
            if 'product' in link and 'details' in link:
                links.append(i.get_attribute("href"))


def insert_from_links_sainsburys(driver: webdriver,
                                 links: list) -> list:
    """
    Inserts products from links to the database using django models.

    Returns a list of products that haven't been added.

    * This isn't the perfect method to do it, since it assumes
    that products share the same nutrition table which isn't always
    the case. I might write a parser to make it more flexible. *
    """
    driver.get("https://www.sainsburys.co.uk/shop/gb/groceries")
    time.sleep(3)
    driver.find_element_by_xpath(
        '//*[@id="onetrust-accept-btn-handler"]'
    ).click()
    skipped = []
    for link in links:
        driver.get(link)
        time.sleep(3)
        # price and name
        name = driver.find_element_by_class_name('pd__header').text
        prices = driver.find_element_by_class_name('pd__cost').text
        prices = prices.split('\n')
        price = prices[0]
        price_per_unit = 'undefined'
        if len(prices) > 1:
            # work with this more
            price_per_unit = prices[0]
            price = prices[1]
        # nutritional values
        table = driver.find_element_by_class_name("nutritionTable")
        tbody = table.find_element_by_tag_name('tbody')
        rows = tbody.find_elements_by_tag_name('tr')
        text = ''.join([i.text for i in rows])
        print(text)
        # some asserts would be nice below
        try:
            if 0:
                product = FruitVeg(
                    name=name,
                    store="Sainsbury's",
                    price_per_unit=price_per_unit,
                    price=price,
                    amount=amount
                )
                print(f'saving {product.name}')
                product.save()
        except IndexError:
            skipped.append(name)
            print(f'skipped {name}')


if __name__ == '__main__':
    driver = webdriver.Chrome('C:\\Users\\48602\\Desktop\\chromedriver.exe')
    # links = get_product_links_sainsburys(driver)
    with open('data.pickle', 'rb') as f:
        links = pickle.load(f)
    skipped = insert_from_links_sainsburys(driver, links)
    print(len(skipped))
