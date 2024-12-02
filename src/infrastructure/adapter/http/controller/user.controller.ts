import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserServicePort } from "../../../../application/port/user.service.port";
import type { ListUserRequest } from "../../../../domain/list-user-request";
import type { ListUserResponse } from "../../../../domain/list-user-reponse";
import { successResponse } from "../../../../domain/base-reponse";
import type BaseLogger from "../../../../common/logger/base-logger";
import { BadRequestError } from "../../../../common/errors/http-error";
import type { IUserController } from "./user.controller.interface";

class UserController implements IUserController {
  constructor(
    private readonly userService: UserServicePort,
    private readonly logger: BaseLogger
  ) {}

  async findAll(req: FastifyRequest, res: FastifyReply) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortType = (req.query.sortType as string) === "asc" ? "asc" : "desc";

    const response: ListUserResponse = await this.userService.listUser({
      page,
      limit,
      sortBy,
      sortType,
    });

    res.status(200).send(successResponse(response));
  }

  async getById(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string }; // Access path variable

    if (id == "23") {
      throw new BadRequestError();
    }

    // Respond with the user ID
    return { userId: id };
  }

  createUser(req: FastifyRequest, res: FastifyReply): void {
    throw new Error("Method not implemented.");
  }

  updateUser(req: FastifyRequest, res: FastifyReply): void {
    throw new Error("Method not implemented.");
  }

  deleteUser(req: FastifyRequest, res: FastifyReply): void {
    throw new Error("Method not implemented.");
  }
}

export default UserController;
