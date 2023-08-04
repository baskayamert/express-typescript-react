import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { Role, User } from '../entity/User';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';

export class AuthSuccess{
  token: string;
  role: Role;
}

export async function authenticateUser(username: string, password: string): Promise<AuthSuccess> {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({where:{username:username}});

  if (!user) {
    throw new Error('Invalid username or password');
  }

  // const isPasswordValid = await compare(password, user.password);
  const isPasswordValid = password === user.password ? true : false;

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiration });

  return {token: token, ...user};
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = verify(token, config.jwtSecret) as { userId: string, role: Role };
    req.userId = decoded.userId; // Store the decoded user ID in the request object
    req.role = decoded.role;
  } catch (err) {
    return res.sendStatus(403);
  }
}

interface AuthenticatedRequest extends Request {
  userId?: string;
  role: Role;
}

export function restrictToRole(role: Role) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.role; // Assuming the user role is stored in the "role" property of the authenticated user

    if (userRole !== role) {
      return res.status(403).json({ message: 'Access denied.' });
    }
  };
};

