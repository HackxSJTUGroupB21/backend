import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  passwordHash: String,
  token: String,
  type: String, // 用户类型
  keyword: String,
});

const User = mongoose.model('user', UserSchema);

export default User;
