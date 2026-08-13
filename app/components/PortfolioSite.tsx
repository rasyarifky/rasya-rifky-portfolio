"use client";
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  animations,
  designs,
  Lang,
  programs,
  siteConfig,
  social,
  Work,
} from "../data";

type Page = "home" | "about" | "design" | "program" | "animation";
const pages: { key: Page; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "design", href: "/design" },
  { key: "program", href: "/program" },
  { key: "animation", href: "/animation" },
];
const copy = {
  id: {
    home: "Home",
    about: "About",
    design: "Design",
    program: "Program",
    animation: "Animation",
    eyebrow: "DESAINER KREATIF × PROGRAMMER PENASARAN",
    role: "DESAINER × DEVELOPER",
    intro:
      "Saya Rasya Rifky — lebih dikenal sebagai Fyrnnn. Saya mengubah ide menjadi visual yang layak diperhatikan, dan kode menjadi pengalaman yang layak digunakan. Di sinilah kreativitas bertemu logika.",
    support: "Dukung lewat Saweria",
    scroll: "GESER UNTUK MENJELAJAH",
    selected: "Proyek Pilihan",
    selectedSub: "Beberapa hal yang baru-baru ini saya bangun.",
    view: "Lihat detail",
    moving: "Eksplorasi Visual",
    movingSub: "Poster, identitas, dan eksperimen yang terus bergerak.",
    aboutKicker: "TENTANG FYRNNN",
    aboutTitle: "Dua dunia, satu cara berpikir.",
    profile: "Profil singkat",
    profileText:
      "Saya Rasya Rifky — lebih dikenal sebagai Fyrnnn. Seorang pembelajar desain komunikasi visual yang senang mengubah ide menjadi visual, dan kode menjadi pengalaman yang benar-benar bisa dirasakan.",
    why: "Mengapa desain & programming?",
    whyText:
      "Saya menemukan jalan ke desain komunikasi visual karena Fritzy Rosmerian — saya menyukainya, dan rasa suka itu berubah jadi arah yang nyata: saya ikut mengambil jurusan yang sama dengannya. Programming datang beriringan, sama menariknya dengan caranya sendiri — menyenangkan, mengasah cara berpikir, dan membuat desain benar-benar hidup. Desain membentuk rasa. Kode memberi perilaku.",
    nameStory: "Cerita di balik Fyrnnn",
    nameText:
      "Fyrn tersusun dari inisial Rasya Rifky Fahrezy Ramadhan dan Fritzy Rosmerian. Tiga huruf “n” memberinya ritme — sesuatu yang personal dan khas. Maknanya tetap sama; bentuknya saja yang terasa lebih seperti diri saya.",
    allDesign: "Arsip Desain",
    allDesignSub:
      "Kumpulan ide visual tanpa filter — setiap karya punya ritme dan ceritanya sendiri.",
    allProgram: "Program Pilihan",
    allProgramSub:
      "Proyek digital yang telah rampung, dibangun dengan perhatian setara pada fungsi dan pengalaman.",
    allAnimation: "Eksperimen Animasi",
    allAnimationSub:
      "Gerak, tempo, dan cerita pendek yang menunggu untuk diputar.",
    meaning: "Tentang karya",
    openSite: "Lihat Website",
    close: "Tutup",
    previous: "Sebelumnya",
    next: "Berikutnya",
    footerLine: "Berpikir secara visual. Membangun dengan logika.",
  },
  en: {
    home: "Home",
    about: "About",
    design: "Design",
    program: "Program",
    animation: "Animation",
    eyebrow: "CREATIVE DESIGNER × CURIOUS PROGRAMMER",
    role: "DESIGNER × DEVELOPER",
    intro:
      "I’m Rasya Rifky — but you’ll know me as Fyrnnn. I turn ideas into visuals worth pausing for, and code into experiences worth using. This is where creativity meets logic.",
    support: "Support via Saweria",
    scroll: "SCROLL TO EXPLORE",
    selected: "Selected Projects",
    selectedSub: "A few things I’ve built recently.",
    view: "View details",
    moving: "Visual Explorations",
    movingSub: "Posters, identities, and experiments in constant motion.",
    aboutKicker: "ABOUT FYRNNN",
    aboutTitle: "Two worlds, one way of thinking.",
    profile: "Quick profile",
    profileText:
      "I’m Rasya Rifky — Fyrnnn to most people online. A visual communication design student who loves turning ideas into visuals, and code into experiences you can actually feel.",
    why: "Why design & programming?",
    whyText:
      "I found my way to visual communication design because of Fritzy Rosmerian — I’ve admired her for a while, and that admiration turned into a real direction: I chose the same major she did. Programming came right alongside it, just as compelling in its own way — it’s fun, it sharpens how I think, and it gives design a way to truly come alive. Design shapes the feeling. Code gives it behavior.",
    nameStory: "The story behind Fyrnnn",
    nameText:
      "Fyrn is built from the initials of Rasya Rifky Fahrezy Ramadhan and Fritzy Rosmerian. The three “n”s give it rhythm — something personal, something distinct. The meaning stays the same; the shape just feels more like me.",
    allDesign: "Design Archive",
    allDesignSub:
      "An unfiltered collection of visual ideas — each piece carries its own rhythm and story.",
    allProgram: "Selected Programs",
    allProgramSub:
      "Finished digital projects, built with equal care for function and feel.",
    allAnimation: "Animation Experiments",
    allAnimationSub: "Motion, tempo, and short stories waiting to be played.",
    meaning: "About the work",
    openSite: "View Website",
    close: "Close",
    previous: "Previous",
    next: "Next",
    footerLine: "Visual thinker. Logic builder.",
  },
};
type CopyText = typeof copy.en;
type OpenWork = (items: Work[], index: number, kind: Page) => void;
const scrubFrames = new WeakMap<HTMLElement, number>();

function driveId(url?: string) {
  if (!url) return null;
  return (
    url.match(/\/file\/d\/([^/]+)/)?.[1] ??
    url.match(/[?&]id=([^&]+)/)?.[1] ??
    null
  );
}
function imageSource(url?: string) {
  const id = driveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1600` : url;
}
function durationLabel(work: Work) {
  return work.subtitle.en.match(/\d{2}:\d{2}/)?.[0] ?? "00:00";
}

function Art({ work, mini = false }: { work: Work; mini?: boolean }) {
  const type = work.id.startsWith("d")
      ? "design-art"
      : work.id.startsWith("p")
        ? "program-art"
        : "animation-art",
    src = imageSource(work.image),
    ratio = work.ratio ?? "auto";
  return (
    <div
      className={`art tone-${work.tone} ${ratio} ${type} ${src ? "has-media" : ""} ${mini ? "mini" : ""}`}
    >
      {src ? (
        <img
          className="art-media"
          src={src}
          alt={work.imageAlt ?? work.title}
          loading={mini ? "eager" : "lazy"}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight)
              img.parentElement?.style.setProperty(
                "aspect-ratio",
                `${img.naturalWidth} / ${img.naturalHeight}`,
              );
          }}
        />
      ) : (
        <>
          <span className="art-ring" />
          <span className="sr-only">{work.title}</span>
        </>
      )}
    </div>
  );
}

function AnimationMedia({
  work,
  preview = false,
  eager = false,
}: {
  work: Work;
  preview?: boolean;
  eager?: boolean;
}) {
  if (!work.video) return <Art work={work} />;
  const id = driveId(work.video);
  if (id)
    return preview ? (
      <div className="animation-preview">
        <img
          src={`https://drive.google.com/thumbnail?id=${id}&sz=w1600`}
          alt={work.title}
          loading={eager ? "eager" : "lazy"}
        />
        <span className="scrub-hint" aria-hidden="true">
          HOVER TO SCRUB ↔
        </span>
      </div>
    ) : (
      <div className="animation-media-frame drive-player">
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          title={work.title}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  if (!preview) return <EditorVideoPlayer work={work} />;
  const scrub = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType === "touch" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const target = e.currentTarget,
      box = target.getBoundingClientRect(),
      progress = Math.max(0, Math.min(1, (e.clientX - box.left) / box.width)),
      video = target.querySelector("video");
    target.style.setProperty("--scrub", `${progress * 100}%`);
    if (!video) return;
    if (video.preload === "none") {
      video.preload = "metadata";
      video.load();
    }
    const previous = scrubFrames.get(target);
    if (previous) cancelAnimationFrame(previous);
    scrubFrames.set(
      target,
      requestAnimationFrame(() => {
        if (Number.isFinite(video.duration)) {
          const next = progress * video.duration;
          if (Math.abs(video.currentTime - next) > 0.04)
            video.currentTime = next;
        }
        scrubFrames.delete(target);
      }),
    );
  };
  const reset = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget,
      frame = scrubFrames.get(target),
      video = target.querySelector("video");
    if (frame) cancelAnimationFrame(frame);
    scrubFrames.delete(target);
    target.style.setProperty("--scrub", "0%");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };
  return (
    <div
      className="animation-preview scrubbable"
      onPointerMove={scrub}
      onPointerLeave={reset}
    >
      <video
        src={work.video}
        muted
        playsInline
        preload={eager ? "metadata" : "none"}
        aria-label={work.title}
      />
      <span className="scrub-hint" aria-hidden="true">
        HOVER TO SCRUB ↔
      </span>
      <div className="preview-timeline" aria-hidden="true">
        <i />
        <b>{durationLabel(work)}</b>
      </div>
    </div>
  );
}

function EditorVideoPlayer({ work }: { work: Work }) {
  const ref = useRef<HTMLVideoElement>(null),
    [playing, setPlaying] = useState(true),
    [progress, setProgress] = useState(0);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };
  const seek = (value: number) => {
    const video = ref.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };
  return (
    <div className="animation-media-frame editor-player">
      <video
        ref={ref}
        src={work.video}
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-label={work.title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (video.duration)
            setProgress((video.currentTime / video.duration) * 100);
        }}
      />
      <div className="editor-controls">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause animation" : "Play animation"}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
        <div className="editor-ruler">
          <input
            aria-label="Animation timeline"
            type="range"
            min="0"
            max="100"
            step=".1"
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          />
          <i style={{ left: `${progress}%` }} />
        </div>
        <b>{durationLabel(work)}</b>
      </div>
    </div>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const props = { size: 18, "aria-hidden": true };
  if (platform === "YouTube") return <FaYoutube {...props} />;
  if (platform === "Instagram") return <FaInstagram {...props} />;
  if (platform === "TikTok") return <FaTiktok {...props} />;
  if (platform === "GitHub") return <FaGithub {...props} />;
  return <FaXTwitter {...props} />;
}

export default function PortfolioSite({ page }: { page: Page }) {
  const [lang, setLang] = useState<Lang>("en"),
    [menu, setMenu] = useState(false),
    [visible, setVisible] = useState(true),
    [scrolled, setScrolled] = useState(false),
    [modal, setModal] = useState<{
      items: Work[];
      index: number;
      kind: Page;
    } | null>(null),
    [modalClosing, setModalClosing] = useState(false);
  const lastY = useRef(0),
    scrollTravel = useRef(0),
    carousel = useRef<HTMLDivElement>(null),
    menuRef = useRef<HTMLElement>(null),
    lastFocus = useRef<HTMLElement | null>(null),
    closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null),
    modalClosingRef = useRef(false),
    t = copy[lang];
  useEffect(() => {
    const initTimer = setTimeout(() => {
      const saved = sessionStorage.getItem("fyrnnn-lang") as Lang | null;
      setLang(
        saved ??
          (navigator.language.toLowerCase().startsWith("id") ? "id" : "en"),
      );
    }, 0);
    return () => clearTimeout(initTimer);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);
  useEffect(() => {
    const navigate = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const target = e.target as Element | null,
        a = target?.closest<HTMLAnchorElement>('a[href^="/"]'),
        href = a?.getAttribute("href");
      if (!href || href === location.pathname) return;
      e.preventDefault();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        location.href = href;
        return;
      }
      document.documentElement.classList.add("page-leaving");
      setTimeout(() => {
        location.href = href;
      }, 150);
    };
    document.addEventListener("click", navigate);
    return () => document.removeEventListener("click", navigate);
  }, []);
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY,
        delta = y - lastY.current;
      lastY.current = y;
      setScrolled(y > 72);
      if (y < 80) {
        scrollTravel.current = 0;
        setVisible(true);
        return;
      }
      if (delta > 0) {
        scrollTravel.current = Math.max(0, scrollTravel.current) + delta;
        if (scrollTravel.current > 18) setVisible(false);
      } else if (delta < 0) {
        scrollTravel.current = Math.min(0, scrollTravel.current) + delta;
        if (scrollTravel.current < -10) setVisible(true);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const value = max > 0 ? Math.min(1, scrollY / max) : 0;
      progress?.style.setProperty("--progress", String(value));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [page]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");
    const nodes = [
      ...document.querySelectorAll<HTMLElement>(
        ".section-head,.project-card,.marquee,.gallery-title,.work-card,.about-grid,.stories article,.huge-word,footer",
      ),
    ];
    nodes.forEach((node, index) => {
      node.classList.add("motion-item");
      node.style.setProperty(
        "--motion-delay",
        `${Math.min(index % 6, 5) * 55}ms`,
      );
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [page]);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = hero.getBoundingClientRect(),
          x = (e.clientX - box.left) / box.width - 0.5,
          y = (e.clientY - box.top) / box.height - 0.5;
        hero.style.setProperty("--hero-x", `${(x * 14).toFixed(2)}px`);
        hero.style.setProperty("--hero-y", `${(y * 9).toFixed(2)}px`);
      });
    };
    const leave = () => {
      hero.style.setProperty("--hero-x", "0px");
      hero.style.setProperty("--hero-y", "0px");
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, [page]);
  useEffect(() => {
    const glow = document.querySelector<HTMLElement>(".cursor-glow"),
      fine = matchMedia("(hover: hover) and (pointer: fine)");
    if (
      !glow ||
      !fine.matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${e.clientX - 380}px,${e.clientY - 380}px,0)`;
      });
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", move);
    };
  }, []);
  useEffect(() => {
    const root = document.documentElement,
      marquees = [...document.querySelectorAll<HTMLElement>(".marquee")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("is-running", entry.isIntersecting),
        ),
      { rootMargin: "120px 0px" },
    );
    marquees.forEach((node) => observer.observe(node));
    const visibility = () => {
      const hidden = document.hidden;
      root.classList.toggle("tab-hidden", hidden);
      if (hidden)
        document
          .querySelectorAll<HTMLVideoElement>("video")
          .forEach((video) => video.pause());
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      root.classList.remove("tab-hidden");
    };
  }, [page]);
  useEffect(() => {
    const closeMenu = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") setMenu(false);
      if (
        e instanceof MouseEvent &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      )
        setMenu(false);
    };
    addEventListener("mousedown", closeMenu);
    addEventListener("keydown", closeMenu);
    return () => {
      removeEventListener("mousedown", closeMenu);
      removeEventListener("keydown", closeMenu);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const links = menuRef.current?.querySelectorAll<HTMLElement>(
      ".mobile-nav a,.menu",
    );
    links?.[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !links?.length) return;
      const first = links[0],
        last = links[links.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    addEventListener("keydown", trap);
    return () => {
      removeEventListener("keydown", trap);
      document.body.style.overflow = "";
    };
  }, [menu]);
  const modalOpen = modal !== null;
  const closeModal = useCallback(() => {
    if (modalClosingRef.current) return;
    modalClosingRef.current = true;
    setModalClosing(true);
    closeTimer.current = setTimeout(() => {
      setModal(null);
      setModalClosing(false);
      modalClosingRef.current = false;
    }, 200);
  }, []);
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    const key = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight")
        setModal((m) =>
          m ? { ...m, index: (m.index + 1) % m.items.length } : m,
        );
      if (e.key === "ArrowLeft")
        setModal((m) =>
          m
            ? { ...m, index: (m.index - 1 + m.items.length) % m.items.length }
            : m,
        );
      if (e.key === "Tab") {
        const box = document.querySelector(".modal");
        const focusable = box?.querySelectorAll<HTMLElement>(
          "button:not([disabled]),a[href]",
        );
        if (!focusable?.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", key);
    const focusTimer = setTimeout(
      () => document.querySelector<HTMLElement>(".modal-close")?.focus(),
      0,
    );
    return () => {
      clearTimeout(focusTimer);
      removeEventListener("keydown", key);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [modalOpen, closeModal]);
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );
  const chooseLang = (next: Lang) => {
    setLang(next);
    sessionStorage.setItem("fyrnnn-lang", next);
  };
  const open = (items: Work[], index: number, kind: Page) => {
    lastFocus.current = document.activeElement as HTMLElement;
    modalClosingRef.current = false;
    setModalClosing(false);
    setModal({ items, index, kind });
  };
  const step = (by: number) =>
    setModal((m) =>
      m ? { ...m, index: (m.index + by + m.items.length) % m.items.length } : m,
    );
  const scroll = (by: number) =>
    carousel.current?.scrollBy({ left: by * 380, behavior: "smooth" });
  return (
    <>
      <div className="ambient-bg" aria-hidden="true">
        <i className="cursor-glow" />
      </div>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header
        ref={menuRef}
        className={`${visible ? "" : "header-hidden"} ${scrolled ? "scrolled" : ""}`}
      >
        <a className="logo" href="/">
          rasyarifky.<span>my.id</span>
        </a>
        <nav aria-label="Primary navigation">
          {pages.map((p) => (
            <a
              className={page === p.key ? "active" : ""}
              href={p.href}
              key={p.key}
            >
              {t[p.key]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="lang" aria-label="Language">
            <button
              className={lang === "id" ? "on" : ""}
              aria-pressed={lang === "id"}
              onClick={() => chooseLang("id")}
            >
              ID
            </button>
            <i>/</i>
            <button
              className={lang === "en" ? "on" : ""}
              aria-pressed={lang === "en"}
              onClick={() => chooseLang("en")}
            >
              EN
            </button>
          </div>
          <button
            className={`menu ${menu ? "open" : ""}`}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span />
          </button>
        </div>
        {menu && (
          <div className="mobile-nav">
            {pages.map((p, i) => (
              <a href={p.href} key={p.key}>
                <span>0{i + 1}</span>
                {t[p.key]}
              </a>
            ))}
          </div>
        )}
      </header>
      <main id="content" className="page-enter">
        {page === "home" && (
          <Home
            t={t}
            lang={lang}
            carousel={carousel}
            scroll={scroll}
            open={open}
          />
        )}{" "}
        {page === "about" && <About t={t} />}{" "}
        {page === "design" && (
          <Gallery
            title={t.allDesign}
            sub={t.allDesignSub}
            items={designs}
            kind="design"
            lang={lang}
            open={open}
            masonry
          />
        )}{" "}
        {page === "program" && (
          <Gallery
            title={t.allProgram}
            sub={t.allProgramSub}
            items={programs}
            kind="program"
            lang={lang}
            open={open}
          />
        )}{" "}
        {page === "animation" && (
          <Gallery
            title={t.allAnimation}
            sub={t.allAnimationSub}
            items={animations}
            kind="animation"
            lang={lang}
            open={open}
          />
        )}
      </main>
      <Footer t={t} />
      {modal && (
        <Modal
          state={modal}
          lang={lang}
          t={t}
          close={closeModal}
          step={step}
          closing={modalClosing}
        />
      )}
    </>
  );
}

function Home({
  t,
  lang,
  carousel,
  scroll,
  open,
}: {
  t: CopyText;
  lang: Lang;
  carousel: React.RefObject<HTMLDivElement | null>;
  scroll: (by: number) => void;
  open: OpenWork;
}) {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">
          <span /> {t.eyebrow}
        </div>
        <div className="hero-signature" aria-hidden="true">
          FYRNNN
        </div>
        <div className="hero-name-wrap">
          <h1 className="hero-name">Rasya Rifky</h1>
        </div>
        <div className="hero-core">
          <div className="side-note">{t.role}</div>
          <div
            className="avatar"
            aria-label="Illustrated avatar of Rasya Rifky"
          >
            <span className="halo" />
            <span className="head">
              <i className="brow left" />
              <i className="brow right" />
              <i className="eye left" />
              <i className="eye right" />
              <i className="nose" />
            </span>
            <span className="hair" />
            <span className="neck" />
            <span className="body" />
            <b>FYRNNN</b>
          </div>
          <div className="handle">01 / 05</div>
        </div>
        <p>{t.intro}</p>
        <div className="socials">
          {social.map((s) => (
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              key={s.label}
            >
              <SocialIcon platform={s.label} />
            </a>
          ))}
          <a
            className="saweria"
            href={siteConfig.supportUrl}
            target="_blank"
            rel="noreferrer"
          >
            ✦ {t.support}
          </a>
        </div>
        <div className="scroll-cue">
          {t.scroll} <span>↓</span>
        </div>
      </section>
      <section className="section projects reveal">
        <SectionHead n="01" title={t.selected} sub={t.selectedSub} />
        <div
          className="carousel"
          ref={carousel}
          tabIndex={0}
          aria-label="Selected projects carousel"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") scroll(-1);
            if (e.key === "ArrowRight") scroll(1);
          }}
        >
          {programs.map((w, i) => (
            <button
              type="button"
              className="project-card"
              key={w.id}
              aria-haspopup="dialog"
              aria-label={`${t.view}: ${w.title}`}
              onClick={() => open(programs, i, "program")}
            >
              <Art work={w} />
              <div>
                <span>{w.subtitle[lang]}</span>
                <h3>{w.title}</h3>
                <i>{t.view} ↗</i>
              </div>
            </button>
          ))}
        </div>
        <div className="carousel-nav">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous projects"
          >
            ←
          </button>
          <div>
            <b>01</b>
            <span />
          </div>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next projects"
          >
            →
          </button>
        </div>
      </section>
      <section className="section showcase">
        <SectionHead n="02" title={t.moving} sub={t.movingSub} />
        <Marquee items={designs.slice(0, 4)} open={open} />
        <Marquee
          items={[...designs].reverse().slice(0, 4)}
          reverse
          open={open}
        />
      </section>
    </>
  );
}

function SectionHead({
  n,
  title,
  sub,
}: {
  n: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="section-head">
      <span>{n}</span>
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>
  );
}
function Marquee({
  items,
  reverse,
  open,
}: {
  items: Work[];
  reverse?: boolean;
  open: OpenWork;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`}>
      <div>
        {doubled.map((w, i) => (
          <button
            key={w.id + i}
            onClick={() =>
              open(
                designs,
                designs.findIndex((d) => d.id === w.id),
                "design",
              )
            }
          >
            <Art work={w} mini />
            <span>{w.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function About({ t }: { t: CopyText }) {
  return (
    <section className="inner about">
      <div className="page-kicker">
        <span>02</span>
        {t.aboutKicker}
      </div>
      <h1>{t.aboutTitle}</h1>
      <div className="about-grid">
        <div className="avatar large">
          <span className="halo" />
          <span className="head" />
          <span className="hair" />
          <span className="body" />
          <b>FYRNNN</b>
        </div>
        <div className="stories">
          {[
            ["01", t.profile, t.profileText],
            ["02", t.why, t.whyText],
            ["03", t.nameStory, t.nameText],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <div>
                <h2>{x[1]}</h2>
                <p>{x[2]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="huge-word">FYRNNN</div>
    </section>
  );
}
function Gallery({
  title,
  sub,
  items,
  kind,
  lang,
  open,
  masonry = false,
}: {
  title: string;
  sub: string;
  items: Work[];
  kind: Page;
  lang: Lang;
  open: OpenWork;
  masonry?: boolean;
}) {
  return (
    <section className="inner gallery-page">
      <div className="page-kicker">
        <span>
          {kind === "design" ? "03" : kind === "program" ? "04" : "05"}
        </span>
        {kind === "animation" && lang === "id"
          ? "ANIMASI"
          : kind === "design" && lang === "id"
            ? "DESAIN"
            : kind.toUpperCase()}
      </div>
      <div className="gallery-title">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className={masonry ? "masonry" : "work-grid"}>
        {items.map((w, i) => (
          <button
            type="button"
            className={`work-card ratio-${w.ratio ?? "auto"} ${kind === "animation" ? "has-video" : ""}`}
            key={w.id}
            onClick={() => open(items, i, kind)}
          >
            {kind === "animation" ? (
              <AnimationMedia work={w} preview eager={i === 0} />
            ) : (
              <Art work={w} />
            )}
            <div>
              <span>0{i + 1}</span>
              <h2>{w.title}</h2>
              <p>{w.subtitle[lang]}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
function Footer({ t }: { t: CopyText }) {
  return (
    <footer>
      <div>
        <a className="logo" href="/">
          rasyarifky.<span>my.id</span>
        </a>
        <p>{t.footerLine}</p>
      </div>
      <div className="footer-nav">
        {pages.map((p) => (
          <a href={p.href} key={p.key}>
            {t[p.key]}
          </a>
        ))}
      </div>
      <div className="footer-social">
        {social.map((s) => (
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            key={s.label}
          >
            <SocialIcon platform={s.label} /> <span>{s.label}</span>
          </a>
        ))}
      </div>
      <small>© 2026 Rasya Rifky. All rights reserved.</small>
    </footer>
  );
}
function Modal({
  state,
  lang,
  t,
  close,
  step,
  closing,
}: {
  state: { items: Work[]; index: number; kind: Page };
  lang: Lang;
  t: CopyText;
  close: () => void;
  step: (n: number) => void;
  closing: boolean;
}) {
  const w = state.items[state.index];
  return (
    <div
      className={`modal-backdrop ${closing ? "closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={close} aria-label={t.close}>
          ×
        </button>
        <div className="modal-content-swap" key={`${state.kind}-${w.id}`}>
          <div
            className={`modal-media ${state.kind === "animation" ? "animation-media" : ""}`}
          >
            {state.kind === "animation" ? (
              <AnimationMedia work={w} eager />
            ) : (
              <Art work={w} />
            )}{" "}
            {state.kind === "program" && w.url && (
              <a
                className="visit"
                href={w.url}
                target="_blank"
                rel="noreferrer"
              >
                {t.openSite} ↗
              </a>
            )}
          </div>
          <div className="modal-copy">
            <span>{w.subtitle[lang]}</span>
            <h2 id="modal-title">{w.title}</h2>
            <small>{t.meaning}</small>
            <p>{w.description[lang]}</p>
            <div className="modal-nav">
              <button onClick={() => step(-1)}>← {t.previous}</button>
              <b>
                {String(state.index + 1).padStart(2, "0")} /{" "}
                {String(state.items.length).padStart(2, "0")}
              </b>
              <button onClick={() => step(1)}>{t.next} →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
