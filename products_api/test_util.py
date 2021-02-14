import pytest
import pickle


@pytest.fixture()
def table():
    with open('table.pkl', 'rb') as f:
        table = pickle.load(f)
    return table 


@pytest.mark.parametrize('amount, expected', [
    ('4x41.5g', (166, 'g')), ('10x29.3g', (293, 'g')),
    ('x12', (12, 'unit')), ('4x110ml', (440, 'ml')), ('800g', (800, 'g')),
    ('', ('', 'unit')), ('Loose', (1000, 'g')), ('(approx.1.7kg)', (1700, 'g')),
    ('x5', (5, 'unit')), ('1L', (1000, 'ml')), ('1.5L', (1500, 'ml')) 
])
def test_convert_amount(amount, expected):
    from util import convert_amount
    assert convert_amount(amount) == expected

            
@pytest.mark.parametrize('price, currency, expected', [
    (43.00, 'p', 43), (1.35, 'GBP', 135)
])
def test_parse_price(price, currency, expected):
    from util import parse_currency
    assert parse_currency(price, currency) == expected


def test_match_products(table):
    pass 
