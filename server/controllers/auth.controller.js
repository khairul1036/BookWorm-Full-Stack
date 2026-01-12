const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { uploadFile } = require("../config/upload");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

// Generate JWT
const generateToken = (user) =>
    jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
    });

// Register
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ success: false, message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload photo if exists
        let photoUrl = null;
        let apiFileId = null;
        if (req.file) {
            const uploaded = await uploadFile(req.file.path);
            photoUrl = uploaded.url;
            apiFileId = uploaded.id;
            fs.unlinkSync(req.file.path);
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            photo: photoUrl,
            apiFileId,
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role },
            token,
        });
    } catch (err) {
        next(err);
    }
};

// Login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "All fields required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = generateToken(user);

        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role },
            token,
        });
    } catch (err) {
        next(err);
    }
};

// Get current logged-in user
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getMe };
