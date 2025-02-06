"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useMemo } from "react";

// Marker Icon Configuration
const icon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Define Type for Station Data
type Station = {
  code: string;
  name: string;
  position: [number, number]; // Latitude, Longitude
  status: string;
};

// Data Stasiun
const stations: Station[] = [
  { code: "SBY", name: "Surabaya", position: [-7.1999, 112.7406], status: "Aktif" },
  { code: "JKT", name: "Jakarta", position: [-6.2088, 106.8456], status: "Aktif" },
  { code: "MKS", name: "Makassar", position: [-5.1478, 119.4327], status: "Tidak Aktif" },
];

export const MapClient = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const handleStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stationCode = event.target.value;
    const station = stations.find((s) => s.code === stationCode);
    if (station) {
      setSelectedStation(station);
    }
  };

  type FlyToStationProps = {
    position: [number, number];
  };

  const FlyToStation = ({ position }: FlyToStationProps) => {
    const map = useMap();
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 });
    }
    return null;
  };

  // Memoize MapContainer untuk mencegah re-render yang tidak perlu
  const mapComponent = useMemo(
    () => (
      <MapContainer
        key="map"
        center={[0, 120]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedStation && (
          <FlyToStation position={selectedStation.position} />
        )}
        {stations.map((station) => (
          <Marker
            key={station.code}
            position={station.position}
            icon={icon}
          >
            <Popup>
              <div>
                <h3 className="font-bold text-blue-600">{station.name}</h3>
                <p><strong>Kode Stasiun:</strong> {station.code}</p>
                <p><strong>Lintang:</strong> {station.position[0]}</p>
                <p><strong>Bujur:</strong> {station.position[1]}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color: station.status === "Aktif" ? "green" : "red",
                    }}
                  >
                    {station.status}
                  </span>
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() =>
                    alert(
                      `Detail:\nNama: ${station.name}\nKode: ${station.code}\nLintang: ${station.position[0]}\nBujur: ${station.position[1]}\nStatus: ${station.status}`
                    )
                  }
                >
                  Detail
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [] // Dependencies kosong karena kita hanya ingin membuat map sekali
  );

  return (
    <section className="py-24 bg-white">
      <div className="container relative">
        <div className="section-heading">
          <h2 className="section-title">Tide Station Map</h2>
          <p className="section-des mt-5">
            Explore the distribution of Geomarine Tidal Expert stations across the region.
          </p>
        </div>

        <div
          className="mt-10 w-full"
          style={{
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            background: "#f9f9f9",
            position: "relative",
          }}
        >
          <div
            className="absolute top-4 right-4 z-50 bg-white border border-gray-300 rounded-md p-2 shadow-md"
            style={{
              width: "200px",
              zIndex: 1000,
            }}
          >
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleStationChange}
              value={selectedStation ? selectedStation.code : ""}
            >
              <option value="" disabled>
                -- Pilih Stasiun --
              </option>
              {stations.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full h-[600px]">
            {mapComponent}
          </div>
        </div>
      </div>
    </section>
  );
};