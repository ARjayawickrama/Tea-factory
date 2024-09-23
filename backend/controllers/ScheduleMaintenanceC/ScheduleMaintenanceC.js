const ScheduleMaintenance = require('../../model/ScheduleMaintenanceM/ScheduleMaintenanceM');

async function addSchedule(req, res) {
    try {
        const { name, MachineId, Area, Condition, LastDate, NextDate, Note } = req.body;
        
        if (!name || !MachineId || !Area || !Condition || !LastDate || !NextDate || !Note) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newSchedule = new ScheduleMaintenance({
            name,
            MachineId,
            Area,
            Condition,
            LastDate,
            NextDate,
            Note,
        });

        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSchedules(req, res) {
    try {
        const schedules = await ScheduleMaintenance.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getScheduleById(req, res) {
    try {
        const scheduleId = req.params.id;
        const schedule = await ScheduleMaintenance.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule item not found" });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateScheduleById(req, res) {
    try {
        const scheduleId = req.params.id;
        const updatedData = req.body;
        const updatedSchedule = await ScheduleMaintenance.findByIdAndUpdate(scheduleId, updatedData, { new: true });
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule item not found' });
        }
        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function deleteScheduleById(req, res) {
    try {
        const scheduleId = req.params.id;
        const deletedSchedule = await ScheduleMaintenance.findByIdAndDelete(scheduleId);
        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule item not found" });
        }
        res.json({ message: "Schedule item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addSchedule,
    getSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById
};
