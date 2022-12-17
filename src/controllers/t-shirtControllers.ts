import { Request,Response,NextFunction } from "express";
import {TshirtModel,insertAllTshirt,tshirtUpdateOne,readAllData,deleteByIdData,readDataByid,userReadTshirt } from "../modules/TshirtSchema";
import { ordercreate } from "../modules/orderSchema";
import * as TshirtSchema from "../modules/TshirtSchema"
import {userModel} from "../modules/userSchema";
import { ObjectId } from "mongodb";
import { ErrorCodes } from "../modules/models";

//Admin should be able to add t-shirt details like name, type, avialable-size, price, avialable-till, stock.
export const tshirtAdd = async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
  ) => {
    try {
      
      let result = await insertAllTshirt(req.body);
      console.log("result",result);
      //throw new Error("testing");
      
      
      if (result) {
        req.apiStatus = {
          isSuccess: true,
          error: 200,
          data: result,
        };
        next();
        return
      } else {
        req.apiStatus = {
          isSuccess: false,
          error: 500,
          data: "",
        };
        next()
        return
      }
      
    } catch (error) {
        req.apiStatus = {
            isSuccess: false,
            error: 500,
            data: "",
          };
          next()
          return
    }
  };

  export const updateTshirt = async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
  ) => {
    let body = req.body;
    console.log("body",body);
    
    try {
      
    let result:any=await tshirtUpdateOne ({_id:req.params.id},body,{new:true,useFindAndModify:false,runValidators:true})
      
      if (result) {
        req.apiStatus = {
          isSuccess: true,
          data: result,
        };
        next();
        return
      } else {
        req.apiStatus = {
          isSuccess: false,
          error: ErrorCodes[1007],
          data: "",
        };
        next()
        return
      }
      
    } catch (error) {
        req.apiStatus = {
            isSuccess: false,
            error:ErrorCodes[1003] ,
            data: "",
          };
          next()
          return
    }
  };


export const findAlldata=async (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) =>{
  try {
    let result:any=await readAllData()
    if (result) {
      req.apiStatus = {
        isSuccess: true,
        data: result,
      };
      next();
      return
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error:ErrorCodes[1003] ,
      data: "",
    };
    next()
    return
  }
}

export const deleteIdData=async( req: Request | any,
  res: Response | any,
  next: NextFunction | any)=>{
    let id=req.params.id
    try {
      let result=await deleteByIdData({_id:id})
      if(result){
        req.apiStatus={
          isSuccess:true,
          data:"data deleted"

        }
        next()
        return
      }
    } catch (error) {
      req.apiStatus={
        isSuccess:false,
        error:ErrorCodes[1005],
        data:" "
      }
      next()
      return
    }
  }
 
  export const findDataByid=async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
  ) =>{
    let id=req.params.id
    try {
      let result:any=await readDataByid({_id:id})
      if (result) {
        req.apiStatus = {
          isSuccess: true,
          data: result,
        };
        next();
        return
      }
    } catch (error) {
      req.apiStatus = {
        isSuccess: false,
        error:ErrorCodes[1003] ,
        data: "",
      };
      next()
      return
    }
  }


  export const findAllTshirt=async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
  ) =>{
    try {
      let result:any=await userReadTshirt({},req.body)
      if (result) {
        req.apiStatus = {
          isSuccess: true,
          data: result,
        };
        next();
        return
      }
    } catch (error) {
      req.apiStatus = {
        isSuccess: false,
        error:ErrorCodes[1003] ,
        data: "",
      };
      next()
      return
    }
  }

  