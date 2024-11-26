const Career = require('../models/career.model');
const Applicant = require('../models/applicants.model');

// Add a new career entry

const addCareerData = async (req, res) => {
    try {
        const { position, experience, requirements, location } = req.body;

        // Validate required fields
        if (!position || !experience || !requirements || !location) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required" });
        }
        // Create a new career entry
        const newCareer = new Career({
            position,
            experience,
            requirements,
            location
        });
        // Save the new career entry to the database
        const savedCareer = await newCareer.save();
        return res.status(201).json({ message: "New career entry added successfully", savedCareer });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "Could not add the career data" });
    }
};

// Admin update Career Data

const updateCareerData = async (req, res) => {
    try {
        const updateFields = {};
        const { position, experience, requirements, location } = req.body;

        if (position !== undefined) updateFields.position = position;
        if (experience !== undefined) updateFields.experience = experience;
        if (requirements !== undefined) updateFields.requirements = requirements;
        if (location !== undefined) updateFields.location = location;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ statusCode: 400, message: "No valid fields to update" });
        }
        // Attempt to update the document
        let updatedUser = await Career.findOneAndUpdate(
            {},
            updateFields,
            { new: true }
        );
        // If no document was found, create one
        if (!updatedUser) {
            updatedUser = new Career(updateFields);
            await updatedUser.save();
        }
        return res.status(200).json({ message: "Content updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "Could not update the content" });
    }
};

// Admin get Career Data

const getCareerData = async (req, res) => {
    try {
        const career = await Career.find();
        if (!career) {
            return res.status(400).json({ statusCode: 400, message: "No content found" });
        }
        return res.status(200).json({ message: "Career data retrieved successfully", career });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "Could not retrieve the career data" });
    }
};


// Admin get Career Data By Id




const getCareerDataById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    try {
        const career = await Career.findById(id); 
        if (!career) {
            return res.status(404).json({ statusCode: 404, message: "Career data not found" });
        }
        return res.status(200).json({message: "Career data retrieved successfully", career});
    } catch (error) {
        console.error(error);
        return res.status(400).json({statusCode: 400, message: "Could not retrieve the career data"});
    }
};

// Delete Career Data By Id

const deleteCareerById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    try {
        const career = await Career.findByIdAndDelete(id); 
        if (!career) {
            return res.status(400).json({ statusCode: 404, message: "Career data not found" });
        }
        return res.status(200).json({message: "Career data deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(400).json({statusCode: 400, message: "Could not delete the career data"});
    }
};

const applyForJob = async (req, res) => {
    try {
        const { jobId, name, email } = req.body;

        // Validate required fields
        if (!jobId || !name || !email || !req.file) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required, including the resume file." });
        }

        // Check if the job exists
        const job = await Career.findById(jobId);
        if (!job) {
            return res.status(404).json({ statusCode: 404, message: "Job not found" });
        }

        // Create a new application entry
        const newApplication = new Applicant({
            jobId,
            name,
            email,
            resume: req.file.path, // Save the file path of the uploaded resume
        });

        // Save the application to the database
        const savedApplication = await newApplication.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            application: savedApplication,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: error.message || "An error occurred while submitting the application" });
    }
};


module.exports = {
    getCareerData,
    updateCareerData,
    addCareerData,
    getCareerDataById,
    deleteCareerById,
    applyForJob
};
