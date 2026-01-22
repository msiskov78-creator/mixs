"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export function MapView({
  from,
  to,
  layers
}: {
  from?: MapPin | null;
  to?: MapPin | null;
  layers: { id: string; name: string; pins: MapPin[]; enabled: boolean }[];
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").LayerGroup | null>(null);
  const layerGroupRef = useRef<import("leaflet").LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const loadMap = async () => {
      const leaflet = await import("leaflet");
      mapInstance.current = leaflet.map(mapRef.current as HTMLDivElement).setView([43.2389, 76.8897], 11);
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap"
        })
        .addTo(mapInstance.current);
      markersRef.current = leaflet.layerGroup().addTo(mapInstance.current);
      layerGroupRef.current = leaflet.layerGroup().addTo(mapInstance.current);
    };
    void loadMap();
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) return;
    const updateMarkers = async () => {
      const leaflet = await import("leaflet");
      markersRef.current?.clearLayers();
      if (from) {
        leaflet.marker([from.lat, from.lng]).addTo(markersRef.current!).bindPopup(from.name);
      }
      if (to) {
        leaflet.marker([to.lat, to.lng]).addTo(markersRef.current!).bindPopup(to.name);
      }
      if (from && to) {
        const bounds = leaflet.latLngBounds([
          [from.lat, from.lng],
          [to.lat, to.lng]
        ]);
        mapInstance.current?.fitBounds(bounds, { padding: [40, 40] });
        leaflet
          .polyline(
            [
              [from.lat, from.lng],
              [to.lat, to.lng]
            ],
            { color: "#0ea5e9" }
          )
          .addTo(markersRef.current!);
      }
    };
    void updateMarkers();
  }, [from, to]);

  useEffect(() => {
    if (!layerGroupRef.current) return;
    const updateLayers = async () => {
      const leaflet = await import("leaflet");
      layerGroupRef.current?.clearLayers();
      layers
        .filter((layer) => layer.enabled)
        .forEach((layer) => {
          layer.pins.forEach((pin) => {
            leaflet
              .circleMarker([pin.lat, pin.lng], {
                radius: 6,
                color: "#f97316"
              })
              .addTo(layerGroupRef.current!)
              .bindPopup(`${layer.name}: ${pin.name}`);
          });
        });
    };
    void updateLayers();
  }, [layers]);

  return <div ref={mapRef} className="h-[360px] w-full rounded-2xl" aria-label="Карта" />;
}
