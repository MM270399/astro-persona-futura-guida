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
      amore: "Le stelle oggi creano un'energia magnetica intorno a te che attrae connessioni autentiche e profonde. Venere, in aspetto favorevole con Giove, amplifica il tuo fascino naturale e la tua capacità di comunicare con il cuore. Se sei in coppia, questo è il momento perfetto per pianificare qualcosa di speciale insieme - una cena romantica, una passeggiata al tramonto o semplicemente una conversazione sincera che rafforzerà il vostro legame. I single dovrebbero prestare attenzione agli incontri casuali: quello che sembra un semplice sguardo incrociato potrebbe trasformarsi in qualcosa di magico. La Luna nel tuo settore delle relazioni suggerisce di ascoltare più con il cuore che con la mente oggi.",
      lavoro: "Mercurio in posizione dominante nel tuo cielo professionale porta con sé una giornata di grande produttività e riconoscimenti. I tuoi progetti creativi ricevono finalmente l'attenzione che meritano, e i superiori iniziano a notare il tuo impegno costante. È un momento eccellente per presentare nuove idee, proporre soluzioni innovative o candidarti per responsabilità maggiori. La tua capacità di comunicazione è al massimo: usa questa energia per networking, presentazioni importanti o negoziazioni. Tuttavia, evita di prendere decisioni affrettate riguardo cambi di carriera - le stelle consigliano di aspettare almeno fino alla prossima settimana per scelte così importanti. Collaborazioni internazionali o progetti a distanza sono particolarmente favoriti.",
      fortuna: "I numeri che vibrano in sintonia con la tua energia oggi sono 7, 14, 23, 31 e 42. Il colore che amplifica la tua fortuna è il verde smeraldo, da indossare come accessorio o tenere vicino a te. Le ore più propizie sono tra le 10:30 e le 12:00, e poi di nuovo dalle 18:00 alle 19:30. Evita decisioni finanziarie importanti dopo le 20:00, quando l'influenza di Saturno potrebbe offuscare il tuo giudizio. Un incontro casuale con una persona del passato potrebbe portare opportunità inaspettate. La direzione nordest è particolarmente favorevole per te oggi - se devi fare un viaggio o una passeggiata importante, scegli quella direzione."
    },
    monthly: {
      amore: "Questo mese si presenta come un periodo di profonda trasformazione emotiva, guidato dalla danza celeste tra Venere e Marte nel tuo settore dell'amore. Le prime due settimane vedranno un'intensificazione delle emozioni esistenti: le coppie stabili potrebbero decidere di fare il grande passo (convivenza, matrimonio, o progetti comuni), mentre quelle in crisi dovranno affrontare conversazioni decisive. Per i single, la terza settimana del mese porta una ventata di novità con possibili incontri attraverso attività artistiche, culturali o spirituali. Non sottovalutare le amicizie che potrebbero evolversi in qualcosa di più profondo. La Luna Piena a metà mese illuminerà verità nascoste nelle relazioni, portando chiarezza ma anche la necessità di prendere decisioni coraggiose. Verso la fine del mese, l'energia si stabilizza e potrai goderti i frutti delle scelte fatte.",
      lavoro: "Il panorama professionale di questo mese è caratterizzato da opportunità di espansione e crescita, ma richiederà da te determinazione e strategia. Giove nel tuo settore carriera forma aspetti favorevoli che aprono porte precedentemente chiuse: promozioni, nuovi progetti, o addirittura cambi di settore sono all'orizzonte. La prima settimana potrebbe portare una proposta interessante che inizialmente ti sembrerà troppo impegnativa, ma che in realtà rappresenta la chiave per il tuo futuro successo. Verso la metà del mese, la tua reputazione professionale riceve un boost significativo grazie a un progetto completato con successo o a un riconoscimento pubblico. Le ultime due settimane sono ideali per consolidare le posizioni raggiunte e pianificare strategie a lungo termine. Attenzione alle spese eccessive legate al lavoro nella terza settimana.",
      fortuna: "La fortuna ti accompagna in modo particolare nella seconda e quarta settimana del mese, con picchi di energia positiva che favoriscono investimenti saggi e decisioni finanziarie lungimiranti. I settori immobiliare e tecnologico sono particolarmente favoriti per te questo mese. Un'opportunità legata al passato - forse un vecchio investimento o un progetto accantonato - potrebbe tornare a portarti benefici inaspettati. I giorni più fortunati sono il 7, 15, 23 e 28 del mese. Durante questi giorni, fidati del tuo istinto per le decisioni importanti. Una persona nata sotto il segno dell'Acquario o dei Gemelli potrebbe svolgere un ruolo chiave nel tuo successo mensile. Evita investimenti rischiosi durante l'ultima settimana del mese, quando l'influenza di Mercurio retrogrado potrebbe creare confusione."
    }
  };

  const detailedHoroscope = {
    daily: {
      amore: "L'energia di Venere congiunta a Giove nel tuo settore delle relazioni crea oggi un campo magnetico di attrazione irresistibile. Per le coppie consolidate, questo aspetto porta un rinnovamento della passione e dell'intimità: è il momento perfetto per sorprendere il partner con gesti spontanei e romantici. La comunicazione emotiva raggiunge vette di profondità inusuale - le parole non dette finalmente trovano voce, e i sentimenti repressi emergono con dolcezza. I single sono baciati da una fortuna particolare: gli incontri di oggi hanno il potenziale di trasformarsi in storie durature. Presta attenzione ai segnali sottili, ai sorrisi prolungati, alle conversazioni che fluiscono naturalmente. La Luna crescente amplifica la tua sensibilità emotiva, rendendo più facile percepire le vere intenzioni degli altri. Evita però di idealizzare troppo: mantieni i piedi per terra anche quando il cuore vola alto.",
      lavoro: "Mercurio dominante nel tuo settore professionale, supportato da un trigono con Marte, crea le condizioni ideali per breakthrough creativi e successi tangibili. La tua mente è particolarmente acuta oggi, capace di vedere soluzioni dove altri vedono solo problemi. È il momento perfetto per presentare progetti ambiziosi, proporre innovazioni, o candidarti per posizioni di maggiore responsabilità. I colleghi riconoscono la tua leadership naturale e potrebbero cercare la tua guida per questioni complesse. Le negoziazioni avviate oggi hanno ottime probabilità di successo, specialmente se riguardano contratti internazionali o collaborazioni a lungo termine. Tuttavia, l'opposizione di Saturno consiglia prudenza negli investimenti legati al lavoro: analizza bene i rischi prima di impegnare risorse significative. La tua reputazione professionale riceve un boost importante grazie a un riconoscimento o a feedback positivi da clienti importanti.",
      salute: "L'influenza positiva di Marte nel tuo settore della vitalità porta un'ondata di energia fisica e mentale che ti fa sentire invincibile. È il momento ideale per iniziare nuovi regimi di allenamento, sport di squadra, o attività che richiedono resistenza. Il tuo sistema immunitario è particolarmente forte, ma non abusarne: mantieni comunque abitudini sane e regolari. La posizione favorevole della Luna suggerisce di prestare attenzione ai ritmi circadiani - dormire e svegliarsi a orari regolari amplificherà i benefici energetici. Mentalmente, sei in una fase di grande lucidità e concentrazione. È un ottimo momento per meditazione, yoga, o pratiche che integrano corpo e mente. Attenzione solo alla tendenza a esagerare con caffè o stimolanti: la tua energia naturale è già al massimo.",
      famiglia: "L'armonia domestica è favorita da un dolce aspetto tra Luna e Venere, che porta pace e comprensione tra le generazioni. È una giornata perfetta per riunioni familiari, decisioni condivise riguardo la casa, o semplicemente per godere della compagnia dei tuoi cari in un'atmosfera rilassata. I rapporti con i genitori o figure parentali ricevono una dose extra di dolcezza - è il momento di esprimere gratitudine o di risolvere vecchi malintesi con conversazioni sincere. Se ci sono stati attriti recenti, oggi le stelle favoriscono la riconciliazione. I bambini della famiglia sono particolarmente ricettivi e affettuosi. Se stai pianificando cambiamenti nell'ambiente domestico - ristrutturazioni, traslochi, o nuovi arrivi - oggi ricevi segnali chiari sulla direzione giusta da prendere. La casa si trasforma in un vero rifugio di pace e creatività.",
      amicizie: "Giove nel tuo settore sociale crea un'espansione del tuo circolo di amicizie con connessioni che vanno oltre la superficie. Gli amici di vecchia data mostrano un lato di sé che non conoscevi, approfondendo il legame attraverso confidenze e momenti di vera intimità. È probabile che ricevi inviti a eventi sociali che ti permetteranno di incontrare persone influenti o semplicemente molto interessanti. La tua capacità di ascolto e empatia è particolarmente apprezzata oggi: potresti trovarti nel ruolo di confidente o consigliere per chi ti sta vicino. Nuove amicizie nate attraverso interessi comuni - sport, arte, spiritualità - hanno il potenziale di diventare legami duraturi e significativi. Attenzione però a non disperdere troppe energie sociali: scegli con cura gli impegni per mantenere l'equilibrio tra dare e ricevere.",
      crescita: "Plutone in aspetto favorevole nel tuo settore della trasformazione personale apre porte verso nuovi livelli di consapevolezza e crescita interiore. È una giornata potente per l'introspezione profonda, la meditazione, o pratiche che ti connettono con la tua saggezza interiore. Vecchi schemi mentali limitanti iniziano a dissolversi, lasciando spazio a una visione più espansa di te stesso e delle tue possibilità. È il momento perfetto per iniziare percorsi di formazione, corsi di sviluppo personale, o semplicemente per dedicare tempo alla lettura e allo studio di argomenti che nutrono la tua anima. La tua intuizione è particolarmente acuta: fidati delle sensazioni viscerali e dei messaggi che arrivano attraverso sogni o sincronicità. Journaling o altre forme di espressione creativa possono portare rivelazioni importanti sulla tua direzione di vita.",
      finanze: "L'aspetto armonioso tra Giove e Saturno nel tuo settore finanziario crea le condizioni ideali per decisioni economiche sagge e investimenti lungimiranti. È un momento di stabilità crescente, dove la prudenza del passato inizia a dare frutti tangibili. Opportunità di guadagno attraverso competenze creative o progetti personali si presentano in modo naturale - non sottovalutare il valore del tuo talento unico. Se stai considerando investimenti immobiliari, in formazione, o in strumenti finanziari a lungo termine, oggi ricevi segnali chiari sulla strada giusta. Tuttavia, l'opposizione di Mercurio consiglia di evitare acquisti impulsivi o decisioni affrettate riguardo grandi somme. Meglio consultare esperti per investimenti significativi. Un'entrata extra o un rimborso inaspettato potrebbe arrivare proprio quando ne hai bisogno."
    },
    monthly: {
      amore: "Questo mese si presenta come un capitolo di trasformazione profonda nel tuo panorama sentimentale, orchestrato dalla danza celeste tra Venere, Marte e la Luna Nuova nel tuo settore dell'amore. Le prime due settimane vedranno emergere verità nascoste e desideri profondi che potrebbero aver covato sotto la superficie per mesi. Le coppie stabili attraversano una fase di rinnovamento: conversazioni importanti sul futuro, progetti condivisi, o decisioni che consolideranno il legame per anni a venire. Non escludere la possibilità di proposte di matrimonio, convivenze, o l'arrivo di nuovi membri nella famiglia. Per chi vive relazioni in crisi, questo periodo porta la necessità di scelte definitive - non più compromessi al ribasso, ma la ricerca di autenticità e felicità vera. I single sono favoriti da incontri significativi, specialmente attraverso attività culturali, artistiche o spirituali. La persona giusta potrebbe arrivare quando meno te lo aspetti, magari attraverso presentazioni di amici o in contesti professionali. La terza settimana è particolarmente magica per tutti i nuovi inizi amorosi.",
      lavoro: "Il panorama professionale di questo mese è caratterizzato da un'energia di espansione e riconoscimento che ti posiziona al centro dell'attenzione per tutti i motivi giusti. Giove nel tuo settore carriera, supportato da aspetti favorevoli di Mercurio e Sole, apre porte che sembravano chiuse da tempo. La prima settimana potrebbe portare una proposta di lavoro inaspettata, un'offerta di collaborazione prestigiosa, o semplicemente il riconoscimento pubblico per progetti che hai portato avanti con dedizione. Non sottovalutare l'importanza del networking: le connessioni umane che stabilisci ora influenzeranno la tua traiettoria professionale per anni. Verso la metà del mese, un progetto creativo o innovativo riceve il sostegno finanziario o istituzionale necessario per decollare. È anche un periodo favorevole per chi considera un cambio di carriera radicale - le stelle supportano le scelte coraggiose basate sulla passione autentica. Le ultime due settimane sono ideali per consolidare le posizioni raggiunte e gettare le basi per il prossimo ciclo di crescita.",
      salute: "La configurazione planetaria di questo mese crea un campo energetico particolarmente favorevole per la rigenerazione fisica e il benessere globale. Marte nel tuo settore della vitalità, in aspetto armonioso con il Sole, porta un'ondata di energia che ti fa sentire più giovane e dinamico. È il momento perfetto per implementare nuove routine di benessere: sport che ti appassionano davvero, alimentazione più consapevole, o pratiche olistiche che integrano corpo, mente e spirito. La tua resistenza fisica è al massimo - perfetto per sfide atletiche o per recuperare forma dopo periodi di sedentarietà. Mentalmente, attraversi una fase di grande chiarezza e ottimismo. L'influenza positiva di Giove favorisce anche la guarigione emotiva da traumi passati o schemi limitanti. È un mese eccellente per disintossicazioni dolci, check-up preventivi, o per iniziare terapie alternative che sostengono il tuo benessere a 360 gradi. Presta attenzione ai messaggi del tuo corpo e rispetta i suoi ritmi naturali.",
      famiglia: "Le dinamiche familiari attraversano un periodo di rinnovamento e approfondimento dei legami, guidato dall'influenza stabilizzante di Saturno e dalla dolcezza nutritiva della Luna. È un mese in cui le radici familiari si rafforzano attraverso tradizioni condivise, celebrazioni significative, o semplicemente momenti di qualità insieme. Possibili novità importanti riguardano la casa: trasferimenti, ristrutturazioni, acquisti immobiliari, o l'arrivo di nuovi membri (nascite, matrimoni, adozioni). I rapporti con i genitori o figure parentali evolvono verso una dimensione più matura e paritaria - è il momento di conversazioni profonde che sanano vecchie ferite o chiariscono dinamiche complesse. Se ci sono stati conflitti recenti, la seconda e terza settimana offrono opportunità d'oro per la riconciliazione. I bambini della famiglia mostrano progressi significativi o raggiungono traguardi importanti che riempiono tutti di orgoglio. La casa si trasforma in un vero santuario di pace, creatività e amore incondizionato.",
      amicizie: "Il tuo universo sociale si espande in direzioni inaspettate e arricchenti, grazie all'influenza espansiva di Giove nel settore delle amicizie e dei gruppi. Questo mese porta incontri con persone che condividono i tuoi valori più profondi e le tue visioni per il futuro - amicizie che hanno il potenziale di durare una vita intera. Potresti trovarti coinvolto in progetti di gruppo, iniziative comunitarie, o movimenti che ti permettono di contribuire a cause che ti stanno a cuore. Le amicizie esistenti si approfondiscono attraverso esperienze condivise significative: viaggi, corsi, sfide creative che rafforzano i legami. È probabile che diventi un punto di riferimento nel tuo gruppo sociale, qualcuno a cui gli altri si rivolgono per consigli o sostegno. Nuove amicizie potrebbero nascere in contesti inaspettati: attraverso il lavoro, attività spirituali, o semplicemente incontri casuali che si rivelano sincronicità perfette. La quarta settimana è particolarmente favorevole per riunioni di gruppo che consolidano i legami collettivi.",
      crescita: "Questo mese segna un punto di svolta significativo nel tuo percorso di evoluzione personale, con Plutone che forma aspetti trasformativi nel tuo settore della crescita spirituale e mentale. È un periodo di risveglio profondo, in cui vecchie convinzioni limitanti si dissolvono per fare spazio a una comprensione più vasta di te stesso e del tuo posto nel mondo. Potresti sentirti chiamato a esplorare nuovi territori della conoscenza: filosofie antiche, pratiche meditative, psicologia transpersonale, o semplicemente argomenti che nutrono la tua curiosità intellettuale. È un momento potente per terapie di crescita personale, ritiri spirituali, o percorsi formativi che integrano sviluppo professionale e personale. La tua intuizione raggiunge livelli di acutezza straordinari - sogni profetici, sincronicità frequenti, e insight che arrivano durante momenti di quiete. Journaling, arte espressiva, o altre forme di creatività diventano canali preziosi per integrare le nuove comprensioni. Verso la fine del mese, emergerà chiarezza su direzioni di vita che rispecchiano più autenticamente chi stai diventando.",
      finanze: "Il settore finanziario attraversa un periodo di stabilizzazione e crescita sostenibile, guidato dall'influenza saggia di Saturno in aspetto favorevole con Giove. Questo mese porta opportunità concrete di migliorare la tua situazione economica attraverso competenze, talenti, o progetti che rispecchiano la tua autenticità. È un periodo favorevole per investimenti a lungo termine, pianificazione pensionistica, o decisioni che costruiscono sicurezza duratura piuttuto che guadagni immediati. Potresti ricevere proposte di partnership finanziarie, opportunità di investimento in startup innovative, o semplicemente consigli preziosi da mentori esperti. La prima settimana è particolarmente favorevole per negoziazioni salariali o richieste di aumenti basate sui tuoi meriti reali. Verso la metà del mese, un progetto creativo o un talento particolare potrebbe trasformarsi in una fonte di reddito supplementare. Evita però investimenti speculativi durante la terza settimana, quando l'influenza di Mercurio retrogrado potrebbe offuscare la valutazione dei rischi. La disciplina finanziaria praticata negli ultimi mesi inizia a dare frutti tangibili e duraturi."
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
