import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BusStopMarker } from "@/components/BusStopMarker";
import { useEffect, useState } from "react";

type Stop = {
  stopId: string;
  name: string;
  stopCode?: string;
  lat: number;
  lon: number;
};

const WROCLAW_CENTER: [number, number] = [51.1079, 17.0385];

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function MapView() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/stops`)
      .then((res) => res.json())
      .then(setStops)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <MapContainer
      center={WROCLAW_CENTER}
      zoom={13}
      className="h-full w-full"
      zoomControl
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors & CARTO"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
      />

      {loading && (
        <div className="absolute z-[1000] text-white">Loading stops...</div>
      )}

      {stops.map((stop) => (
        <BusStopMarker key={stop.stopId} stop={stop} />
      ))}
    </MapContainer>
  );
}
