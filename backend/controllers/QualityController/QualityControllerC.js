const Tea = require('../../model/QualityControllerM/QualityControllerM');


const addTea = async (req, res) => {
    const { typeOfTea, teaGrade, flavor, date, color, note } = req.body;

    try {
        const newTea = new Tea({
            typeOfTea,
            teaGrade,
            flavor,
            date,
            color,
            note,
        });

        await newTea.save();
        return res.status(201).json({ message: 'Tea entry added successfully.', tea: newTea });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to add tea entry.' });
    }
};


const getTeas = async (req, res) => {
    try {
        const teas = await Tea.find();
        return res.status(200).json(teas);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve tea entries.' });
    }
};


const getTeaById = async (req, res) => {
    const { id } = req.params;

    try {
        const tea = await Tea.findById(id);
        if (!tea) {
            return res.status(404).json({ message: 'Tea entry not found.' });
        }
        return res.status(200).json(tea);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve tea entry.' });
    }
};


const updateTea = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const tea = await Tea.findByIdAndUpdate(id, updates, { new: true });
        if (!tea) {
            return res.status(404).json({ message: 'Tea entry not found.' });
        }
        return res.status(200).json({ message: 'Tea entry updated successfully.', tea });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update tea entry.' });
    }
};


const deleteTea = async (req, res) => {
    const { id } = req.params;

    try {
        const tea = await Tea.findByIdAndDelete(id);
        if (!tea) {
            return res.status(404).json({ message: 'Tea entry not found.' });
        }
        return res.status(200).json({ message: 'Tea entry deleted successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete tea entry.' });
    }
};

module.exports = {
    addTea,
    getTeas,
    getTeaById,
    updateTea,
    deleteTea,
};
