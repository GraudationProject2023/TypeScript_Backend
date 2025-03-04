import express from "express";
import { MemberController } from "../controllers/member.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();
const memberController = new MemberController();

router.post("/members/register", memberController.register);
router.post("/members/loginJWT", memberController.loginJWT);
router.post("/members/logout", verifyToken, memberController.logout);
router.get("/members/tripInfo", verifyToken, memberController.getMemberTrip);
router.get(
  "/members/tripList",
  verifyToken,
  memberController.getMemberTripList
);
router.post("/members/exit", verifyToken, memberController.exitMember);
router.post("/members/verify/pw", verifyToken, memberController.verifyPw);
router.post("/members/change/pw", verifyToken, memberController.changePw);
router.post("/members/change/types", verifyToken, memberController.changeTypes);

export default router;
