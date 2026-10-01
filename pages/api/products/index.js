import formidable from "formidable";
import fs from "fs";
import path from "path";

import productsModal from "@/models/products";
import connectToDB from "@/utils/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectToDB();

  switch (req.method) {
    // =========================
    // GET
    // =========================
    case "GET": {
      try {
        const products = await productsModal.find({});

        return res.status(200).json({
          message: "Products successfully found :))",
          products,
        });
      } catch (error) {
        console.log("GET PRODUCTS ERROR:", error);

        return res.status(500).json({
          message: "Failed to fetch products",
        });
      }
    }

    // =========================
    // POST
    // =========================
    case "POST": {
      try {

        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "products"
        );


        fs.mkdirSync(uploadDir, {
          recursive: true,
        });

        const form = formidable({
          uploadDir,
          keepExtensions: true,
          multiples: false,
        });


        const [fields, files] = await form.parse(req);

 
        const name = fields.name?.[0] || "";
        const category = fields.category?.[0] || "";
        const price = Number(fields.price?.[0]) || 0;
        const description = fields.description?.[0] || "";
        const icon = fields.icon?.[0] || "coffee";
        const available = fields.available?.[0] === "true";


        let image = "";

        if (files.image?.[0]) {
          const imageFile = files.image[0];

          image = `/uploads/products/${path.basename(
            imageFile.filepath
          )}`;
        }

        console.log("Product Data:", {
          name,
          category,
          price,
          description,
          icon,
          available,
          image,
        });


        const newProduct = await productsModal.create({
          name,
          category,
          price,
          description,
          icon,
          available,
          image,
        });

        console.log("Created Product:", newProduct);

        return res.status(201).json({
          message: "Product successfully created :))",
          product: newProduct,
        });
      } catch (error) {
        console.log("CREATE PRODUCT ERROR:", error);

        return res.status(500).json({
          message: "Product creation failed :((",
          error: error.message,
        });
      }
    }



    default: {
      return res.status(405).json({
        message: "Method not allowed",
      });
    }
  }
}