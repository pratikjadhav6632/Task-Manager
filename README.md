# 📝 Assessment Project - Item List Application

<div align="center">
  <strong>
    <a href="#live-demo">Live Demo</a> •
    <a href="#about">About</a> •
    <a href="#how-it-works">How It Works</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#setup">Setup</a>
  </strong>
</div>

## <a id="live-demo"></a>🔗 Live Demo
- **Frontend (Website)**: <a href="https://task-manager-nine-swart-19.vercel.app/">Live Demo</a>
- **Backend (Server)**: <a href="https://task-manager-wfrc.onrender.com">Live Demo</a>

---
## Task 
Task (One-Page Application): Build a one-page application using Node + React / Next.js / NestJS (any one).
Requirements:
1. Enter a list of items one at a time using a text box.
2. Display the items below the text box on the same page.
3. The list should have a title.
4. Items should be displayed as numbered or dotted list.
5. Add a README.md explaining how he planned and executed the task.
6. Bonus: Host the application and add the live link in the GitHub README.

*****************Design, colours, and UI and design are your creativity Application which should be mobile and web responsive.********


## <a id="how-it-works"></a>⚙️ How It Works (The "Restaurant" Analogy)
To understand how this app is built, think of a **Restaurant**:

1.  **The Customer (You)**: You visit the website.
2.  **The Waiter (Frontend)**: This is what you see and interact with (the buttons, the list). It takes your order (new item) and sends it to the kitchen.
    - *Tech used:* **React** (makes it interactive) & **CSS** (makes it look pretty).
3.  **The Kitchen (Backend)**: The kitchen receives the order and prepares it. It decides what to do with your request.
    - *Tech used:* **Node.js & Express** (the chefs processing orders).
4.  **The Pantry (Database)**: This is where the ingredients (your data) are stored safely on shelves. The kitchen grabs items from here or puts new ones in.
    - *Tech used:* **MongoDB** (a digital filing cabinet).

So when you click "Add Item":
**You** (Customer) &rarr; **Frontend** (Waiter) &rarr; **Backend** (Kitchen) &rarr; **Database** (Pantry).

---

## <a id="architecture"></a>🏗️ Technical Architecture (The Rules)
For the developers and teachers, here is how we structured the code to keep it clean and organized. We prioritized separation of concerns and clear data flow.

### 1. Frontend (The "Face" of the App)
The frontend handles what the user sees and interacts with.

- **Vite**: A build tool that is significantly faster than standard tools like CRA. It provides instant server start and lightning-fast updates.
- **Vanilla CSS**: We didn't use pre-made kits (like Bootstrap). We wrote the styles from scratch to give it a unique, premium "Glass" look.

```css
/* Example of our Glass/Frosted Effect */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px); /* This makes it blurry behind */
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

- **Folder Structure**:
```text
Frontend/src/
├── components/     # Reusable UI parts (e.g., ItemList.jsx, Footer.jsx)
├── App.jsx         # The main container that holds everything
└── main.jsx        # The entry point that mounts React to the DOM
```

### 2. Backend (The "Brain" of the App)
The backend manages data persistence and business logic.

- **Express.js**: The traffic controller that handles all incoming requests.
- **Mongoose**: A translator that helps our Javascript code talk to the MongoDB database easily using strict definitions.

**Key Components:**

*   **Models (`models/`)**: Defines what an "Item" looks like.
    ```javascript
    // Example: models/Item.js
    const ItemSchema = new mongoose.Schema({
      text: { type: String, required: true }, // Must have text
      isBought: { type: Boolean, default: false } // Defaults to not bought
    });
    ```

*   **Controllers (`controllers/`)**: The logic. It says "If they want to save an item, do X, Y, Z".
    ```javascript
    // Example: controllers/itemController.js
    exports.createItem = async (req, res) => {
      const newItem = await Item.create(req.body); // Save to DB
      res.status(201).json(newItem); // Send back the new item
    };
    ```

*   **Routes (`routes/`)**: The address book. It tells the server where to send specific requests.
    ```javascript
    // Example: routes/itemRoutes.js
    router.post('/', itemController.createItem); // POST request -> Run createItem logic
    ```

- **Folder Structure**:
```text
Server/
├── models/         # Database Schemas (Blueprints for data)
├── controllers/    # Business Logic functions
├── routes/         # API Route definitions
└── index.js       # App Entry point (starts the server)
```

---

## <a id="deployment"></a>🚀 Deployment (Putting it Online)

### Frontend on Vercel
We put the website files on **Vercel**. It's like a super-fast content delivery service that makes sure the website loads quickly for everyone around the world.

### Backend on Render
We put the server logic on **Render**. It keeps the "Kitchen" open 24/7 so it can always answer requests from the website.

---

## <a id="setup"></a>💻 How to Run This on Your Computer

If you want to play with the code, follow these steps:

### Prerequisites
You need to install **Node.js** (allows you to run code outside the browser).

### 1. Start the Server (The Kitchen)
Open your terminal (command prompt), go to the `Server` folder, and type:
```bash
cd Server
npm install   # Installs the tools needed
node index.js # Opens the kitchen
```
*The terminal will say: "Server is running..."*

### 2. Start the Website (The Waiter)
Open a NEW terminal, go to the `Frontend` folder, and type:
```bash
cd Frontend
npm install  # Installs the tools needed
npm run dev  # Wakes up the waiter
```
*It will give you a link (like http://localhost:5173). Click it to see your app!*
