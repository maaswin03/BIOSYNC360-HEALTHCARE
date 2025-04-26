#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "Hello";
const char* password = "12345678";

// Server details
const char* serverUrl = "http://192.168.213.24:8080/api/data22"; // Match your Flask port
const char* username = "aswin123"; // Your username

// DHT11 Setup
#define DHTPIN 14
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Reporting interval (30 seconds)
#define REPORTING_PERIOD_MS 30000
unsigned long lastReportTime = 0;

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
  
  // Initialize DHT
  dht.begin();
}

void loop() {
  if (millis() - lastReportTime > REPORTING_PERIOD_MS) {
    // Generate simulated sensor data
    float tempC = random(200, 301) / 10.0;  // 20.0-30.0°C
    float humidity = random(40, 81);        // 40-80%
    int heartRate = random(60, 101);       // 60-100 bpm
    int spO2 = random(95, 100);           // 95-99%
    int pulseRate = random(60, 101);      // 60-100 bpm
    int respiratoryRate = random(12, 21); // 12-20 rpm
    float ecg = random(-150, 151) / 100.0; // -1.5 to +1.5
    int systolic = random(90, 141);       // 90-140 mmHg
    int diastolic = random(60, 91);      // 60-90 mmHg

    // Prepare JSON payload
    String payload = "{";
    payload += "\"username\":\"" + String(username) + "\",";
    payload += "\"currenttemperature\":" + String(tempC) + ",";
    payload += "\"currentecg\":" + String(ecg) + ",";
    payload += "\"currentheartRate\":" + String(heartRate) + ",";
    payload += "\"currentpulseRate\":" + String(pulseRate) + ",";
    payload += "\"currentsp02\":" + String(spO2) + ",";
    payload += "\"currentsystolic\":" + String(systolic) + ",";
    payload += "\"currentdiastolic\":" + String(diastolic) + ",";
    payload += "\"currentrespiratoryRate\":" + String(respiratoryRate);
    payload += "}";

    // Send to server
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    int httpCode = http.POST(payload);
    if (httpCode > 0) {
      Serial.printf("HTTP Response code: %d\n", httpCode);
      Serial.println(http.getString());
    } else {
      Serial.printf("HTTP Error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();

    lastReportTime = millis();
  }
}