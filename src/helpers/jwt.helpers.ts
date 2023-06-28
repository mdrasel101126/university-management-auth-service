import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  sectret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, sectret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, sectret: Secret): JwtPayload => {
  return jwt.verify(token, sectret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
