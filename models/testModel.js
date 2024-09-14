const mongoose = require('mongoose');
const express = require('express');
const validator = require('validator');

const testSchema = new mongoose.Schema({
  test: {
    type: String,
    required: [true, 'A test must have a name'],
  },
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: [true, 'userName must be unique'],
    trim: true,
    // maxlength: [30, 'A tour name must have less or equal than 40 characters'],
    // minlength: [8, 'A tour name must have more or equal than 10 characters'],

    // validate: [validator.isAlpha, 'Tour name must only contain characters'],
  },

  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'Email has already used'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },

  //TODO role is not working
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    required: [true, 'A user must have a role such as user, guide, lead-guide, admin'],
    // default: 'user',
  },

  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Password must be more or equal than 8 characters'],
    select: false,
    //   validate:[validator.isStrongPassword,'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Password must be more or equal than 8 characters'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: {
    type: Date,
    // unique: true,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
