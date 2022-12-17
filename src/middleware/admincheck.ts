import express, { Request, Response, NextFunction } from 'express';
import {userModel} from "../modules/userSchema";
import { ObjectId } from "mongodb";

async function checkUser(req: Request, res: Response, next: NextFunction) {

    let id:any=req.headers
    let id2:any=id.authorization
    let id3:any=id2.split(" ")
   
    let id4:any=id3[1]

    try {
         let result = await userModel.findById(id4)
       
         let r1:any=result?.role

        
        
       if (r1==="admin") {
        next()
        }else{
            res.send("not allowed")
        }
      
        
        
    } catch (error) {
      console.log(error);
         
    }
    

}

async function checkUser1(req: Request, res: Response, next: NextFunction) {

    let id:any=req.headers
    let id2:any=id.authorization
    let id3:any=id2.split(" ")
   
    let id4:any=id3[1]

    try {
         let result = await userModel.findById(id4)
       
         let r1:any=result?.role

        
        
       if (r1==="user") {
        next()
        }else{
            res.send("not allowed")
        }
      
        
        
    } catch (error) {
      console.log(error);
         
    }
    

    

}
export{
    checkUser,checkUser1
}