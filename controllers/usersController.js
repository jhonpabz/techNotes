const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @routes GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {});

// @desc Create new users
// @routes POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {});

// @desc Update a users
// @routes PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

// @desc Delete a users
// @routes DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
