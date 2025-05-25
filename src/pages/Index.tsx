
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Stars, Moon, Sun, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import HoroscopeResult from "@/components/HoroscopeResult";

const Index = () => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [selectedType, setSelectedType] = useState<"quick" | "detailed" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenerateHoroscope = (type: "quick" | "detailed") => {
    if (birthDate && birthTime && birthPlace) {
      setSelectedType(type);
      setShowResult(true);
    }
  };

  const resetForm = () => {
    setShowResult(false);
    setSelectedType(null);
  };

  if (showResult && selectedType) {
    return (
      <HoroscopeResult 
        type={selectedType}
        birthData={{
          date: birthDate!,
          time: birthTime,
          place: birthPlace
        }}
        onBack={resetForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Stelle animate di sfondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Moon className="w-16 h-16 text-yellow-300 animate-pulse" />
              <Stars className="w-8 h-8 text-white absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
            AstroPersonale
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-4 max-w-3xl mx-auto">
            Scopri il tuo destino attraverso l'antica saggezza delle stelle
          </p>
          
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Inserisci i tuoi dati di nascita per ricevere un oroscopo personalizzato basato sulla posizione esatta dei pianeti nel momento della tua nascita
          </p>
        </div>

        {/* Form Card */}
        <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-lg border-purple-500/30 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              I Tuoi Dati Natali
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </CardTitle>
            <CardDescription className="text-purple-200">
              Più precisi sono i dati, più accurato sarà il tuo oroscopo
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Data di nascita */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-white text-lg">Data di Nascita</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/10 border-purple-500/50 text-white hover:bg-white/20",
                      !birthDate && "text-purple-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "dd/MM/yyyy") : "Seleziona la tua data di nascita"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black/90 border-purple-500/50" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Ora di nascita */}
            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-white text-lg">Ora di Nascita</Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="bg-white/10 border-purple-500/50 text-white placeholder-purple-300"
                placeholder="Es: 14:30"
              />
            </div>

            {/* Luogo di nascita */}
            <div className="space-y-2">
              <Label htmlFor="birthPlace" className="text-white text-lg">Luogo di Nascita</Label>
              <Input
                id="birthPlace"
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="bg-white/10 border-purple-500/50 text-white placeholder-purple-300"
                placeholder="Es: Roma, Italia"
              />
            </div>

            {/* Bottoni tipo oroscopo */}
            <div className="space-y-4 pt-6">
              <h3 className="text-xl text-white text-center mb-4">Scegli il tuo oroscopo</h3>
              
              <div className="grid gap-4">
                <Button
                  onClick={() => handleGenerateHoroscope("quick")}
                  disabled={!birthDate || !birthTime || !birthPlace}
                  className="w-full py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Sun className="w-5 h-5 mr-2" />
                  Oroscopo Veloce
                  <span className="block text-sm font-normal mt-1 opacity-90">
                    Amore • Lavoro • Fortuna
                  </span>
                </Button>

                <Button
                  onClick={() => handleGenerateHoroscope("detailed")}
                  disabled={!birthDate || !birthTime || !birthPlace}
                  className="w-full py-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Stars className="w-5 h-5 mr-2" />
                  Oroscopo Dettagliato
                  <span className="block text-sm font-normal mt-1 opacity-90">
                    Analisi completa di tutti gli aspetti della vita
                  </span>
                </Button>
              </div>

              {(!birthDate || !birthTime || !birthPlace) && (
                <p className="text-purple-300 text-sm text-center mt-4">
                  Compila tutti i campi per generare il tuo oroscopo personalizzato
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Moon className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalizzato</h3>
            <p className="text-purple-200">Basato sui tuoi dati natali reali</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stars className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Accurato</h3>
            <p className="text-purple-200">Calcoli astrologici precisi</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Dettagliato</h3>
            <p className="text-purple-200">Oroscopi giornalieri e mensili</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
