import { Router } from "express";

import { verifyToken } from "../middlewares/user.js";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from "../controllers/list.js";

const router = Router();

router.post("/", [verifyToken], create);
router.get("/", [verifyToken], findAll);
router.get("/:id", [verifyToken], findOne);
router.put("/:id", [verifyToken], update);
router.delete("/:id", [verifyToken], remove);

export default router;
