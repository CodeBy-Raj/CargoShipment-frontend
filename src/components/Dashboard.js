import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShipments } from '../redux/slices/shipmentSlice';
import ShipmentTable from './ShipmentTable';
import ShipmentForm from './ShipmentForm';
import MapView from './MapView';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Plus, Table, Map } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: shipments, loading, error } = useSelector(state => state.shipments);
  const [showForm, setShowForm] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'map'

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const handleAddShipment = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleViewShipment = (shipment) => {
    setSelectedShipment(shipment);
    setViewMode('map');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">Loading shipments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Shipments</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🚢 Cargo Shipment Tracker</CardTitle>
          <CardDescription>Track and manage your cargo shipments in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                onClick={() => setViewMode('table')}
                className="flex items-center gap-2"
              >
                <Table className="h-4 w-4" />
                Table View
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
                className="flex items-center gap-2"
              >
                <Map className="h-4 w-4" />
                Map View
              </Button>
            </div>
            
            <Button
              onClick={handleAddShipment}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Shipment
            </Button>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'table' ? (
        <ShipmentTable 
          shipments={shipments} 
          onViewShipment={handleViewShipment}
        />
      ) : (
        <MapView 
          shipments={shipments} 
          selectedShipment={selectedShipment}
          onSelectShipment={setSelectedShipment}
        />
      )}

      {showForm && (
        <ShipmentForm 
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
