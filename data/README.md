# School Data

This folder includes data that scraped from obec servers.

## How to transpile into usable data

In general, you can run `yarn convert` in root directory to do below steps. You can do this manually as you can read the below.

1. Run \[TBD\] to fetch latest data. The scraped data should be in `csv` folder.
2. Run `tar xzf csv.tar.gz` to extract `csv.tar.gz`.
3. Run `01-csvtojson.py` to convert CSV to JSON.
4. Run `02-transpile.js` to convert data to usable data.

## TODO

- [ ] Convert `02-transpile.js` into python script.
