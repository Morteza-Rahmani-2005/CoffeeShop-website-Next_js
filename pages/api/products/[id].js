import productsModal from "@/models/products"
import connectToDB from "@/utils/db";
import { isValidObjectId } from "mongoose";
import fs from "fs";
import path from "path";
import formidable from "formidable";


export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "PUT": {
      try {
        const { id } = req.query;

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

        console.log("UPDATE DATA:", {
          id,
          name,
          category,
          price,
          description,
          icon,
          available,
        });

        const oldProduct = await productsModal.findById(id);

        if (!oldProduct) {
          return res.status(404).json({
            message: "Product not found",
          });
        }

     
        let image = oldProduct.image || "";

       
        if (files.image?.[0]) {
          const imageFile = files.image[0];

          image = `/uploads/products/${path.basename(
            imageFile.filepath
          )}`;

          console.log("NEW IMAGE:", image);
        }

  
        const updatedProduct = await productsModal.findOneAndUpdate(
          { _id: id },
          {
            name,
            category,
            price,
            description,
            icon,
            available,
            image,
          },
          {
            new: true,
          }
        );

        console.log("UPDATED PRODUCT:", updatedProduct);

        if (!updatedProduct) {
          return res.status(400).json({
            message: "There was a problem editing the product.",
          });
        }

        return res.status(200).json({
          message: "Product updated successfully",
          product: updatedProduct,
        });
      } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        console.error("ERROR MESSAGE:", error?.message);
        console.error("ERROR STACK:", error?.stack);

        return res.status(500).json({
          message: "Failed to update product",
          error: error?.message,
        });
      }
    }
    case "DELETE": {
      const { id } = req.query
      console.log(id)


      if (isValidObjectId) {
        const deletedProduct = await productsModal.findOneAndDelete({ _id: id });

        if (deletedProduct) {
          console.log("Product removed successfully :))")
          res.json({ message: "Product removed successfully :))" })
        }
      }
    }
  }
}


