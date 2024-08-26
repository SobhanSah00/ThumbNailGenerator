import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    messageContent: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
    
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
