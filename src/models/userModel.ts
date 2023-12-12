import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";

const prisma = new PrismaClient();

export default class UserModel {
  async create({
    name,
    email,
    password,
    fullAddress,
    street,
    city,
    state,
    country,
    lat,
    lng,
  }: IUser) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        fullAddress,
        street,
        city,
        state,
        country,
        lat,
        lng,
      },
    });
    return user;
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return {
      id: user?.id,
      username: user?.name,
      email: user?.email,
      lat: user?.lat,
      lng: user?.lng,
    };
  }
}
