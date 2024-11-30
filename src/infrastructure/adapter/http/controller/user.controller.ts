import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserServicePort } from "../../../../application/port/user.service.port";

export const UserController = (
    userService: UserServicePort
) => {

    const findAll = async (req: FastifyRequest, res: FastifyReply) => {

    }

    return { findAll }
    
}