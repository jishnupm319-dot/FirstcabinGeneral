#include <SoftwareSerial.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <avr/pgmspace.h>

const int PIN_BAT_TEMP    = A0;
const int PIN_CAB_TEMP    = A1;
const int PIN_BAT_VOLT    = A2;
const int PIN_BAT_CURR    = A3;

const int PIN_GSM_RX      = 2;
const int PIN_GSM_TX      = 3;

const int PIN_RELAY_HV    = 7;
const int PIN_RELAY_FIRE  = 8;
const int PIN_RELAY_FAN   = 9;
const int PIN_BUZZER      = 10;
const int PIN_LED_RED     = 11;
const int PIN_LED_YELLOW  = 12;
const int PIN_LED_GREEN   = 13;

const char OWNER_PHONE_NUMBER[] PROGMEM = "+1234567890";

const float VOLTAGE_DIVIDER_RATIO = 100.0;
const float CURRENT_SENSOR_SENSITIVITY = 0.066;
const float CURRENT_SENSOR_OFFSET = 2.5;

const float TEMP_NORMAL_MAX      = 45.0;
const float TEMP_WARNING_MAX     = 60.0;
const float TEMP_CRITICAL        = 75.0;

const float DTDT_NORMAL_MAX      = 0.15;
const float DTDT_WARNING         = 0.40;
const float DTDT_CRITICAL        = 0.75;

const float VOLTAGE_COLLAPSE_SAG = 310.0;

enum SafetyState {
  STATE_SAFE = 0,
  STATE_WARNING_HIGH_LOAD,
  STATE_PRE_FIRE_HAZARD,
  STATE_THERMAL_RUNAWAY_FIRE
};

SoftwareSerial gsmSerial(PIN_GSM_RX, PIN_GSM_TX);
LiquidCrystal_I2C lcd(0x27, 16, 2);

SafetyState currentState = STATE_SAFE;
SafetyState previousState = STATE_SAFE;

float batTemp = 25.0;
float cabTemp = 24.0;
float batVolt = 380.0;
float batCurr = -15.0;

float prevBatTemp = 25.0;
float prevBatVolt = 380.0;
unsigned long lastSampleTime = 0;
float rateOfTempRise = 0.0;
float rateOfVoltDrop = 0.0;

unsigned long lastSmsTime = 0;
const unsigned long SMS_COOLDOWN_MS = 60000;

void setup() {
  Serial.begin(9600);
  gsmSerial.begin(9600);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("EV FIRE SAFETY");
  lcd.setCursor(0, 1);
  lcd.print("MONITOR STARTING");

  pinMode(PIN_RELAY_HV, OUTPUT);
  pinMode(PIN_RELAY_FIRE, OUTPUT);
  pinMode(PIN_RELAY_FAN, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_YELLOW, OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);

  digitalWrite(PIN_RELAY_HV, LOW);
  digitalWrite(PIN_RELAY_FIRE, LOW);
  digitalWrite(PIN_RELAY_FAN, LOW);
  digitalWrite(PIN_BUZZER, LOW);
  digitalWrite(PIN_LED_GREEN, HIGH);
  digitalWrite(PIN_LED_YELLOW, LOW);
  digitalWrite(PIN_LED_RED, LOW);

  Serial.println(F("=================================================="));
  Serial.println(F(" EV SMART FIRE DETECTION & SAFETY SYSTEM (AI) "));
  Serial.println(F(" Initializing Sensors, LCD & SIM800L Module..."));
  Serial.println(F("=================================================="));

  delay(2000);
  initGSM();
  lastSampleTime = millis();
}

void loop() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastSampleTime >= 500) {
    float dt = (currentTime - lastSampleTime) / 1000.0;
    lastSampleTime = currentTime;

    readSensors();

    rateOfTempRise = (batTemp - prevBatTemp) / dt;
    rateOfVoltDrop = (prevBatVolt - batVolt) / dt;

    prevBatTemp = batTemp;
    prevBatVolt = batVolt;

    evaluateAiDecisionTree();
    handleSafetyActuators();
    updateLcdDisplay();
    sendSerialTelemetry();
  }
}

void readSensors() {
  int rawBatTemp = analogRead(PIN_BAT_TEMP);
  int rawCabTemp = analogRead(PIN_CAB_TEMP);

  if (rawBatTemp > 10) {
    batTemp = (rawBatTemp * (5.0 / 1023.0)) * 100.0;
  } else {
    batTemp = 25.0;
  }

  if (rawCabTemp > 10) {
    cabTemp = (rawCabTemp * (5.0 / 1023.0)) * 100.0;
  } else {
    cabTemp = 24.0;
  }

  int rawVolt = analogRead(PIN_BAT_VOLT);
  if (rawVolt > 20) {
    batVolt = (rawVolt * (5.0 / 1023.0)) * VOLTAGE_DIVIDER_RATIO;
  } else {
    batVolt = 380.0;
  }

  int rawCurr = analogRead(PIN_BAT_CURR);
  if (rawCurr > 20) {
    float voltageCurr = (rawCurr * (5.0 / 1023.0));
    batCurr = (voltageCurr - CURRENT_SENSOR_OFFSET) / CURRENT_SENSOR_SENSITIVITY;
  } else {
    batCurr = -15.0;
  }
}

void evaluateAiDecisionTree() {
  previousState = currentState;

  if (rateOfTempRise >= DTDT_CRITICAL || batTemp >= TEMP_CRITICAL || 
     (batVolt <= VOLTAGE_COLLAPSE_SAG && rateOfTempRise >= DTDT_WARNING)) {
    currentState = STATE_THERMAL_RUNAWAY_FIRE;
  }
  else if (rateOfTempRise >= DTDT_WARNING || batTemp >= TEMP_WARNING_MAX) {
    currentState = STATE_PRE_FIRE_HAZARD;
  }
  else if (batTemp >= TEMP_NORMAL_MAX || abs(batCurr) > 120.0) {
    currentState = STATE_WARNING_HIGH_LOAD;
  }
  else {
    currentState = STATE_SAFE;
  }
}

void handleSafetyActuators() {
  switch (currentState) {
    case STATE_SAFE:
      digitalWrite(PIN_LED_GREEN, HIGH);
      digitalWrite(PIN_LED_YELLOW, LOW);
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_RELAY_HV, LOW);
      digitalWrite(PIN_RELAY_FIRE, LOW);
      digitalWrite(PIN_RELAY_FAN, LOW);
      noTone(PIN_BUZZER);
      break;

    case STATE_WARNING_HIGH_LOAD:
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_YELLOW, HIGH);
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_RELAY_HV, LOW);
      digitalWrite(PIN_RELAY_FIRE, LOW);
      digitalWrite(PIN_RELAY_FAN, HIGH);
      noTone(PIN_BUZZER);
      break;

    case STATE_PRE_FIRE_HAZARD:
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_YELLOW, HIGH);
      digitalWrite(PIN_LED_RED, HIGH);
      digitalWrite(PIN_RELAY_HV, LOW);
      digitalWrite(PIN_RELAY_FIRE, LOW);
      digitalWrite(PIN_RELAY_FAN, HIGH);
      tone(PIN_BUZZER, 1500, 200);

      if (previousState != STATE_PRE_FIRE_HAZARD || (millis() - lastSmsTime > SMS_COOLDOWN_MS)) {
        sendGsmSms(F("EV FIRE WARNING: Rapid battery temperature rise detected! Inspect vehicle immediately."));
        lastSmsTime = millis();
      }
      break;

    case STATE_THERMAL_RUNAWAY_FIRE:
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_YELLOW, LOW);
      digitalWrite(PIN_LED_RED, HIGH);
      digitalWrite(PIN_RELAY_HV, HIGH);
      digitalWrite(PIN_RELAY_FIRE, HIGH);
      digitalWrite(PIN_RELAY_FAN, HIGH);
      tone(PIN_BUZZER, 2500);

      if (previousState != STATE_THERMAL_RUNAWAY_FIRE || (millis() - lastSmsTime > SMS_COOLDOWN_MS)) {
        sendGsmSms(F("EMERGENCY FIRE ALERT! EV Thermal runaway detected! HV Battery Isolated. Suppression Actuated. Seek safety!"));
        lastSmsTime = millis();
      }
      break;
  }
}

void updateLcdDisplay() {
  lcd.setCursor(0, 0);
  lcd.print("T:");
  if (batTemp < 10.0 && batTemp >= 0.0) lcd.print(" ");
  lcd.print(batTemp, 1);
  lcd.print("C V:");
  if (batVolt < 100.0) lcd.print(" ");
  lcd.print(batVolt, 0);
  lcd.print("V  ");

  lcd.setCursor(0, 1);
  lcd.print("I:");
  if (abs(batCurr) < 10.0) lcd.print(" ");
  lcd.print(batCurr, 0);
  lcd.print("A ");

  switch (currentState) {
    case STATE_SAFE:
      lcd.print("ST:SAFE   ");
      break;
    case STATE_WARNING_HIGH_LOAD:
      lcd.print("ST:H-LOAD ");
      break;
    case STATE_PRE_FIRE_HAZARD:
      lcd.print("ST:HAZARD!");
      break;
    case STATE_THERMAL_RUNAWAY_FIRE:
      lcd.print("ST:FIRE!  ");
      break;
  }
}

void initGSM() {
  Serial.println(F("Connecting to GSM Network..."));
  gsmSerial.println(F("AT"));
  delay(1000);
  gsmSerial.println(F("ATE0"));
  delay(500);
  gsmSerial.println(F("AT+CMGF=1"));
  delay(500);
}

void sendGsmSms(const __FlashStringHelper* message) {
  Serial.print(F("Sending Instant GSM SMS Alert: "));
  Serial.println(message);

  char phoneBuffer[20];
  strcpy_P(phoneBuffer, OWNER_PHONE_NUMBER);

  gsmSerial.print(F("AT+CMGS=\""));
  gsmSerial.print(phoneBuffer);
  gsmSerial.println(F("\""));
  delay(1000);

  gsmSerial.println(message);
  gsmSerial.print(F("Telemetry -> BatTemp: "));
  gsmSerial.print(batTemp, 1);
  gsmSerial.print(F("C | dT/dt: "));
  gsmSerial.print(rateOfTempRise, 2);
  gsmSerial.print(F("C/s | Volt: "));
  gsmSerial.print(batVolt, 1);
  gsmSerial.print(F("V | Curr: "));
  gsmSerial.println(batCurr, 1);

  delay(500);
  gsmSerial.write(26);
  delay(3000);
  Serial.println(F("SMS Alert Transmitted Successfully."));
}

void sendSerialTelemetry() {
  Serial.print(F("{\"state\":"));
  Serial.print((int)currentState);
  Serial.print(F(",\"batTemp\":"));
  Serial.print(batTemp, 1);
  Serial.print(F(",\"cabTemp\":"));
  Serial.print(batTemp, 1);
  Serial.print(F(",\"dTdt\":"));
  Serial.print(rateOfTempRise, 3);
  Serial.print(F(",\"batVolt\":"));
  Serial.print(batVolt, 1);
  Serial.print(F(",\"batCurr\":"));
  Serial.print(batCurr, 1);
  Serial.println(F("}"));
}
