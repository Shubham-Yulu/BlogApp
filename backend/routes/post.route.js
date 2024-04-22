import express from 'express'
import { postController } from '../controllers/index.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router
  .get("/", postController.getPosts)
  .get("/:id", postController.getPost)
  .post("/", upload.single('image'), postController.createPost)
  .delete("/:id", postController.deletePost)

export default router
