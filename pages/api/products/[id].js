import fs from "fs";
import path from "path";
import connectToDB from "@/utils/db";

export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "PUT": {

      const { id } = req.query;
      const { name, category, price, description, icon, available } = req.body;

      const updatedProduct = await productsModal.findOneAndUpdate(
        { _id: id },
        {
          name,
          category,
          price,
          description,
          icon,
          available,
        },
        { new: true }
      );

      if (updatedProduct) {
        res.json({ message: "Product updated successfully", product: updatedProduct });
      } else {
        res.json({ message: "There was a problem editing the product." });
      }
      break;
    }
  }
}
