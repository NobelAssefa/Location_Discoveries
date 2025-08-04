// src/components/Map.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Don't forget to import leaflet's CSS

// Fix for default marker icon issue with webpack
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Get user's geolocation
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const userCoords = [latitude, longitude];
                setUserLocation(userCoords);

                // 2. Fetch nearby locations from our backend
                try {
                    const response = await axios.get('http://localhost:5000/api/locations', {
                        params: {
                            latitude: latitude,
                            longitude: longitude,
                        },
                    });
                    console.log("data from Frontend" + response.data);
                    
                    setNearbyLocations(response.data.data.locations);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch nearby locations.');
                    setLoading(false);
                }
            },
            (err) => {
                setError('Geolocation permission denied. Please enable it to use the app.');
                setLoading(false);
                // As a fallback, set a default location (e.g., city center)
                setUserLocation([51.505, -0.09]); // Default to London
            }
        );
    }, []); // Empty dependency array means this runs once on component mount

    if (loading) {
        return <div>Loading Map and Finding Your Location...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <MapContainer center={userLocation} zoom={14} scrollWheelZoom={true}>
            {/* This is the map background layer */}
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker for the user's current location */}
            {userLocation && (
                <Marker position={userLocation}>
                    <Popup>You are here!</Popup>
                </Marker>
            )}

            {/* Markers for the nearby "local gems" */}
            {nearbyLocations.map((loc) => (
                <Marker
                    key={loc._id}
                    // Remember: Leaflet uses [lat, lng], but our DB stores [lng, lat]
                    position={[loc.location.coordinates[1], loc.location.coordinates[0]]}
                >
                    <Popup>
                        <b>{loc.name}</b><br/>
                        {loc.description}<br/>
                        <small>Category: {loc.category}</small>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;