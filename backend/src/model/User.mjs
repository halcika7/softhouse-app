import mongoose from 'mongoose';
import { Environment } from '../config/index.mjs';

const { img } = Environment;

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
      default: img,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: '',
    },
    hasPassword: {
      type: Boolean,
      default: true,
    },
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    previousPasswords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model('User', userSchema);
