// === Libraries ===
#include <Wire.h>
#include <DHT.h>
#include "MAX30100_PulseOximeter.h"

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

void setup() {
  Serial.begin(115200);
  pinMode(LEDPin, OUTPUT);
  randomSeed(analogRead(0));  // Seed for random number generation

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

    // Temperature (DHT11) - Fallback: Random between 20°C - 30°C
    if (!isnan(temp)) {
      Serial.print("🌡️ Temperature (DHT11): ");
      Serial.print(temp);
      Serial.println(" °C");
    } else {
      temp = random(200, 301) / 10.0;  // 20.0 - 30.0°C
      Serial.print("🌡️ Temperature (Simulated): ");
      Serial.print(temp);
      Serial.println(" °C");
    }

    // Humidity (DHT11) - Fallback: Random between 40% - 80%
    if (!isnan(humidity)) {
      Serial.print("💧 Humidity (DHT11): ");
      Serial.print(humidity);
      Serial.println(" %");
    } else {
      humidity = random(40, 81);  // 40% - 80%
      Serial.print("💧 Humidity (Simulated): ");
      Serial.print(humidity);
      Serial.println(" %");
    }

    // Heart Rate (MAX30100) - Fallback: Random between 60 - 100 bpm
    if (heartRate > 30 && heartRate < 250) {
      Serial.print("❤️ Heart Rate (MAX30100): ");
      Serial.print(heartRate);
      Serial.println(" bpm");
    } else {
      heartRate = random(60, 101);  // 60 - 100 bpm
      Serial.print("❤️ Heart Rate (Simulated): ");
      Serial.print(heartRate);
      Serial.println(" bpm");
    }

    // SpO2 (MAX30100) - Fallback: Random between 95% - 99%
    if (spO2 > 70 && spO2 <= 100) {
      Serial.print("🩸 SpO2 (MAX30100): ");
      Serial.print(spO2);
      Serial.println(" %");
    } else {
      spO2 = random(95, 100);  // 95% - 99%
      Serial.print("🩸 SpO2 (Simulated): ");
      Serial.print(spO2);
      Serial.println(" %");
    }

    // Pulse Rate (SEN-11574) - Fallback: Random between 60 - 100 bpm
    if (BPM > 30 && BPM < 250) {
      Serial.print("💓 Pulse Rate (SEN-11574): ");
      Serial.print(BPM);
      Serial.println(" bpm");
    } else {
      BPM = random(60, 101);  // 60 - 100 bpm
      Serial.print("💓 Pulse Rate (Simulated): ");
      Serial.print(BPM);
      Serial.println(" bpm");
    }

    // === Blood Pressure Simulation (Random) ===
    int systolic = random(90, 141);  // 90 - 140 mmHg
    int diastolic = random(60, 91);  // 60 - 90 mmHg
    Serial.print("🩺 Blood Pressure (Simulated): ");
    Serial.print(systolic);
    Serial.print("/");
    Serial.print(diastolic);
    Serial.println(" mmHg");

    Serial.println("==================================");
    tsLastReport = millis();
  }
}