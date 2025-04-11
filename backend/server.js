const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let HeartRate;
let PulseRate;
let EcgValue;
let BloodPressure;
let Temperature;
let SpO2;
let RespiratoryRate;

async function run() {
  try {
    await client.connect();
    const db = client.db("BioSync");

    HeartRate = db.collection("HeartRate");

    PulseRate = db.collection("PulseRate");

    EcgValue = db.collection("EcgValue");

    BloodPressure = db.collection("BloodPressure");

    Temperature = db.collection("Temperature");

    SpO2 = db.collection("SpO2");

    RespiratoryRate = db.collection("RespiratoryRate");

    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

//HEARTRATE
app.post("/api/get/heartrate", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await HeartRate.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/heartrate:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//PULSERATE
app.post("/api/get/pulserate", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await PulseRate.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/pulserate:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//ECGVALUE
app.post("/api/get/ecgvalue", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await EcgValue.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/ecgvalue:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//BLOODPRESSURE
app.post("/api/get/bloodpressure", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await BloodPressure.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/ecgvalue:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//TEMPERATURE
app.post("/api/get/temperature", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await Temperature.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/temperature:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//SPO2
app.post("/api/get/spo2", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await SpO2.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/spo2:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

//RESPIRATORYRATE
app.post("/api/get/respiratoryrate", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await RespiratoryRate.find({ username }).toArray();

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /api/get/respiratoryrate:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
