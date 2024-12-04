import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserServicePort } from "../../../../application/port/user.service.port";
import { successResponse } from "../../../../domain/base-reponse";
import type BaseLogger from "../../../../common/logger/base-logger";
import { BadRequestError } from "../../../../common/errors/http-error";
import type { IUserController } from "./user.controller.interface";
import type { UserListQuery } from "./dto/user-list-query";

class UserController implements IUserController {
  constructor(
    private readonly userService: UserServicePort,
    private readonly logger: BaseLogger,
  ) {}

  async getUserListWithPaginate(req: FastifyRequest, res: FastifyReply) {
    const query = req.query as UserListQuery;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = query.sortBy || "createdAt";
    const sortType = query.sortType === "asc" ? "asc" : "desc";

    const response = await this.userService.getUserListWithPaginate({
      page,
      limit,
      sortBy,
      sortType,
    });

    res.status(200).send(successResponse(response));
  }

  async getUserDetailsById(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };

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
