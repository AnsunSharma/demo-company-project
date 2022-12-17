import mongoose, { Document, Schema, Model, model, Mongoose } from "mongoose";
export interface user {
    userName:String,
    role:String,
}
export interface userModel extends user, Document { }

export const UserSchema: Schema = new Schema(
    {
       userName:String,
       role:String
    }
);
export const userModel=model<user>('userModel',UserSchema)

export let insertAllUsers = async(input:any)=>{
  return await userModel.collection.insertMany([input])
}

