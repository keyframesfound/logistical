# Logistical - Logistics Management System

A modern web application for logistics management with QR code generation and scanning capabilities.

## Features

- QR Code Generation for item data
- QR Code Scanner for inventory tracking
- Inventory list for tracking active items

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- QR Code: qrcode.react (frontend) and qrcode (backend)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/logistical.git
   cd logistical
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the example environment file
   cd ../backend
   cp .env.example .env
   ```
   Then edit the `.env` file with your MongoDB connection string and desired port.

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
logistical/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
