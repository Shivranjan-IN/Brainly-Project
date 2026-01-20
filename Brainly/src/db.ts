import mongoose , { model, Schema, Types } from "mongoose";

mongoose.connect("mongodb+srv://Admin:ojIPK1D5awxeU19c@cluster0.cu0co.mongodb.net/Brain")



const UserSchema = new Schema({

    username: { type: String, unique: true, },
    password : String
})

export const UserModel =  model( "User" , UserSchema);



const contentSchema = new Schema({
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  title:String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }, 
});

const LinkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User', },
});


export const LinkModel = model("Links" , LinkSchema);
 


    export const ContentModel = model("Content", contentSchema );

