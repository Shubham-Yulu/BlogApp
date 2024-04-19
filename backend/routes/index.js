import express from "express";
import  userRoute from "./user.route.js";
import  authRoute from "./auth.route.js";


const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  }
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
