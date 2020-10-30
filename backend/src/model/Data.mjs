import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const dataSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Array,
    required: true,
    default: [],
  },
});

export default model('Data', dataSchema);
