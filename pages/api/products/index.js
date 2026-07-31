import fs from "fs";
import path from "path";
export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const dbPath = path.join(process.cwd(), "db", "db.json");
      const data = fs.readFileSync(dbPath);

      const parsedData = JSON.parse(data);

      res.json(parsedData);
      break;
    }
  }
}
