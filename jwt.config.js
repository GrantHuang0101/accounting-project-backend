import dotenv from "dotenv";
dotenv.config();

export const JwtConfig = {
  secretKey: () => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    return process.env.JWT_SECRET;
  },
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
};
