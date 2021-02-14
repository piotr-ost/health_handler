from typing import Tuple


def convert_amount(amount: str) -> Tuple[float, str]:
    if amount == '':
        return '', 'unit'
    if amount == 'Loose':
        amount = '1000g'
    amount = amount.replace('(', '').replace(')', '')
    amount = amount.replace('approx.', '')
    unit =''.join([i for i in amount 
                   if not i.isdigit() and i != 'x' and i != '.'])
    amount = ''.join([i for i in amount 
                      if i.isdigit() or i == '.' or i == 'x'])
    split = [i for i in amount]
    if not split[-1] == 'x' and not split[0] == 'x':
        amount = eval(amount.replace('x', '*'))
    else:
        amount = amount.replace('x', '')
        unit = 'unit'
    if unit == 'kg':
        amount = float(amount)*1000
        unit = 'g'
    if unit == 'L':
        amount = float(amount)*1000
        unit = 'ml'
    if amount:
        amount = int(amount)
    return amount, unit


def parse_currency(price, currency) -> float:
    if currency == 'GBP':
        price = int(price*100)
    else:
        price = int(price)
    return price

