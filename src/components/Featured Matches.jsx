import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * FeaturedMatchesCarousel
 * --------------------------------------------------------
 * A responsive, accessible carousel for showcasing newly joined members.
 * - Blurs profile photos until `isLoggedIn` is true (privacy-first)
 * - Keyboard accessible (ArrowLeft / ArrowRight)
 * - Mouse & touch drag support
 * - Autoplay with pause on hover/focus
 * - Responsive cards (1/2/3 visible depending on width)
 * - Clean Tailwind CSS styling (no extra deps)
 *
 * Usage:
 * <FeaturedMatchesCarousel
 *   members={[{ id: 1, name: "Priya, 26", city: "Chennai", job: "Designer", photo: "/img/priya.jpg" }, ...]}
 *   isLoggedIn={false}
 *   onLogin={() => console.log("Login CTA clicked")}
 * />
 */

const sampleMembers = [
  {
    id: 1,
    name: "Priya, 26",
    city: "Chennai",
    job: "Product Designer",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rahul, 29",
    city: "Bengaluru",
    job: "Software Engineer",
    photo:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ananya, 24",
    city: "Hyderabad",
    job: "Architect",
    photo:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Vikram, 31",
    city: "Pune",
    job: "Entrepreneur",
    photo:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Meera, 27",
    city: "Delhi",
    job: "Marketing Manager",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
];

function useAutoplay({ enabled, delay = 3500, onTick }) {
  const timer = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    timer.current = setInterval(onTick, delay);
    return () => clearInterval(timer.current);
  }, [enabled, delay, onTick]);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function FeaturedMatchesCarousel({
  members = sampleMembers,
  isLoggedIn = false,
  onLogin,
  heading = "Featured Matches · New Profiles",
  subheading = "Recently joined members near you",
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  // Cards per view based on width (1 / 2 / 3)
  const cardsPerView = useResponsiveCardsPerView();
  const maxIndex = Math.max(0, members.length - cardsPerView);

  const goTo = (i) => setIndex((prev) => clamp(i, 0, maxIndex));
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useAutoplay({
    enabled: !isPaused,
    delay: 3500,
    onTick: () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [maxIndex, next, prev]);

  // Drag to scroll (simple, inertial-free)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e) => {
      isDown = true;
      startX = (e.touches ? e.touches[0].pageX : e.pageX) - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const onLeave = () => (isDown = false);
    const onUp = () => (isDown = false);
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.touches ? e.touches.pageX : e.pageX) - track.offsetLeft;
      const walk = (x - startX) * 1; // scroll-fast
      track.scrollLeft = scrollLeft - walk;
    };

    track.addEventListener("mousedown", onDown);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("mouseup", onUp);
    track.addEventListener("mousemove", onMove);

    track.addEventListener("touchstart", onDown, { passive: true });
    track.addEventListener("touchend", onUp, { passive: true });
    track.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      track.removeEventListener("mousedown", onDown);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mouseup", onUp);
      track.removeEventListener("mousemove", onMove);

      track.removeEventListener("touchstart", onDown, { passive: true });
      track.removeEventListener("touchend", onUp, { passive: true });
      track.removeEventListener("touchmove", onMove, { passive: false });
    };
  }, []);

  // Sync transform with index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth / cardsPerView;
    const target = slideWidth * index;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, [index, cardsPerView]);

  return (
    <section
      className="w-full px-4 md:px-6 lg:px-8 py-10 bg-gradient-to-b from-rose-50 to-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
              {heading}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">{subheading}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={prev}
              className="h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm active:scale-95 transition disabled:opacity-40 grid place-content-center"
              disabled={index === 0}
            >
              <ArrowLeftIcon />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm active:scale-95 transition disabled:opacity-40 grid place-content-center"
              disabled={index === maxIndex}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="relative w-full overflow-x-auto scroll-smooth no-scrollbar"
          role="region"
          aria-roledescription="carousel"
          aria-label="New members"
        >
          <ul
            className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] lg:auto-cols-[31%] gap-4 md:gap-5"
            style={{ contain: "content" }}
          >
            {members.map((m) => (
              <li key={m.id} className="">
                <ProfileCard member={m} masked={!isLoggedIn} onLogin={onLogin} />
              </li>
            ))}
          </ul>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-rose-500" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ member, masked, onLogin }) {
  return (
    <article className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Image */}
        <img
          src={member.photo}
          alt={masked ? "Login to view photo" : `${member.name} profile photo`}
          className={`h-full w-full object-cover transition duration-500 ${
            masked ? "blur-lg scale-[1.02]" : ""
          }`}
          loading="lazy"
        />

        {/* Privacy Mask Overlay */}
        {masked && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" aria-hidden>
            <div className="absolute inset-x-3 bottom-3 flex flex-col items-center text-white">
              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/30">
                <LockIcon />
                <span>Photos hidden for privacy</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 truncate" title={member.name}>
            {masked ? obfuscateName(member.name) : member.name}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap">{member.city}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
          {masked ? "Join to view details" : member.job}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Small privacy dots to imply more photos */}
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          </div>

          {masked ? (
            <button
              onClick={onLogin}
              className="text-sm font-medium px-3 py-1.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 active:scale-95 transition"
            >
              Login to Unblur
            </button>
          ) : (
            <button className="text-sm font-medium px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-black active:scale-95 transition">
              View Profile
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function obfuscateName(name = "Member") {
  // Show first letter only (e.g., "P****, 26")
  const [first, ...rest] = name.split("");
  const stars = rest.map((c) => (c === "," ? "," : "*"));
  return [first, ...stars].join("");
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11V8a5 5 0 1110 0v3" />
      <rect x="5" y="11" width="14" height="9" rx="2" ry="2" strokeWidth="2" />
    </svg>
  );
}

function useResponsiveCardsPerView() {
  const [value, setValue] = useState(1);
  useEffect(() => {
    const mql1 = window.matchMedia("(min-width: 640px)"); // sm
    const mql2 = window.matchMedia("(min-width: 1024px)"); // lg

    const compute = () => {
      if (mql2.matches) setValue(3);
      else if (mql1.matches) setValue(2);
      else setValue(1);
    };
    compute();
    mql1.addEventListener("change", compute);
    mql2.addEventListener("change", compute);
    return () => {
      mql1.removeEventListener("change", compute);
      mql2.removeEventListener("change", compute);
    };
  }, []);
  return value;
}

// Optional helper to hide scrollbars in WebKit/Firefox/Edge
const styles = `
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// Inject style tag once
if (typeof document !== "undefined" && !document.getElementById("no-scrollbar-style")) {
  const style = document.createElement("style");
  style.id = "no-scrollbar-style";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
