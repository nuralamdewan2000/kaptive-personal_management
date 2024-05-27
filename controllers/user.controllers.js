const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// giving the algorithm and secretKey for encryption and decryption of passwords
const algorithm = "aes-256-ctr";
const secretKey = crypto
  .createHash("sha256")
  .update(String(process.env.SECRET_KEY))
  .digest("base64")
  .substring(0, 32);

// function to encrypt password
const encrypt = (password) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

// function to decrypt password
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

// controller to register new users
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw "Please provide all the relevant registration data!";

    await prisma.user.create({
      data: {
        name,
        email,
        password: JSON.stringify(encrypt(password)),
      },
    });

    res.status(201).json({ message: "You've been registered successfully!" });
  } catch (error) {
    console.error("Error registering a new user");
    console.error(error);
    res.status(400).json({ error });
  }
};

// controller to login the existing users
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound)
      throw "Sorry! We couldn't find your registration. Kindly register first.";

    const decryptedPassword = decrypt(JSON.parse(userFound.password));
    if (decryptedPassword !== password) throw "Invalid password!";

    const accessToken = jwt.sign({ userID: userFound.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1day",
    });

    res
      .status(200)
      .json({ message: "User successfully logged in!", accessToken });
  } catch (error) {
    console.error("Error while user login");
    console.error(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  login,
  register,
};
