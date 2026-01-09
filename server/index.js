const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json({ limit: '50mb' })); // Allows parsing JSON from frontend
app.use(cors()); // Allows frontend (port 5173) to talk to backend (port 5000)

// --- 1. CONNECT TO LOCAL MONGODB ---
// 'saas-dashboard' is the name of the database. MongoDB creates it automatically if it doesn't exist.
const MONGO_URI = 'mongodb+srv://tiwaribaba845438_db_user:43DOmWwRwhzXVZ76@cluster0.dvxfriv.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
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
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

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
        avatar: updatedUser.avatar // Send back the new avatar
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- 3. START SERVER ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));