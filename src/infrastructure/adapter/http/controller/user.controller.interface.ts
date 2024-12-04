import type { FastifyReply, FastifyRequest } from "fastify";

export interface IUserController {
  getUserListWithPaginate(req: FastifyRequest, res: FastifyReply): void;
  getUserDetailsById(req: FastifyRequest, res: FastifyReply): void;
  createUser(req: FastifyRequest, res: FastifyReply): void;
  updateUser(req: FastifyRequest, res: FastifyReply): void;
  deleteUser(req: FastifyRequest, res: FastifyReply): void;
}
