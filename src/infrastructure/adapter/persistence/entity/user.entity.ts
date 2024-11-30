import mongoose, { Schema, model } from "mongoose";

export interface UserEntity extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
}

const userEntitySchema = new Schema<UserEntity>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    created_by: {
      type: String,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    updated_by: {
      type: String,
    },
  },
  { collection: "users" }
);

export const UserEntityModel = model<UserEntity>(
  "UserEntity",
  userEntitySchema
);
