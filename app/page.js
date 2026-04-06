'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    try {
      heroRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    } catch {
      /* alguns browsers / iframes bloqueiam scrollIntoView */
    }
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (els.length === 0) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (reduced) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const markInView = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw) {
          el.classList.add('visible');
        }
      });
    };

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('visible');
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 15% 0px' }
      );
      els.forEach((el) => observer.observe(el));
    } else {
      els.forEach((el) => el.classList.add('visible'));
    }

    markInView();
    requestAnimationFrame(() => {
      markInView();
      requestAnimationFrame(markInView);
    });

    window.addEventListener('resize', markInView);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', markInView);
    };
  }, []);

  return (
    <main className="page">

      {/* ── Hidden top (scroll up to find) ── */}
      <div className="hidden-top">
        <span className="hidden-top__word">Olá</span>
      </div>

      {/* ── Hero (yellow, contact links na coluna 2 da grelha) ── */}
      <div className="hero" ref={heroRef}>
        <div className="page-columns page-columns--hero">
          <div className="page-columns__col page-columns__col--1" aria-hidden="true" />
          <div className="page-columns__col page-columns__col--2">
            <div className="hero__links">
              <div className="hero__links-group">
                <a className="hero__links-link" href="mailto:seu@email.com">Email ↗</a>
              </div>
              <div className="hero__links-group">
                <a className="hero__links-link" href="https://savee.it/ramonanjos/" target="_blank" rel="noopener noreferrer">Savee</a>
                <a className="hero__links-link" href="https://www.linkedin.com/in/ramonanjos" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="hero__links-link" href="https://www.instagram.com/ramonanjos/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a className="hero__links-link" href="https://open.spotify.com/user/ramonanjos" target="_blank" rel="noopener noreferrer">Spotify</a>
              </div>
              <div className="hero__links-group">
                <p className="hero__links-label">Let&apos;s talk?</p>
                <a className="hero__links-link" href="#">30&apos; Office Hours</a>
                <a className="hero__links-link" href="#">Bookmarks</a>
              </div>
            </div>
          </div>
          <div className="page-columns__col page-columns__col--3" aria-hidden="true" />
          <div className="page-columns__col page-columns__col--4 page-columns__col--bleed-right" aria-hidden="true" />
        </div>
      </div>

      {/* ══════════════════════════════════════
          Opening: col 1 = nome | cols 2–4 = título + texto + vídeo (margem direita)
          ══════════════════════════════════════ */}
      <div className="opening">
        <div className="page-columns page-columns--opening">
          <div className="page-columns__col page-columns__col--1 opening__name-col">
            <p className="opening__author">
              Ramon Anjos
              <small className="opening__author-role">Design @ Nubank</small>
            </p>
          </div>
          <div className="opening__content">
            <h1 className="opening__heading">
              Product, <br />
              experience &amp; <br />
              design language <br />
              system
            </h1>
            <div className="opening__intro">
              <div className="opening__intro-lede">
                <span className="opening__intro-marker" aria-hidden="true" />
                <p className="opening__intro-body">
                  Acredito em marcas e produtos que
                  <br />
                  estabelecem vínculos entre necessidades e
                  <br />
                  comportamentos humanos, entregando uma
                  <br />
                  experiência que reforce valores culturais.
                  <br />
                  Hoje é uma tendência, grandes marcas
                  <br />
                  espelham seus valores em recortes sociais.
                </p>
              </div>
              <p className="manifesto-signature">
                <span className="manifesto-signature__title">Design ―</span>
                <span className="manifesto-signature__sub">
                  Identity, Experience, Culture
                </span>
              </p>
            </div>
            <div className="opening__bridge page-columns__col--bleed-right">
              <div className="opening__bridge-video">
                <iframe
                  src="https://player.vimeo.com/video/824804225?h=0&title=0&byline=0&portrait=0&badge=0&autopause=0&background=1&muted=1"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="444,444…"
                />
              </div>
            </div>
          </div>
          <div className="opening__post-video-row">
            <div className="opening__post-video-caption">
              <span className="opening__caption-year">2024 ―</span>
              <small className="opening__author-role">Tech &amp; Finance</small>
            </div>
            <p className="opening__statement">
              Transacionar de forma simples, facilitando a rotina de pequenos empreendedores ― escalando
              negócios de forma sustentável
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Mosaic Row 1: 2 large items
          ══════════════════════════════════════ */}
      <div className="mosaic mosaic--2-top reveal">
        <div className="mosaic__item mosaic__item--landscape">
          <div className="mosaic__video">
            <iframe
              src="https://player.vimeo.com/video/824804225?h=0&title=0&byline=0&portrait=0&badge=0&autopause=0&background=1&muted=1"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Projeto 01"
            />
          </div>
          <div className="mosaic__overlay">Projeto 01</div>
        </div>
        <div className="mosaic__item mosaic__item--landscape">
          <img src="https://picsum.photos/800/450?random=11" alt="Projeto 02" loading="lazy" />
          <div className="mosaic__overlay">Projeto 02</div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Mosaic Row 2: 4 equal items
          ══════════════════════════════════════ */}
      <div className="mosaic mosaic--4-bottom reveal">
        <div className="mosaic__item mosaic__item--square">
          <img src="https://picsum.photos/600/600?random=21" alt="Projeto 03" loading="lazy" />
          <div className="mosaic__overlay">Projeto 03</div>
        </div>
        <div className="mosaic__item mosaic__item--square">
          <img src="https://picsum.photos/600/600?random=22" alt="Projeto 04" loading="lazy" />
          <div className="mosaic__overlay">Projeto 04</div>
        </div>
        <div className="mosaic__item mosaic__item--square">
          <img src="https://picsum.photos/600/600?random=23" alt="Projeto 05" loading="lazy" />
          <div className="mosaic__overlay">Projeto 05</div>
        </div>
        <div className="mosaic__item mosaic__item--square">
          <img src="https://picsum.photos/600/600?random=24" alt="Projeto 06" loading="lazy" />
          <div className="mosaic__overlay">Projeto 06</div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Mosaic Row 3: 3 columns
          ══════════════════════════════════════ */}
      <div className="mosaic mosaic--3-col reveal">
        <div className="mosaic__item mosaic__item--tall">
          <img src="https://picsum.photos/500/667?random=31" alt="Projeto 07" loading="lazy" />
          <div className="mosaic__overlay">Projeto 07</div>
        </div>
        <div className="mosaic__item mosaic__item--tall">
          <div className="mosaic__video">
            <iframe
              src="https://player.vimeo.com/video/824804225?h=0&title=0&byline=0&portrait=0&badge=0&autopause=0&background=1&muted=1"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Projeto 08"
            />
          </div>
          <div className="mosaic__overlay">Projeto 08 &mdash; Vídeo</div>
        </div>
        <div className="mosaic__item mosaic__item--tall">
          <img src="https://picsum.photos/500/667?random=33" alt="Projeto 09" loading="lazy" />
          <div className="mosaic__overlay">Projeto 09</div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Bio: rail + duas colunas de texto (ref. layout 3 colunas)
          ══════════════════════════════════════ */}
      <section className="bio-rail reveal" aria-label="Sobre o trabalho">
        <div className="bio-rail__grid">
          <p className="opening__author bio-rail__label">
            Product, Design
            <small className="opening__author-role">Language System</small>
          </p>
          <p className="bio-rail__text">
            Atualmente trabalho como Designer de Produto na{' '}
            <span className="bio-rail__underline">Fintech Nubank</span>, com o desafio de criar{' '}
            <strong>
              a melhor experiência em transações financeiras para +5MM de empreendedores, elevando a
              capacidade de previsão e gerenciamento de seus negócios.
            </strong>{' '}
            Atuamos impactando o comportamento das cidades, como parte de um novo mundo, onde o
            dinheiro físico deixa de correr e transações financeiras são mínimos detalhes no dia a
            dia.
          </p>
          <p className="bio-rail__text">
            Centrado em como a complexidade da tecnologia simplifica a vida das pessoas, atuo na
            construção de <strong>produtos nativamente digitais</strong> com fortes pilares de
            cultura e <strong>experiência de marca</strong>. Trabalhei com Startups e{' '}
            <strong>equipes premiadas</strong> em diferentes cidades, estúdios como Oz Strategy +
            Design, Kultur Studio e FutureBrand. Entre os clientes estão Nike, Ambev, Oi, Pinheiro
            Neto, TOTVS, Stock Car, B2W, Gol e Nestlé.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Citação (mesmo padrão tipográfico / grelha que “Transacionar…”)
          ══════════════════════════════════════ */}
      <section className="statement-row reveal" aria-label="Nota pessoal">
        <div className="statement-row__rail" aria-hidden="true" />
        <p className="opening__statement">
          Comecei a desenhar quando tinha ~12 anos, isso explica porque não fui um skatista amador ou
          viajei pelo mundo com uma banda punk
        </p>
      </section>

      {/* ══════════════════════════════════════
          Awards & Press (4 colunas, ref. layout)
          ══════════════════════════════════════ */}
      <section className="awards-press reveal" aria-label="Prêmios e imprensa">
        <div className="awards-press__grid">
          <p className="opening__author awards-press__heading">
            Awards
            <small className="opening__author-role">&amp; Recognition</small>
          </p>

          <div className="awards-press__awards">
            <div className="awards-press__group">
              <p className="awards-press__year">2022</p>
              <p className="awards-press__detail">Black Designers, pretUX</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2020</p>
              <p className="awards-press__detail">Brazilians Who Design</p>
              <p className="awards-press__detail">FAMQ, Publicação</p>
              <p className="awards-press__detail">Bem-Vindos de Novo, Filme</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2017</p>
              <p className="awards-press__detail">Júri Prêmio Jorge Amado</p>
              <p className="awards-press__detail">12ª Bienal ADG</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2016</p>
              <p className="awards-press__detail">Farofeira, Publicação</p>
              <p className="awards-press__detail">Tripolar, Publicação</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2014</p>
              <p className="awards-press__detail">Naturalmente Capoeira, Doc.</p>
              <p className="awards-press__detail">iF Communication Awards</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2013</p>
              <p className="awards-press__detail">Shortlist Cannes Lions Festival</p>
              <p className="awards-press__detail">10ª Bienal ADG, Identidade</p>
              <p className="awards-press__detail">10ª Bienal ADG, Destaque</p>
              <p className="awards-press__detail">Brazil Design Week</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2012</p>
              <p className="awards-press__detail">Brazil Design Week</p>
              <p className="awards-press__detail">IED/RLAB, Windows</p>
              <p className="awards-press__detail">Guerrilla Video, Windows</p>
              <p className="awards-press__detail">Mazzaropi Festival, Windows</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2011</p>
              <p className="awards-press__detail">Apple Store Brazil, Destaque</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2010</p>
              <p className="awards-press__detail">DoNossoJeito, Doc</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2009</p>
              <p className="awards-press__detail">Prêmio Colunistas</p>
              <p className="awards-press__detail">Workshop Processo Criativo</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2007 - 2008</p>
              <p className="awards-press__detail">Workshop Intervenção &amp; Cidade</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2006</p>
              <p className="awards-press__detail">RêDesign Congresso Regional</p>
            </div>
            <div className="awards-press__group">
              <p className="awards-press__year">2005</p>
              <p className="awards-press__detail">Megafônicas, Expo.</p>
            </div>
          </div>

          <p className="opening__author awards-press__heading">
            Press
            <small className="opening__author-role">&amp; Articles</small>
          </p>

          <nav className="awards-press__press" aria-label="Artigos e imprensa">
            <a
              className="awards-press__link"
              href="https://drive.google.com/file/d/0B5bIZEZdHUmCUkFRNWJ3NFhjajQ/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Virtualidades e estéticas imprevistas ↗
            </a>
            <a
              className="awards-press__link"
              href="https://drive.google.com/file/d/0B5bIZEZdHUmCZG9nZzk0NWFpSFE/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mediações e trânsito de informações ↗
            </a>
            <a className="awards-press__link" href="#">
              Compartilhamento e janelas ↗
            </a>
            <a
              className="awards-press__link"
              href="https://drive.google.com/file/d/0B5bIZEZdHUmCSWpFWGVOdHFzUk0/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reflexos do cotidiano ↗
            </a>
          </nav>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer reveal">
        <p className="footer__copy">
          &copy; 2026 Ramon Anjos
          <small>&mdash; Product, Design Language System</small>
        </p>
      </footer>

    </main>
  );
}
