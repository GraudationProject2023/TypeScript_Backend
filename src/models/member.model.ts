import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MemberModel {
  async createMember(email: string, password: string, name: string) {
    return prisma.member.create({
      data: { email, password, name },
    });
  }

  async findByEmail(email: string) {
    return prisma.member.findUnique({ where: { email } });
  }

  async deleteMember(id: number) {
    return prisma.member.delete({ where: { id } });
  }

  async updatePassword(id: number, newPassword: string) {
    return prisma.member.update({
      where: { id },
      data: { password: newPassword },
    });
  }

  async updateTypes(id: number, types: string[]) {
    return prisma.member.update({
      where: { id },
      data: { types },
    });
  }

  async getTripsByMemberId(memberId: number, sortType: string, page: number) {
    return prisma.trip.findMany({
      where: { memberId },
      orderBy: { createdAt: sortType === "desc" ? "desc" : "asc" },
      skip: page * 5,
      take: 5,
    });
  }
}
