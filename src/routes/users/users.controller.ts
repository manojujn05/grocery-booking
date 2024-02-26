import { Request, Response } from 'express';
import { Register, Login } from '../../models/user.model';

async function login(req: Request, res: Response): Promise<Response> {
  try {
    const launches = await Login(req, res);
    return res.status(200).json(launches);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function register(req: Request, res: Response): Promise<Response> {
  try {
    const category = await Register(req, res);
    return res.status(200).json(category);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

export {
  login,
  register,
};
