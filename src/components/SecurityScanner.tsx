import React, { useState, useEffect } from "react";
import { Shield, ShieldAlert, ShieldCheck, Search, Activity, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const SecurityScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "scanning" | "completed">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const scanItems = [
    "Analyse de la passerelle de paiement...",
    "Vérification des certificats SSL...",
    "Recherche de malwares dans les fichiers vidéo...",
    "Inspection des scripts d'intrusion...",
    "Sécurisation de la base de données locale...",
    "Scan anti-virus en temps réel activé.",
    "Système AVD : 100% Sécurisé."
  ];

  const startScan = () => {
    setIsScanning(true);
    setStatus("scanning");
    setProgress(0);
    setLogs(["Démarrage de l'analyse système..."]);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          
          // Add logs at specific milestones
          if (next % 15 === 0 && next / 15 < scanItems.length) {
            setLogs(prevLogs => [...prevLogs, scanItems[Math.floor(next / 15)]]);
          }
          
          if (next >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setStatus("completed");
            return 100;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <ShieldCheck className="text-green-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Protection Active</h3>
          <p className="text-white/40 text-xs">Surveillance 24/7 de vos transactions</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Lock className="text-blue-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Chiffrement</h3>
          <p className="text-white/40 text-xs">Données bancaires cryptées AES-256</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <Activity className="text-purple-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Anti-Intrusion</h3>
          <p className="text-white/40 text-xs">Pare-feu intelligent intégré</p>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${
              status === "completed" ? "border-green-500 bg-green-500/10" : "border-white/10 bg-white/5"
            }`}>
              {status === "scanning" ? (
                <Search className="w-12 h-12 text-white/50 animate-pulse" />
              ) : status === "completed" ? (
                <ShieldCheck className="w-12 h-12 text-green-500" />
              ) : (
                <Shield className="w-12 h-12 text-white/20" />
              )}
            </div>
            {status === "scanning" && (
              <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {status === "idle" && "Scanner de Sécurité AVD"}
            {status === "scanning" && "Analyse en cours..."}
            {status === "completed" && "Système Entièrement Protégé"}
          </h2>
          <p className="text-white/50 max-w-md mb-8">
            {status === "idle" && "Lancez une analyse complète pour vérifier l'intégrité de votre application et la protection contre les virus."}
            {status === "scanning" && `Progression de l'analyse : ${progress}%`}
            {status === "completed" && "Aucune menace détectée. Votre application est propre et vos paiements sont sécurisés."}
          </p>
          
          {status !== "scanning" && (
            <Button 
              onClick={startScan}
              className="bg-white text-black hover:bg-white/90 font-bold px-8 h-12 rounded-xl"
            >
              {status === "completed" ? "Relancer l'analyse" : "Démarrer l'analyse"}
            </Button>
          )}
        </div>

        {status !== "idle" && (
          <div className="p-8 bg-black/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Logs de Sécurité</span>
              {status === "scanning" && <span className="text-xs text-purple-400 animate-pulse">Scanning...</span>}
            </div>
            <div className="space-y-2 font-mono text-[10px] md:text-xs">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 text-white/60">
                  <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
                  <span className={log.includes("Sécurisé") ? "text-green-400" : ""}>{log}</span>
                </div>
              ))}
            </div>
            {status === "scanning" && (
              <div className="mt-6">
                <Progress value={progress} className="h-1 bg-white/5" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
