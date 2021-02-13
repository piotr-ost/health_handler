from typing import Tuple


def convert_amount(amount: str) -> Tuple[float, str]:
    amount = amount.replace('(', '').replace(')', '')
    amount = amount.replace('approx.', '')
    unit =''.join([i for i in amount if not i.isdigit() and i != 'x'])
    amount = ''.join([i for i in amount 
                      if i.isdigit() or i == '.' or i == 'x'])
    if len(amount) > 2:
        amount = eval(amount.replace('x', '*'))
    else:
        amount = amount.replace('x', '')
        unit = 'unit'
    return int(amount), unit


def parse_currency(price, currency) -> float:
    if currency == 'GBP':
        price = int(price*100)
    else:
        price = int(price)
    return price

