import { MongoClient, Db, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

dotenv.config();

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster-nextjs-shop.lwz4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-nextJs-shop`;
  // console.log("URI > ", uri);

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db("db-shop-nextjs");

  return { client, db: client.db("db-shop-nextjs") };
}
