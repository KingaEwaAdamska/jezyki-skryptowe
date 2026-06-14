import { MapView } from "@/components/MapView";
import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";

const [refreshKey, setRefreshKey] = useState(0);
const refreshStops = () => {
  setRefreshKey((k) => k + 1);
};

function App() {
  return (
    <div className="relative h-full w-full">
      <MapView refreshKey={refreshKey} />

      <div className="pointer-events-none absolute top-0 right-0 z-[1000] p-4">
        <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-sm">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Rozkład jazdy — Wrocław
          </h1>
          <p className="text-sm text-gray-400">GTFS Timetable Explorer</p>

          <FileUpload onUploadSuccess={refreshStops} />
        </div>
      </div>
    </div>
  );
}

export default App;
