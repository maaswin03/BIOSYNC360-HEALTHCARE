const int PulsePin = 36;      // Analog input pin (GPIO36 on ESP32)
const int LEDPin = 2;         // On-board LED pin (optional)

int Threshold = 250;          // Adjust this based on your signal range
bool beatDetected = false;

int Signal = 0;
unsigned long lastBeatTime = 0;
unsigned long currentTime = 0;
int BPM = 0;


void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
}

void loop() {
  Signal = analogRead(PulsePin);
  currentTime = millis();

  Serial.print("Signal: ");
  Serial.print(Signal);
  Serial.print(" | BeatDetected: ");
  Serial.println(beatDetected);

  if (Signal < Threshold && !beatDetected) {
    beatDetected = true;

    unsigned long timeBetweenBeats = currentTime - lastBeatTime;

    if (timeBetweenBeats > 300) {
      BPM = 60000 / timeBetweenBeats;
      lastBeatTime = currentTime;

      Serial.print("BPM: ");
      Serial.println(BPM);
      digitalWrite(LEDPin, HIGH);
    }
  }

  if (Signal > Threshold && beatDetected) {
    beatDetected = false;
    digitalWrite(LEDPin, LOW);
  }

  delay(5);
}
