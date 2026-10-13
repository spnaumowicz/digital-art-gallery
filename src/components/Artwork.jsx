import { useEffect, useRef, useState } from "react";

export function ArtworkImage({ artwork, eager = false }) {
  const [failedSource, setFailedSource] = useState(null);
  const source = artwork.image;
  if (!source || failedSource === source)
    return (
      <div
        className="image-fallback"
        role="img"
        aria-label={`Image unavailable for ${artwork.title || "Untitled artwork"}`}
      >
        <span>Image unavailable</span>
      </div>
    );
  return (
    <img
      src={source}
      alt={artwork.alt || artwork.title || "Artwork"}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailedSource(source)}
    />
  );
}

export function ArtworkCard({ artwork, onSelect }) {
  return (
    <article className="artwork-card h-100">
      <button
        className="artwork-open"
        onClick={() => onSelect(artwork)}
        aria-label={`View details for ${artwork.title || "Untitled artwork"}`}
      >
        <div className="artwork-image">
          <ArtworkImage artwork={artwork} />
          <span className="view-art">View artwork →</span>
          {artwork.video && <span className="video-badge">▶ Film</span>}
        </div>
        <div className="artwork-caption">
          <span className="eyebrow">{artwork.category || "Uncategorized"}</span>
          <h3>{artwork.title || "Untitled artwork"}</h3>
          <p>
            {artwork.artist || "Artist not recorded"}{" "}
            <span>· {artwork.year || "Year unknown"}</span>
          </p>
        </div>
      </button>
    </article>
  );
}

export function GalleryGrid({ artworks, onSelect }) {
  return (
    <div className="row g-4">
      {artworks.map((artwork, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={artwork.id || index}>
          <ArtworkCard artwork={artwork} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}

export function VideoPlayer({ artwork }) {
  const [failed, setFailed] = useState(false);
  if (!artwork.video || failed)
    return (
      <p role="status">This video is unavailable. Please try again later.</p>
    );
  return (
    <>
      <video
        className="gallery-video"
        controls
        playsInline
        preload="none"
        poster={artwork.image}
        aria-label={artwork.title}
        onError={() => setFailed(true)}
      >
        <source src={artwork.video} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <p className="video-note">
        Audio: music and sound effects. No dialogue. Playback starts only when
        you press play.
      </p>
    </>
  );
}

export function Attribution({ artwork }) {
  return (
    <p className="attribution">
      {artwork.source} {artwork.license}.
      {artwork.sourceUrl && (
        <>
          {" "}
          <a href={artwork.sourceUrl} target="_blank" rel="noreferrer">
            Source &amp; license →
          </a>
        </>
      )}
    </p>
  );
}

export function ArtworkModal({ artwork, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, []);
  function keepFocusInside(event) {
    if (event.key !== "Tab") return;
    const controls = [
      ...dialog.current.querySelectorAll(
        'button, a[href], video[controls], [tabindex="0"]',
      ),
    ];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <dialog
      onKeyDown={keepFocusInside}
      ref={dialog}
      className="art-dialog"
      aria-labelledby="artwork-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <span className="eyebrow">Artwork details</span>
          <button
            autoFocus
            className="close-button"
            onClick={onClose}
            aria-label="Close artwork details"
          >
            ✕
          </button>
        </div>
        <div className="detail-image">
          {artwork.video ? (
            <VideoPlayer artwork={artwork} />
          ) : (
            <ArtworkImage artwork={artwork} eager />
          )}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{artwork.category || "Uncategorized"}</span>
          <h2 id="artwork-title">{artwork.title || "Untitled artwork"}</h2>
          <p>
            {artwork.artist || "Artist not recorded"} ·{" "}
            {artwork.year || "Year unknown"}
          </p>
          <p>
            {artwork.description ||
              "No description is available for this artwork."}
          </p>
          <Attribution artwork={artwork} />
        </div>
      </div>
    </dialog>
  );
}
