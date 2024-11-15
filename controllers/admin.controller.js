const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utility/config');
const User = require('../models/users.model');
const Content = require('../models/content.model');

// Admin Signup

const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ statusCode: 400, message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });
        await newAdmin.save();

        return res.status(201).json({
            statusCode: 201,
            message: 'Admin registered successfully',
            user: { name: newAdmin.name, email: newAdmin.email },
        });
    } catch (error) {
        return res.status(400).json({ statusCode: 400, message: 'Server error' });
    }
};

// Admin Login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ statusCode: 400, message: 'Email and password are required' });
        }
        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(401).json({ statusCode: 401, message: 'Admin not found' });
        }

        if (admin.role !== 'admin') {
            return res.status(401).json({ statusCode: 401, message: 'Invalid role' });
        }

        if (!admin.password) {
            return res.status(401).json({ statusCode: 401, message: 'Admin password not set' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: admin._id, role: admin.role }, JWT_SECRET_KEY);

        return res.status(200).json({
            statusCode: 200,
            token,
            message: 'Login successful'
        });
    } catch (error) {
        return res.status(400).json({ statusCode: 400, message: 'Error while login' });
    }
};

// Admin update User Data

const updateUserData = async (req, res) => {
    try {
        const updateFields = {};

        const { projectsDone, totalClients, adminUpdatedEmail, phone, address } = req.body;

        if (projectsDone !== undefined) updateFields.projectsDone = projectsDone;
        if (totalClients !== undefined) updateFields.totalClients = totalClients;
        if (adminUpdatedEmail !== undefined) updateFields.adminUpdatedEmail = adminUpdatedEmail;
        if (phone !== undefined) updateFields.phone = phone;
        if (address !== undefined) updateFields.address = address;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ statusCode: 400, message: "No valid fields to update" });
        }

        // Attempt to update the document
        let updatedUser = await Content.findOneAndUpdate(
            {},
            updateFields,
            { new: true }
        );

        // If no document was found, create one
        if (!updatedUser) {
            updatedUser = new Content(updateFields);
            await updatedUser.save();
        }

        return res.status(200).json({ message: "Content updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "Could not update the content" });
    }
};



module.exports = {
    adminSignup,
    adminLogin,
    updateUserData
};
