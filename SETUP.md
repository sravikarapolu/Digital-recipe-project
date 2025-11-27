# Digital Recipe Book - Setup & Run Instructions

## Prerequisites
- Node.js 16+ installed (Node.js 18+ recommended)
- MongoDB installed locally OR MongoDB Atlas account

## Backend Setup

1. **Navigate to backend folder:**
   ```powershell
   cd "c:\Users\rc19227\OneDrive - Ryan LLC\Desktop\tp\digital-recipe-book\backend"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment variables:**
   - The `.env` file is already created with default values
   - If using MongoDB Atlas, update `MONGO_URI` in `.env` with your connection string
   - If using local MongoDB, ensure MongoDB is running:
     ```powershell
     mongod
     ```

4. **Start the backend server:**
   ```powershell
   npm start
   ```
   - Server will run on http://localhost:5000
   - You should see "MongoDB Connected" message

## Frontend Setup

1. **Open a new terminal and navigate to frontend folder:**
   ```powershell
   cd "c:\Users\rc19227\OneDrive - Ryan LLC\Desktop\tp\digital-recipe-book\frontend"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```
   - Frontend will run on http://localhost:5173 (or the next available port)

## Using the Application

1. **Sign Up:**
   - Click "Sign in" button in the navbar
   - Switch to "Sign up" mode
   - Create an account with name, email, and password

2. **Login:**
   - Use your email and password to login
   - You'll be redirected to the main page

3. **Add Recipes:**
   - Click "+ Add new recipe" button
   - Fill in recipe title, ingredients (one per line), and steps
   - Click "Create Recipe"

4. **View Recipes:**
   - All your recipes will be displayed in a grid
   - Use search and filters to find specific recipes

5. **Logout:**
   - Click the "Logout" button in the navbar

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login and get token

### Recipes (Protected - requires authentication)
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

## Troubleshooting

### Backend won't start
- Check Node.js version: `node -v` (should be 16+)
- Ensure MongoDB is running
- Check if port 5000 is available

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `.env` file in frontend has correct API URL
- Check browser console for CORS errors

### "Token failed" error
- Logout and login again
- Clear browser localStorage
- Check JWT_SECRET is set in backend `.env`

## Fixed Issues

✅ Node.js compatibility (downgraded mongoose to 6.12.0)
✅ CORS configuration added
✅ Missing error handling in recipe controller
✅ Missing getRecipeById route
✅ Environment variables configured
✅ Frontend-backend integration complete
✅ Authentication system implemented
✅ Recipe CRUD operations working
