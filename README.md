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
frontend-new/
├── public/
│   ├── index.html
│   └── ...
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
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

---

## 🛠️ Setup & Development

### 1. Install Dependencies

```bash
cd frontend-new
npm install
```

### 2. Environment Variables

Create a `.env` file in `frontend-new/`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start the Development Server

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

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit and push your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.