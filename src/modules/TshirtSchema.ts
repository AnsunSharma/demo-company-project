import mongoose, { Document, Schema, Model, model, Mongoose } from "mongoose";
export interface Tshirt {
    name:String,
    avialableSize:[String],
    price:Number,
    validaty:Date,
    stock:Number
}
export interface TshirtModel extends Tshirt, Document { }

export const TshirtSchema: Schema = new Schema(
    {
    name:String,
    avialableSize:[String],
    price:Number,
    validaty:Date,
    stock:Number
    }
);
export const TshirtModel=model<Tshirt>('TshirtModel',TshirtSchema)

export let insertAllTshirt = async(input:any)=>{
    return await TshirtModel.collection.insertMany(input)
  }

  
export let tshirtId=async(input:any)=>{
   return await TshirtModel.findById(input)
}

export let tshirtUpdateOne = async (id:any, update:any, options:any) => {
   return await TshirtModel.updateOne(id, update, options)
}

export let readAllData=async()=>{
    return await TshirtModel.find();
}

export let readDataByid=async(id:any)=>{
    return await TshirtModel.find(id);
}

export let deleteByIdData=async(id:any)=>{
    return await TshirtModel.deleteOne(id)
}

export let userReadTshirt=async(obj:any,payload:any)=>{
    return await TshirtModel.find(obj,payload)
}