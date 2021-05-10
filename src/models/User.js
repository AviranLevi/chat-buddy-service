
import mongoose from 'mongoose';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { isEmail } from 'validator';

const Schema = mongoose.Schema;
const currentDate = moment().format('MMM Do YYYY');

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, `User name is required`],
  },
  name: {
    type: String,
    required: [true, `User name is required`],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Email is invalid'],
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  profileImage: {
    url: { type: String },
    cloudID: { type: String },
    name: { type: String },
  },
  socialMedia: {
    type: [String],
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (err, passHash) => {
    if (err) return next(err);
    this.password = passHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

export default mongoose.model('User', UserSchema);