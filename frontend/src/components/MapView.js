import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaRoute, FaInfoCircle } from 'react-icons/fa';
import './MapView.css'; // New CSS file for map styles

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const donorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [35, 35],
});

const charityIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447035.png',
  iconSize: [35, 35],
});

const MapView = ({ donorLocation, charityLocation }) => {
  // Use props or fallback to sample data
  const donorCoords = donorLocation || [37.8003, -122.4376];
  const charityCoords = charityLocation || [37.7658, -122.4313];
  
  const [distance, setDistance] = useState(null);
  const [showRoute, setShowRoute] = useState(true);
  const [center, setCenter] = useState(donorCoords);

  // Calculate distance between points
  useEffect(() => {
    const calculatedDistance = calculateDistance(donorCoords, charityCoords);
    setDistance(calculatedDistance);
  }, [donorCoords, charityCoords]);

  // Function to calculate distance in km
  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2); // Distance in km with 2 decimals
  };

  const toggleRoute = () => setShowRoute(!showRoute);
  const centerMap = () => setCenter([(donorCoords[0] + charityCoords[0])/2, 
                                 (donorCoords[1] + charityCoords[1])/2]);

  return (
    <div className="map-container">
      <div className="map-controls">
        <button onClick={toggleRoute} className="map-button">
          <FaRoute /> {showRoute ? 'Hide Route' : 'Show Route'}
        </button>
        <button onClick={centerMap} className="map-button">
          <FaInfoCircle /> Center Map
        </button>
        {distance && (
          <div className="distance-badge">
            Distance: {distance} km
          </div>
        )}
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '500px', width: '100%' }}
        className="map-view"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Donor Marker */}
        <Marker position={donorCoords} icon={donorIcon}>
          <Popup>
            <strong>Donor Location</strong><br />
            Food available for pickup
          </Popup>
          <Tooltip permanent direction="top">🍕 Donor</Tooltip>
        </Marker>

        {/* Charity Marker */}
        <Marker position={charityCoords} icon={charityIcon}>
          <Popup>
            <strong>Charity Location</strong><br />
            Food distribution point
          </Popup>
          <Tooltip permanent direction="top">🏠 Charity</Tooltip>
        </Marker>

        {/* Route Line */}
        {showRoute && (
          <Polyline 
            positions={[donorCoords, charityCoords]} 
            color="#3b82f6"
            weight={3}
            dashArray="5, 5"
          >
            <Tooltip sticky>
              Delivery Route: {distance} km
            </Tooltip>
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;