const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');

// @desc Get all notes
// @routes GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: 'No notes found' });
  }

  // Add username to each note before sending the response
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

// @desc Create new notes
// @routes POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate note title' });
  }

  // Create and store new note
  const note = await Note.create({ user, title, text });

  if (note) {
    //created
    res.status(201).json({ message: 'New note created' });
  } else {
    res.status(400).json({ message: 'Invalid note data received' });
  }
});

// @desc Update a notes
// @routes PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {});

// @desc Delete a notes
// @routes DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
