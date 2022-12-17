import mongoose, { Document, Schema, Model, model, Mongoose } from "mongoose";
import { userModel } from "./userSchema";
export interface order {
    orderId:String,
    userId:String,
    status:String,
}
export interface orderModel extends order, Document { }

export const orderSchema: Schema = new Schema(
    {
     orderId:String,
     userId:String,
     status:String,
    }
);
export const orderModel=model<order>('orderModel',orderSchema)
export let ordercreate=async(payload:any)=>{
    return await orderModel.create(payload)
}
export let userReadStatus=async(obj:any,payload:any)=>{
    return await orderModel.find(obj,payload)
}
export let updateStatus=async(obj:any,payload:any)=>{
    return await orderModel.updateOne(obj,payload)
}
export let userReadOrder=async(obj:any)=>{
    return await orderModel.find(obj)
}
export let adminReadAllData=async(query:any)=>{
    return await orderModel.aggregate(query)
}
