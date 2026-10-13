import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import artworks from "./data/artworks.json";
import {
  ArtworkImage,
  ArtworkModal,
  Attribution,
  GalleryGrid,
  VideoPlayer,
} from "./components/Artwork";
import "./App.css";

const links = [
  ["/", "Home"],
  ["/gallery", "Gallery"],
  ["/videos", "Videos"],
  ["/about", "About"],
];

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-md container"
        aria-label="Main navigation"
      >
        <Link
          className="navbar-brand"
          to="/"
          onClick={() => setExpanded(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>{" "}
          Digital Art Gallery
          <span className="brand-subtitle">A space for digital expression</span>
        </Link>
        <button
          className="navbar-toggler"
          aria-controls="navigation"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id="navigation"
          className={`collapse navbar-collapse justify-content-end ${expanded ? "show" : ""}`}
        >
          <ul className="navbar-nav gap-md-3">
            {links.map(([path, label]) => (
              <li className="nav-item" key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function PageHeading({ label, title, children }) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-text">{children}</p>
    </div>
  );
}

function Home({ onSelect }) {
  return (
    <>
      <section className="hero-section container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-copy">
            <p className="eyebrow">
              <span className="small-dot" /> The digital collection · 2026
            </p>
            <h1>
              Art beyond
              <br />
              the <em>canvas.</em>
            </h1>
            <p className="intro-text">
              A small collection of big ideas. Explore illustration,
              photography, and moving images through the lens of digital
              creativity.
            </p>
            <Link to="/gallery" className="btn gallery-btn">
              Explore the gallery <span aria-hidden="true">→</span>
            </Link>
            <p className="hero-note">
              9 works · 4 perspectives · Endless inspiration
            </p>
          </div>
          <div className="col-lg-6">
            <button
              className="hero-art"
              onClick={() => onSelect(artworks[0])}
              aria-label="View Chromatic tide artwork"
            >
              <ArtworkImage artwork={artworks[0]} eager />
              <span className="hero-art-caption">
                <span>01 / Chromatic tide</span>
                <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="collection-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected from the collection</p>
              <h2>A few things to get lost in.</h2>
            </div>
            <Link className="text-link" to="/gallery">
              View all works <span aria-hidden="true">→</span>
            </Link>
          </div>
          <GalleryGrid
            artworks={[artworks[1], artworks[2], artworks[3]]}
            onSelect={onSelect}
          />
        </div>
      </section>
      <section className="container closing-note">
        <span className="eyebrow">Still images. Moving stories.</span>
        <h2>Creativity takes more than one form.</h2>
        <Link to="/videos" className="text-link">
          Discover digital film →
        </Link>
      </section>
    </>
  );
}

function Gallery({ onSelect }) {
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(artworks.map((artwork) => artwork.category || "Uncategorized")),
  ];
  const filtered =
    category === "All"
      ? artworks
      : artworks.filter((artwork) => artwork.category === category);
  return (
    <section className="container page-section">
      <PageHeading
        label="The collection"
        title="A world of digital expression."
      >
        Original experiments and open media, brought together in one place.
        Select a work to take a closer look.
      </PageHeading>
      <div className="filter-bar">
        <div
          className="filters"
          role="group"
          aria-label="Filter artwork by category"
        >
          {categories.map((value) => (
            <button
              key={value}
              className={`filter-button ${category === value ? "selected" : ""}`}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          {filtered.length} {filtered.length === 1 ? "work" : "works"}
        </p>
      </div>
      <GalleryGrid artworks={filtered} onSelect={onSelect} />
      {filtered.length === 0 && <p>No works in this category yet.</p>}
    </section>
  );
}

function Videos() {
  return (
    <section className="container page-section">
      <PageHeading label="Moving images" title="Art, in motion.">
        A different kind of canvas. Discover storytelling through digital
        animation.
      </PageHeading>
      {artworks
        .filter((artwork) => artwork.video)
        .map((artwork) => (
          <article className="video-card" key={artwork.id}>
            <div className="row g-4">
              <div className="col-lg-8">
                <VideoPlayer artwork={artwork} />
              </div>
              <div className="col-lg-4 video-copy">
                <p className="eyebrow">Digital animation · {artwork.year}</p>
                <h2>{artwork.title}</h2>
                <p>{artwork.artist}</p>
                <p>{artwork.description}</p>
                <Attribution artwork={artwork} />
              </div>
            </div>
          </article>
        ))}
    </section>
  );
}

function About() {
  return (
    <section className="container page-section">
      <PageHeading label="Behind the gallery" title="A place for curiosity.">
        An invitation to slow down, look closer, and discover what digital media
        can express.
      </PageHeading>
      <div className="row g-5 about-content">
        <div className="col-lg-7">
          <h2>Different media. A shared creative spirit.</h2>
          <p>
            Digital Art Gallery is an individual Advanced Web Design Module 2
            assignment. It brings together original SVG compositions, a
            historical photograph, and openly licensed animation in a responsive
            single-page application.
          </p>
          <p>
            The project demonstrates responsive web design with Bootstrap,
            reusable React components, client-side navigation, and interactive
            digital media. Every artwork has a story and a source; explore the
            details to find both.
          </p>
          <h2 className="mt-5">Built to be explored by everyone.</h2>
          <p>
            Use the category filters to find a medium, open artwork details with
            your keyboard, or watch the film at your own pace. The gallery
            supports small screens, reduced motion preferences, and native video
            controls.
          </p>
        </div>
        <div className="col-lg-5">
          <aside className="about-panel">
            <p className="eyebrow">Collection notes</p>
            <h3>Small by design.</h3>
            <p>
              Seven original digital compositions, one archival photograph, and
              one animated film excerpt.
            </p>
            <hr />
            <p>
              Original compositions are released under CC0. Third-party works
              retain their original attribution and license, shown with each
              work and documented in the README.
            </p>
            <Link className="text-link" to="/gallery">
              Meet the collection →
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
        <Link to="/" className="footer-brand">
          ✳ Digital Art Gallery
        </Link>
        <p>Advanced Web Design · Module 2 Assignment</p>
        <span>Made for exploration.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const main = useRef(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const label =
      links.find(([path]) => path === location.pathname)?.[1] ||
      "Page not found";
    document.title = `${label} | Digital Art Gallery`;
    if (previousPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      main.current.focus();
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} ref={main}>
        <Routes>
          <Route path="/" element={<Home onSelect={setSelected} />} />
          <Route path="/gallery" element={<Gallery onSelect={setSelected} />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <section className="container page-section">
                <PageHeading label="404" title="This space is empty.">
                  The page you’re looking for could not be found.
                </PageHeading>
                <Link to="/" className="btn gallery-btn">
                  Return home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      {selected && (
        <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
