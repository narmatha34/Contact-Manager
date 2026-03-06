import db from "../config/db.js"

export const createContact = (req,res)=>{

 const {name,email,phone,notes,tags} = req.body

 const userId = req.user.id

 const sql = `
 INSERT INTO contacts(user_id,name,email,phone,notes,tags)
 VALUES(?,?,?,?,?,?)
 `

 db.query(sql,[userId,name,email,phone,notes,tags],(err,result)=>{

 if(err) return res.status(500).json(err)

 res.json({message:"Contact created"})
 })

}

export const getContacts = (req,res)=>{

 const userId = req.user.id

 db.query(
 "SELECT * FROM contacts WHERE user_id=?",
 [userId],
 (err,result)=>{

 if(err) return res.status(500).json(err)

 res.json(result)

 })

}

export const updateContact = (req,res)=>{

 const id = req.params.id

 const {name,email,phone,notes,tags} = req.body

 const sql = `
 UPDATE contacts
 SET name=?,email=?,phone=?,notes=?,tags=?
 WHERE id=?
 `

 db.query(sql,[name,email,phone,notes,tags,id],(err)=>{

 if(err) return res.status(500).json(err)

 res.json({message:"Contact updated"})
 })

}

export const deleteContact = (req,res)=>{

 const id = req.params.id

 db.query(
  "DELETE FROM contacts WHERE id=?",
  [id],
  (err,result)=>{

   if(err){
    return res.status(500).json(err)
   }

   res.json({
    message:"Contact deleted successfully"
   })

 })
}
export const searchContact = (req,res)=>{

 const userId = req.user.id

 const q = req.query.q

 const sql = `
 SELECT * FROM contacts
 WHERE user_id=? AND
 (name LIKE ? OR email LIKE ? OR tags LIKE ?)
 `

 const search = `%${q}%`

 db.query(sql,[userId,search,search,search],(err,result)=>{

 if(err) return res.status(500).json(err)

 res.json(result)

 })

}