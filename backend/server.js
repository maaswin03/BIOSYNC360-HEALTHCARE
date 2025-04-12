const { MongoClient, ServerApiVersion } = require("mongodb");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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
let userinfo

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

    userinfo = db.collection("UserInformation");

    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB:", err);
  }
}

run().catch(console.dir);


app.post("/userinfo", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username is required in the request body" });
    }

    const data = await userinfo.find({ username }).toArray();

    if (data && data.length > 0) {
      console.log("Data sent successfully");
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified username." });
    }
  } catch (error) {
    console.error("Error in /ecg_monitoring_data route:", error);
    res
      .status(500)
      .json({ message: "An error occurred", details: error.message });
  }
});


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
// Enhanced SpO2 Suggestions
app.post("/api/spo2_suggestions", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const data = await SpO2.find({ username })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();
    if (!data?.length) {
      return res.status(404).json({ message: "No SpO2 data found for user" });
    }

    const spO2Value = data[0].currSpO2;
    if (typeof spO2Value !== "number") {
      return res.status(400).json({ message: "Invalid SpO2 data" });
    }

    const status =
      spO2Value >= 95
        ? "Normal"
        : spO2Value >= 90
        ? "Mild Hypoxemia"
        : spO2Value >= 85
        ? "Moderate Hypoxemia"
        : "Severe Hypoxemia";

    const prompt = `
        Provide detailed SpO2 recommendations in this structured format:
  
        ## Oxygen Status (${spO2Value}%)
        - Normal Range: 95-100%
        - Classification: ${status}
        - Severity: ${
          spO2Value >= 95
            ? "Normal"
            : spO2Value >= 90
            ? "Mild"
            : spO2Value >= 85
            ? "Moderate"
            : "Severe"
        }
  
        ## Immediate Actions
        ${
          spO2Value < 85
            ? "- Call emergency services immediately\n- Use supplemental oxygen if available\n- Remain calm and limit movement"
            : spO2Value < 90
            ? "- Seek medical attention within 1 hour\n- Sit upright and avoid lying down\n- Use pursed-lip breathing technique"
            : spO2Value < 95
            ? "- Practice diaphragmatic breathing 5-10 minutes\n- Open windows for fresh air\n- Avoid strenuous activity"
            : "- Continue normal activities\n- Maintain good hydration"
        }
  
        ## Daily Management
        ### Hydration
        - Drink ${spO2Value < 95 ? "2.5-3L" : "2-2.5L"} of water daily
        - Limit caffeine and alcohol
        
        ### Activity
        - Exercise: ${
          spO2Value < 85
            ? "Complete rest until evaluated"
            : spO2Value < 90
            ? "Gentle walking 10-15 minutes 2x/day"
            : spO2Value < 95
            ? "Light cardio (walking, swimming)"
            : "Regular cardio (30 mins 5x/week)"
        }
        
        ### Environment
        - Maintain good ventilation
        - Consider air purifier if pollution is high
        - Avoid smoke and strong fumes
  
        ## Warning Signs (Seek Emergency Care)
        - Bluish lips/fingers (cyanosis)
        - Rapid breathing (>30 breaths/min)
        - Chest pain or tightness
        - Confusion/disorientation
        - Inability to complete sentences
  
        ## When to Recheck
        - If symptomatic: Check every 30 minutes
        - Mild reduction: Check 2-3x daily for 2 days
        - Normal range: Weekly checks recommended
      `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text: text.trim() });
  } catch (error) {
    console.error("Error generating SpO2 suggestions:", error);
    res.status(500).json({
      message: "Error generating SpO2 recommendations",
      error: error.message,
    });
  }
});

// Enhanced Temperature Suggestions
app.post("/api/temperature_suggestions", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const data = await Temperature.find({ username })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();
    if (!data?.length) {
      return res.status(404).json({ message: "No temperature data found" });
    }

    const temp = data[0].currTemperature;
    if (typeof temp !== "number") {
      return res.status(400).json({ message: "Invalid temperature data" });
    }

    const status =
      temp < 95
        ? "Severe Hypothermia"
        : temp < 97
        ? "Mild Hypothermia"
        : temp > 103
        ? "High Fever"
        : temp > 101
        ? "Moderate Fever"
        : temp > 99
        ? "Low-Grade Fever"
        : temp < 99
        ? "Normal"
        : "Normal";

    const prompt = `
        Provide comprehensive temperature health advice in this structured format:
  
        ## Temperature Status (${temp}°F)
        - Normal Range: 97-99°F
        - Classification: ${status}
        - Severity: ${
          temp < 95
            ? "Emergency"
            : temp < 97
            ? "Mild"
            : temp > 103
            ? "Emergency"
            : temp > 101
            ? "Moderate"
            : temp > 99
            ? "Mild"
            : "Normal"
        }
  
        ## Immediate Actions
        ${
          temp < 95
            ? "- CALL EMERGENCY SERVICES\n- Remove from cold environment\n- Use warm blankets (cover head)\n- Avoid sudden movement"
            : temp < 97
            ? "- Move to warm environment\n- Layer dry clothing\n- Warm fluids every 15 minutes\n- Gentle movement"
            : temp > 103
            ? "- EMERGENCY CARE NEEDED\n- Cool compress (neck/groin)\n- Lukewarm bath\n- Remove excess clothing"
            : temp > 101
            ? "- Contact doctor today\n- Stay hydrated\n- Antipyretics if approved\n- Light cotton clothing"
            : temp > 99
            ? "- Monitor every 2 hours\n- Increase fluid intake\n- Rest in cool area\n- Avoid strenuous activity"
            : "- Maintain normal routine\n- Stay hydrated\n- Dress appropriately for environment"
        }
  
        ## Monitoring Protocol
        - Frequency: ${
          temp < 95 || temp > 103
            ? "Every 15 minutes"
            : temp < 97 || temp > 101
            ? "Hourly"
            : temp > 99
            ? "Every 2 hours"
            : "Twice daily"
        }
        - Key signs to watch: ${
          temp < 97
            ? "Shivering, Slurred speech, Weak pulse"
            : temp > 99
            ? "Flushed skin, Headache, Muscle aches"
            : "None"
        }
  
        ## Recovery Measures
        ${
          temp < 97
            ? "- Gradual rewarming (1°F per hour)\n- Warm sweet drinks\n- Heating pads (low setting)"
            : temp > 99
            ? "- Cool (not cold) sponge baths\n- Electrolyte solutions\n- Light, loose clothing"
            : "- Normal activity\n- Balanced diet\n- Regular sleep"
        }
  
        ## When to Seek Medical Help
        ${
          temp < 95 || temp > 103
            ? "- EMERGENCY: Go to hospital now"
            : temp < 97 || temp > 101
            ? "- Urgent: See doctor within 2 hours"
            : temp > 99
            ? "- Schedule appointment if persists >24hrs"
            : "- Routine check if concerned"
        }
      `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text: text.trim() });
  } catch (error) {
    console.error("Error generating temperature suggestions:", error);
    res.status(500).json({
      message: "Error generating temperature recommendations",
      error: error.message,
    });
  }
});

// Heart Rate Suggestions
app.post("/api/pulseandheartrate_suggestions", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username required" });

    const data = await HeartRate.find({ username }).toArray();
    const data1 = await PulseRate.find({ username }).toArray();
    if (!data?.length || !data1?.length)
      return res.status(404).json({ message: "No data found" });

    const hr = data[0].currHeartRate;
    const pr = data1[0].currPulseRate;

    if (!hr || !pr)
      return res.status(404).json({ message: "Vitals data missing" });

    const prompt = `
      Provide concise cardiovascular advice in this exact format:
      
      ## Vital Signs
      - Heart Rate: ${hr}bpm (Normal: 60-100)
      - Pulse Rate: ${pr}bpm
      
      ## Key Actions
      ${
        hr < 60
          ? "- Check for dizziness\n- Increase activity gradually"
          : hr > 100
          ? "- Rest immediately\n- Monitor for chest pain"
          : "- Maintain regular exercise"
      }
      
      ## Weekly Targets
      - Cardio: ${
        hr < 60 ? "3x light" : hr > 100 ? "Consult doctor first" : "5x moderate"
      }
      - Hydration: 2L daily minimum
    `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Diet Plan Generator
app.post("/generate_diet_plan", async (req, res) => {
  try {
    const { username, healthData } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username required" });

    const metrics = healthData || (await getHealthMetrics(username));
    if (!metrics)
      return res.status(404).json({ message: "Health data unavailable" });

    const prompt = `
        Generate a 7-point diet plan in this exact format:
        
        ## Macronutrient Balance
        - Proteins: ${metrics.spo2 < 95 ? "Increased" : "Normal"} intake
        - Carbs: Balanced complex carbs
        - Fats: Healthy sources only
        
        ## Daily Plan
        1. Breakfast: High-protein option
        2. Lunch: Lean meat + vegetables
        3. Dinner: Light & balanced
        4. Snacks: Nuts/fruits
        
        ## Special Notes
        - Hydration: ${metrics.temperature > 98.6 ? "3L+" : "2L"} water
        - Avoid: ${metrics.heartRate > 90 ? "Caffeine" : "Processed foods"}
      `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Exercise Plan Generator
app.post("/generate_exercise_plan", async (req, res) => {
  try {
    const { username, healthData } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username required" });

    const metrics = healthData || (await getHealthMetrics(username));
    if (!metrics)
      return res.status(404).json({ message: "Health data unavailable" });

    const prompt = `
        Generate a 5-point exercise plan in this exact format:
        
        ## Weekly Routine
        - Cardio: ${metrics.heartRate < 60 ? "3x light" : "5x moderate"}
        - Strength: 2x full-body
        - Flexibility: Daily stretches
        
        ## Session Structure
        1. Warm-up: 5-10min dynamic
        2. Main: 20-30min targeted
        3. Cool-down: 5min static
        
        ## Safety
        - Target HR: ${Math.round(0.6 * (220 - 30))}-${Math.round(
      0.8 * (220 - 30)
    )}bpm
        - Stop if: Dizziness occurs
      `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/generate_sleep_plan", async (req, res) => {
  try {
    const { username, healthData } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username required" });

    // Get health metrics (using helper function or direct input)
    const metrics = healthData || (await getHealthMetrics(username));
    if (!metrics)
      return res.status(404).json({ message: "Health data unavailable" });

    const prompt = `
        Generate a sleep optimization plan in this exact structured format:
  
        ## Sleep Baseline
        - Target Duration: ${metrics.heartRate > 85 ? "8-9" : "7-8"} hours
        - Ideal Bedtime: ${metrics.spo2 < 95 ? "10PM" : "11PM"} ±30min
        - Wake Time: 6-7AM
  
        ## Environment Setup
        - Temperature: ${metrics.temperature > 98.6 ? "66-68°F" : "68-70°F"}
        - Lighting: Blackout curtains + dim lights
        - Noise: ${metrics.pulseRate > 80 ? "White noise" : "Silence"}
  
        ## Pre-Sleep Routine
        1. ${metrics.heartRate > 90 ? "Gentle yoga" : "Reading"} 30min before
        2. Digital detox 1hr prior
        3. ${metrics.spo2 < 96 ? "Humidifier" : "Aromatherapy"} optional
  
        ## Key Recommendations
        - Avoid: ${
          metrics.temperature > 99 ? "Heavy meals" : "Caffeine"
        } after 6PM
        - Hydration: 500ml water 2hr before bed
        - Emergency: ${
          metrics.heartRate > 100 ? "Consult doctor" : "Chamomile tea"
        }
      `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    res.json({ text });
  } catch (error) {
    console.error("Error generating sleep plan:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

async function getHealthMetrics(username) {
  const [bp, temp, heart] = await Promise.all([
    bloodpressure_data.findOne({ username }),
    temperature_data.findOne({ username }),
    heartandpulse_data.findOne({ username }),
  ]);

  return bp && temp && heart
    ? {
        spo2: bp.currentsp02,
        temperature: temp.currenttemperature,
        heartRate: heart.currentheartRate,
        pulseRate: heart.currentpulseRate,
      }
    : null;
}

app.post("/predict-from-vitals", async (req, res) => {
  try {
    const { vitals } = req.body;

    if (!vitals || typeof vitals !== "object") {
      return res.status(400).json({
        message: "Vitals data must be provided as an object",
      });
    }

    // Validate required vitals fields
    const requiredFields = [
      "heartRate",
      "pulseRate",
      "bloodPressure",
      "temperature",
      "oxygenLevel",
      "respiratoryRate",
    ];
    const missingFields = requiredFields.filter((field) => !vitals[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required vitals: ${missingFields.join(", ")}`,
      });
    }

    const prompt = `
        Analyze these vital signs for a ${vitals.age || "unknown"} year old ${
      vitals.gender || "person"
    }:
        - Heart Rate: ${vitals.heartRate} bpm (Normal: 60-100)
        - Pulse Rate: ${vitals.pulseRate} bpm
        - Blood Pressure: ${vitals.bloodPressure} mmHg (Normal: 120/80)
        - Temperature: ${vitals.temperature}°C (Normal: 36.5-37.5)
        - Oxygen Level: ${vitals.oxygenLevel}% (Normal: 95-100)
        - Respiratory Rate: ${vitals.respiratoryRate} bpm (Normal: 12-20)
  
        Provide a health assessment with:
        1. Current status based on these readings
        2. Potential health risks
        3. Recommended actions
  
        Respond with ONLY the raw JSON in this exact format:
        {
          "overview": "concise health status summary",
          "symptoms": ["array", "of", "potential", "symptoms"],
          "causes": ["array", "of", "possible", "causes"],
          "treatments": ["array", "of", "recommended", "actions"],
          "precautions": ["array", "of", "preventative", "measures"],
          "severity": "low/medium/high",
          "confidence": 0.0-1.0,
          "similarConditions": ["array", "of", "similar", "conditions"]
        }
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json|```/g, "").trim();

    try {
      const data = JSON.parse(text);

      if (!data.overview || !Array.isArray(data.treatments)) {
        throw new Error("Invalid AI response format");
      }

      const normalizedData = {
        ...data,
        severity: ["low", "medium", "high"].includes(
          data.severity?.toLowerCase()
        )
          ? data.severity.toLowerCase()
          : "low",
        confidence: Math.min(
          1,
          Math.max(0, parseFloat(data.confidence) || 0.5)
        ),
        timestamp: new Date().toISOString(),
      };

      res.json(normalizedData);
    } catch (parseError) {
      console.error("AI Response Parsing Error:", parseError);
      console.error("Original Response:", text);
      res.status(500).json({
        message: "Failed to process AI response",
        error: parseError.message,
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.post("/predict", async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;

    if (!symptoms || typeof symptoms !== "string") {
      return res.status(400).json({
        message: "Symptoms must be a non-empty string",
      });
    }

    const prompt = `
        Analyze these symptoms: ${symptoms}
        ${age ? `Patient age: ${age}` : ""}
        ${gender ? `Patient gender: ${gender}` : ""}
  
        Respond with ONLY the raw JSON in this exact format (NO markdown code blocks, NO extra text):
        {
          "overview": "2-3 sentence description",
          "symptoms": ["array", "of", "symptoms"],
          "causes": ["array", "of", "causes"],
          "treatments": ["array", "of", "treatments"],
          "precautions": ["array", "of", "preventions"],
          "severity": "low/medium/high",
          "confidence": 0.0-1.0,
          "similarConditions": ["array", "of", "similar", "conditions"]
        }
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let data;
    try {
      data = JSON.parse(text);

      if (!data.overview || !Array.isArray(data.symptoms)) {
        throw new Error("Invalid response format from AI");
      }

      res.json({
        ...data,
        severity: data.severity || "low",
        confidence: Math.min(1, Math.max(0, data.confidence || 0.5)),
        timestamp: new Date().toISOString(),
      });
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Original response:", text);
      return res.status(500).json({
        message: "Failed to process AI response",
        error: parseError.message,
        receivedText: text,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `
        You are a knowledgeable and empathetic medical assistant. 
        Provide accurate health information but always recommend consulting 
        a doctor for serious concerns. Keep responses clear and under 500 characters.
        For medication questions, remind users to consult their pharmacist or doctor.
        For emergencies, advise immediate medical attention.
      `,
        },
      ],
    };

    const validHistory =
      history.length > 0 && history[0].role === "user"
        ? history
        : [systemInstruction];

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: error.message || "Failed to process message",
      suggestion: "Please try again later",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
