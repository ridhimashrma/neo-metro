import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: "",
    address: "",
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          setLocation({
            latitude: lat,
            longitude: lon,
            city:
              data.address.city ||
              data.address.town ||
              data.address.state ||
              "Unknown",
            address: data.display_name,
          });
        } catch (err) {
          console.log(err);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;