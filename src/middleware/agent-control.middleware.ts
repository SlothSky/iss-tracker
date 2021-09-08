import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function AgentControlMiddleware(req: Request, res: Response, next: NextFunction) {
  // Currently not used (TODO: some authentication??)
  next();
}
