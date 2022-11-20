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
  const { user, title, text, completed } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userCreatedNotes = await User.findOne({ id }).lean().exec();
  const noteObject = { user: userCreatedNotes, title, text, completed };
  // Create and store new user
  const note = await Note.create(noteObject);

  if (note) {
    //created
    res.status(201).json({ message: `New note ${title} created` });
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
