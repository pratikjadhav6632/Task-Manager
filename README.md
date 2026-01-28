# One-Page Item List Application

A responsive Main Page Application built with **Node.js (Express)** and **React (Vite)**.

## How it was Planned and Executed

### 1. Planning
I broke down the task into two core components:
- **Backend**: A simple Express server to handle API requests (GET and POST items). I decided to use in-memory storage for simplicity, as per the task scope.
- **Frontend**: A React application using Vite for fast development. I designed a component structure with `ItemInput` for adding items and `ItemList` for display.

I prioritized a **premium, responsive design** using modern CSS techniques like Glassmorphism and CSS Variables for gradients, ensuring the app looks great on both mobile and desktop.

### 2. Execution
- **Backend Setup**: initialized the `Server` folder, installed `express` and `cors`, and created a RESTful API.
- **Frontend Setup**: Used the existing `Frontend` folder, installed dependencies, and built the React components.
- **Styling**: Implemented a "Wow" factor design with a custom gradient background and glass-panel cards.

## How to Run

### Prerequisites
- Node.js installed.

### 1. Start the Backend
Open a terminal in the `Server` directory:
```bash
cd Server
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 2. Start the Frontend
Open a new terminal in the `Frontend` directory:
```bash
cd Frontend
npm install
npm run dev
```
The application will run on `http://localhost:5173` (or the port shown in the terminal).

## Features
- **Add Items**: Type in the text box and press Add or Enter.
- **View List**: Items appear instantly in a numbered list.
- **Responsive**: Fully adapts to mobile screens.
