import { Error, NextFunction, Request, Response } from "express";

export type ExpressFnParamsFull = (
  err: Error, req: Request, res: Response, next: NextFunction
) => void;

export type ExpressFnParams = (
  req: Request, res: Response, next: NextFunction
) => void;
