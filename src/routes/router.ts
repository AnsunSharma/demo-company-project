import express from "express";
import { userAdd } from "../controllers/userController";
import { orderCreate, updatestatus,readUserOrder,adminCheckOrder } from "../controllers/orderControllers";
import { tshirtAdd,updateTshirt,findAlldata,deleteIdData,findDataByid,findAllTshirt } from "../controllers/t-shirtControllers";
import { exitPoint } from "../middleware/exitpoint";
import { checkUser,checkUser1 } from "../middleware/admincheck";
let router = express.Router();
router.post(
    '/useradd',
    userAdd,
    exitPoint)

router.post(
 '/addTshirt',
checkUser,
tshirtAdd,
exitPoint)

router.get(
    '/readAllTshirt',checkUser,findAlldata,exitPoint
)
router.get('/readDataByid/:id',checkUser,findDataByid,exitPoint)
router.put('/updateTshirt/:id',checkUser,updateTshirt,exitPoint)
router.delete('/deleteTshirt/:id',checkUser,deleteIdData,exitPoint)
router.get('/userReadTshirt',checkUser1,findAllTshirt,exitPoint)
router.post('/orderCreate',checkUser1,orderCreate,exitPoint)
router.put('/updateStatus/:id',checkUser,updatestatus,exitPoint)
router.get('/readUserOrder/:id',checkUser1,readUserOrder,exitPoint)
router.get('/adminReadData',checkUser,adminCheckOrder,exitPoint)
export{
    router
}
