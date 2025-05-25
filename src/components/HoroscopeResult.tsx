
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, Briefcase, DollarSign, Home, Users, Brain, Zap, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface HoroscopeResultProps {
  type: "quick" | "detailed";
  birthData: {
    date: Date;
    time: string;
    place: string;
  };
  onBack: () => void;
}

const HoroscopeResult = ({ type, birthData, onBack }: HoroscopeResultProps) => {
  const [activeTab, setActiveTab] = useState("daily");

  // Simulazione dati oroscopo (in una app reale verrebbero da API astrologiche)
  const getZodiacSign = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Ariete";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Toro";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemelli";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancro";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leone";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Vergine";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Bilancia";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpione";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittario";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorno";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acquario";
    return "Pesci";
  };

  const zodiacSign = getZodiacSign(birthData.date);

  const quickHoroscope = {
    daily: {
      amore: "Le stelle favoriscono i nuovi incontri oggi. Venere in posizione favorevole porta armonia nelle relazioni esistenti.",
      lavoro: "Giornata produttiva con opportunità di crescita. La tua creatività sarà particolarmente apprezzata dai colleghi.",
      fortuna: "I numeri fortunati di oggi sono 7, 14, 23. Evita decisioni importanti dopo le 18:00."
    },
    monthly: {
      amore: "Questo mese porta trasformazioni positive in amore. I single potrebbero incontrare qualcuno di speciale verso la metà del mese.",
      lavoro: "Periodo di crescita professionale. Nuovi progetti e collaborazioni sono favoriti dalle stelle.",
      fortuna: "La fortuna ti accompagna specialmente nella seconda settimana del mese. Ottimo momento per investimenti."
    }
  };

  const detailedHoroscope = {
    daily: {
      amore: "Venere nel tuo settore delle relazioni porta dolcezza e comprensione. È il momento ideale per chiarire malintesi e rafforzare i legami.",
      lavoro: "Mercurio favorisce le comunicazioni professionali. Presentazioni e negoziazioni saranno particolarmente efficaci oggi.",
      salute: "Energia in crescita grazie alla posizione favorevole di Marte. Dedica tempo all'attività fisica per massimizzare i benefici.",
      famiglia: "Armonia domestica favorita dalla Luna. È un ottimo momento per riunioni familiari e decisioni condivise.",
      amicizie: "Le stelle favoriscono nuove amicizie e il consolidamento di quelle esistenti. Sii aperto alle sorprese sociali.",
      crescita: "Giornata ideale per l'introspezione e la crescita personale. Medita sulle tue priorità e obiettivi futuri.",
      finanze: "Aspetti planetari favorevoli per gli investimenti a lungo termine. Evita spese impulsive nella serata."
    },
    monthly: {
      amore: "Mese di grande trasformazione emotiva. Le relazioni si approfondiscono e i single attraggono partner compatibili.",
      lavoro: "Periodo di espansione professionale con opportunità di leadership. La tua reputazione cresce significativamente.",
      salute: "Equilibrio energetico stabile. Focus su alimentazione e routine di benessere per ottimizzare la vitalità.",
      famiglia: "Mese di celebrazioni e riunioni importanti. Possibili novità positive che riguardano tutto il nucleo familiare.",
      amicizie: "Espansione del tuo circolo sociale. Nuove amicizie portano opportunità inaspettate e crescita personale.",
      crescita: "Periodo di risveglio spirituale e mentale. Corsi, studi e nuove competenze sono fortemente favoriti.",
      finanze: "Stabilità economica in crescita. Investimenti saggi e gestione oculata delle risorse portano frutti duraturi."
    }
  };

  const currentHoroscope = type === "quick" ? quickHoroscope : detailedHoroscope;

  const QuickHoroscopeCard = ({ period, data }: { period: "daily" | "monthly", data: any }) => (
    <div className="space-y-6">
      <Card className="bg-red-500/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Amore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-100">{data.amore}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Lavoro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100">{data.lavoro}</p>
        </CardContent>
      </Card>

      <Card className="bg-yellow-500/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            Fortuna
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-100">{data.fortuna}</p>
        </CardContent>
      </Card>
    </div>
  );

  const DetailedHoroscopeCard = ({ period, data }: { period: "daily" | "monthly", data: any }) => (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-red-500/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Amore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-100">{data.amore}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Lavoro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100">{data.lavoro}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-500/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-400" />
            Salute
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-100">{data.salute}</p>
        </CardContent>
      </Card>

      <Card className="bg-purple-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-purple-400" />
            Famiglia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100">{data.famiglia}</p>
        </CardContent>
      </Card>

      <Card className="bg-orange-500/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            Amicizie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-100">{data.amicizie}</p>
        </CardContent>
      </Card>

      <Card className="bg-indigo-500/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            Crescita Personale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-100">{data.crescita}</p>
        </CardContent>
      </Card>

      {data.finanze && (
        <Card className="bg-yellow-500/20 border-yellow-500/30 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              Finanze
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-100">{data.finanze}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Stelle animate di sfondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna Indietro
          </Button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
              Il Tuo Oroscopo {type === "quick" ? "Veloce" : "Dettagliato"}
            </h1>
            
            <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-white text-lg font-semibold">Segno Zodiacale: {zodiacSign}</p>
              <p className="text-purple-200">
                Nato il {format(birthData.date, "dd MMMM yyyy", { locale: it })} alle {birthData.time}
              </p>
              <p className="text-purple-300">a {birthData.place}</p>
            </div>
          </div>
        </div>

        {/* Tabs per giornaliero/mensile */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-purple-500/30">
            <TabsTrigger 
              value="daily" 
              className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Oroscopo Giornaliero
            </TabsTrigger>
            <TabsTrigger 
              value="monthly"
              className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Clock className="w-4 h-4 mr-2" />
              Oroscopo Mensile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-8">
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">
                  Oroscopo di Oggi - {format(new Date(), "dd MMMM yyyy", { locale: it })}
                </CardTitle>
                <CardDescription className="text-purple-200 text-center">
                  Le stelle hanno preparato questo messaggio speciale per te
                </CardDescription>
              </CardHeader>
              <CardContent>
                {type === "quick" ? (
                  <QuickHoroscopeCard period="daily" data={currentHoroscope.daily} />
                ) : (
                  <DetailedHoroscopeCard period="daily" data={currentHoroscope.daily} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-8">
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">
                  Oroscopo Mensile - {format(new Date(), "MMMM yyyy", { locale: it })}
                </CardTitle>
                <CardDescription className="text-purple-200 text-center">
                  Panoramica astrale per tutto il mese
                </CardDescription>
              </CardHeader>
              <CardContent>
                {type === "quick" ? (
                  <QuickHoroscopeCard period="monthly" data={currentHoroscope.monthly} />
                ) : (
                  <DetailedHoroscopeCard period="monthly" data={currentHoroscope.monthly} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HoroscopeResult;
