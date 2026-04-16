import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  const bearerToken = token.split(" ")[1];

  if (!token || bearerToken.lenth === 0) {
    return res.status(401).json({
      msg: "unauthorised",
    });
  }

  try {
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error, "middleware error");
    res.status(401).json({
      msg: "invalid or expired token",
    });
  }
};
