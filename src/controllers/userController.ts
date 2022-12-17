import express, { Request, Response, NextFunction } from "express";
import { userModel, insertAllUsers } from "../modules/userSchema";
import * as userSchema from "../modules/userSchema"
import * as logger from "../modules/logs"
import { ErrorCodes } from "../modules/models";



export const userAdd = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  try {
    
    let result = await insertAllUsers(req.body);
    if (result) {
      req.apiStatus = {
        isSuccess: true,
        error: 200,
        data: result,
      };
    } else {
      req.apiStatus = {
        isSuccess: false,
        error: 500,
        data: "",
      };
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
