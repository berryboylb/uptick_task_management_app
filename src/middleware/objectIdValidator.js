// objectIdValidator.js
const mongoose = require("mongoose");

function validateObjectId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId, id must be a mongodb id" });
  }

  next();
}

module.exports = validateObjectId;
