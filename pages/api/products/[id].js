import fs from "fs";
import path from "path";
import connectToDB from "@/utils/db";

export default function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "GET": {
      const dbPath = path.join(process.cwd(), "db", "db.json");
      const data = fs.readFileSync(dbPath);

      const parsedData = JSON.parse(data);

      const isProduct = parsedData.products.find(
        (product) => product.id == req.query.id,
      );

      if (isProduct) {
        res.status(202).json({
          message: "Product details successfully found :))",
          detailsProduct: isProduct,
        });
      } else {
        res.json({ message: "No information found :((" });
      }

      break;
    }
  }
}
