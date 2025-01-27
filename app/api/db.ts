import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectToDb() {
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster-nextjs-shop.lwz4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-nextJs-shop`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
  } finally {
    await client.close();
  }
}
