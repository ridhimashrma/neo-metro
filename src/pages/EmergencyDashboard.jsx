import { useState, useEffect, useContext } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  ShieldAlert,
  Siren,
  Trash2,
} from "lucide-react";

import { useData } from "../context/DataContext";
import { LocationContext } from "../context/LocationContext";

import "leaflet/dist/leaflet.css";
import "../styles/neometro.css";

export default function EmergencyDashboard() {

  const { emergencyReports, addEmergency, deleteEmergency } = useData();

  const { location } = useContext(LocationContext);

  const [emergencies, setEmergencies] = useState([]);

  const [showSOS, setShowSOS] = useState(false);

  const [sosType, setSosType] = useState("");

  // =========================
  // FETCH LIVE EMERGENCIES
  // =========================

  useEffect(() => {

    const fetchEmergencies = async () => {

      try {

        const response = await fetch(
          "http://localhost:8787/api/sos"
        );

        const data = await response.json();

        setEmergencies(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchEmergencies();

    const interval = setInterval(
      fetchEmergencies,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  // =========================
  // TRIGGER REAL SOS
  // =========================

  const triggerSOS = async () => {

    try {

      if (
        !location.latitude ||
        !location.longitude
      ) {
        alert("Location not available");
        return;
      }

      const payload = {
        type: sosType,
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        city: location.city,
        description: `SOS triggered for ${sosType}`,
      };

      const response = await fetch(
        "http://localhost:8787/api/sos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Local state update
      addEmergency({
        id: Date.now(),
        type: sosType,
        description: payload.description,
        address: location.address,
      });

      alert(data.message || "SOS Sent Successfully");

      setShowSOS(false);

      setSosType("");

    } catch (err) {

      console.log(err);

      alert("Failed to send SOS");

    }

  };

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="neon-cyan text-3xl font-black">
            CRISIS COMMAND CENTER
          </h1>

          <p className="text-red-400">
            Live Emergency Management
          </p>

          {/* LIVE LOCATION */}

          <p className="text-sm text-cyan-300 mt-2">
            Current Location:
            {" "}
            {location.city || "Fetching location..."}
          </p>

        </div>

        <button
          onClick={() => setShowSOS(true)}
          className="btn-neon flex items-center gap-3"
        >
          <Siren size={22} />
          TRIGGER SOS
        </button>

      </div>

      {/* SOS MODAL */}

      {showSOS && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="glass p-8 w-[350px] rounded-3xl space-y-6">

            <h3 className="text-2xl font-bold text-red-400">
              Emergency SOS
            </h3>

            <select
              value={sosType}
              onChange={(e) =>
                setSosType(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-cyan-500 text-white"
            >

              <option value="">
                Select Emergency Type
              </option>

              <option value="medical">
                Medical Emergency
              </option>

              <option value="fire">
                Fire Outbreak
              </option>

              <option value="accident">
                Road Accident
              </option>

              <option value="crime">
                Crime / Security
              </option>

            </select>

            {/* LIVE ADDRESS */}

            <div className="text-sm text-gray-300">
              <p className="font-bold text-cyan-400">
                Live Location
              </p>

              <p>
                {location.address ||
                  "Fetching current location..."}
              </p>
            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setShowSOS(false)}
                className="flex-1 py-3 border border-gray-600 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={triggerSOS}
                className="flex-1 btn-neon"
              >
                SEND SOS
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ACTIVE EMERGENCIES */}

        <div className="glass p-8">

          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">

            <ShieldAlert />

            Active Emergencies
            ({emergencies.length})

          </h3>

          <div className="space-y-4 max-h-[500px] overflow-auto custom-scrollbar">

            {emergencies.length > 0 ? (

              emergencies.map((report, index) => (

                <div
                  key={index}
                  className="glass p-6 border-l-4 border-red-500 flex justify-between items-start"
                >

                  <div>

                    <h4 className="font-bold capitalize text-lg">
                      {report.type}
                    </h4>

                    <p className="text-gray-300 mt-1">
                      {report.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {report.address}
                    </p>

                    <p className="text-xs text-cyan-400 mt-1">
                      {report.city}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      deleteEmergency(report.id)
                    }
                    className="text-red-400 hover:text-red-500 p-2"
                  >

                    <Trash2 size={20} />

                  </button>

                </div>

              ))

            ) : (

              <div className="text-gray-400">
                No active emergencies
              </div>

            )}

          </div>

        </div>

        {/* LIVE MAP */}

        <div
          className="glass overflow-hidden rounded-3xl"
          style={{ height: "520px" }}
        >

          {location.latitude &&
          location.longitude ? (

            <MapContainer
              center={[
                location.latitude,
                location.longitude,
              ]}
              zoom={14}
              style={{
                height: "100%",
                width: "100%",
              }}
            >

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* USER LIVE LOCATION */}

              <Marker
                position={[
                  location.latitude,
                  location.longitude,
                ]}
              >

                <Popup>

                  <div>

                    <h3 className="font-bold">
                      Your Current Location
                    </h3>

                    <p>{location.address}</p>

                  </div>

                </Popup>

              </Marker>

              {/* ALL EMERGENCY MARKERS */}

              {emergencies.map((item, index) => (

                <Marker
                  key={index}
                  position={[
                    item.latitude,
                    item.longitude,
                  ]}
                >

                  <Popup>

                    <div>

                      <h3 className="font-bold capitalize">
                        {item.type}
                      </h3>

                      <p>{item.address}</p>

                    </div>

                  </Popup>

                </Marker>

              ))}

            </MapContainer>

          ) : (

            <div className="flex items-center justify-center h-full text-cyan-400">

              Fetching Live Location...

            </div>

          )}

        </div>

      </div>

    </div>
  );

}