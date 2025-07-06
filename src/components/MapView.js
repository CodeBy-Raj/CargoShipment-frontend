import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = ({ shipments, selectedShipment, onSelectShipment }) => {
  if (!selectedShipment) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg mb-2">No Shipment Selected</CardTitle>
          <CardDescription>Select a shipment from the table to view its route on the map.</CardDescription>
        </CardContent>
      </Card>
    );
  }

  // Mock coordinates for demo (in real app, you'd geocode the location names)
  const mockCoordinates = {
    'New York': [40.7128, -74.0060],
    'Philadelphia': [39.9526, -75.1652],
    'Atlanta': [33.7490, -84.3880],
    'Miami': [25.7617, -80.1918],
    'Los Angeles': [34.0522, -118.2437],
    'Phoenix': [33.4484, -112.0740],
    'Denver': [39.7392, -104.9903],
    'Chicago': [41.8781, -87.6298],
    'Seattle': [47.6062, -122.3321],
    'Portland': [45.5152, -122.6784],
    'San Francisco': [37.7749, -122.4194]
  };

  const positions = selectedShipment.route.map((location, index) => {
    const coords = mockCoordinates[location] || [40.7128, -74.0060]; // Default to NYC
    return {
      name: location,
      coords: coords,
    };
  });

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'secondary';
      case 'in transit': return 'default';
      case 'delivered': return 'success';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="h-6 w-6" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  🗺️ Route Map
                  <Badge variant={getStatusVariant(selectedShipment.status)}>
                    {selectedShipment.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {selectedShipment.containerId} • Current: {selectedShipment.currentLocation}
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={() => onSelectShipment(null)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Table
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden" style={{ height: '500px' }}>
            <MapContainer center={positions[0].coords} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {positions.map((position, index) => (
                <Marker key={index} position={position.coords}>
                  <Popup>
                    <div className="text-sm">
                      <strong>{position.name}</strong>
                      {index === 0 && <div className="text-green-600">Start</div>}
                      {index === positions.length - 1 && <div className="text-red-600">Destination</div>}
                      {selectedShipment.currentLocation === position.name && (
                        <div className="text-blue-600 font-medium">Current Location</div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
              <Polyline 
                positions={positions.map(position => position.coords)} 
                color="#3b82f6" 
                weight={3}
                opacity={0.8}
              />
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;

