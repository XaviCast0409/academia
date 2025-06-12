import db from "../../config/database";
import { ProductInput, ProductOutput } from "../../models/Product";

export const getProduct = async (id: number): Promise<ProductOutput> => {
  const product = await db.Product.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
    ],
  });
  return product;
};

export const getProductsByProfessor = async (
  professorId: number
): Promise<ProductOutput[]> => {
  const products = await db.Product.findAll({
    where: { professorId },
    include: [
      {
        model: db.User,
        as: "professor",
        attributes: ["id", "name"],
      },
    ],
  });
  return products;
};

export const createProduct = async (
  productData: ProductInput
): Promise<ProductOutput> => {
  const product = await db.Product.create(productData);
  return product;
};

export const updateProduct = async (
  id: number,
  productData: Partial<ProductInput>
): Promise<ProductOutput> => {
  const product = await db.Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.update(productData);
  return product;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const product = await db.Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.destroy();
};

export const getAllProducts = async (page: number = 1, professorId?: number): Promise<any> => {
  try {
    const limit = 20;
    const offset = (page - 1) * limit;

    const whereCondition: any = {};
    if (professorId) {
      whereCondition.professorId = professorId;
    }

    const { rows: products, count: total } = await db.Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [["id", "ASC"]],
      include: [
        {
          model: db.User,
          as: "professor",
          attributes: ["id", "name", "email", "roleId"],
        },
      ],
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
