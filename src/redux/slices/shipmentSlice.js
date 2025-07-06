import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shipmentAPI } from '../../services/api';

// Async thunk for fetching shipments
export const fetchShipments = createAsyncThunk('shipments/fetchShipments', async () => {
  const response = await shipmentAPI.getShipments();
  return response.data;
});

// Async thunk for creating a shipment
export const createShipment = createAsyncThunk('shipments/createShipment', async (shipmentData) => {
  const response = await shipmentAPI.createShipment(shipmentData);
  return response.data;
});

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default shipmentSlice.reducer;
