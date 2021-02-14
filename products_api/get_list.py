import requests
import pandas as pd
import json

from util import convert_amount, parse_currency


def get_shop_df() -> pd.DataFrame:
    r = requests.get('http://localhost:8000/products?format=json')
    shop_df = pd.DataFrame(json.loads(r.content.decode()))
    shop_df['name'] = [i.lower() for i in shop_df['name']]
    shop_df.head()
    shop_df_ = shop_df.copy()
    cols = ['name', 'price', 'currency', 'amount']
    shop_df = pd.DataFrame(columns=['name', 'price', 'amount', 'unit'])
    for i, [name, price, currency, amount] in enumerate(shop_df_[cols].to_numpy()):
        amount, unit = convert_amount(amount)
        price = parse_currency(price, currency)
        shop_df.loc[i] = [name, price, amount, unit]
    return shop_df


def get_items(shopping_list) -> pd.DataFrame:
    items = [i[0] for i in pd.DataFrame(shopping_list['aisles'])['items']]
    items_df = pd.DataFrame(items)
    qties = pd.DataFrame(list(items_df['measures']))['metric']
    items_df.drop(['measures', 'usages', 'pantryItem', 'cost'],
                  axis=1, inplace=True)
    items_df['amount'] = [i['amount'] for i in qties]
    items_df['unit'] = [i['unit'] for i in qties]
    items_df['name'] = items_df['name'].map(str.split)
    to_drop = ['quick', 'canned', 'cooking', 'fat', 'ground', 'leaves',
               'pasta', 'purified', 'plain', 'cooked', 'full-fat', 'pieces',
               'scrambled', 'frozen', 'creamy']
    items_df['name'] = [[j for j in i if j not in to_drop]
                        for i in items_df['name']]
    return items_df


def get_shopping_list():
    # TODO get this straight from spoonacular
    filepath = 'shopping_lists/shoppingList7.json'
    with open(filepath) as f:
        shopping_list = json.load(f)
    return shopping_list


def match_product(amount, unit, matches):
   # first get the best quantity matching product
   # if there is a couple, match with preferred price product
   return matches[-1]


if __name__ == '__main__':
    shop_df = get_shop_df()
    shopping_list = get_shopping_list()
    items_df = get_items(shopping_list)

    matches_df = pd.DataFrame()
    for product in items_df.iloc:
        regex = ''.join([f'(?=.*{i})' for i in product['name']])   
        entries = shop_df['name'].str.contains(regex)    
        if entries.any():
            matches = shop_df[entries]
            if matches.any():
                amount = product['amount']
                unit = product['unit']
                match = match_product(amount, unit, matches)
                matches_df = matches_df.append(match)
        else:
            print(f"no such product: {' '.join(product['name'])}")
