import bcrypt from "bcryptjs";
import { MemberModel } from "../models/member.model";
import { MemberRegisterDto, CredentialDto } from "../dtos/member.dto";

export class MemberService {
  private memberModel: MemberModel;

  constructor() {
    this.memberModel = new MemberModel();
  }

  async register(memberRegister: MemberRegisterDto) {
    const { email, password, name } = memberRegister;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.memberModel.createMember(email, hashedPassword, name);
  }

  async login(credential: CredentialDto) {
    const { email, password } = credential;
    const member = await this.memberModel.findByEmail(email);
    if (!member) throw new Error("회원이 존재하지 않습니다.");

    const isValidPassword = await bcrypt.compare(password, member.password);
    if (!isValidPassword) throw new Error("비밀번호가 일치하지 않습니다.");

    return member;
  }

  async findByEmail(email: string) {
    return this.memberModel.findByEmail(email);
  }

  async findPw(email: string, pw: string) {
    const member = await this.memberModel.findByEmail(email);
    if (!member) return false;
    return await bcrypt.compare(pw, member.password);
  }

  async findTrip(member: any, sortType: string, page: number) {
    return this.memberModel.getTripsByMemberId(member.id, sortType, page);
  }

  async exit(member: any) {
    return this.memberModel.deleteMember(member.id);
  }

  async changePw(member: any, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.memberModel.updatePassword(member.id, hashedPassword);
  }

  async changeTypes(member: any, types: string[]) {
    return this.memberModel.updateTypes(member.id, types);
  }
}
