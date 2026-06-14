import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { divIcon } from "leaflet";
import type { MockStop } from "@/data/mockStops";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const stopIcon = divIcon({
  className: "custom-stop-icon",
  html: '<span class="block h-3 w-3 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

type StopStats = {
  stopId: string;
  lineCount: number;
  departureCount: number;
  earliestDeparture: string | null;
  latestDeparture: string | null;
  topDirections: { direction: string; count: number }[];
};

export function BusStopMarker({ stop }: { stop: MockStop }) {
  const [stats, setStats] = useState<StopStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchStats = async () => {
    if (loaded) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/stops/${stop.stopId}`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: StopStats = await res.json();
      setStats(data);
      setLoaded(true);
    } catch (e) {
      console.error(e);
      setError("Failed to load stop stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Marker
      position={[stop.lat, stop.lon]}
      icon={stopIcon}
      eventHandlers={{
        click: () => {
          fetchStats();
        },
      }}
    >
      <Popup minWidth={240}>
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-semibold text-white">{stop.name}</p>
            <p className="text-xs text-gray-400">
              Przystanek {stop.stopCode} &middot; ID {stop.stopId}
            </p>
          </div>

          {loading && <p className="text-gray-400">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}

          {stats && (
            <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
              <dt className="text-gray-400">Liczba linii</dt>
              <dd className="text-right text-white">{stats.lineCount}</dd>

              <dt className="text-gray-400">Liczba odjazdów</dt>
              <dd className="text-right text-white">{stats.departureCount}</dd>

              <dt className="text-gray-400">Pierwszy odjazd</dt>
              <dd className="text-right text-white">
                {stats.earliestDeparture ?? "—"}
              </dd>

              <dt className="text-gray-400">Ostatni odjazd</dt>
              <dd className="text-right text-white">
                {stats.latestDeparture ?? "—"}
              </dd>
            </dl>
          )}

          {stats?.topDirections?.length ? (
            <div>
              <p className="text-gray-400">Najczęstsze kierunki</p>
              <ul className="mt-1 space-y-0.5">
                {stats.topDirections.map((d) => (
                  <li
                    key={d.direction ?? "unknown"}
                    className="flex justify-between text-white"
                  >
                    <span>{d.direction ?? "Unknown"}</span>
                    <span className="text-gray-400">{d.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            stats && (
              <p className="text-gray-500 text-sm">Brak danych o kierunkach</p>
            )
          )}

          <div className="border-t border-white/10 pt-2">
            <p className="text-gray-400">
              {stop?.customQuery?.label ?? "Custom query"}
            </p>
            <p className="text-white">{stop?.customQuery?.value ?? "—"}</p>{" "}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
