const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validate } = require('./tourModel');
const crypto = require('crypto');

// Create a schema for the user model   name email photo password passwordConfirm

const userSchema = new mongoose.Schema({
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

  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    required: [
      true,
      'A user must have a role such as user, guide, lead-guide, admin',
    ],
    default: 'user',
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
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypt the password before saving the user
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// Create an instance method for the user schema
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//userschema methods
userSchema.methods.changedPasswordAfter = function (JWTTiestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTiestamp < changedTimestamp;
  }

  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Create a model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
