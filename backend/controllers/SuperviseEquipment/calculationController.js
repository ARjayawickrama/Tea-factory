const Calculation = require('../../model/SuperviseEquipment/Calculation');


// POST: Create and save a new calculation
exports.calculateTotal = async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body
  const { workingHours, sparyar, howMany } = req.body;

  let calculatedTotal = parseFloat(workingHours) || 0;

  if (sparyar === 'Yes' && howMany) {
    calculatedTotal += parseFloat(howMany) || 0;
  }

  const newCalculation = new Calculation({
    workingHours,
    sparyar,
    howMany,
    totalAmount: calculatedTotal,
  });

  try {
    const savedCalculation = await newCalculation.save();
    console.log('Saved calculation:', savedCalculation); // Log saved calculation
    res.status(201).json(savedCalculation);
  } catch (error) {
    console.error('Error saving calculation:', error); // Log any errors
    res.status(500).json({ message: 'Failed to save calculation: ' + error.message });
  }
};

// GET: Retrieve all calculations
exports.getAllCalculations = async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.status(200).json(calculations);
  } catch (error) {
    console.error('Failed to retrieve calculations:', error);
    res.status(500).json({ message: 'Failed to retrieve calculations: ' + error.message });
  }
};
