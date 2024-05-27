const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res
      .status(201)
      .json({ message: "Successfully created new category", category });
  } catch (error) {
    console.error("Error creating the category");
    console.error(error);
    res.status(400).json({ error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const userId = req.userId;

    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
    });

    if (categories.length == 0) throw "You haven't given any categories yet!";

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching all categories");
    console.error(error);
    res.status(400).json({ error });
  }
};

const getCategoryWithId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) throw "Category was not found!";

    res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category");
    console.error(error);
    res.status(400).json({ error });
  }
};

const updateCategoryWithId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.userId;
    const payload = req.body;

    const category = await prisma.category.upsert({
      where: {
        id: categoryId,
        userId,
      },
      update: {
        ...payload,
      },
      create: {
        ...payload,
        userId,
      },
    });

    res
      .status(200)
      .json({ message: "Category successfully updated!", category });
  } catch (error) {
    console.error("Error updating the category");
    console.error(error);
    res.status(400).json({ error });
  }
};

const deleteCategoryWithId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.userId;

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId,
      },
    });

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    console.error("Error while deleting the category");
    console.error(error);
    res.status(400).json({ error });
  }
};

const categoryWiseExpenseTracking = async (req, res) => {
  try {
    const userId = req.userId;
    const categoryName = req.params.category;

    const categoryTransaction = await prisma.category.findMany({
      where: {
        name: categoryName,
        userId,
      },
      include: {
        transactions: true, 
      },
    });

    if (categoryTransaction.length === 0)
      throw "You haven't created this category yet!";

    res.status(200).json({ transactions: categoryTransaction });
  } catch (error) {
    console.error("Error while fetching category wise expenses");
    console.error(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryWithId,
  updateCategoryWithId,
  deleteCategoryWithId,
  categoryWiseExpenseTracking,
};
