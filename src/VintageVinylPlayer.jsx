import { useEffect, useRef, useState } from "react";

export default function VintageVinylPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch (error) {
      setIsPlaying(false);
      console.info("La reproducción requiere interacción del usuario.", error);
    }
  }

  return (
    <aside className={`vinyl-player ${isPlaying ? "is-playing" : ""}`}>
      <audio
        ref={audioRef}
        src="/la-vie-en-rose.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        className="vinyl-control"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar La Vie En Rose" : "Reproducir La Vie En Rose"}
        aria-pressed={isPlaying}
        title="Tocadiscos Vintage"
      >
        <span className="vinyl-record" aria-hidden="true">
          <span className="vinyl-label"><span>V</span></span>
        </span>
        <span className="vinyl-arm" aria-hidden="true"><i /></span>
        <span className="vinyl-copy">
          <span className="vinyl-status"><i />{isPlaying ? "Sonando..." : "Toca para sonar"}</span>
          <strong>La Vie En Rose</strong>
        </span>
        <span className="vinyl-action" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
      </button>
    </aside>
  );
}
