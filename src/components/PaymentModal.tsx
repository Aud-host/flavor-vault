import React, { useState } from "react";
import { X, CreditCard, Smartphone, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Video } from "@/lib/mock-data";

interface PaymentModalProps {
  video: Video;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = "card" | "mobile_money";

export const PaymentModal: React.FC<PaymentModalProps> = ({ video, onClose, onSuccess }) => {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [operator, setOperator] = useState<"orange" | "mtn">("orange");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success("Paiement réussi !");
      
      // Notify parent after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-md p-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Paiement Confirmé !</h2>
          <p className="text-white/60 mb-6">
            Votre achat de <strong>{video.title}</strong> a été effectué avec succès. 
            Le téléchargement va commencer.
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
            <ShieldCheck size={16} />
            Transaction sécurisée par AVD
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Finaliser l'achat</h2>
            <p className="text-white/50 text-sm">{video.title} — {video.price} FCFA</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePayment} className="p-6">
          {/* Method Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                method === "card" 
                  ? "border-purple-500 bg-purple-500/10" 
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <CreditCard className={`mb-2 ${method === "card" ? "text-purple-400" : "text-white/40"}`} />
              <span className={`text-xs font-bold ${method === "card" ? "text-white" : "text-white/40"}`}>
                Carte Bancaire
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMethod("mobile_money")}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                method === "mobile_money" 
                  ? "border-orange-500 bg-orange-500/10" 
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <Smartphone className={`mb-2 ${method === "mobile_money" ? "text-orange-400" : "text-white/40"}`} />
              <span className={`text-xs font-bold ${method === "mobile_money" ? "text-white" : "text-white/40"}`}>
                Mobile Money
              </span>
            </button>
          </div>

          {method === "card" ? (
            <div className="space-y-4 animate-in slide-in-from-left-2 duration-300">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-white/60">Numéro de carte</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    placeholder="0000 0000 0000 0000" 
                    className="bg-white/5 border-white/10 text-white h-12 pl-10"
                    required
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-white/60">Expiration</Label>
                  <Input id="expiry" placeholder="MM/YY" className="bg-white/5 border-white/10 text-white h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-white/60">CVV</Label>
                  <Input id="cvv" placeholder="123" className="bg-white/5 border-white/10 text-white h-12" required />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOperator("orange")}
                  className={`flex-1 p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                    operator === "orange" ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-[#FF7900] flex items-center justify-center text-[10px] font-bold text-white">
                    Orange
                  </div>
                  <span className="text-[10px] font-bold text-white/60">Orange Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOperator("mtn")}
                  className={`flex-1 p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                    operator === "mtn" ? "border-yellow-500 bg-yellow-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-[#FFCC00] flex items-center justify-center text-[10px] font-bold text-black">
                    MTN
                  </div>
                  <span className="text-[10px] font-bold text-white/60">MTN MoMo</span>
                </button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/60">Numéro de téléphone</Label>
                <div className="relative">
                  <Input 
                    id="phone" 
                    placeholder="6XX XX XX XX" 
                    className="bg-white/5 border-white/10 text-white h-12 pl-12"
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 font-medium">+237</span>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center italic">
                Une demande de confirmation sera envoyée sur votre téléphone.
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isProcessing}
            className={`w-full h-14 rounded-2xl mt-8 font-bold text-lg transition-all ${
              method === "card" 
                ? "bg-purple-600 hover:bg-purple-500" 
                : "bg-orange-600 hover:bg-orange-500"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Traitement...
              </span>
            ) : (
              `Payer ${video.price} FCFA`
            )}
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-xs">
            <ShieldCheck size={14} />
            Paiement 100% sécurisé via AVD Gateway
          </div>
        </form>
      </div>
    </div>
  );
};
