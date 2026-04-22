import csv
from collections import namedtuple

def parse_measurements(file_path):
    Measurement = namedtuple('Measurement', ['timestamp', 'value'])
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # Pomijamy nagłówek
        measurements = []
        for row in reader:
            timestamp = row[0]
            value = row[1]  # Zakładamy, że pomiar znajduje się w 2. kolumnie
            measurements.append(Measurement(timestamp, value))
        return measurements

def parse_station_metadata(file_path):
    Station = namedtuple('Station', ['id', 'name', 'city', 'latitude', 'longitude'])
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        stations = []
        for row in reader:
            id = row['Kod stacji']
            name = row['Nazwa stacji']
            city = row['Miejscowość']
            latitude = float(row['WGS84 φ N'])
            longitude = float(row['WGS84 λ E'])
            stations.append(Station(id, name, city, latitude, longitude))
        return stations
