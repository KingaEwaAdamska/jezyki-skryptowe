import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { BusStopMarker } from '@/components/BusStopMarker'
import { MOCK_STOPS } from '@/data/mockStops'

const WROCLAW_CENTER: [number, number] = [51.1079, 17.0385]

export function MapView() {
  return (
    <MapContainer
      center={WROCLAW_CENTER}
      zoom={13}
      className="h-full w-full"
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={['a', 'b', 'c', 'd']}
      />

      {MOCK_STOPS.map((stop) => (
        <BusStopMarker key={stop.stopId} stop={stop} />
      ))}
    </MapContainer>
  )
}
