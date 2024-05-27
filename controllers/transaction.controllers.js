const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const { category, type, amount, description } = req.body;

    let categoryFound = await prisma.category.findFirst({
      where: {
        name: category,
        userId,
      },
    });

    if (!categoryFound) {
      categoryFound = await prisma.category.create({
        data: {
          name: category,
          userId,
        },
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        categoryId: categoryFound.id,
        type,
        amount,
        description,
      },
    });

    res
      .status(201)
      .json({ message: "Successfully created new transaction", transaction });
  } catch (error) {
    console.error("Error creating new transaction");
    console.error(error);
    res.status(400).json({ error });
  }
};

const readTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    if (transactions.length == 0) throw "You haven't made any transactions yet!";

    res
      .status(200)
      .json({ message: "Found all the transactions", transactions });
  } catch (error) {
    console.error("Error reading transaction");
    console.error(error);
    res.status(400).json({ error });
  }
};

const readTransactionById = async (req, res) => {
  try {
    const userId = req.userId;
    const transactionId = req.params.id;

    const transactionFound = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transactionFound) throw "Transaction not found!";

    res.status(200).json({ transaction: transactionFound });
  } catch (error) {
    console.error("Error fetching transaction");
    console.error(error);
    res.status(400).json({ error }); 
  }
};

const updateTransactionById = async (req, res) => {
  try {
    const userId = req.userId;
    const transactionId = req.params.id;
    const { category, type, amount, description } = req.body;

    let categoryFound = await prisma.category.findFirst({
      where: {
        name: category,
        userId,
      },
    });

    if (!categoryFound) {
      categoryFound = await prisma.category.create({
        data: {
          name: category,
          userId,
        },
      });
    }

    const transaction = await prisma.transaction.upsert({
      where: {
        id: transactionId,
        userId,
      },
      update: {
        categoryId: categoryFound.id,
        type,
        amount,
        description,
      },
      create: {
        userId,
        categoryId: categoryFound.id,
        type,
        amount,
        description,
      },
    });

    res
      .status(200)
      .json({ message: "Transaction updated successfully!", transaction });
  } catch (error) {
    console.error("Error updating transaction");
    console.error(error);
    res.status(400).json({ error });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const userId = req.userId;
    const transactionId = req.params.id;

    await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    console.error("Error deleting transaction");
    console.error(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  createTransaction,
  readTransaction,
  readTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
