# Cargo Shipment Tracker Frontend

A modern React application for tracking cargo shipments, featuring real-time updates, interactive maps, and a responsive dashboard UI.

---

## 🚀 Tech Stack

- **React** (with hooks and functional components)
- **Redux Toolkit** & **React-Redux** (state management)
- **React-Leaflet** & **Leaflet** (interactive maps)
- **Tailwind CSS** (utility-first styling)
- **Radix UI** (accessible UI primitives)
- **Lucide React** (icons)
- **Axios** (API requests)
- **Class Variance Authority**, **clsx**, **tailwind-merge** (utility class management)

---

## 📁 Project Structure

```
cargoShipment-frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── ShipmentTable.js
│   │   ├── ShipmentForm.js
│   │   ├── MapView.js
│   │   └── ui/
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       └── shipmentSlice.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── lib/
│   │   └── utils.js
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── public/
│   └── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

---

## 🛠️ Setup & Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 1. Navigate to the frontend directory

```bash
cd cargoShipment-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in `cargoShipment-frontend/`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the React Development Server

```bash
npm start
```

- App runs at [http://localhost:3000](http://localhost:3000)
- Make sure the backend API is running at [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 Available Scripts

- `npm start` — Start development server
- `npm run build` — Build for production
- `npm test` — Run tests

---

## 🌟 Features

- **Dashboard**: View, filter, and sort all shipments
- **Add Shipment**: Create new shipments via a modal form
- **Map View**: Visualize shipment routes and current locations on an interactive map
- **Status Badges**: Color-coded shipment statuses
- **Responsive UI**: Works on desktop and mobile
- **Reusable UI Components**: Built with Radix UI and Tailwind CSS

---

## 📦 API Integration

- All API calls are handled via `src/services/api.js`
- Update the `REACT_APP_API_URL` in `.env` if your backend runs on a different URL

---

## 🧪 Testing

- Tests are set up with React Testing Library and Jest.
- Place test files alongside components or in a `__tests__` folder.

---

## Usage

1. **View Shipments**: The dashboard displays all shipments in a tabular format
2. **Add Shipment**: Click "Add New Shipment" to create a new shipment entry
3. **Filter & Sort**: Use the status filter and column sorting in the table
4. **Map View**: Click "View on Map" to see the shipment route and current location
5. **Update Location**: Use the API endpoint to update shipment locations

---

## 📝 Customization

- **UI**: Modify or extend components in `src/components/`
- **State**: Redux logic in `src/redux/`
- **Styling**: Tailwind config in `tailwind.config.js` and custom styles in `src/styles/`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---