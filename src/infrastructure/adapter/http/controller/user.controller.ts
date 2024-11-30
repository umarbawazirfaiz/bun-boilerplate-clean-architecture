import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserServicePort } from "../../../../application/port/user.service.port";
import type { ListUserRequest } from "../../../../domain/list-user-request";
import type { ListUserResponse } from "../../../../domain/list-user-reponse";
import { successResponse } from "../../../../domain/base-reponse";

export const UserController = (
    userService: UserServicePort
) => {
    const findAll = async (req: FastifyRequest, res: FastifyReply) => {
        const request: ListUserRequest = {}
        const response: ListUserResponse = await userService.listUser(request);

        res.status(200).send(successResponse(response));
    }

    return { findAll }
}