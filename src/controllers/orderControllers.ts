import { Request,Response,NextFunction } from "express";
import {TshirtModel,insertAllTshirt,tshirtUpdateOne,readAllData,deleteByIdData,readDataByid,userReadTshirt } from "../modules/TshirtSchema";
import { ordercreate,orderModel,updateStatus,userReadOrder,adminReadAllData } from "../modules/orderSchema";
import * as TshirtSchema from "../modules/TshirtSchema"
import {userModel} from "../modules/userSchema";
import { ObjectId } from "mongodb";
import { ErrorCodes } from "../modules/models";

export const orderCreate= async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
  ) => {
    try {
        let payload:any=req.body
        let result=await ordercreate(payload)
        let id=result.orderId
        let r1:any=await TshirtModel.find({_id:id})
        let r2:any=r1[0].stock-1
        await TshirtModel.updateOne({_id:id},{stock:r2})
        if (result) {
            req.apiStatus = {
              isSuccess: true,
              error: ErrorCodes[1003],
              data: result,
            };
            next();
            return
          } else {
            req.apiStatus = {
              isSuccess: false,
              error: ErrorCodes[1003],
              data: "",
            };
            next()
            return
          }
    } catch (error) {
        req.apiStatus = {
            isSuccess: false,
            error: ErrorCodes[1003],
            data: "",
          };
          next()
          return
    }
  }
export const updatestatus=async(
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
)=>{
    try {
        let id=req.params.id
    let result=await updateStatus({'_id':new ObjectId(id)},{$set:{
        status:req.body.status
        }}) 
        if (result) {
            req.apiStatus = {
              isSuccess: true,
              error: ErrorCodes[1003],
              data: result,
            };
            next();
            return
          } else {
            req.apiStatus = {
              isSuccess: false,
              error: [1003],
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
    
}
export const readUserOrder=async(
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
)=>{
    try {
        let userid=req.params.id
        console.log(userid);
        
        let result=await userReadOrder({userId:userid});
        
        if (result) {
            req.apiStatus = {
              isSuccess: true,
              error: ErrorCodes[1003],
              data: result,
            };
            next();
            return
          } else {
            req.apiStatus = {
              isSuccess: false,
              error: [1003],
              data: "",
            };
            next()
            return
          }
    } catch (error) {
        req.apiStatus = {
            isSuccess: false,
            error: ErrorCodes[1003],
            data: "",
          };
          next()
          return
    }
}

export const adminCheckOrder=async(
    req: Request | any,
    res: Response | any,
    next: NextFunction | any
)=>{
    try {
        let result=await adminReadAllData(
            // [
            //     {
            //         '$addFields': {
            //             'userIdAsObject': {
            //                 '$toObjectId': '$userId'
            //             }
            //         }
            //     }, {
            //         '$lookup': {
            //             'from': 'usermodels', 
            //             'localField': 'userIdAsObject', 
            //             'foreignField': '_id', 
            //             'as': 'userINfo'
            //         }
            //     }
            // ]
            [
                {
                  /**
                   * newField: The new field name.
                   * expression: The new field expression.
                   */
                  $addFields: {
                    id: {
                      $toObjectId: "$userId",
                    },
                  },
                },
                {
                  /**
                   * from: The target collection.
                   * localField: The local join field.
                   * foreignField: The target join field.
                   * as: The name for the results.
                   * pipeline: Optional pipeline to run on the foreign collection.
                   * let: Optional variables to use in the pipeline field stages.
                   */
                  $lookup: {
                    from: "usermodels",
                    localField: "id",
                    foreignField: "_id",
                    as: "result",
                  },
                },
                {
                  /**
                   * path: Path to the array field.
                   * includeArrayIndex: Optional name for index.
                   * preserveNullAndEmptyArrays: Optional
                   *   toggle to unwind null and empty values.
                   */
                  $unwind: {
                    path: "$result",
                    includeArrayIndex: "string",
                    preserveNullAndEmptyArrays: true,
                  },
                },
              ]
        )
        console.log(result);
        
        if (result) {
            req.apiStatus = {
              isSuccess: true,
              error: ErrorCodes[1003],
              data: result,
            };
            next();
            return
          } else {
            req.apiStatus = {
              isSuccess: false,
              error: [1003],
              data: "",
            };
            next()
            return
          }

    } catch (error) {
        req.apiStatus = {
            isSuccess: false,
            error: ErrorCodes[1003],
            data: "",
          };
          next()
          return
    }
}