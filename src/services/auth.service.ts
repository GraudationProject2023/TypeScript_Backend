import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  createToken(email: string) {
    return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  async logout(token: string) {
    console.log(`❌ 로그아웃된 토큰: ${token}`);
  }
}
