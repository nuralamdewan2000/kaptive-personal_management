const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  if (
    req.headers.authorization?.split(" ")[0] === "Bearer" &&
    req.headers.authorization?.split(" ")[1]
  ) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decoded) throw "Unauthorized - You're not authorized!";
      
      const userFound = await prisma.user.findUnique({
        where: {
          id: decoded.userID,
        },
      });
      req.userId = userFound.id;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error });
    }
  } else {
    res
      .status(401)
      .json({ error: "Invalid bearer token! OR Access token missing!" });
  }
};

module.exports = auth;
