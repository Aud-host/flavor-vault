import { useState, useEffect } from "react";
import { MOCK_VIDEOS, Video, Genre } from "@/lib/mock-data";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PaymentModal } from "@/components/PaymentModal";
import { SecurityScanner } from "@/components/SecurityScanner";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Play, Download, Search, Filter, Library, ShieldCheck, Home } from "lucide-react";
import { Input } from "@/components/ui/input";

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "library" | "security">("home");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | "Tous">("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Load purchases from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("avd_purchases");
    if (saved) {
      setPurchasedIds(JSON.parse(saved));
    }
  }, []);

  // Save purchases to localStorage
  const savePurchase = (id: string) => {
    const newPurchased = [...purchasedIds, id];
    setPurchasedIds(newPurchased);
    localStorage.setItem("avd_purchases", JSON.stringify(newPurchased));
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadAction = (video: Video) => {
    if (video.isFree || purchasedIds.includes(video.id)) {
      toast.success(`Le téléchargement de "${video.title}" a commencé !`);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedVideo) {
      savePurchase(selectedVideo.id);
      setShowPaymentModal(false);
      toast.success(`Merci pour votre achat ! Vous pouvez maintenant télécharger "${selectedVideo.title}".`);
    }
  };

  const filteredVideos = MOCK_VIDEOS.filter(v => {
    const matchesGenre = selectedGenre === "Tous" || v.genre === selectedGenre;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         v.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const libraryVideos = MOCK_VIDEOS.filter(v => v.isFree || purchasedIds.includes(v.id));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <Toaster position="top-center" richColors />
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => { setActiveTab("home"); setSelectedVideo(null); }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/20">
                AVD
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                AVD
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => { setActiveTab("home"); setSelectedVideo(null); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "home"
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:inline">Accueil</span>
              </button>
              <button
                onClick={() => { setActiveTab("library"); setSelectedVideo(null); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "library"
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <Library size={18} />
                <span className="hidden sm:inline">Ma Bibliothèque</span>
              </button>
              <button
                onClick={() => { setActiveTab("security"); setSelectedVideo(null); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "security"
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <ShieldCheck size={18} />
                <span className="hidden sm:inline">Sécurité</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Active Player View */}
        {selectedVideo && (
          <div className="bg-black/40 border-b border-white/5">
            <div className="max-w-5xl mx-auto px-4 py-8">
              <VideoPlayer 
                video={selectedVideo} 
                isPurchased={purchasedIds.includes(selectedVideo.id)}
                onDownloadClick={() => handleDownloadAction(selectedVideo)}
              />
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!selectedVideo && (
              <section className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    AVD STREAMING
                  </span>
                </h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                  Découvrez le futur du <span className="text-white font-bold">Trap, Rap, Hip Hop, Afropop et Afrotrap</span>. 
                  Soutenez les artistes indépendants du Cameroun et d'ailleurs.
                </p>
              </section>
            )}

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                {["Tous", "Trap", "Rap", "Hip Hop", "Afropop", "Afrotrap"].map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre as any)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      selectedGenre === genre
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un clip ou un artiste..."
                  className="bg-white/5 border-white/10 h-12 pl-12 rounded-2xl focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 cursor-pointer shadow-xl"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="currentColor" size={24} />
                      </div>
                    </div>
                    {video.isFree ? (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-green-500 text-white text-[10px] font-black uppercase">
                        Gratuit
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-orange-500 text-white text-[10px] font-black uppercase">
                        {video.price} FCFA
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">{video.title}</h3>
                    <p className="text-white/40 text-sm font-medium">{video.artist}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-400/80 uppercase tracking-widest">{video.genre}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDownloadAction(video); }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="py-32 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-white/20" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun clip trouvé</h3>
                <p className="text-white/40">Essayez de modifier votre recherche ou vos filtres.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "library" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">Ma Bibliothèque</h1>
                <p className="text-white/40 font-medium">Retrouvez tous vos clips favoris et vos achats.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-sm font-bold text-white/60">{libraryVideos.length}</span>
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Titres</span>
              </div>
            </div>

            {libraryVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {libraryVideos.map((video) => (
                  <div 
                    key={video.id}
                    className="group bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer shadow-xl"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                            <Play fill="currentColor" size={20} />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-widest">Lire maintenant</span>
                      </div>
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base mb-0.5 line-clamp-1">{video.title}</h3>
                        <p className="text-white/40 text-xs">{video.artist}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDownloadAction(video); }}
                        className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 rounded-[40px] border border-white/10 p-24 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-full flex items-center justify-center mb-8">
                  <Library className="w-10 h-10 text-white/20" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Votre bibliothèque est vide</h2>
                <p className="text-white/40 max-w-sm mx-auto mb-10 leading-relaxed">
                  Explorez nos exclusivités et achetez des clips pour commencer votre collection.
                </p>
                <Button 
                  onClick={() => setActiveTab("home")}
                  className="bg-white text-black hover:bg-white/90 font-bold px-10 h-14 rounded-2xl shadow-xl shadow-white/5"
                >
                  Découvrir des clips
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
              <h1 className="text-4xl font-black mb-2 tracking-tight">Sécurité & Protection</h1>
              <p className="text-white/40 font-medium">Votre tranquillité d'esprit est notre priorité absolue.</p>
            </div>
            <SecurityScanner />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#111111] mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-bold text-lg">
                  AVD
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AVD
                </span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed">
                AVD est la première plateforme dédiée à la promotion des artistes indépendants 
                de la scène urbaine. Découvrez, streamez et possédez le meilleur de la culture.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/80">Genres</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Trap</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Rap</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Hip Hop</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Afropop</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Afrotrap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/80">Aide & Sécurité</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Protection Anti-virus</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Paiements Sécurisés</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Support Orange / MTN</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Confidentialité</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20 font-medium">© 2024 AVD - Artiste Vidéo Digital. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
               <div className="flex gap-2 items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-help">
                  <div className="w-8 h-5 bg-white rounded-sm flex items-center justify-center text-[6px] font-bold text-blue-800">VISA</div>
                  <div className="w-8 h-5 bg-white rounded-sm flex items-center justify-center text-[6px] font-bold text-red-600">MasterCard</div>
                  <div className="w-8 h-5 bg-[#FF7900] rounded-sm flex items-center justify-center text-[6px] font-bold text-white">ORANGE</div>
                  <div className="w-8 h-5 bg-[#FFCC00] rounded-sm flex items-center justify-center text-[6px] font-bold text-black">MTN</div>
               </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      {showPaymentModal && selectedVideo && (
        <PaymentModal 
          video={selectedVideo}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default App;
