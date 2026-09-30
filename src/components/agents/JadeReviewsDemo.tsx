import React, { useState, useEffect } from "react";
import { Star, Send, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export function JadeReviewsDemo() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [step, setStep] = useState("rating"); // 'rating', 'redirecting', 'feedback', 'thank-you'
  const [countdown, setCountdown] = useState(3);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    feedback: "",
  });

  const googleReviewLink =
    "https://www.google.com/search?q=ugolf+bordeaux+cameyrac&sca_esv=83e64d13dadc637d&biw=1920&bih=945&sxsrf=APpeQnvPwY9LC1ywF2EKL_j8-LpJCsusPA%3A1784735943278&ei=x-hgao7AEP6DkdUPzJXB0AQ&gs_ssp=eJzj4tZP1zcsSalKKkrJNWC0UjGoSDE1NTY0skhLMjcyMTFJszKoSLFMsTAyT0wytUwzTks2MvESL03Pz0lTSMovSklNLK1QSE7MTa0sSkwGAGGFF-M&oq=ugolf+bordeau&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXVnb2xmIGJvcmRlYXUqAggBMgUQABiABDILEC4YgAQYxwEYrwEyBRAAGIAEMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBRAAGO8FMgUQABjvBUi_mwVQ0YQFWNGSBXACeAGQAQCYAX2gAfwGqgEDMC44uAEDyAEA-AEBmAIKoAKqB8ICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIOEAAY5AIY1gQYsAPYAQHCAhkQLhiABBiKBRhDGMcBGNEDGMgDGLAD2AEBwgIKEAAYgAQYigUYQ8ICCxAuGK8BGMcBGIAEwgINEC4YgAQYxwEYrwEYCsICBxAAGIAEGArCAggQABgWGB4YCsICCBAAGIAEGKIEmAMAiAYBkAYRugYGCAEQARgJkgcDMi44oAeMUbIHAzAuOLgHoQfCBwUwLjQuNsgHIYAIAQ&sclient=gws-wiz-serp#lrd=0xd553128fb72444f:0xd9d827ab59f3fc24,3,,,,";
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "redirecting" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (step === "redirecting" && countdown === 0) {
      window.open(googleReviewLink, "_blank");
      setStep("thank-you");
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleRatingSelect = (val: number) => {
    setRating(val);
    if (val >= 4) {
      setStep("redirecting");
    } else {
      setStep("feedback");
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("thank-you");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-[rgba(10,30,15,0.08)] rounded-2xl p-8 shadow-[0_24px_60px_-28px_rgba(16,60,28,0.35)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#32dc32]/20">
        <div
          className="h-full bg-[#32dc32] transition-all duration-500"
          style={{
            width:
              step === "thank-you"
                ? "100%"
                : step === "feedback" || step === "redirecting"
                  ? "50%"
                  : "10%",
          }}
        />
      </div>

      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-[#0b0f0c] mb-2">Jade Reviews AI</h3>
        <p className="text-[#5b645f] text-sm">Simulation de collecte d'avis intelligente</p>
      </div>

      {step === "rating" && (
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-lg text-[#0b0f0c] mb-6 font-medium text-center">
            Comment s'est passée votre expérience ?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRatingSelect(star)}
              >
                <Star
                  size={48}
                  className={`transition-colors duration-200 ${
                    star <= (hover || rating) ? "fill-[#32dc32] text-[#16a34a]" : "text-[#d4dbd6]"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#7a847e] uppercase tracking-widest">
            Cliquez sur les étoiles pour tester
          </p>
        </div>
      )}

      {step === "redirecting" && (
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-[#32dc32]/10 flex items-center justify-center mb-6">
            <ExternalLink size={32} className="text-[#16a34a] animate-pulse" />
          </div>
          <h4 className="text-xl font-bold text-[#0b0f0c] mb-4">Merci pour votre confiance !</h4>
          <p className="text-[#5b645f] mb-8 max-w-md">
            Votre satisfaction est notre priorité. Vous allez être redirigé vers Google pour
            partager votre expérience avec la communauté dans...
          </p>
          <div className="text-6xl font-black text-[#16a34a] mb-8">{countdown}</div>
          <Button
            onClick={() => window.open(googleReviewLink, "_blank")}
            className="bg-[#32dc32] text-black hover:brightness-105 font-bold"
          >
            Ouvrir Google maintenant
          </Button>
        </div>
      )}

      {step === "feedback" && (
        <form
          onSubmit={handleFeedbackSubmit}
          className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${star <= rating ? "fill-[#32dc32] text-[#16a34a]" : "text-[#d4dbd6]"}`}
                />
              ))}
            </div>
            <span className="text-xs text-[#7a847e]">Nous souhaitons nous améliorer</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#5b645f]">
              Nom complet
            </Label>
            <Input
              id="fullName"
              required
              placeholder="Ex: Jean Dupont"
              className="bg-white border-[#dfe5e1] text-[#0b0f0c] focus:border-[#32dc32]"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#5b645f]">
              Téléphone
            </Label>
            <Input
              id="phone"
              required
              type="tel"
              placeholder="Ex: 06 12 34 56 78"
              className="bg-white border-[#dfe5e1] text-[#0b0f0c] focus:border-[#32dc32]"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-[#5b645f]">
              Qu'est-ce qui n'a pas été dans votre expérience ?
            </Label>
            <Textarea
              id="feedback"
              required
              placeholder="Dites-nous tout..."
              className="bg-white border-[#dfe5e1] text-[#0b0f0c] focus:border-[#32dc32] min-h-[120px]"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#32dc32] text-black hover:brightness-105 font-bold py-6"
          >
            Envoyer mon feedback
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      )}

      {step === "thank-you" && (
        <div className="flex flex-col items-center text-center py-8 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-[#32dc32]/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-[#16a34a]" />
          </div>
          <h4 className="text-2xl font-bold text-[#0b0f0c] mb-4">Merci pour votre retour !</h4>
          <p className="text-[#5b645f] max-w-md leading-relaxed">
            {rating >= 4
              ? "Votre avis nous aide énormément à faire connaître nos services. Merci encore pour votre temps !"
              : "Merci beaucoup pour votre feedback, cela nous aidera à améliorer nos services. Nous allons étudier cela en interne et reviendrons vers vous."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setStep("rating");
              setRating(0);
              setCountdown(3);
              setFormData({ fullName: "", phone: "", feedback: "" });
            }}
            className="mt-8 border-[#dfe5e1] text-[#5b645f] hover:text-[#0b0f0c] hover:bg-[#f1f4f2]"
          >
            Recommencer la démo
          </Button>
        </div>
      )}
    </div>
  );
}
