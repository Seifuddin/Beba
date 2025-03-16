"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: -1.286389, lng: 36.817223 }; // Nairobi
const API_KEY = "AIzaSyA0D7c8GW_CD8tkqRzxkD88zWqeRJDlCSs"; // Use this for now, hide it later

export default function BookRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedCab, setSelectedCab] = useState("");
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [error, setError] = useState("");
  const [polyline, setPolyline] = useState(null); // Holds the route polyline

  // Function to convert city names to coordinates using Geocoding API
  const getCoordinates = async (address) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        return data.results[0].geometry.location; // Returns { lat, lng }
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const handleRideRequest = async () => {
    if (!from || !to || !selectedCab) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    try {
      // Convert From and To locations into coordinates
      const fromCoords = await getCoordinates(from);
      const toCoords = await getCoordinates(to);

      if (!fromCoords || !toCoords) {
        setError("Invalid locations. Please enter valid city names.");
        return;
      }

      // Fetch route from Routes API
      const res = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "routes.distanceMeters,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify({
          origin: { location: { latLng: fromCoords } },
          destination: { location: { latLng: toCoords } },
          travelMode: "DRIVE",
        }),
      });

      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = route.distanceMeters / 1000;

        setDistance(distanceKm);
        setFare(distanceKm * 50); // 50 shillings per km

        // Decode the polyline into an array of LatLng points
        const polylinePath = decodePolyline(route.polyline.encodedPolyline);
        setPolyline(polylinePath);
      } else {
        setError("Could not calculate the route. Please check your locations.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Function to decode Google Polyline into an array of LatLng points
  function decodePolyline(encoded) {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b, shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Ride</h1>

      {/* Ride Input Form */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="From"
          className="border p-2 w-full"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          className="border p-2 w-full"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* Cab Selection */}
        <select className="border p-2 w-full" value={selectedCab} onChange={(e) => setSelectedCab(e.target.value)}>
          <option value="">Select a Cab</option>
          <option value="standard">Standard Cab</option>
          <option value="luxury">Luxury Cab</option>
          <option value="motorbike">Motorbike</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={handleRideRequest}>
          Get Fare & Route
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Distance & Fare */}
      {distance !== null && (
        <div className="mt-4">
          <p>Distance: {distance} km</p>
          <p>Total Fare: {fare} shillings</p>
        </div>
      )}

      {/* Google Maps Display */}
      <div className="mt-6">
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {polyline && <Polyline path={polyline} options={{ strokeColor: "#FF0000", strokeWeight: 4 }} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
