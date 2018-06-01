import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ConfigSchema = new Schema({
  name: String,
  value: String,
});

const Config = mongoose.model('config', ConfigSchema);

export default Config;
