import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // Desired job role
  skills: { type: [String], required: true },
  interests: { type: [String], required: true },
  workExperience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      description: { type: String }
    }
  ],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: Number, required: true }
    }
  ]
});

export default mongoose.model("User", UserSchema);
