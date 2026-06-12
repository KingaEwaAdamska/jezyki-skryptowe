import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import type { MockStop } from '@/data/mockStops'

const stopIcon = divIcon({
  className: '',
  html: '<span class="block h-3 w-3 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

export function BusStopMarker({ stop }: { stop: MockStop }) {
  return (
    <Marker position={[stop.lat, stop.lon]} icon={stopIcon}>
      <Popup minWidth={240}>
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-semibold text-white">{stop.name}</p>
            <p className="text-xs text-gray-400">
              Przystanek {stop.stopCode} &middot; ID {stop.stopId}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
            <dt className="text-gray-400">Liczba linii</dt>
            <dd className="text-right text-white">{stop.lineCount}</dd>

            <dt className="text-gray-400">Liczba odjazdów</dt>
            <dd className="text-right text-white">{stop.departureCount}</dd>

            <dt className="text-gray-400">Pierwszy odjazd</dt>
            <dd className="text-right text-white">{stop.earliestDeparture}</dd>

            <dt className="text-gray-400">Ostatni odjazd</dt>
            <dd className="text-right text-white">{stop.latestDeparture}</dd>
          </dl>

          <div>
            <p className="text-gray-400">Najczęstsze kierunki</p>
            <ul className="mt-1 space-y-0.5">
              {stop.topDirections.map((d) => (
                <li key={d.direction} className="flex justify-between text-white">
                  <span>{d.direction}</span>
                  <span className="text-gray-400">{d.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-2">
            <p className="text-gray-400">{stop.customQuery.label}</p>
            <p className="text-white">{stop.customQuery.value}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
