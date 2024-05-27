const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getExpenseOrIncomeReport = async (req, res) => {
  try {
    const userId = req.userId;
    const type = req.params.type;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type,
      },
    });

    if (transactions.length === 0)
      throw "You haven't made any transactions yet!";

    transactionTypeReport = transactions;

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error while fetching transactions for report");
    console.log(error);
    res.status(400).json({ error });
  }
};

const getCategoryReport = async (req, res) => {
  try {
    const userId = req.userId;
    const categoryName = req.params.category;

    const categoryFound = await prisma.category.findFirst({
      where: {
        name: categoryName,
        userId,
      },
    });

    if (!categoryFound) throw "You haven't created this category yet!";

    const transactionsFound = await prisma.transaction.findMany({
      where: {
        categoryId: categoryFound.id,
        userId,
      },
    });

    if (transactionsFound.length === 0)
      throw "You've haven't made any transactions in this category yet!";

    const transactions = transactionsFound.reduce((acc, item) => {
      return [
        ...acc,
        {
          category: categoryName,
          type: item.type,
          amount: item.amount,
          date: item.date,
          description: item.description,
        },
      ];
    }, []);

    transactionCategoryReport = transactions;

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error while fetching transactions for report");
    console.error(error);
    res.status(400).json({ error });
  }
};

const getAllMonthlyReport = async (req, res) => {
  try {
    const userId = req.userId;
    const {type, categoryName} = req.body;

    const transactionTypeReport = await prisma.transaction.findMany({
      where: {
        userId,
        type,
      },
    });

    if (transactionTypeReport.length === 0)
      throw "You haven't made any transactions yet!";

    const categoryFound = await prisma.category.findFirst({
      where: {
        name: categoryName,
        userId,
      },
    });

    if (!categoryFound) throw "You haven't created this category yet!";

    const transactionsFound = await prisma.transaction.findMany({
      where: {
        categoryId: categoryFound.id,
        userId,
      },
    });

    if (transactionsFound.length === 0)
      throw "You've haven't made any transactions in this category yet!";

    const transactionCategoryReport = transactionsFound.reduce((acc, item) => {
      return [
        ...acc,
        {
          category: categoryName,
          type: item.type,
          amount: item.amount,
          date: item.date,
          description: item.description,
        },
      ];
    }, []);

    res
      .status(200)
      .json({ report: { transactionTypeReport, transactionCategoryReport } });
  } catch (error) {
    console.error("Error fetching monthly report");
    console.error(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getExpenseOrIncomeReport,
  getCategoryReport,
  getAllMonthlyReport,
};
