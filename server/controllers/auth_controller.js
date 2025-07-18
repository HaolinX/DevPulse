import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const existing = await User.findOne({ username })
    if (existing) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ username, password: hashedPassword })

    res.status(201).json({ message: 'Registration successful', user: { id: newUser._id, username } })
  } catch (err) {
    console.error('[Register Error]', err)
    res.status(500).json({ error: 'Registration failed' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username },
    })
  } catch (err) {
    console.error('[Login Error]', err)
    res.status(500).json({ error: 'Login failed' })
  }
}