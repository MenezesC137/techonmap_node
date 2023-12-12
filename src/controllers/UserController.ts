import { Response, Request } from "express";
import UserUseCase from "../useCases/userUseCase";

const userUseCase = new UserUseCase();

export default class UserController {
  async register(request: Request, response: Response) {
    const {
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
    } = request.body;

    const user = await userUseCase.register({
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
    });

    return response.status(201).json(user);
  }

  async currentUser(req: any, res: Response) {
    const currentUserId = req.currentUserId;
    const currentUser = await userUseCase.currentUser(currentUserId);
    return res.status(200).json(currentUser);
  }
}
