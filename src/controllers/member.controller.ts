import { Request, Response } from "express";
import { MemberService } from "../services/member.service";
import { AuthService } from "../services/auth.service";

export class MemberController {
  private memberService: MemberService;
  private authService: AuthService;

  constructor() {
    this.memberService = new MemberService();
    this.authService = new AuthService();
  }

  async register(req: any, res: any) {
    try {
      const member = await this.memberService.register(req.body);
      res.json({ result: true });
    } catch (error) {
      res.status(500).json({ message: "회원 가입 실패", error });
    }
  }

  async loginJWT(req: any, res: any) {
    try {
      const member = await this.memberService.login(req.body);
      const token = this.authService.createToken(member.email);
      res.json({ ...member, token });
    } catch (error) {
      res.status(401).json({ message: "로그인 실패", error });
    }
  }

  async logout(req: any, res: any) {
    try {
      await this.authService.logout(req.body.token);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "로그아웃 실패", error });
    }
  }

  async getMemberTrip(req: any, res: any) {
    try {
      const member = await this.memberService.findByEmail(req.user.email);
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "회원 트립 정보 조회 실패", error });
    }
  }

  async getMemberTripList(req: any, res: any) {
    try {
      const { page, sortType } = req.query;
      const trips = await this.memberService.findTrip(
        req.user,
        sortType as string,
        Number(page)
      );
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: "회원 여행 리스트 조회 실패", error });
    }
  }

  async exitMember(req: any, res: any) {
    try {
      const { pw } = req.body;
      const member = await this.memberService.findByEmail(req.user.email);

      if (await this.memberService.findPw(member.email, pw)) {
        await this.memberService.exit(member);
        return res.json({ result: true });
      }

      return res.json({ result: false });
    } catch (error) {
      res.status(500).json({ message: "회원 탈퇴 실패", error });
    }
  }

  async verifyPw(req: any, res: any) {
    try {
      const { pw } = req.body;
      const member = await this.memberService.findByEmail(req.user.email);

      if (await this.memberService.findPw(member.email, pw)) {
        return res.json({ result: true });
      }
      return res.json({ result: false });
    } catch (error) {
      res.status(500).json({ message: "비밀번호 검증 실패", error });
    }
  }

  async changePw(req: any, res: any) {
    try {
      const { pw } = req.body;
      const member = await this.memberService.findByEmail(req.user.email);
      await this.memberService.changePw(member, pw);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "비밀번호 변경 실패", error });
    }
  }

  async changeTypes(req: any, res: any) {
    try {
      const { types } = req.body;
      const member = await this.memberService.findByEmail(req.user.email);
      await this.memberService.changeTypes(member, types);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "회원 타입 변경 실패", error });
    }
  }
}
