import "./App.css";
import bimg from "./images/pattern-bg-desktop.png";
import arrow from "./images/icon-arrow.svg";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const API_KEY = "at_WkSjDUL0hrY9LovERCXy7FmsVqaIx";

function App() {
  const [ip, setIp] = useState("-");
  const [location, setLocation] = useState("-");
  const [city, setCity] = useState("-");
  const [timezone, setTimezone] = useState("-");
  const [isp, setISP] = useState("-");
  const [lat, setLat] = useState(13.505);
  const [lng, setLng] = useState(-0.09);

  const findlocation = async (ip) => {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
    );

    const data = await response.json();
    setIp(data.ip);
    setLocation(data.location.country);
    setCity(data.location.city);
    setTimezone(data.location.timezone);
    setISP(data.isp);
    setLat(data.location.lat);
    setLng(data.location.lng);
  };

  useEffect(() => {
    const runAPI = async () => {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
      );

      const data = await response.json();
      setIp(data.ip);
      setLocation(data.location.country);
      setCity(data.location.city);
      setTimezone(data.location.timezone);
      setISP(data.isp);
      setLat(data.location.lat);
      setLng(data.location.lng);
    };

    runAPI();
  }, []);

  const inputChange = (e) => {
    setIp(e.target.value);
  };

  return (
    <div className="App">
      <div className="text">
        <div className="title">IP ADDRESS TRACKER</div>
        <div className="input">
          <input
            type="text"
            id="input-field"
            placeholder="Search for any IP address or domain"
            onChange={inputChange}
          />
          <button onClick={() => findlocation(ip)}>
            <img src={arrow} alt="button" />
          </button>
        </div>
        <div className="output">
          <div className="section1">
            <span>IP ADDRESS</span>
            <div className="section-output">{ip}</div>
          </div>
          <div className="section2">
            <span>LOCATION</span>
            <div className="section-output">
              {location},{city}
            </div>
          </div>
          <div className="section3">
            <span>TIMEZONE</span>
            <div className="section-output">{timezone}</div>
          </div>
          <div className="section4">
            <span>ISP</span>
            <div className="section-output">{isp}</div>
          </div>
        </div>
      </div>

      <div className="background">
        <img src={bimg} alt="" />
      </div>

      <div className="map">
        <MapContainer
          className="mapcontainer"
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              {lat},{lng} <br /> IP address location
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
