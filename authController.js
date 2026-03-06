import db from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{

 const {name,email,password} = req.body

 const hashed = await bcrypt.hash(password,10)

 const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)"

 db.query(sql,[name,email,hashed],(err,result)=>{

 if(err){
  return res.status(500).json(err)
 }

 res.json({message:"User registered"})
 })

}

export const login = (req,res)=>{

 const {email,password} = req.body

 const sql = "SELECT * FROM users WHERE email=?"

 db.query(sql,[email],async(err,result)=>{

 if(result.length===0){
  return res.status(404).json({message:"User not found"})
 }

 const user = result[0]

 const match = await bcrypt.compare(password,user.password)

 if(!match){
  return res.status(401).json({message:"Wrong password"})
 }

 const token = jwt.sign(
  {id:user.id,email:user.email},
  process.env.JWT_SECRET,
  {expiresIn:"1d"}
 )

 res.json({token})

 })

}