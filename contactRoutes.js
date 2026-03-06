import express from "express"

import authMiddleware from "../middleware/authMiddleware.js"

import {
createContact,
getContacts,
updateContact,
deleteContact,
searchContact
} from "../controllers/contactController.js"

const router = express.Router()

router.post("/",authMiddleware,createContact)

router.get("/",authMiddleware,getContacts)

router.put("/:id",authMiddleware,updateContact)

router.delete("/:id",authMiddleware,deleteContact)

router.get("/search",authMiddleware,searchContact)

export default router