import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getAllServices } from "./handlers/getAllServices.js";
import { getAService } from "./handlers/getAService.js";
import { postAService } from "./handlers/postAService.js";
import { updateAService } from "./handlers/updateAService.js";
import { deleteAService } from "./handlers/deleteAService.js";
import { resetDatabase } from "./handlers/resetDatabase.js";
import { getAllOrders } from "./handlers/getAllOrders.js";
import { postAnOrder } from "./handlers/postAnOrder.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("\n------  Connected to MongoDB  ------\n");

    const db = client.db("petServices");
    const serviceCollection = db.collection("serviceCollection");
    const orderCollection = db.collection("orderCollection");

    // services
    app.get("/services", getAllServices(serviceCollection));
    app.get("/services/:id", getAService(serviceCollection));
    app.post("/services", postAService(serviceCollection));
    app.put("/update/:id", updateAService(serviceCollection));
    app.delete("/services/:id", deleteAService(serviceCollection));

    // reset database
    if (process.env.NODE_ENV !== "production") {
      app.post("/reset", resetDatabase(serviceCollection, orderCollection));
    }

    // orders
    app.get("/orders", getAllOrders(orderCollection));
    app.post("/orders", postAnOrder(orderCollection));
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Its alive on: ${port}`);
});
