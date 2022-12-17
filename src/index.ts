import express,{Request,Response} from "express";
import { router } from "../src/routes/router";
import{connects}from "../src/modules/db";
const app =express();
const PORT=4000
connects()
app.use(express.json());

 app.use('/',router)



app.listen(PORT,()=>{
    console.log("port is running in",PORT);
    
})