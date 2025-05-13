import mongoose from 'mongoose';

export const user = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  logHistory: { type: Date, default: Date.now }, // use function, not Date.now()
  mode: { type: String, default: "light" }         // wrap in quotes
});

