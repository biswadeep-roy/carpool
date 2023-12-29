
const Carpool = require('../models/carpool');

exports.createCarpool = async (req, res) => {
  try {
    const carpool = new Carpool(req.body);
    await carpool.save();
    res.json({ success: true, message: 'Carpool entry saved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
