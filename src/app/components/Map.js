import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: -1.286389, lng: 36.817223 }; // Nairobi

export default function Map({ from, to }) {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (from && to) {
      setDirections(null);
    }
  }, [from, to]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {from && to && (
        <DirectionsService
          options={{ origin: from, destination: to, travelMode: "DRIVING" }}
          callback={(response) => {
            if (response?.status === "OK") setDirections(response);
          }}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}