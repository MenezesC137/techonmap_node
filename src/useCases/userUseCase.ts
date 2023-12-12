import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";

const prisma = new PrismaClient();

const userModel = new UserModel();

const generateToken = (payload: any) => {
  return jwt.sign(payload, "secret", {
    expiresIn: "1h",
  });
};

export default class UserUseCase {
  async register({
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
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      fullAddress,
      street,
      city,
      state,
      country,
      lat,
      lng,
    });
    return {
      user,
      token: generateToken({ id: user.id }),
    };
  }

  async currentUser(id: number) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
