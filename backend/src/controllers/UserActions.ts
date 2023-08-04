import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";


export async function userGetAllAction(request: Request, response: Response) {

    
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    response.status(200).json(users);
}

export async function userGetByIdAction(request: Request, response: Response) {

    if(request.params.id === null) {
        response.status(400).json();
        return;
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: request.params.id } });

    if (!user) {
        response.status(400).json();
        return;
    }
    response.status(200).json(user);
}

export async function userSaveAction(request: Request, response: Response) {
    const {username, password, role } = request.body;

    if(!username) {
        response.status(400).json({message: "Username cannot be empty"});
        return;
    }
    if(!password) {
        response.status(400).json({message: "Password cannot be empty"});
        return;
    }
    if(!role) {
        response.status(400).json({message: "Role cannot be empty"});
        return;
    }

    const userRepository = AppDataSource.getRepository(User);

    const newuser = userRepository.create(request.body);

    await userRepository.save(newuser);

    response.status(201).json(newuser);
}

export async function userUpdateAction(request: Request, response: Response) {

    const {username, password, role } = request.body;

    if(!username) {
        response.status(400).json({message: "Username cannot be empty"});
        return;
    }
    if(!password) {
        response.status(400).json({message: "Password cannot be empty"});
        return;
    }
    if(!role) {
        response.status(400).json({message: "Role cannot be empty"});
        return;
    }

    const userRepository = AppDataSource.getRepository(User);

    await userRepository.update(request.body.id, request.body);


    response.status(201).json();
}

export async function userDeleteAction(request: Request, response: Response) {

    if(request.params.id === null) {
        response.status(400).json();
        return;
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
        await userRepository.delete(request.params.id);
        response.status(204).json()    
    } catch (error) {
        response.status(400).json(error);
    }
}