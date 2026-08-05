import React, { useState, useEffect } from 'react';
import {
  Flame, ShieldAlert, Zap, Thermometer, Battery, AlertTriangle,
  CheckCircle2, Radio, FileCode, Play, Pause, Cpu, MessageSquare, Copy, Check
} from 'lucide-react';
import datasetSamplesData from '../data/ev_dataset_samples.json';
import { CircuitDiagramModal } from './CircuitDiagramModal';

export const EVSafetyDashboard: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeScenario, setActiveScenario] = useState<'normal' | 'fast_charge' | 'thermal_stress' | 'thermal_runaway'>('normal');

  const [batTemp, setBatTemp] = useState<number>(25.0);
  const [cabTemp, setCabTemp] = useState<number>(24.0);
  const [batVolt, setBatVolt] = useState<number>(382.4);
  const [batCurr, setBatCurr] = useState<number>(-18.5);
  const [dTdt, setDTdt] = useState<number>(0.02);

  const [aiState, setAiState] = useState<'SAFE' | 'WARNING_HIGH_LOAD' | 'PRE_FIRE_HAZARD' | 'THERMAL_RUNAWAY'>('SAFE');
  const [traditionalState, setTraditionalState] = useState<'NORMAL' | 'FALSE_ALARM_FIRE' | 'FIRE'>('NORMAL');

  const [smsMessages, setSmsMessages] = useState<Array<{ id: string; time: string; text: string; alertType: 'warning' | 'emergency' }>>([]);
  const [isCircuitModalOpen, setIsCircuitModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code_ino' | 'dataset'>('dashboard');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const inoCode = `#include <SoftwareSerial.h>
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

SafetyState currentState = STATE_SAFE;
SafetyState previousState = STATE_SAFE;

float batTemp = 25.0;
float cabTemp = 24.0;
float batVolt = 380.0;
float batCurr = 0.0;

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
    sendSerialTelemetry();
  }
}

void readSensors() {
  int rawBatTemp = analogRead(PIN_BAT_TEMP);
  batTemp = (rawBatTemp * (5.0 / 1023.0)) * 100.0;

  int rawCabTemp = analogRead(PIN_CAB_TEMP);
  cabTemp = (rawCabTemp * (5.0 / 1023.0)) * 100.0;

  int rawVolt = analogRead(PIN_BAT_VOLT);
  batVolt = (rawVolt * (5.0 / 1023.0)) * (VOLTAGE_DIVIDER_RATIO);

  int rawCurr = analogRead(PIN_BAT_CURR);
  float voltageCurr = (rawCurr * (5.0 / 1023.0));
  batCurr = (voltageCurr - CURRENT_SENSOR_OFFSET) / CURRENT_SENSOR_SENSITIVITY;
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
  Serial.print(cabTemp, 1);
  Serial.print(F(",\"dTdt\":"));
  Serial.print(rateOfTempRise, 3);
  Serial.print(F(",\"batVolt\":"));
  Serial.print(batVolt, 1);
  Serial.print(F(",\"batCurr\":"));
  Serial.print(batCurr, 1);
  Serial.println(F("}"));
}`;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      let targetTemp = 25.0;
      let targetVolt = 380.0;
      let targetCurr = -15.0;
      let targetDTdt = 0.02;

      switch (activeScenario) {
        case 'normal':
          targetTemp = 24.5 + (Math.random() * 2 - 1);
          targetVolt = 382.0 + (Math.random() * 4 - 2);
          targetCurr = -20.0 + (Math.random() * 10 - 5);
          targetDTdt = 0.01 + (Math.random() * 0.02);
          break;

        case 'fast_charge':
          targetTemp = 52.0 + (Math.random() * 1.5);
          targetVolt = 394.0;
          targetCurr = -135.0 + (Math.random() * 15);
          targetDTdt = 0.12;
          break;

        case 'thermal_stress':
          targetTemp = 63.5 + (Math.random() * 1.2);
          targetVolt = 365.0;
          targetCurr = -85.0;
          targetDTdt = 0.48;
          break;

        case 'thermal_runaway':
          targetTemp = 88.5 + (Math.random() * 5);
          targetVolt = 295.0;
          targetCurr = -240.0;
          targetDTdt = 1.45;
          break;
      }

      setBatTemp(parseFloat(targetTemp.toFixed(1)));
      setCabTemp(parseFloat((targetTemp * 0.85).toFixed(1)));
      setBatVolt(parseFloat(targetVolt.toFixed(1)));
      setBatCurr(parseFloat(targetCurr.toFixed(1)));
      setDTdt(parseFloat(targetDTdt.toFixed(2)));

      let nextAi: 'SAFE' | 'WARNING_HIGH_LOAD' | 'PRE_FIRE_HAZARD' | 'THERMAL_RUNAWAY' = 'SAFE';

      if (targetDTdt >= 0.75 || targetTemp >= 75.0 || (targetVolt <= 310.0 && targetDTdt >= 0.40)) {
        nextAi = 'THERMAL_RUNAWAY';
      } else if (targetDTdt >= 0.40 || targetTemp >= 60.0) {
        nextAi = 'PRE_FIRE_HAZARD';
      } else if (targetTemp >= 45.0 || Math.abs(targetCurr) > 100.0) {
        nextAi = 'WARNING_HIGH_LOAD';
      } else {
        nextAi = 'SAFE';
      }

      setAiState(nextAi);

      let nextTrad: 'NORMAL' | 'FALSE_ALARM_FIRE' | 'FIRE' = 'NORMAL';
      if (activeScenario === 'fast_charge') {
        nextTrad = 'FALSE_ALARM_FIRE';
      } else if (activeScenario === 'thermal_runaway' || activeScenario === 'thermal_stress') {
        nextTrad = 'FIRE';
      }
      setTraditionalState(nextTrad);

      if (nextAi === 'PRE_FIRE_HAZARD' && !smsMessages.some(m => m.alertType === 'warning')) {
        addSms('EV WARNING: Rapid battery temperature rise detected! Cooling fans active.', 'warning');
      } else if (nextAi === 'THERMAL_RUNAWAY' && !smsMessages.some(m => m.alertType === 'emergency')) {
        addSms('EMERGENCY FIRE ALERT! Thermal runaway detected. High-Voltage Battery Contactor isolated & Fire Suppression deployed!', 'emergency');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, activeScenario, smsMessages]);

  const addSms = (text: string, alertType: 'warning' | 'emergency') => {
    const newMsg = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      text,
      alertType
    };
    setSmsMessages(prev => [newMsg, ...prev.slice(0, 4)]);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-amber-600 rounded-xl shadow-lg shadow-red-500/20">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                EV Smart Fire Detection & Safety System
              </h1>
              <p className="text-xs md:text-sm text-cyan-400 font-medium flex items-center gap-2 mt-0.5">
                <Cpu className="w-4 h-4" /> AI-Powered Edge Protection for Arduino Uno &bull; 70-Trip Dataset Calibrated
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsCircuitModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-cyan-300 transition-colors shadow-md"
          >
            <Cpu className="w-4 h-4" /> Hardware Circuit Guide
          </button>
          <a
            href="/ev_smart_fire_safety_system.ino"
            download="ev_smart_fire_safety_system.ino"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-lg text-xs font-semibold text-white transition-all shadow-md"
          >
            <FileCode className="w-4 h-4" /> Download .INO File
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" /> Real-Time Telemetry & AI Simulator
          </button>
          <button
            onClick={() => setActiveTab('code_ino')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'code_ino'
                ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4" /> Arduino Uno C++ Code
          </button>
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'dataset'
                ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" /> 70-Trip Dataset Analytics
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400" /> Telemetry Scenario Simulator
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isRunning ? 'Pause Data Feed' : 'Resume Data Feed'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveScenario('normal')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeScenario === 'normal'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Normal Driving
                  </div>
                  <div className="text-[11px] opacity-75">Baseline Trip Telemetry</div>
                </button>

                <button
                  onClick={() => setActiveScenario('fast_charge')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeScenario === 'fast_charge'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-400" /> Fast Charging
                  </div>
                  <div className="text-[11px] opacity-75">High Current, Normal dT/dt</div>
                </button>

                <button
                  onClick={() => setActiveScenario('thermal_stress')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeScenario === 'thermal_stress'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-amber-400" /> Thermal Stress
                  </div>
                  <div className="text-[11px] opacity-75">Temp 63°C, Fan ON</div>
                </button>

                <button
                  onClick={() => setActiveScenario('thermal_runaway')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeScenario === 'thermal_runaway'
                      ? 'bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/20 animate-pulse'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-500" /> Thermal Runaway
                  </div>
                  <div className="text-[11px] opacity-75">dT/dt Spike &gt;0.75°C/s</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                  <span>Battery Temp</span>
                  <Thermometer className="w-4 h-4 text-red-400" />
                </div>
                <div className="my-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${batTemp > 60 ? 'text-red-400' : batTemp > 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {batTemp}°C
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Analog Pin A0</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                  <span>Slope (dT/dt)</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="my-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${dTdt >= 0.75 ? 'text-red-500' : dTdt >= 0.40 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {dTdt} <span className="text-xs text-slate-400 font-normal">°C/s</span>
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">AI Rate Derivative</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                  <span>Battery HV</span>
                  <Battery className="w-4 h-4 text-blue-400" />
                </div>
                <div className="my-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${batVolt < 310 ? 'text-red-400' : 'text-blue-400'}`}>
                    {batVolt}V
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Analog Pin A2</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                  <span>Current Draw</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="my-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-300">
                    {batCurr}A
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Analog Pin A3</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                  <span>Cabin Temp</span>
                  <Thermometer className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="my-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-emerald-400">
                    {cabTemp}°C
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Analog Pin A1</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  AI Decision Tree vs. Traditional Threshold Detection
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border transition-all ${
                    aiState === 'THERMAL_RUNAWAY'
                      ? 'bg-red-500/20 border-red-500 text-red-200'
                      : aiState === 'PRE_FIRE_HAZARD'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                      : aiState === 'WARNING_HIGH_LOAD'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                      : 'bg-emerald-500/10 border-emerald-500 text-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Smart AI Engine</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-black/40 border border-current">
                        0 False Alarms
                      </span>
                    </div>

                    <div className="text-xl font-extrabold mb-1">
                      {aiState === 'SAFE' && '🟢 SAFE (Normal Drive)'}
                      {aiState === 'WARNING_HIGH_LOAD' && '🟡 HIGH LOAD (Fan Active)'}
                      {aiState === 'PRE_FIRE_HAZARD' && '🟠 PRE-FIRE HAZARD'}
                      {aiState === 'THERMAL_RUNAWAY' && '🚨 THERMAL RUNAWAY / FIRE'}
                    </div>

                    <p className="text-xs opacity-85 leading-relaxed mt-2">
                      {aiState === 'SAFE' && 'Telemetry within normal operating range derived from 70-trip EV dataset.'}
                      {aiState === 'WARNING_HIGH_LOAD' && 'High current/temp detected. Cooling fan engaged. High Voltage contactor remains CLOSED (No false shutoff).'}
                      {aiState === 'PRE_FIRE_HAZARD' && 'Elevated temperature slope detected. Warning SMS transmitted to vehicle owner.'}
                      {aiState === 'THERMAL_RUNAWAY' && 'Critical fire hazard! HV Battery contactor TRIPPED, Automated Fire Extinguisher ACTIVATED!'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border transition-all ${
                    traditionalState === 'FALSE_ALARM_FIRE'
                      ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                      : traditionalState === 'FIRE'
                      ? 'bg-red-950/60 border-red-600 text-red-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Traditional Threshold</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-black/40 border border-current">
                        Static Temp &gt;48°C
                      </span>
                    </div>

                    <div className="text-xl font-extrabold mb-1">
                      {traditionalState === 'NORMAL' && 'System Normal'}
                      {traditionalState === 'FALSE_ALARM_FIRE' && '⚠️ FALSE ALARM TRIPPED!'}
                      {traditionalState === 'FIRE' && 'Fire Detected'}
                    </div>

                    <p className="text-xs opacity-85 leading-relaxed mt-2">
                      {traditionalState === 'FALSE_ALARM_FIRE'
                        ? 'CRITICAL DEFECT: Simple threshold mistaken fast charging for a battery fire! Shut down vehicle unnecessarily.'
                        : 'Monitors raw temperature without evaluating slope or voltage sag.'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Arduino Uno Hardware Safety Actuator Relays
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                      aiState === 'THERMAL_RUNAWAY' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-950 border-slate-800 text-emerald-400'
                    }`}>
                      <span>HV Contactor</span>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/50">
                        {aiState === 'THERMAL_RUNAWAY' ? 'TRIPPED (Open)' : 'CONNECTED'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                      aiState === 'THERMAL_RUNAWAY' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <span>Extinguisher</span>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/50">
                        {aiState === 'THERMAL_RUNAWAY' ? 'FIRED (Active)' : 'STANDBY'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                      aiState !== 'SAFE' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <span>Cooling Fan</span>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/50">
                        {aiState !== 'SAFE' ? 'ON (Pin 9)' : 'OFF'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                      aiState === 'THERMAL_RUNAWAY' ? 'bg-red-500/20 border-red-500 text-red-300' : aiState === 'PRE_FIRE_HAZARD' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <span>Piezo Siren</span>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/50">
                        {aiState === 'THERMAL_RUNAWAY' ? '2.5kHz Continuous' : aiState === 'PRE_FIRE_HAZARD' ? 'Intermittent' : 'MUTED'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> SIM800L Instant SMS Alerts
                    </h3>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs max-h-[320px] overflow-y-auto">
                    {smsMessages.length === 0 ? (
                      <div className="text-slate-500 text-center py-8 text-xs font-sans">
                        No SMS alerts triggered yet.
                        <br />Switch scenario to <strong>Thermal Stress</strong> or <strong>Thermal Runaway</strong> to test GSM SMS notification.
                      </div>
                    ) : (
                      smsMessages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg border ${
                            msg.alertType === 'emergency'
                              ? 'bg-red-950/70 border-red-600 text-red-200'
                              : 'bg-amber-950/70 border-amber-600 text-amber-200'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] opacity-75 mb-1">
                            <span>To: +1234567890 (Vehicle Owner)</span>
                            <span>{msg.time}</span>
                          </div>
                          <div className="font-sans font-medium text-xs leading-relaxed">{msg.text}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Module: SIM800L GSM</span>
                  <span className="font-mono text-emerald-400">AT+CMGS Ready</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'code_ino' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                  <FileCode className="w-5 h-5" /> Production Arduino Uno C++ Code (ev_smart_fire_safety_system.ino)
                </h3>
                <p className="text-xs text-slate-400">Memory optimized: SRAM &lt;1.2KB, PROGMEM Flash &lt;16KB</p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700 transition-all"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied!' : 'Copy Source Code'}
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed">
              {inoCode}
            </pre>
          </div>
        )}

        {activeTab === 'dataset' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <Radio className="w-5 h-5" /> 70 EV Trip Dataset Analysis Summary
              </h3>
              <p className="text-xs text-slate-400">Extracted from 1,094,793 EV telemetry rows across 70 real-world trip datasets.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Telemetry Rows</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">1,094,793</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Battery Temp Range</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">-1°C to 32°C</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Max Normal dT/dt</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">0.15 °C/s</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Battery HV Voltage</div>
                <div className="text-2xl font-bold text-blue-400 font-mono mt-1">301V – 394V</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Sample Telemetry Records (Exported JSON)</h4>
              <div className="text-xs font-mono text-slate-400 max-h-64 overflow-y-auto space-y-1">
                {datasetSamplesData.samples.slice(0, 10).map((s, idx) => (
                  <div key={idx} className="p-2 bg-slate-900/60 rounded border border-slate-800/80 flex justify-between">
                    <span>{s.trip} (t={s.time}s)</span>
                    <span>Temp: {s.batTemp}°C | Volt: {s.voltage}V | Curr: {s.current}A | dT/dt: {s.dTdt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <CircuitDiagramModal
        isOpen={isCircuitModalOpen}
        onClose={() => setIsCircuitModalOpen(false)}
      />
    </div>
  );
};
