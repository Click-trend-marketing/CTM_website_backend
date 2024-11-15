const UserModel = require("../models/users.model");
const Content = require('../models/content.model');
const sendMail = require("../middleware/mail");

const createForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // // Validation
        // if (!name || !email || !message) {
        //     return res.status(400).json({ message: "All fields are required", statusCode: 400 });
        // }

        // Save form data in database
        const form = new UserModel({ name, email, subject, message, role: 'user' });
        const savedForm = await form.save();

        // Email setup
        const companyEmail = 'support@clicktrendmarketing.com';
        const mailSubject = `New Contact Form Submission from ${name}`;
        const mailBody = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;
        // Send email
        await sendMail(companyEmail, mailSubject, mailBody);

        res.status(201).json({ message: "Form submitted! We'll get back to you soon." });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "An error occurred while processing the form" });
    }
};


const getUserData = async (req, res) => {
    try {
        const user = await Content.findOne();

        if (!user) {
            return res.status(404).json({ statusCode: 404, message: "No content found" });
        }

        return res.status(200).json({ message: "Content retrieved successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "Could not retrieve the content" });
    }
};


module.exports = {
    createForm,
    getUserData
};
