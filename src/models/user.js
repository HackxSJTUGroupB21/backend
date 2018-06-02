import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  passwordHash: String,
  token: String,
  type: String, // 用户类型
  avatarUrl: String, // 头像地址
});

const User = mongoose.model('user', UserSchema);

export default User;
