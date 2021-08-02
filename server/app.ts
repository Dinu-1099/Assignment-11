import express, { Application, Request, response, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import { pool } from "./dbConn";
import cors from 'cors';

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
            return console.error("Error Executing query", err.stack);
        }
        console.log("Connected to DB !!");
    });
});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/users', (req: Request, res: Response) => {
    pool
        .query(
            "select u.sno,u.userid,u.name,u.email,u.contact,u.address,c.name as Customer_name,c.website ,c.address as customer_address,r.rolename as Role,u.createdon,u.modifiedon from users u Join customers c on u.userid=c.userid join role r on r.key=cast(substr(u.userid,5,1)as int) order by u.sno;"
        )
        .then((userData) => {
            res.send(userData.rows);
        });
})
app.get('/users/:sno',(req:Request,res:Response)=>{
    const {sno}=req.params;    
    pool.query("select u.sno,u.userid,u.name,u.email,u.contact,u.address,c.name as Customer_name,c.website ,c.address as customer_address,r.rolename as Role,u.createdon,u.modifiedon from users u Join customers c on u.userid=c.userid join role r on r.key=cast(substr(u.userid,5,1)as int) where u.sno=$1 order by u.sno;",[sno])
    .then((userData)=>{        
        res.send(userData.rows);
    })
})

app.put('/users/:sno',async (req:Request,res:Response)=>{
    const datestr = `${new Date().toLocaleString()}`;
    const {sno}=req.params;
    const { name, email, contact,address, customer_name, website, customer_address} = req.body;
    const updateUser=await pool.query("Update users set name=$1, email =$2, contact=$3, address=$4, modifiedon=$5 where sno=$6",[name,email,contact,address,datestr,sno]);
    const updatecustomer= await pool.query("Update customers set name=$1, website=$2, address=$3 where customerid=$4",[customer_name,website,customer_address,sno]);
    res.json('Succesfully Updated');
})

app.delete('/users/:sno',async(req,res)=>{
    const {sno}=req.params;
    const deleteuser=await pool.query("Delete  From users where sno=$1",[sno]);
    const deletecustomer=await pool.query("Delete From customers where customerid=$1",[sno]);
})
app.get("/", (req: Request, res: Response) => {
    res.send('Server page')
});

app.listen(3000, () => {
    console.log("Server running");
});