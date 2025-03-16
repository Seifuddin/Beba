"use client";

import { useState } from "react";
import LeafletMap from "./Map";

const RideBookingForm = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [cabType, setCabType] = useState("");
  const [fare, setFare] = useState(null);

  const handleSelectLocation = (type, lat, lng) => {
    if (type === "from") setFrom({ lat, lng });
    if (type === "to") setTo({ lat, lng });
  };

  const handleBookRide = async () => {
    if (!from || !to || !cabType) {
      alert("Please select locations and cab type");
      return;
    }

    try {
      const routeRes = await fetch("http://localhost:5000/api/get-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: from, end: to }),
      });

      const routeData = await routeRes.json();

      if (!routeData.route) {
        alert("Error fetching route");
        return;
      }

      const rideData = {
        from: JSON.stringify(from),
        to: JSON.stringify(to),
        distance: routeData.distance,
        fare: routeData.distance * 50, // 50 shillings per km
        cab_type: cabType,
      };

      const saveRes = await fetch("http://localhost:5000/api/save-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });

      const saveData = await saveRes.json();

      if (saveData.message) {
        setFare(rideData.fare);
        alert("Ride booked successfully!");
      }
    } catch (err) {
      console.error("Error booking ride:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
        Book a Ride
      </h2>

      {/* Locations */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">
            From Location:
          </label>
          <button
            onClick={() => handleSelectLocation("from", -1.286389, 36.817223)}
            className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Use Default (Nairobi)
          </button>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">
            To Location:
          </label>
          <button
            onClick={() => handleSelectLocation("to", -1.2921, 36.8219)}
            className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Use Default (City Center)
          </button>
        </div>
      </div>

      {/* Cab Selection */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium">Cab Type:</label>
        <select
          value={cabType}
          onChange={(e) => setCabType(e.target.value)}
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        >
          <option value="">Select a cab</option>
          <option value="standard">Standard</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Book Ride Button */}
      <button
        onClick={handleBookRide}
        className="w-full mt-5 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
      >
        Book Ride
      </button>

      {/* Fare Display */}
      {fare !== null && (
        <p className="text-center mt-4 text-lg font-semibold text-gray-700">
          Estimated Fare:{" "}
          <span className="text-green-500">Ksh {fare.toFixed(2)}</span>
        </p>
      )}

      {/* Map */}
      <div className="mt-6">
        <LeafletMap from={from} to={to} />
      </div>
    </div>
  );
};

export default RideBookingForm;
