const User = require("../models/signupModel");


exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ totalExpense: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
