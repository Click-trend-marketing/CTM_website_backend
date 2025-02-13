const Applicant = require('../models/applicants.model');
const Career = require('../models/career.model');


const applyForJob = async (req, res) => {
    try {
        const { jobId, name, email } = req.body;

        // Validate required fields
        if (!jobId || !name || !email || !req.file) {
            return res.status(400).json({ statusCode: 400, message: "All fields are required, including the resume file." });
        }

        const job = await Career.findById(jobId);
        if (!job) {
            return res.status(404).json({ statusCode: 404, message: "Job not found", });
        }

        // Generate a public URL for the uploaded resume
        const resumeURL = `${req.protocol}://${req.get('host')}/uploads/resumes/${req.file.filename}`;

        // Create a new application entry
        const newApplication = new Applicant({
            jobId,
            name,
            email,
            resume: resumeURL,
        });

        const savedApplication = await newApplication.save();

        return res.status(201).json({
            statusCode: 201, message: "Application submitted successfully", application: savedApplication,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            statusCode: 400, message: "An error occurred while submitting the application",
        });
    }
};






const getApplicants = async (req, res) => {
    try {
        // Fetch all applicants with their job details using population
        const applicants = await Applicant.find().populate('jobId', 'position experience location').select('name email resume');

        // If no applicants are found
        if (!applicants || applicants.length === 0) { return res.status(404).json({ statusCode: 404, message: "No applicants found.", }) }

        // Respond with the applicants' details
        return res.status(200).json({ statusCode: 200, message: "Applicants retrieved successfully", applicants: applicants });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "An error occurred while fetching applicants" });
    }
};



const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the applicant exists before deletion
        const applicant = await Applicant.findById(id);

        if (!applicant) {
            return res.status(404).json({ statusCode: 404, message: "Applicant not found." });
        }

        // Delete the applicant
        await Applicant.findByIdAndDelete(id);

        return res.status(200).json({ statusCode: 200, message: "Applicant deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ statusCode: 400, message: "An error occurred while deleting the applicant." });
    }
};



module.exports = {
    applyForJob,
    getApplicants,
    deleteApplicant
};
