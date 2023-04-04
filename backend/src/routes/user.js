import { Router } from "express";

import {
  checkDuplicateUsernameOrEmail,
  verifyToken,
} from "../middlewares/user.js";
import {
  signup,
  signin,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = Router();

router.post("/signin", signin);
router.post("/", [checkDuplicateUsernameOrEmail], signup);
router.get("/", verifyToken, getUser);
router.put("/", [verifyToken, checkDuplicateUsernameOrEmail], updateUser);
router.delete("/", verifyToken, deleteUser);

export default router;
