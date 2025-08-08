import express from "express"
import {getRoot, createProduct, getProducts, updateProduct, deleteProduct} from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", getRoot)
router.post("/", createProduct)
router.get("/", getProducts)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router
