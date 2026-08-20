import { useEffect, useMemo, useState } from "react";

import "./App.css";

import osa1 from "./assets/story/osa1-story.jpg";
import osa2 from "./assets/story/osa2-story.jpg";
import osa3 from "./assets/story/osa3-story.jpg";
import osa4 from "./assets/story/osa4-story.jpg";
import osa5 from "./assets/story/osa5-story.jpg";
import osa6 from "./assets/story/osa6-story.jpg";
import osa7 from "./assets/story/osa7-story.jpg";

const scenes = [
  {
    id: "cover",
    kind: "cover",
    image: osa1,
    alt: "Osita kawaii sosteniendo un corazón en un jardín de flores",
    eyebrow: "Un cuento suave para",
    title: "Mabe",
    lines: [
      "Esta página guarda un pedacito de ternura.",
      "Hay secretos chiquitos escondidos entre flores, estrellas y corazones.",
      "Cuando estés lista, caminemos despacito.",
    ],
    button: "Empezar",
    surprise: "Abrimos la primera cartita...",
    secrets: [
      {
        id: "cover-heart",
        symbol: "♡",
        label: "Descubrir corazón de portada",
        note: "Aquí empieza un abrazo.",
        x: 15,
        y: 28,
      },
      {
        id: "cover-star",
        symbol: "✦",
        label: "Descubrir estrella de portada",
        note: "Una luz suave para ti.",
        x: 84,
        y: 22,
      },
    ],
  },
  {
    id: "kitchen",
    kind: "story",
    image: osa2,
    alt: "Osita en una cocina acogedora sosteniendo un corazón",
    eyebrow: "Primera cartita",
    title: "Un rincón calientito",
    lines: [
      "Donde el mundo baja el volumen.",
      "Donde una taza tibia alcanza para decir: estoy aquí.",
      "Y donde cada detalle nace pensando en tu sonrisa.",
    ],
    button: "Quiero saber algo...",
    surprise: "Una flor guardaba otra frase.",
    secrets: [
      {
        id: "kitchen-flower",
        symbol: "✿",
        label: "Descubrir flor de cocina",
        note: "Tu calma también florece.",
        x: 79,
        y: 74,
      },
      {
        id: "kitchen-heart",
        symbol: "♡",
        label: "Descubrir corazón de cocina",
        note: "Hay amor en lo simple.",
        x: 18,
        y: 45,
      },
    ],
  },
  {
    id: "little-things",
    kind: "story",
    image: osa3,
    alt: "Osita preparando algo dulce en una cocina cozy",
    eyebrow: "Segunda cartita",
    title: "Cosas hechas con amor",
    lines: [
      "A veces el cariño no hace ruido.",
      "Se queda en gestos pequeños, en paciencia, en cuidado.",
      "Y aun así, lo ilumina todo.",
    ],
    button: "¿Seguimos? 🧸",
    surprise: "Un brillito suave aparece...",
    secrets: [
      {
        id: "things-star",
        symbol: "✧",
        label: "Descubrir brillo escondido",
        note: "Gracias por ser tan tú.",
        x: 77,
        y: 18,
      },
      {
        id: "things-flower",
        symbol: "✿",
        label: "Descubrir flor escondida",
        note: "Tu ternura se nota.",
        x: 22,
        y: 78,
      },
    ],
  },
  {
    id: "garden",
    kind: "story",
    image: osa4,
    alt: "Ilustración tierna de una osita en una escena pastel",
    eyebrow: "Tercera cartita",
    title: "Flores para tu calma",
    lines: [
      "Si algún día todo se siente grande, vuelve a lo pequeño.",
      "Una respiración. Una flor. Un cielo tranquilo.",
      "También mereces ir despacio.",
    ],
    button: "Hay algo más...",
    surprise: "El jardín dejó una promesa.",
    secrets: [
      {
        id: "garden-heart",
        symbol: "♡",
        label: "Descubrir corazón del jardín",
        note: "No tienes que poder con todo hoy.",
        x: 82,
        y: 34,
      },
      {
        id: "garden-star",
        symbol: "✦",
        label: "Descubrir estrella del jardín",
        note: "Tu luz no se apaga por descansar.",
        x: 18,
        y: 18,
      },
    ],
  },
  {
    id: "stars",
    kind: "story",
    image: osa5,
    alt: "Osita en una escena de cuento con detalles románticos",
    eyebrow: "Cuarta cartita",
    title: "Estrellitas guardadas",
    lines: [
      "Guardé algunas para tus noches largas.",
      "Otras para celebrar tus días bonitos.",
      "Y una especial para recordarte lo mucho que vales.",
    ],
    button: "Una última cosita...",
    surprise: "La noche se vuelve más suave.",
    secrets: [
      {
        id: "stars-star",
        symbol: "✦",
        label: "Descubrir estrellita",
        note: "Estoy orgulloso de ti.",
        x: 74,
        y: 25,
      },
      {
        id: "stars-heart",
        symbol: "♡",
        label: "Descubrir corazón de estrellas",
        note: "Tu corazón sabe volver a casa.",
        x: 21,
        y: 66,
      },
    ],
  },
  {
    id: "calm",
    kind: "calm",
    image: osa6,
    alt: "Osita tierna en una escena romántica de tonos pastel",
    eyebrow: "Un momento de calma",
    title: "Respira conmigo...",
    lines: [
      "Pausa un ratito aquí.",
      "Deja que todo baje el ritmo.",
      "Solo este momento. Solo este abrazo suave.",
    ],
    calmMessage: "Así... un poquito más despacio. 🤎",
    button: "Respira conmigo...",
    surprise: "Quédate con esa calma.",
    secrets: [
      {
        id: "calm-heart",
        symbol: "♡",
        label: "Descubrir calma escondida",
        note: "Respirar también es cuidarte.",
        x: 76,
        y: 28,
      },
    ],
  },
  {
    id: "final",
    kind: "final",
    image: osa7,
    alt: "Osita de cuento con detalles cozy y románticos",
    eyebrow: "Última cartita",
    title: "Para guardar en el corazón",
    lines: [
      "Mabe 🤎",
      "Quiero que recuerdes algo...",
      "Lo estás haciendo bien.",
      "Y nunca olvides todo el amor que llevas contigo.",
      "Lo estás haciendo bien, osita. 🧸🤎",
    ],
    button: "Volver a sentirlo",
    secrets: [
      {
        id: "final-star",
        symbol: "✦",
        label: "Descubrir última estrella",
        note: "Esta se queda contigo.",
        x: 80,
        y: 20,
      },
    ],
  },
];

function FloatingChar({ className, children }) {
  return (
    <span className={`floating-char ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function GentleBurst({ burstKey }) {
  return (
    <div className="gentle-burst" key={burstKey} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} style={{ "--spark-index": index }}>
          {index % 3 === 0 ? "♡" : "✦"}
        </span>
      ))}
    </div>
  );
}

function SecretCharms({ secrets, discovered, onSecret }) {
  if (!secrets?.length) {
    return null;
  }

  return (
    <div className="secret-layer">
      {secrets.map((secret) => {
        const isOpen = discovered[secret.id];

        return (
          <button
            className={`secret-charm ${isOpen ? "is-discovered" : ""}`}
            key={secret.id}
            type="button"
            aria-label={secret.label}
            style={{ "--x": `${secret.x}%`, "--y": `${secret.y}%` }}
            onClick={() => onSecret(secret)}
          >
            <span aria-hidden="true">{secret.symbol}</span>
            {isOpen ? <em>{secret.note}</em> : null}
          </button>
        );
      })}
    </div>
  );
}

function RevealedLines({ lines, visibleLines, className = "" }) {
  return (
    <div className={`revealed-lines ${className}`} aria-live="polite">
      {lines.slice(0, visibleLines).map((line, index) => (
        <p className="revealed-line" key={`${line}-${index}`}>
          {line}
        </p>
      ))}
    </div>
  );
}

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [surprise, setSurprise] = useState("");
  const [discovered, setDiscovered] = useState({});
  const [calmState, setCalmState] = useState("idle");

  const scene = scenes[sceneIndex];
  const isCover = scene.kind === "cover";
  const isFinal = scene.kind === "final";
  const isCalm = scene.kind === "calm";
  const progressLabel = `${sceneIndex + 1} / ${scenes.length}`;
  const allLinesVisible = visibleLines >= scene.lines.length;
  const finalRewardVisible = isFinal && allLinesVisible;

  const actionLabel = useMemo(() => {
    if (isCalm && calmState === "breathing") {
      return "Respirando suave...";
    }

    if (isCalm && calmState === "complete") {
      return "Una última cosita...";
    }

    return scene.button;
  }, [calmState, isCalm, scene.button]);

  useEffect(() => {
    const firstDelay = scene.kind === "final" ? 1200 : 430;
    const stepDelay = scene.kind === "final" ? 1500 : 860;
    const timers = scene.lines.map((_, index) =>
      setTimeout(() => {
        setVisibleLines((current) => Math.max(current, index + 1));
      }, firstDelay + index * stepDelay),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [scene]);

  function fireSoftBurst(message = "") {
    setBurstKey((current) => current + 1);
    setSurprise(message);

    if (message) {
      setTimeout(() => setSurprise(""), 1800);
    }
  }

  function handleSecret(secret) {
    setDiscovered((current) => ({ ...current, [secret.id]: true }));
    fireSoftBurst(secret.note);
  }

  function goToScene(nextIndex) {
    setTransitioning(true);
    fireSoftBurst(scene.surprise);

    setTimeout(() => {
      setVisibleLines(0);
      setSurprise("");
      setCalmState("idle");
      setSceneIndex(nextIndex);
      setTransitioning(false);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 920);
  }

  function handlePrimaryAction() {
    if (transitioning) {
      return;
    }

    if (isCalm && calmState === "idle") {
      setCalmState("breathing");
      fireSoftBurst("Respira suave conmigo.");

      setTimeout(() => {
        setCalmState("complete");
        fireSoftBurst(scene.calmMessage);
      }, 6400);

      return;
    }

    if (isCalm && calmState === "breathing") {
      return;
    }

    if (isFinal) {
      setVisibleLines(0);
      setCalmState("idle");
      setSceneIndex(0);
      setDiscovered({});
      fireSoftBurst("Volvemos al inicio, suavecito.");

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      return;
    }

    goToScene(sceneIndex + 1);
  }

  const canPressAction =
    !transitioning && allLinesVisible && (!isCalm || calmState !== "breathing");

  return (
    <div
      className={`storybook ${transitioning ? "is-transitioning" : ""} ${
        finalRewardVisible ? "final-reward" : ""
      }`}
    >
      <div className="storybook-sky" aria-hidden="true">
        <FloatingChar className="char-one">♡</FloatingChar>
        <FloatingChar className="char-two">✦</FloatingChar>
        <FloatingChar className="char-three">♡</FloatingChar>
        <FloatingChar className="char-four">✧</FloatingChar>
      </div>

      <GentleBurst burstKey={burstKey} />

      {surprise ? (
        <div className="surprise-note" aria-live="polite">
          {surprise}
        </div>
      ) : null}

      <main className={`story-stage scene-${scene.kind}`} key={scene.id}>
        {isCover ? (
          <section className="hero-section interactive-hero">
            <div className="hero-copy fade-in">
              <p className="eyebrow">{scene.eyebrow}</p>
              <h1>{scene.title}</h1>
              <RevealedLines
                className="hero-reveals"
                lines={scene.lines}
                visibleLines={visibleLines}
              />
              <button
                className="story-button"
                type="button"
                disabled={!canPressAction}
                onClick={handlePrimaryAction}
              >
                {actionLabel}
              </button>
            </div>

            <figure className="hero-art interactive-art fade-in delay-one">
              <div className="image-wrap">
                <img
                  src={scene.image}
                  alt={scene.alt}
                  width="560"
                  height="750"
                  fetchPriority="high"
                />
                <SecretCharms
                  discovered={discovered}
                  secrets={scene.secrets}
                  onSecret={handleSecret}
                />
              </div>
              <figcaption>Para cuando necesites un abrazo suave.</figcaption>
            </figure>
          </section>
        ) : (
          <section className="interactive-scene" aria-label={scene.title}>
            <div className="story-progress" aria-label={`Escena ${progressLabel}`}>
              {progressLabel}
            </div>

            <figure className={`scene-portrait ${finalRewardVisible ? "is-glowing" : ""}`}>
              <div className="image-wrap">
                <img
                  src={scene.image}
                  alt={scene.alt}
                  width="560"
                  height="750"
                  loading={sceneIndex <= 1 ? "eager" : "lazy"}
                />
                <SecretCharms
                  discovered={discovered}
                  secrets={scene.secrets}
                  onSecret={handleSecret}
                />
                {finalRewardVisible ? <div className="reward-shimmer" aria-hidden="true" /> : null}
              </div>
            </figure>

            <article className="letter-card interactive-letter">
              {!isFinal ? <p className="eyebrow">{scene.eyebrow}</p> : null}
              {!isFinal ? <h2>{scene.title}</h2> : null}

              {isFinal ? (
                <div className="final-message" aria-live="polite">
                  {scene.lines.slice(0, visibleLines).map((line, index) => (
                    <p
                      className={`revealed-line ${
                        index === scene.lines.length - 1 ? "final-blessing" : ""
                      }`}
                      key={line}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <RevealedLines lines={scene.lines} visibleLines={visibleLines} />
              )}

              {isCalm ? (
                <div className={`calm-space calm-${calmState}`}>
                  <div className="breath-orb" aria-hidden="true">
                    <span />
                  </div>
                  {calmState === "complete" ? <p>{scene.calmMessage}</p> : null}
                </div>
              ) : null}

              {allLinesVisible && (
                <button
                  className="story-button"
                  type="button"
                  disabled={!canPressAction}
                  onClick={handlePrimaryAction}
                >
                  {actionLabel}
                </button>
              )}
            </article>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
