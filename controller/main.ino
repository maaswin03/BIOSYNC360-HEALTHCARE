// === Libraries ===
#include <Wire.h>
#include <DHT.h>
#include "MAX30100_PulseOximeter.h"
#include <WiFi.h>
#include <HTTPClient.h>

// === WiFi Credentials ===
const char* ssid = "IPhone 14";
const char* password = "0987654321";

// === Server Configuration ===
const char* serverUrl = "http://192.168.151.81:8080/api/data22";
const char* username = "aswin123";

// === DHT11 Setup ===
#define DHTPIN 14              // Change to your DHT11 data pin
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// === MAX30100 Setup ===
PulseOximeter pox;
#define REPORTING_PERIOD_MS 1000
uint32_t tsLastReport = 0;

// === SEN-11574 Pulse Sensor Setup ===
#define PulsePin 36            // Analog input pin (GPIO36 on ESP32)
#define LEDPin 2               // On-board LED (optional)
int Threshold = 250;           // Adjust based on your sensor's signal
bool beatDetected = false;
int Signal = 0;
unsigned long lastBeatTime = 0;
unsigned long currentTime = 0;
int BPM = 0;

// === Beat Callback ===
void onBeatDetected() {
  Serial.println("Beat Detected (MAX30100)!");
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void sendDataToServer(float temp, float humidity, float heartRate, float spO2, int pulseRate, int systolic, int diastolic) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Create a JSON payload
    String payload = "{";
    payload += "\"username\":\"" + String(username) + "\",";
    if (!isnan(temp)) payload += "\"temperature\":" + String(temp) + ",";
    if (!isnan(humidity)) payload += "\"humidity\":" + String(humidity) + ",";
    if (heartRate > 30 && heartRate < 250) payload += "\"heart_rate\":" + String(heartRate) + ",";
    if (spO2 > 70 && spO2 <= 100) payload += "\"spo2\":" + String(spO2) + ",";
    if (BPM > 30 && BPM < 250) payload += "\"pulse_rate\":" + String(pulseRate) + ",";
    payload += "\"blood_pressure\":\"" + String(systolic) + "/" + String(diastolic) + "\"";
    payload += "}";
    
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    Serial.println("Sending data to server:");
    Serial.println(payload);
    
    int httpResponseCode = http.POST(payload);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error in sending POST: " + String(httpResponseCode));
    }
    
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
    connectToWiFi(); // Attempt to reconnect
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LEDPin, OUTPUT);

  // Connect to WiFi
  connectToWiFi();

  // DHT11 Init
  dht.begin();

  // MAX30100 Init
  Serial.print("Initializing MAX30100... ");
  if (!pox.begin()) {
    Serial.println("FAILED. Please check wiring!");
    while (1);
  } else {
    Serial.println("SUCCESS");
    delay(1000);  // Allow time for sensor to stabilize
  }
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() {
  // === DHT11 Read ===
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();

  // === MAX30100 Update ===
  pox.update();
  float heartRate = pox.getHeartRate();
  float spO2 = pox.getSpO2();

  // === Pulse Sensor Read ===
  Signal = analogRead(PulsePin);
  currentTime = millis();

  if (Signal < Threshold && !beatDetected) {
    beatDetected = true;
    unsigned long timeBetweenBeats = currentTime - lastBeatTime;
    if (timeBetweenBeats > 300) {  // Avoid noise (minimum 200ms between beats)
      BPM = 60000 / timeBetweenBeats;
      lastBeatTime = currentTime;
      digitalWrite(LEDPin, HIGH);
    }
  }

  if (Signal > Threshold && beatDetected) {
    beatDetected = false;
    digitalWrite(LEDPin, LOW);
  }

  // === Print Combined Output Every Second ===
  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    Serial.println("==================================");

    // Temperature (DHT11)
    if (!isnan(temp)) {
      Serial.print("Temperature (DHT11): ");
      Serial.print(temp);
      Serial.println(" °C");
    } else {
      Serial.println("Temperature: Failed to read");
    }

    // Humidity (DHT11)
    if (!isnan(humidity)) {
      Serial.print("Humidity (DHT11): ");
      Serial.print(humidity);
      Serial.println(" %");
    } else {
      Serial.println("Humidity: Failed to read");
    }

    // Heart Rate (MAX30100)
    if (heartRate > 30 && heartRate < 250) {
      Serial.print("Heart Rate (MAX30100): ");
      Serial.print(heartRate);
      Serial.println(" bpm");
    } else {
      Serial.println("Heart Rate: Not available");
    }

    // SpO2 (MAX30100)
    if (spO2 > 70 && spO2 <= 100) {
      Serial.print("SpO2 (MAX30100): ");
      Serial.print(spO2);
      Serial.println(" %");
    } else {
      Serial.println("SpO2: Not available");
    }

    // Pulse Rate (SEN-11574)
    if (BPM > 30 && BPM < 250) {
      Serial.print("Pulse Rate (SEN-11574): ");
      Serial.print(BPM);
      Serial.println(" bpm");
    } else {
      Serial.println("Pulse Rate: Not available");
    }

    Serial.println("==================================");

    // Send data to server (blood pressure is not actually measured, so we'll skip it)
    sendDataToServer(temp, humidity, heartRate, spO2, BPM, 0, 0);
    
    tsLastReport = millis();
  }
}