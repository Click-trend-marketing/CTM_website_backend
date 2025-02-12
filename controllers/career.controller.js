const Career = require('../models/career.model');

// Add a new career entry

const addCareerData = async (req, res) => {
    try {
        const { position, experience, requirements, vacancy } = req.body;

        // Validate required fields
        if (!position || !experience || !requirements || !vacancy) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required" });
        }
        // Create a new career entry
        const newCareer = new Career({
            position,
            experience,
            requirements,
            vacancy
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
        const { careerId } = req.params; 
        const updateFields = {};
        const { position, experience, requirements, location, vacancy } = req.body;

        if (!careerId) {
            return res.status(400).json({ statusCode: 400, message: "Career ID is required" });
        }

        // Populate the fields to update if they are provided
        if (position !== undefined) updateFields.position = position;
        if (experience !== undefined) updateFields.experience = experience;
        if (requirements !== undefined) updateFields.requirements = requirements;
        if (location !== undefined) updateFields.location = location;
        if (vacancy !== undefined) updateFields.vacancy = vacancy;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ statusCode: 400, message: "No valid fields to update" });
        }

        // Attempt to update the document by careerId
        let updatedCareer = await Career.findOneAndUpdate(
            { _id: careerId }, 
            updateFields,
            { new: true } 
        );

        // If no document was found, return a not found error
        if (!updatedCareer) {
            return res.status(404).json({ statusCode: 404, message: "Career data not found" });
        }

        return res.status(200).json({ message: "Career data updated successfully", updatedCareer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal server error", error });
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


module.exports = {
    getCareerData,
    updateCareerData,
    addCareerData,
    getCareerDataById,
    deleteCareerById,
};
