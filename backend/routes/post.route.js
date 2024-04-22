import express from 'express'
import { postController } from '../controllers/index.js';
import upload from '../middlewares/upload.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
const router = express.Router();

router
  .get("/", postController.getPosts)
  .get("/:id", postController.getPost)
  .post("/", authenticateToken, authorizeRoles('user'), upload.single('image'), postController.createPost)
  .delete("/:id", authenticateToken, authorizeRoles('user', 'admin'), postController.deletePost)

export default router
