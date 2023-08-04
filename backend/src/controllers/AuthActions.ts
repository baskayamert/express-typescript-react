import { Request, Response } from 'express';
import { authenticateUser } from '../auth/auth.service';
import { userSaveAction } from './UserActions';

export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  authenticateUser(username, password)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(401).json({ message: error.message });
    });
}

export async function register(req: Request, res: Response){
  await userSaveAction(req, res);
}