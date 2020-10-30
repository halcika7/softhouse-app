import mongoose from 'mongoose';

export const connect = async MONGO_URI => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.info('Database connected', 'create-db-connection');
  } catch (err) {
    console.error(err, 'create-db-connection');
  }
};
