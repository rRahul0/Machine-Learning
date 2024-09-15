import json
import pickle
import numpy as np

__locations=None
__data_columns=None
__model=None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = [0]*len(__data_columns)
    x[0] = sqft
    x[1] = bhk
    x[2] = bath
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def get_locations():
    return __locations

def load_saved_artifacts():
    print('Loading saved artifacts...start')

    global __locations
    global __data_columns
    global __model

    # __locations = get_locations()
    with open('./artifacts/columns.json', 'r') as file:
        __data_columns = json.load(file)['data_columns']
        __locations = __data_columns[3:]
    
    with open('./artifacts/banglore_home_prices_model.pickle', 'rb') as file:
        __model = pickle.load(file)

    print('Loading saved artifacts...done')

# if __name__ == '__main__':
load_saved_artifacts()