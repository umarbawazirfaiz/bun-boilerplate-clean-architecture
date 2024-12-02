import type { FastifyReply, FastifyRequest } from "fastify";

export interface IUserController {
    findAll(req: FastifyRequest, res: FastifyReply): void
    getById(req: FastifyRequest, res: FastifyReply): void
    createUser(req: FastifyRequest, res: FastifyReply): void
    updateUser(req: FastifyRequest, res: FastifyReply): void
    deleteUser(req: FastifyRequest, res: FastifyReply): void
}