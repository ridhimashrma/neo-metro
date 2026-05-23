import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import {
  Wind,
  AlertTriangle,
  TrendingDown,
  Gauge,
} from "lucide-react";

import "../styles/neometro.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { LocationContext } from "../context/LocationContext";

import "leaflet/dist/leaflet.css";

function createAQIIcon(aqi) {

  let color = "#22c55e";

  if (aqi > 50) color = "#eab308";

  if (aqi > 100) color = "#f97316";

  if (aqi > 150) color = "#ef4444";

  return L.divIcon({
    html: `
      <div
        style="
          background:${color};
          width:40px;
          height:40px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          border:3px solid white;
          color:white;
          font-weight:bold;
        "
      >
        ${aqi}
      </div>
    `,
    className: "custom-aqi-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

}

export default function AQIDashboard() {

  const { location } =
    useContext(LocationContext);

  const [aqiData, setAqiData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH LIVE AQI
  // =========================

  useEffect(() => {

    if (!location.latitude) return;

    const fetchAQI = async () => {

      try {
        console.log(import.meta.env.VITE_OPENWEATHER_API_KEY);
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
        );

        const data = await response.json();

        if (data.list && data.list.length > 0) {
          setAqiData(data.list[0]);
        }

        setLoading(false);

      } catch (err) {

        console.log(err);

      }

    };

    fetchAQI();

    const interval = setInterval(
      fetchAQI,
      10000
    );

    return () => clearInterval(interval);

  }, [location]);

  // =========================
  // LOADING STATE
  // =========================

  if (
    loading ||
    !location.latitude ||
    !aqiData
  ) {

    return (

      <div className="p-8">

        <div className="glass p-8 rounded-3xl text-center border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

          <h2 className="text-3xl font-bold text-cyan-400">
            Fetching Live AQI...
          </h2>

        </div>

      </div>

    );

  }

  // =========================
  // AQI VALUES
  // =========================

  const aqi = aqiData.main.aqi * 50;

  const pm25 =
    aqiData.components.pm2_5.toFixed(1);

  const pm10 =
    aqiData.components.pm10.toFixed(1);

  const co =
    aqiData.components.co.toFixed(1);

  const no2 =
    aqiData.components.no2.toFixed(1);

  // =========================
  // AQI STATUS
  // =========================

  let status = "Good";

  let statusColor = "#22c55e";

  if (aqi > 50) {
    status = "Moderate";
    statusColor = "#eab308";
  }

  if (aqi > 100) {
    status = "Poor";
    statusColor = "#f97316";
  }

  if (aqi > 150) {
    status = "Hazardous";
    statusColor = "#ef4444";
  }

  return (

    <div className="p-8 space-y-8 min-h-screen bg-[#07111f] text-white">

      {/* HEADER */}

      <div className="glass p-8 rounded-3xl border border-cyan-500/20 shadow-[0_0_40px_rgba(0,255,255,0.05)]">

        <h1 className="neon-cyan text-3xl font-black">
          ATMOSPHERIC SURVEILLANCE
        </h1>

        <p className="text-cyan-400">
          Live AQI Monitoring
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Current Location:
          {" "}
          {location.city}
        </p>

      </div>

      {/* AQI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="glass p-8 rounded-3xl text-center border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

          <Wind
            size={40}
            className="mx-auto mb-4 text-cyan-400"
          />

          <p className="text-6xl md:text-7xl font-black tracking-tight">
            {aqi}
          </p>

          <p
            className="text-sm uppercase tracking-widest mt-2"
            style={{ color: statusColor }}
          >
            {status}
          </p>

        </div>

        <div className="glass p-8 rounded-3xl text-center border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

          <AlertTriangle
            size={40}
            className="mx-auto mb-4 text-red-400"
          />

          <p className="text-4xl font-black">
            {pm25}
          </p>

          <p className="text-sm text-red-400">
            PM2.5
          </p>

        </div>

        <div className="glass p-8 rounded-3xl text-center border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

          <TrendingDown
            size={40}
            className="mx-auto mb-4 text-emerald-400"
          />

          <p className="text-4xl font-black">
            {pm10}
          </p>

          <p className="text-sm text-emerald-400">
            PM10
          </p>

        </div>

        <div className="glass p-8 rounded-3xl text-center border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

          <Gauge
            size={40}
            className="mx-auto mb-4 text-purple-400"
          />

          <p className="text-4xl font-black">
            {co}
          </p>

          <p className="text-sm uppercase tracking-widest">
            CO Level
          </p>

        </div>

      </div>

      {/* MAP + DETAILS */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LIVE DETAILS */}

        <div className="glass p-8 rounded-3xl border border-cyan-500/20 shadow-[0_0_40px_rgba(0,255,255,0.05)]">

          <h3 className="text-2xl font-bold mb-6">
            Live Air Composition
          </h3>

          <div className="space-y-6">

            <div>
              <p className="text-gray-400">
                Nitrogen Dioxide
              </p>

              <h2 className="text-3xl font-bold">
                {no2}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Carbon Monoxide
              </p>

              <h2 className="text-3xl font-bold">
                {co}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                PM2.5
              </p>

              <h2 className="text-3xl font-bold">
                {pm25}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                PM10
              </p>

              <h2 className="text-3xl font-bold">
                {pm10}
              </h2>
            </div>

          </div>

        </div>

        {/* LIVE MAP */}

        <div
          className="glass overflow-hidden"
          style={{ height: "420px" }}
        >

          <MapContainer
            center={[
              location.latitude,
              location.longitude,
            ]}
            zoom={13}
            style={{
              height: "100%",
              width: "100%",
            }}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[
                location.latitude,
                location.longitude,
              ]}
              icon={createAQIIcon(aqi)}
            >

              <Popup>

                <div>

                  <h3 className="font-bold">
                    {location.city}
                  </h3>

                  <p>
                    AQI:
                    {" "}
                    {aqi}
                  </p>

                  <p>
                    {status}
                  </p>

                </div>

              </Popup>

            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>

  );

}