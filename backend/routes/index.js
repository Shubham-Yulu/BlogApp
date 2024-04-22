import express from "express";
import  userRoute from "./user.route.js";
import  authRoute from "./auth.route.js";
import  postRoute from "./post.route.js";
import  commentRoute from "./comment.route.js";


const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/post",
    route: postRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  }
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
