import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createShipment } from '../redux/slices/shipmentSlice';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Package, Truck, MapPin, Clock } from 'lucide-react';

const ShipmentForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    shipmentId: '',
    containerId: '',
    route: '',
    currentLocation: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.shipmentId.trim()) {
      newErrors.shipmentId = 'Shipment ID is required';
    }
    
    if (!formData.containerId.trim()) {
      newErrors.containerId = 'Container ID is required';
    }
    
    if (!formData.route.trim()) {
      newErrors.route = 'Route is required';
    }
    
    if (!formData.currentLocation.trim()) {
      newErrors.currentLocation = 'Current location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Convert route string to array
      const routeArray = formData.route.split(',').map(location => location.trim());
      
      const shipmentData = {
        ...formData,
        route: routeArray
      };
      
      await dispatch(createShipment(shipmentData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Error creating shipment:', error);
      setErrors({ submit: 'Failed to create shipment. Please try again.' });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Shipment
          </DialogTitle>
          <DialogDescription>
            Create a new cargo shipment with container and route details.
          </DialogDescription>
        </DialogHeader>
        
        {errors.submit && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-4">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </CardContent>
          </Card>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="shipmentId" className="text-sm font-medium flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipment ID
            </label>
            <Input
              type="text"
              name="shipmentId"
              id="shipmentId"
              value={formData.shipmentId}
              onChange={handleChange}
              placeholder="Enter shipment ID"
              className={errors.shipmentId ? 'border-destructive' : ''}
            />
            {errors.shipmentId && (
              <p className="text-sm text-destructive">{errors.shipmentId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="containerId" className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Container ID
            </label>
            <Input
              type="text"
              name="containerId"
              id="containerId"
              value={formData.containerId}
              onChange={handleChange}
              placeholder="Enter container ID"
              className={errors.containerId ? 'border-destructive' : ''}
            />
            {errors.containerId && (
              <p className="text-sm text-destructive">{errors.containerId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="route" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Route (comma-separated locations)
            </label>
            <Input
              type="text"
              name="route"
              id="route"
              value={formData.route}
              onChange={handleChange}
              placeholder="e.g., New York, Philadelphia, Atlanta, Miami"
              className={errors.route ? 'border-destructive' : ''}
            />
            {errors.route && (
              <p className="text-sm text-destructive">{errors.route}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="currentLocation" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Current Location
            </label>
            <Input
              type="text"
              name="currentLocation"
              id="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              placeholder="Enter current location"
              className={errors.currentLocation ? 'border-destructive' : ''}
            />
            {errors.currentLocation && (
              <p className="text-sm text-destructive">{errors.currentLocation}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Status
            </label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Package className="h-4 w-4 mr-2" />
              Create Shipment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShipmentForm;
