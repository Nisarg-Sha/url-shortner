import express from "express";
import { connectToMongoDB } from "./connect";
import urlRoute from "./routes/url";
import URL from "./models/url";

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb+srv://<your_username>:<password>@cluster0.2i2bbcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));