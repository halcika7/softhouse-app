import { JWTService } from '../service/JWT.mjs';

export async function authMiddleware(req, res, next) {
  const jwt = JWTService;
  const authorization = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized request.' });
  }

  try {
    const verifyRefresh = await jwt.verifyToken(authorization, false);

    req.id = verifyRefresh.id;
  } catch {
    return res.status(401).json({ message: 'Unauthorized request.' });
  }

  return next();
}
