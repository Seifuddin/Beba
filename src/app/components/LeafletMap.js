"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const API_KEY = "YOUR_OPENROUTESERVICE_API_KEY"; // Replace with your API key

export default function LeafletMap({ from, to, setDistance, setCost }) {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (from && to) {
      fetchRoute();
    }
  }, [from, to]);

  const fetchRoute = async () => {
    if (!from || !to) return;

    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`
      );

      const coords = response.data.routes[0].geometry.coordinates;
      const distanceMeters = response.data.routes[0].summary.distance;
      const distanceKm = (distanceMeters / 1000).toFixed(2);
      const fare = (distanceKm * 50).toFixed(2);

      setRoute(coords.map(([lng, lat]) => ({ lat, lng })));
      setDistance(distanceKm);
      setCost(fare);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <MapContainer
      center={from || { lat: -1.286389, lng: 36.817223 }}
      zoom={12}
      className="h-96 w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {from?.lat !== undefined && from?.lng !== undefined && (
        <Marker position={[from.lat, from.lng]} />
      )}

      {to?.lat !== undefined && to?.lng !== undefined && (
        <Marker position={[to.lat, to.lng]} />
      )}

      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
}