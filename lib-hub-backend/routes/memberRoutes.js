import express from "express"
import { getMembers, addMember, deleteMember, updateMember } from "../controllers/memberController.js";

const router = express.Router();

router.get("/members", getMembers);
router.post("/members", addMember);
router.delete("/members/:id", deleteMember);
router.put("/members/:id", updateMember);

export default router