import { useEffect, useState } from "react";
import "./App.css";

import tienda from "./assets/01-mabe-comprando-tienda.jpg";
import picnic from "./assets/02-mabe-ely-picnic-parque.jpg";
import luca from "./assets/03-luca-perrito-jugando.jpg";
import paseo from "./assets/04-paseo-carro-negro.jpg";
import festin from "./assets/05-festin-nachos-casa.jpg";
import panaderia from "./assets/06-panaderia-abrazo-dulce.jpg";
import frappes from "./assets/07-frappes-dentro-panaderia.jpg";

export const storyData = [
  { image: tienda, title: "Un comienzo de compras", narrative: "A Mabe le encanta preparar todo con cariño. Hoy se levantó temprano, se puso sus lentes favoritos y fue a la tienda a buscar todo lo necesario para disfrutar un gran día.", icon: "✉", token: "Sobrecito para ti", phrase: "Te quiero, mi osa ❤️", effect: "corazones" },
  { image: picnic, title: "Picnic bajo el sol", narrative: "El sol brillaba fuerte y el parque estaba perfecto. Mabe se reunió con su nena Ely en una manta a cuadros para compartir ricas galletas y un té tranquilo.", icon: "☕", token: "Una pausa de té", phrase: "Tú tranquila, no seas una osa enojada", effect: "brisa" },
  { image: luca, title: "Travesuras de Luca", narrative: "¡Ningún picnic está completo sin Luca! El juguetón perrito blanco no tardó en unirse al grupo, corriendo alegremente por el césped con su energía inagotable.", icon: "🐾", token: "Una huellita", phrase: "Sos muy lindaa ✨", effect: "rebote" },
  { image: paseo, title: "Aventura sobre ruedas", narrative: "Con el viento en la cara y el mar de fondo, Mabe tomó el volante de su coche negro acompañada de Ely y Luca saludando felices por la ventana.", icon: "◉", token: "La brújula del viaje", phrase: "Lo estás haciendo bien y sigue así amor", effect: "viento" },
  { image: festin, title: "Festín en casa", narrative: "Al llegar a casa, el hambre se hizo notar. Se acomodaron frente a la chimenea para disfrutar el mejor momento: tostadas con aguacate y un tazón gigante de nachos cubiertos de queso.", icon: "♨", token: "Un platito acogedor", phrase: "¡Vamos amorcito!", effect: "fuego" },
  { image: panaderia, title: "Encuentro en El Abrazo Dulce", narrative: "En el centro comercial, Mabe se encontró con su amigo Sergio justo afuera de la panadería El Abrazo Dulce, listos para compartir un antojo especial.", icon: "✿", token: "Recién salido del horno", phrase: "Te amo osita linda, sigue así ✨", effect: "luz" },
  { image: frappes, title: "Un dulce final", narrative: "Para cerrar un día perfecto, Mabe y Sergio se acomodaron dentro de la panadería entre miradas cómplices y muchas risas disfrutando de un par de cremosos frapés.", icon: "🥤", token: "Una tarjeta de regalo", phrase: "Osa, es muy bonito verte y sentir tus risas, tu ambiente en un frappé. ¡Qué lindos son esos frappés, me encanta osa! Te amo osita linda, sigue así que no te opaque un enojo, tú sigue brillando y que no hayan malos días para ti, mi osa.", effect: "cierre" },
];

function App() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const scene = storyData[page];

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
      if (!open && event.key === "ArrowRight") changePage(1);
      if (!open && event.key === "ArrowLeft") changePage(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, page]);

  function changePage(step) {
    const next = Math.min(storyData.length - 1, Math.max(0, page + step));
    if (next === page) return;
    setDirection(step);
    setPage(next);
    setOpen(false);
  }

  return (
    <main className="storybook">
      <div className="ambient ambient-one" aria-hidden="true">✧</div>
      <div className="ambient ambient-two" aria-hidden="true">❧</div>
      <header className="masthead">
        <p className="kicker"><span>✦</span> UN RECUERDO PARA GUARDAR <span>✦</span></p>
        <h1>Un día con <em>Mabe</em></h1>
        <p className="intro">Siete escenas, una tarde bonita y mucho cariño entre páginas.</p>
      </header>

      <section className={`album scene-${page + 1}`} aria-live="polite">
        <div className="album-topline"><span>ÁLBUM DE RECUERDOS</span><span>GUATEMALA · DÍA ESPECIAL</span></div>
        <div className="album-body" key={page} style={{ "--page-direction": direction }}>
          <figure className="photo-card">
            <div className="photo-inner"><img src={scene.image} alt={scene.title} /></div>
            <figcaption><span>✦</span> Instante para recordar <span>✦</span></figcaption>
            <span className="photo-index">0{page + 1}</span>
          </figure>

          <article className="story-copy">
            <div className="chapter-label"><span>CAPÍTULO {String(page + 1).padStart(2, "0")}</span><span className="chapter-rule" /></div>
            <h2>{scene.title}</h2>
            <p className="narrative">{scene.narrative}</p>
            <div className="ornament" aria-hidden="true"><span>✧</span><i /><span>❧</span></div>
            <button className="keepsake-button" type="button" onClick={() => setOpen(true)}>
              <span className="keepsake-icon" aria-hidden="true">{scene.icon}</span>
              <span className="keepsake-label"><small>ABRE TU RECUERDO</small><strong>{scene.token}</strong></span>
              <span className="keepsake-arrow" aria-hidden="true">↗</span>
            </button>
            {page === 6 && <div className="closing-hint">La última página guarda una carta especial <span>♡</span></div>}
          </article>
        </div>

        <footer className="album-footer">
          <button type="button" className="page-button" onClick={() => changePage(-1)} disabled={page === 0}><span>←</span> Anterior</button>
          <div className="page-progress" aria-label={`Página ${page + 1} de ${storyData.length}`}>
            <span className="page-count">PÁGINA <b>{page + 1}</b> <i>/</i> 07</span>
            <div className="page-dots">{storyData.map((_, index) => <button key={index} type="button" className={index === page ? "active" : ""} onClick={() => { setDirection(index > page ? 1 : -1); setPage(index); setOpen(false); }} aria-label={`Ir a la página ${index + 1}`} aria-current={index === page ? "page" : undefined} />)}</div>
          </div>
          <button type="button" className="page-button next-button" onClick={() => changePage(1)} disabled={page === 6}>{page === 6 ? "Fin del cuento" : "Siguiente"} <span>→</span></button>
        </footer>
      </section>
      <p className="signature">Hecho con cariño <span>♥</span></p>

      {open && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section className={`memory-modal effect-${scene.effect}`} role="dialog" aria-modal="true" aria-labelledby="memory-title">
          <button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setOpen(false)}>×</button>
          <div className="modal-stamp" aria-hidden="true">{scene.icon}</div>
          <p className="modal-overline">UN MENSAJITO PARA MABE</p>
          <h2 id="memory-title">{page === 6 ? "Con todo mi cariño" : "Una nota para ti"}</h2>
          <div className="modal-divider"><span>✦</span></div>
          <p className="modal-phrase">{scene.phrase}</p>
          {page === 0 && <div className="heart-doodles" aria-hidden="true">♡　♥　♡</div>}
          <button className="understood-button" type="button" onClick={() => setOpen(false)}>Guardar en el corazón <span>♡</span></button>
        </section>
      </div>}
    </main>
  );
}

export default App;
