import { Request, response, Response } from "express";
import db from "../database/connection";


export default class UsersController {
    async index(request: Request, response: Response) {
        try {
            const users = await db("users");


            return response.json(users);
        }
        catch(error) {
            return response.json(error);
        }
      }

    async create(request: Request, response: Response) {
        try {
            const { name, avatar, whatsapp, bio } = request.body;
            await db('users').insert({ name, avatar, whatsapp, bio })
            return response.status(201).send();
        }
        catch(error) {
            return response.json(error);
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { name, avatar, whatsapp, bio } = request.body;
            const { id } = request.params; 
            await db('users')
            .update({name, avatar, whatsapp, bio})
            .where({ id })

            return response.status(201).send();
        }
        catch(error) {
            return response.json(error);
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;
            await db('users')
            .where({ id })
            .del()

            return response.status(201).send();
        }
        catch(error) {
            return response.json(error);
        }
    }
}