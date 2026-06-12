export interface MockStop {
  stopId: string
  stopCode: string
  name: string
  lat: number
  lon: number
  lineCount: number
  departureCount: number
  earliestDeparture: string
  latestDeparture: string
  topDirections: { direction: string; count: number }[]
  customQuery: {
    label: string
    value: string
  }
}

export const MOCK_STOPS: MockStop[] = [
  {
    stopId: '100001',
    stopCode: 'RYNEK',
    name: 'Rynek',
    lat: 51.1101,
    lon: 17.0316,
    lineCount: 8,
    departureCount: 412,
    earliestDeparture: '04:58',
    latestDeparture: '23:47',
    topDirections: [
      { direction: 'Leśnica', count: 86 },
      { direction: 'Biskupin', count: 74 },
      { direction: 'Psie Pole', count: 61 },
    ],
    customQuery: {
      label: 'Średni odstęp między odjazdami (godziny szczytu)',
      value: '4 min',
    },
  },
  {
    stopId: '100002',
    stopCode: 'GALERIA',
    name: 'Galeria Dominikańska',
    lat: 51.1095,
    lon: 17.0394,
    lineCount: 6,
    departureCount: 298,
    earliestDeparture: '05:03',
    latestDeparture: '23:12',
    topDirections: [
      { direction: 'Krzyki', count: 65 },
      { direction: 'Swojczyce', count: 52 },
      { direction: 'Brochów', count: 41 },
    ],
    customQuery: {
      label: 'Najdłuższa przerwa nocna w odjazdach',
      value: '2 h 14 min',
    },
  },
  {
    stopId: '100003',
    stopCode: 'PL_GRUN',
    name: 'Plac Grunwaldzki',
    lat: 51.1106,
    lon: 17.0644,
    lineCount: 11,
    departureCount: 587,
    earliestDeparture: '04:42',
    latestDeparture: '23:58',
    topDirections: [
      { direction: 'Klecina', count: 94 },
      { direction: 'Stadion', count: 88 },
      { direction: 'Sky Tower', count: 77 },
    ],
    customQuery: {
      label: 'Liczba kursów w godzinach 7:00-9:00',
      value: '63',
    },
  },
  {
    stopId: '100004',
    stopCode: 'GLOWNY',
    name: 'Dworzec Główny',
    lat: 51.0989,
    lon: 17.0364,
    lineCount: 14,
    departureCount: 731,
    earliestDeparture: '04:31',
    latestDeparture: '23:59',
    topDirections: [
      { direction: 'Korona', count: 112 },
      { direction: 'Oporów', count: 101 },
      { direction: 'Tarnogaj', count: 89 },
    ],
    customQuery: {
      label: 'Udział kursów nocnych w ciągu doby',
      value: '6.4%',
    },
  },
  {
    stopId: '100005',
    stopCode: 'ARENA',
    name: 'Hala Stulecia / ZOO',
    lat: 51.1083,
    lon: 17.0735,
    lineCount: 4,
    departureCount: 156,
    earliestDeparture: '05:14',
    latestDeparture: '22:48',
    topDirections: [
      { direction: 'Biskupin', count: 48 },
      { direction: 'Plac Grunwaldzki', count: 45 },
    ],
    customQuery: {
      label: 'Liczba linii kończących trasę na tym przystanku',
      value: '2',
    },
  },
]
