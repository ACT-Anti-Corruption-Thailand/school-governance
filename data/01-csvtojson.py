import pandas
import json
import numpy

FILES = [
    'general',
    'building',
    'computer',
    'durable_goods',
    'internet',
    'staff',
    'student'
]


def getFilePath(filename: str, extension: str = 'csv') -> str:
    return f'data/{extension}/{filename}.{extension}'


for file in FILES:
    print(f"Reading file: {getFilePath(file)}")
    df = pandas.read_csv(getFilePath(file))

    sid = dict(tuple(df.replace({numpy.nan: None}).groupby('school_id')))

    sid2 = {}
    for k, v in sid.items():
        w = v.to_dict('records')
        for x in w:
            del x['school_id']
        sid2[k] = w

    print(f"Writing file: {getFilePath(file, 'json')}")
    with open(getFilePath(file, 'json'), 'w+', encoding='utf-8') as fp:
        json.dump(sid2, fp, ensure_ascii=False, separators=(',', ':'))
