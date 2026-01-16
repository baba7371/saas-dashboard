require('dotenv').config(); // 👈 Loads the .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json({ limit: '50mb' })); // Allows parsing JSON from frontend
app.use(cors()); // Allows frontend to talk to backend

// --- 1. CONNECT TO MONGODB (ATLAS CLOUD) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


// --- 2. API ROUTES ---

// REGISTER API
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate Token (Simulated security)
    const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY_123', { expiresIn: '1h' });

    res.json({ 
      token, 
      user: { 
        name: user.name, 
        role: user.role,
        email: user.email,
        avatar: user.avatar // Send avatar on login too
      } 
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error); // 👈 ADD THIS LINE
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE PROFILE API
app.put('/api/update-profile', async (req, res) => {
  try {
    const { email, avatar, name } = req.body;
    
    // Find user and update
    // { new: true } returns the updated document
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { avatar, name }, 
      { new: true } 
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ 
      message: 'Profile updated!', 
      user: { 
        name: updatedUser.name, 
        email: updatedUser.email, 
        role: updatedUser.role,
        avatar: updatedUser.avatar 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- 3. START SERVER ---
// ⚠️ Updated to use process.env.PORT for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));