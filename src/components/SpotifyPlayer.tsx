import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, ExternalLink, Music, Headphones, Radio } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
  preview_url: string | null;
  image: string;
  spotify_url: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Track[];
}

export const SpotifyPlayer: React.FC = () => {
  const { themeConfig } = useTheme();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.7);
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(32).fill(0));
  const [beatIntensity, setBeatIntensity] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  // Sample playlists - replace with your actual Spotify data
  const playlists: Playlist[] = [
    {
      id: 'coding-vibes',
      name: 'Coding Vibes',
      description: 'Perfect beats for deep focus sessions',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      tracks: [
        {
          id: '1',
          name: 'Midnight City',
          artist: 'M83',
          album: 'Hurry Up, We\'re Dreaming',
          duration: '4:03',
          preview_url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        },
        {
          id: '2',
          name: 'Strobe',
          artist: 'Deadmau5',
          album: 'For Lack of a Better Name',
          duration: '10:32',
          preview_url: null,
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        },
        {
          id: '3',
          name: 'Resonance',
          artist: 'HOME',
          album: 'Odyssey',
          duration: '3:32',
          preview_url: null,
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        }
      ]
    },
    {
      id: 'workout-energy',
      name: 'Workout Energy',
      description: 'High-energy tracks for skateboarding and stunts',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      tracks: [
        {
          id: '4',
          name: 'Till I Collapse',
          artist: 'Eminem',
          album: 'The Eminem Show',
          duration: '4:57',
          preview_url: null,
          image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        },
        {
          id: '5',
          name: 'Bangarang',
          artist: 'Skrillex',
          album: 'Bangarang EP',
          duration: '3:35',
          preview_url: null,
          image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        }
      ]
    },
    {
      id: 'chill-vibes',
      name: 'Chill Vibes',
      description: 'Relaxing tunes for streaming and late-night coding',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      tracks: [
        {
          id: '6',
          name: 'Weightless',
          artist: 'Marconi Union',
          album: 'Weightless',
          duration: '8:08',
          preview_url: null,
          image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
          spotify_url: '#',
        }
      ]
    }
  ];

  const currentPlaylist = playlists[selectedPlaylist];

  useEffect(() => {
    if (currentPlaylist.tracks.length > 0 && !currentTrack) {
      setCurrentTrack(currentPlaylist.tracks[0]);
    }
  }, [selectedPlaylist, currentPlaylist.tracks, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 30);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      playNext();
    };

    const setupAudioAnalyzer = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
        
        const source = audioContextRef.current.createMediaElementSource(audio);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    };

    const analyzeAudio = () => {
      if (!analyserRef.current) return;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Convert to normalized values
      const normalizedData = Array.from(dataArray).map(value => value / 255);
      setAudioData(normalizedData);
      
      // Calculate beat intensity (average of low-mid frequencies)
      const lowMidFreqs = normalizedData.slice(2, 8);
      const intensity = lowMidFreqs.reduce((sum, val) => sum + val, 0) / lowMidFreqs.length;
      setBeatIntensity(intensity);
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(analyzeAudio);
      }
    };

    const handlePlay = () => {
      setupAudioAnalyzer();
      analyzeAudio();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.preview_url) return;

    setIsLoading(true);
    
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.src = currentTrack.preview_url;
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setCurrentTime(0);
    
    if (track.preview_url) {
      setTimeout(() => togglePlay(), 100);
    }
  };

  const playNext = () => {
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    playTrack(currentPlaylist.tracks[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.tracks.length - 1 : currentIndex - 1;
    playTrack(currentPlaylist.tracks[prevIndex]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="space-y-8">
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`p-4 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border`}>
            <Headphones className={`w-8 h-8 ${themeConfig.accent}`} />
          </div>
          <div className={`p-4 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border`}>
            <Music className={`w-8 h-8 ${themeConfig.accentSecondary}`} />
          </div>
          <div className={`p-4 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border`}>
            <Radio className={`w-8 h-8 ${themeConfig.accent}`} />
          </div>
        </div>
        
        <h3 className={`text-4xl font-display font-bold ${themeConfig.textPrimary} mb-4`}>
          My Musical Universe
        </h3>
        <p className={`text-xl ${themeConfig.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
          Music isn't just background noise for me—it's the fuel that powers my creativity. 
          From deep focus coding sessions to high-energy skateboarding, every moment has its perfect soundtrack. 
          Dive into my carefully curated playlists and discover the beats that drive my passion.
        </p>
      </div>

      {/* Playlist Selector */}
      <div className="flex flex-wrap justify-center gap-4">
        {playlists.map((playlist, index) => (
          <button
            key={playlist.id}
            onClick={() => setSelectedPlaylist(index)}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${
              selectedPlaylist === index 
                ? `ring-2 ring-current ${themeConfig.accent}` 
                : ''
            }`}
          >
            <div className="relative">
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className={`font-display font-semibold text-white text-sm mb-1`}>
                  {playlist.name}
                </h4>
                <p className="text-white/70 text-xs">
                  {playlist.tracks.length} tracks
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Player */}
      {currentTrack && (
        <div className={`${themeConfig.cardBg} ${themeConfig.border} border rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden`}>
          {/* Beat-responsive background */}
          <div 
            className="absolute inset-0 opacity-20 transition-all duration-100"
            style={{
              background: `radial-gradient(circle at center, ${themeConfig.accent.replace('text-', '').replace('-400', '')}-400 0%, transparent 70%)`,
              transform: `scale(${1 + beatIntensity * 0.3})`,
            }}
          />
          
          {/* Floating beat particles */}
          {isPlaying && audioData.slice(0, 8).map((intensity, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 rounded-full opacity-60"
              style={{
                background: `linear-gradient(45deg, ${themeConfig.accent.replace('text-', '').replace('-400', '')}-400, ${themeConfig.accentSecondary.replace('text-', '').replace('-400', '')}-400)`,
                left: `${10 + index * 12}%`,
                top: `${20 + Math.sin(Date.now() * 0.01 + index) * 10}%`,
                transform: `scale(${0.5 + intensity * 2}) translateY(${-intensity * 20}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          ))}
          
          <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
            {/* Album Art */}
            <div className="flex justify-center lg:justify-start relative">
              <div className="relative group">
                <img 
                  src={currentTrack.image} 
                  alt={currentTrack.album}
                  className="w-48 h-48 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: isPlaying ? `hue-rotate(${beatIntensity * 30}deg) saturate(${1 + beatIntensity * 0.5})` : 'none',
                    transform: `scale(${1 + beatIntensity * 0.05}) rotate(${beatIntensity * 2}deg)`,
                  }}
                />
                
                {/* Pulsing ring around album art */}
                {isPlaying && (
                  <div 
                    className="absolute inset-0 rounded-2xl border-2 opacity-60"
                    style={{
                      borderColor: themeConfig.accent.replace('text-', '').replace('-400', '') + '-400',
                      transform: `scale(${1.1 + beatIntensity * 0.2})`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  />
                )}
                
                {/* Audio visualizer bars around album */}
                {isPlaying && (
                  <div className="absolute -inset-4 flex items-end justify-center space-x-1">
                    {audioData.slice(0, 16).map((intensity, index) => (
                      <div
                        key={index}
                        className="w-1 bg-gradient-to-t opacity-70 rounded-full"
                        style={{
                          height: `${Math.max(4, intensity * 40)}px`,
                          background: `linear-gradient(to top, ${themeConfig.accent.replace('text-', '').replace('-400', '')}-400, ${themeConfig.accentSecondary.replace('text-', '').replace('-400', '')}-400)`,
                          transform: `scaleY(${0.3 + intensity * 2})`,
                          transition: 'transform 0.1s ease-out',
                        }}
                      />
                    ))}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-4 right-4 p-2 ${themeConfig.cardBg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <Heart className={`w-5 h-5 ${themeConfig.accent}`} />
                </div>
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="text-center lg:text-left space-y-6">
              <div>
                <h3 className={`text-3xl font-display font-bold ${themeConfig.textPrimary} mb-2`}>
                  {currentTrack.name}
                </h3>
                <p className={`text-xl ${themeConfig.textSecondary} mb-2`}>
                  {currentTrack.artist}
                </p>
                <p className={`${themeConfig.textSecondary} opacity-75`}>
                  {currentTrack.album}
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-6">
                  <button
                    onClick={playPrevious}
                    className={`p-3 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border hover:scale-110 transition-all duration-200`}
                  >
                    <SkipBack className={`w-6 h-6 ${themeConfig.textSecondary}`} />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    disabled={!currentTrack.preview_url || isLoading}
                    className={`p-4 rounded-full ${themeConfig.accent.replace('text-', 'bg-')} hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={playNext}
                    className={`p-3 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border hover:scale-110 transition-all duration-200`}
                  >
                    <SkipForward className={`w-6 h-6 ${themeConfig.textSecondary}`} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className={`w-full h-3 ${themeConfig.cardBg} rounded-full overflow-hidden relative`}>
                    {/* Beat-responsive background glow */}
                    {isPlaying && (
                      <div 
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                          background: `linear-gradient(90deg, ${themeConfig.accent.replace('text-', '').replace('-400', '')}-400, ${themeConfig.accentSecondary.replace('text-', '').replace('-400', '')}-400)`,
                          filter: `blur(${beatIntensity * 4}px)`,
                          transform: `scaleY(${1 + beatIntensity * 0.5})`,
                        }}
                      />
                    )}
                    <div 
                      className={`h-full bg-gradient-to-r ${themeConfig.accent.replace('text-', 'from-')} to-purple-500 transition-all duration-300 relative z-10`}
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                      {/* Moving beat indicator */}
                      {isPlaying && (
                        <div 
                          className="absolute right-0 top-0 w-1 h-full bg-white rounded-full opacity-80"
                          style={{
                            transform: `scaleY(${1 + beatIntensity * 0.8})`,
                            boxShadow: `0 0 ${beatIntensity * 10}px white`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className={themeConfig.textSecondary}>{formatTime(currentTime)}</span>
                    <span className={themeConfig.textSecondary}>{currentTrack.preview_url ? formatTime(duration) : currentTrack.duration}</span>
                  </div>
                </div>

                {!currentTrack.preview_url && (
                  <p className={`text-sm ${themeConfig.textSecondary} opacity-75 text-center lg:text-left`}>
                    Preview not available - Listen on Spotify
                  </p>
                )}
              </div>
            </div>

            {/* Volume & Links */}
            <div className="flex flex-col items-center space-y-6 relative">
              {/* Circular audio visualizer - Fixed positioning */}
              <div className="relative w-32 h-32 mb-4">
                {isPlaying && audioData.slice(0, 12).map((intensity, index) => (
                  <div
                    key={index}
                    className="absolute w-1.5 rounded-full"
                    style={{
                      height: `${Math.max(12, intensity * 40)}px`,
                      background: `linear-gradient(to top, ${themeConfig.accent.replace('text-', '').replace('-400', '')}-400, ${themeConfig.accentSecondary.replace('text-', '').replace('-400', '')}-400)`,
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-${16 + intensity * 20}px)`,
                      transformOrigin: 'center',
                      opacity: 0.8,
                      transition: 'height 0.1s ease-out',
                    }}
                  />
                ))}
                
                {/* Center circle */}
                <div 
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border-2 flex items-center justify-center`}
                  style={{
                    transform: `translate(-50%, -50%) scale(${1 + beatIntensity * 0.3})`,
                  }}
                >
                  <div className={`w-3 h-3 rounded-full ${themeConfig.accent.replace('text-', 'bg-')}`} />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Volume2 className={`w-5 h-5 ${themeConfig.textSecondary}`} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (audioRef.current) {
                      audioRef.current.volume = newVolume;
                    }
                  }}
                  className="w-24 accent-current"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track List */}
      <div className={`${themeConfig.cardBg} ${themeConfig.border} border rounded-3xl p-8 backdrop-blur-sm`}>
        <h4 className={`text-2xl font-display font-bold ${themeConfig.textPrimary} mb-6`}>
          {currentPlaylist.name}
        </h4>
        <p className={`${themeConfig.textSecondary} mb-8`}>
          {currentPlaylist.description}
        </p>
        
        <div className="space-y-3">
          {currentPlaylist.tracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className={`group flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                currentTrack?.id === track.id 
                  ? `${themeConfig.accent.replace('text-', 'bg-')}/10 ${themeConfig.border} border` 
                  : `hover:${themeConfig.cardBg} hover:${themeConfig.border} hover:border`
              }`}
            >
              <div className="relative">
                <img 
                  src={track.image} 
                  alt={track.album}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h5 className={`font-semibold ${themeConfig.textPrimary} truncate`}>
                  {track.name}
                </h5>
                <p className={`${themeConfig.textSecondary} text-sm truncate`}>
                  {track.artist}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${themeConfig.textSecondary} font-mono`}>
                  {track.duration}
                </span>
                {!track.preview_url && (
                  <span className={`text-xs ${themeConfig.textSecondary} opacity-50`}>
                    No preview
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Listen More Button */}
        <div className="mt-8 text-center">
          <a
            href="https://open.spotify.com/playlist/your-playlist-id" // Replace with your actual playlist URL
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 hover:scale-105 group font-display font-semibold text-lg`}
          >
            <span>Listen to Full Playlist</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className={`${themeConfig.textSecondary} text-sm mt-3 font-mono`}>
            Open in Spotify to explore all tracks
          </p>
        </div>
      </div>
    </div>
  );
};