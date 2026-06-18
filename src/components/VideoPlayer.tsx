import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, Maximize, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Video } from "@/lib/mock-data";

interface VideoPlayerProps {
  video: Video;
  isPurchased: boolean;
  onDownloadClick: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isPurchased, onDownloadClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="relative group aspect-video bg-black">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
        />
        
        {/* Custom Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-purple-400 transition-colors">
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>
              <Volume2 size={20} className="text-white/70" />
              <span className="text-xs text-white/50">{video.duration}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={handleFullscreen} className="text-white hover:text-purple-400 transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                {video.genre}
              </span>
              {video.isFree ? (
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                  Gratuit
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                  Payant
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{video.title}</h2>
            <p className="text-white/60 font-medium">Artiste: {video.artist}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {!isPurchased && !video.isFree ? (
              <Button 
                onClick={onDownloadClick}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-6 h-12 rounded-xl flex items-center gap-2"
              >
                <Lock size={18} />
                Acheter ({video.price} FCFA)
              </Button>
            ) : (
              <Button 
                onClick={onDownloadClick}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 h-12 rounded-xl flex items-center gap-2"
              >
                <Download size={18} />
                Télécharger {video.isFree ? "Gratuitement" : ""}
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/5">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-2">À propos du clip</h3>
          <p className="text-white/70 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
