import productsModal from "@/models/products";
import connectToDB from "@/utils/db";

export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "GET": {

      const products = await productsModal.find({});
      console.log("Fetched products from DB:", products);
      if (products) {
        res.status(200).json({ message: "Products successfully found :))", products });
      } else {
        res.status(404).json({ message: "No products found :((" });
      }

    }
    case "POST": {
      const { name, category, price, description, icon, available } = req.body;

      const newProduct = productsModal.create({
        name,
        category,
        price,
        description,
        icon,
        available,
      });


      if (newProduct) {
        res.status(201).json({ message: "Product successfully created :))", newProduct });
      } else {
        res.status(400).json({ message: "Product creation failed :((" });
      }

    }



  }
}
