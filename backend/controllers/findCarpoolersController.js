const Carpool = require('../models/carpool');

exports.findCarpoolers = async (req, res) => {
  try {
    const { startTime, endTime, campus, fromLocation, toLocation } = req.body;

   
    if (endTime <= startTime) {
      return res.status(400).json({ success: false, message: 'End time must be after the start time.' });
    }

    
    const matchingCarpoolers = await Carpool.find({
      startTime: { $gte: startTime },
      endTime: { $lt: endTime },
      campus: campus,
      fromLocation: fromLocation,
      toLocation: toLocation,
    });

    if (matchingCarpoolers.length > 0) {
      return res.json({ success: true, message: 'Carpoolers found!', carpoolers: matchingCarpoolers });
    } else {
      return res.json({ success: false, message: 'No matching carpoolers found. Please try different slots.' });
    }
  } catch (error) {
    console.error('Error finding carpoolers:', error);
    return res.status(500).json({ success: false, error: 'Error finding carpoolers. Please try again.' });
  }
};
