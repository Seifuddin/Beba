"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const API_KEY = "5b3ce3597851110001cf62480372e722a3f94a31820549f55aa3d15b"; // Replace with your API key
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

export default function BookPage() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);

  const handleLocationChange = async (type, city) => {
    if (!city.trim()) return;

    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(city)}`
      );

      const results = response.data.features;
      if (results.length === 0) {
        console.error("Location not found:", city);
        return;
      }

      const [lng, lat] = results[0].geometry.coordinates;
      const location = { lat, lng };

      if (type === "from") setFrom(location);
      if (type === "to") setTo(location);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Beba Ride - Book a Trip</h1>

      <div className="my-4">
        <label>From:</label>
        <input
          type="text"
          placeholder="Enter starting location (e.g., Nairobi)..."
          className="w-full p-2 border"
          onBlur={(e) => handleLocationChange("from", e.target.value)}
        />
      </div>

      <div className="my-4">
        <label>To:</label>
        <input
          type="text"
          placeholder="Enter destination (e.g., Mombasa)..."
          className="w-full p-2 border"
          onBlur={(e) => handleLocationChange("to", e.target.value)}
        />
      </div>

      <LeafletMap from={from} to={to} setDistance={setDistance} setCost={setCost} />

      <div className="mt-4">
        <p>Distance: {distance} km</p>
        <p>Fare: {cost} KES</p>
      </div>
    </div>
  );
}