const asyncHandler = require("express-async-handler");
const Section = require("../models/sectionModel");

// Get all sections
// GET /api/section
// Private
const getAllSections = asyncHandler(async (req, res) => {
  const allSections = await Section.findAll();
  res.status(200).json(allSections);
});

// Create an section
// POST /api/section
// Private
const createSection = asyncHandler(async (req, res) => {
  // Check the content exists
  if (!req.body.sectionName) {
    res.status(400);
    throw new Error("Content required");
  }

  // Create the section
  const section = await Section.create({
    sectionName: req.body.sectionName,
  });
  res.status(201).json(section);
});

// Update an section
// PUT /api/section/{uuid}
// Private
const updateSection = asyncHandler(async (req, res) => {
  const section = await Section.findByPk(req.params.uuid);

  // Check the section exists
  if (!section) {
    throw new Error("There is no such section");
  }

  // Update the section
  section.set(req.body);
  await section.save();
  res.status(200).json(section);
});

// Delete an section
// DELETE /api/section/{uuid}
// Private
const deleteSection = asyncHandler(async (req, res) => {
  const section = await Section.findByPk(req.params.uuid);

  // Check the section exists
  if (!section) {
    throw new Error("There is no such section");
  }

  // Delete section
  await section.destroy();
  res.status(200).json({ uuid: req.params.uuid });
});

module.exports = {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
};
