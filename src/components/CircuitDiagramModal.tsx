import React from 'react';
import { X, Cpu, Zap, Radio, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CircuitDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CircuitDiagramModal: React.FC<CircuitDiagramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Cpu className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Arduino Uno Circuit & Schematic Guide
            </h2>
            <p className="text-slate-400 text-sm">
              Hardware Wiring Connections for EV Fire Detection & Safety System
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <h3 className="font-semibold text-cyan-300 flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" /> Arduino Pin Mapping
            </h3>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-cyan-400">A0 (Analog)</span>
                <span>Battery Temp Sensor (LM35 / NTC)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-cyan-400">A1 (Analog)</span>
                <span>Cabin Temp Sensor (LM35 / NTC)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-cyan-400">A2 (Analog)</span>
                <span>HV Voltage Sensor (Divider 0-500V)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-cyan-400">A3 (Analog)</span>
                <span>Current Sensor (ACS712-30A)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-amber-400">D2, D3 (Digital)</span>
                <span>SIM800L GSM Tx/Rx (SoftwareSerial)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-emerald-400">D7 (Digital Output)</span>
                <span>HV Contactor Relay (NC Contact)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-rose-400">D8 (Digital Output)</span>
                <span>Fire Suppression Aerosol Relay</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-blue-400">D9 (Digital Output)</span>
                <span>Exhaust / Cooling Fan Relay</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-red-400">D10 (Digital Output)</span>
                <span>Piezo Buzzer / Alarm Siren</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50">
                <span className="text-purple-400">D11, D12, D13</span>
                <span>Status LEDs (Red, Yellow, Green)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-amber-300 flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4" /> SIM800L GSM Power Wiring
              </h3>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>SIM800L operates at <strong>3.7V - 4.2V</strong> (peak current up to 2A during transmission).</li>
                <li>Do NOT power SIM800L directly from Arduino 5V pin! Use an external LM2596 buck converter regulated to 4.0V.</li>
                <li>Connect Arduino GND and SIM800L GND together (Common Ground).</li>
                <li>Insert a 2G/4G compatible Micro-SIM card with active SMS plan.</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-emerald-300 flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4" /> Safety Actuator Relays
              </h3>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li><strong>HV Contactor Relay</strong>: Wired to main EV battery contactor solenoid to isolate high-voltage pack upon thermal runaway detection.</li>
                <li><strong>Fire Suppression Relay</strong>: Triggers stat-X / aerosol fire extinguisher canister or nitrogen purge valve.</li>
                <li><strong>Cooling Fan Relay</strong>: Activates high-CFM battery compartment exhaust fan during thermal stress.</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-cyan-300 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4" /> AI False Alarm Elimination
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traditional EV fire detectors rely on simple static temperature limits (e.g. 50°C), causing frequent false triggers during fast charging. Our AI algorithm evaluates <strong>slope acceleration (&Delta;T/&Delta;t)</strong>, voltage sag, and current draw.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg transition-all"
          >
            Close Diagram Guide
          </button>
        </div>
      </div>
    </div>
  );
};
