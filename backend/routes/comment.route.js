import express from 'express'
import { commentController } from '../controllers/index.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import authorizeRoles  from '../middlewares/authorizeRoles.js';
const router = express.Router();

router
  .post("/", authenticateToken, authorizeRoles('user', 'admin'), commentController.createComment)
  .patch("/:id", authenticateToken, commentController.updateComment)
  .delete("/:id", authenticateToken, authorizeRoles('user', 'admin'), commentController.deleteComment)

export default router