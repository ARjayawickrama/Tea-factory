const Supervise = require('../../model/SuperviseEquipment/SuperviseEquipmentM');

async function addSupervise(req, res) {
    try {
        const { name, MachineId, date, Area, Note, MachineStatus } = req.body;

     
        if (!name || !MachineId || !date || !Area || !Note || !MachineStatus) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

    
        const newSupervise = new Supervise({
            name,
            MachineId,
            date, 
            Area,
            Note,
            MachineStatus 
        });

   
        await newSupervise.save();
        res.status(201).json(newSupervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getSupervise(req, res) {
    try {
        const supervises = await Supervise.find();
        res.json(supervises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;

        const supervise = await Supervise.findById(superviseId);
        if (!supervise) {
            return res.status(404).json({ message: "Supervise item not found" });
        }

        res.json(supervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;
        const updatedData = req.body;

        const updatedSupervise = await Supervise.findByIdAndUpdate(superviseId, updatedData, { new: true });
        if (!updatedSupervise) {
            return res.status(404).json({ message: 'Supervise item not found' });
        }

        res.json(updatedSupervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;

        const deletedSupervise = await Supervise.findByIdAndDelete(superviseId);
        if (!deletedSupervise) {
            return res.status(404).json({ message: "Supervise item not found" });
        }

        res.json({ message: "Supervise item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function toggleBookmark(req, res) {
    try {
        const { id } = req.params;

   
        const superviseItem = await Supervise.findById(id);
        if (!superviseItem) {
            return res.status(404).json({ message: "Supervise item not found" });
        }

       
        superviseItem.bookmarked = !superviseItem.bookmarked;
        await superviseItem.save();

        res.json(superviseItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addSupervise,
    getSupervise,
    getSuperviseById,
    updateSuperviseById,
    deleteSuperviseById,
    toggleBookmark,
};
