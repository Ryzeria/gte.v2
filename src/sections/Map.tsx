"use client";
import dynamic from "next/dynamic";

const MapClientComponent = dynamic(
  () => import("./MapClient").then(mod => ({ default: mod.MapClient })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading map...</div>
      </div>
    ),
  }
);

export const Map = () => {
  return <MapClientComponent />;
};