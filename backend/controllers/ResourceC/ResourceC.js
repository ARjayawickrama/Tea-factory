const Resource = require('../../model/ResourceM/ResourceM');

// Get all resources
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        if (resources.length === 0) {
            return res.status(404).json({ message: "No resources found." });
        }
        return res.status(200).json({ resources });
    } catch (err) {
        console.error("Error retrieving resources:", err);
        return res.status(500).json({ message: "Failed to retrieve resources." });
    }
};

// Get resource by ID
const getResourceById = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        return res.status(200).json({ resource });
    } catch (err) {
        console.error("Error retrieving resource by ID:", err);
        return res.status(500).json({ message: "Failed to retrieve resource." });
    }
};

// Add a new resource
const addResource = async (req, res) => {
    const { machineName, machineID, Area, isEnabled } = req.body;
    const image = req.file ? req.file.path : ''; // Save image path if provided

    if (!machineName || !machineID || !Area || isEnabled === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newResource = new Resource({
            machineName,
            machineID,
            image, // Save the image path
            Area,
            isEnabled: isEnabled === 'true', // Convert string to boolean
        });
        await newResource.save();
        return res.status(201).json({ newResource });
    } catch (err) {
        console.error("Error adding resource:", err);
        return res.status(500).json({ message: "Failed to add resource." });
    }
};

// Update an existing resource
const updateResource = async (req, res) => {
    const { id } = req.params;
    const { machineName, machineID, Area, isEnabled } = req.body;
    const image = req.file ? req.file.path : undefined; // Only update image if provided

    if (!machineName || !machineID || !Area || isEnabled === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const updateData = { machineName, machineID, Area, isEnabled: isEnabled === 'true' };
        if (image) updateData.image = image; // Only update the image if a new one is uploaded

        const updatedResource = await Resource.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        return res.status(200).json({ resource: updatedResource });
    } catch (err) {
        console.error("Error updating resource:", err);
        return res.status(500).json({ message: "Failed to update resource." });
    }
};

// Delete a resource
const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource.findByIdAndDelete(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        return res.status(200).json({ message: "Resource deleted successfully." });
    } catch (err) {
        console.error("Error deleting resource:", err);
        return res.status(500).json({ message: "Failed to delete resource." });
    }
};

module.exports = {
    getResources,
    getResourceById,
    addResource,
    updateResource,
    deleteResource,
};
