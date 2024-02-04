const mongoose = require('mongoose');
// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Systtem');
// }
const AdminSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  password: { type: String, required: true },
});

const AdminModel = new mongoose.model('AdminModel', AdminSchema);
//user
const UserSchema = new mongoose.Schema({
  userid: Number,
  password: String,
});

const UserModel = new mongoose.model('UserModel', UserSchema);

const UserCSchema = new mongoose.Schema({
  username: String,
  profile: String,
});
UserCSchema.index({ username: 1, profile: 1 }, { unique: true });
const UserCModel = new mongoose.model('UserCModel', UserCSchema);

module.exports = { AdminModel, UserModel, UserCModel };
