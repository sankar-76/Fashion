import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStaggerReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const ALL_PRODUCTS = [
  // Outerwear (Coats & Jackets)
  {
    id: 1,
    name: "Ashen Wool Overcoat",
    price: "₹18,999",
    tag: "Outerwear",
    season: "AW",
    bg: "#d4ccc0",
    image:
      "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/e8e0d5/8c7c6b?text=Overcoat",
  },
  {
    id: 2,
    name: "Classic Trench Coat",
    price: "₹20,000",
    tag: "Outerwear",
    season: "AW",
    bg: "#c8c0b5",
    image:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/d4c9bc/8c7c6b?text=Trench",
  },
  {
    id: 3,
    name: "Leather Biker Jacket",
    price: "₹19,999",
    tag: "Outerwear",
    season: "AW",
    bg: "#2a2420",
    image:
      "https://images.pexels.com/photos/1152676/pexels-photo-1152676.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/3a3228/8c7c6b?text=Leather+Jacket",
  },
  {
    id: 4,
    name: "Wool Blend Peacoat",
    price: "₹17,999",
    tag: "Outerwear",
    season: "AW",
    bg: "#3a3530",
    image:
      "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/4a443a/8c7c6b?text=Peacoat",
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: "₹8,999",
    tag: "Outerwear",
    season: "SS",
    bg: "#6b7b8d",
    image:
      "https://images.pexels.com/photos/1065082/pexels-photo-1065082.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/7b8b9d/8c7c6b?text=Denim+Jacket",
  },
  {
    id: 6,
    name: "Puffer Jacket",
    price: "₹15,999",
    tag: "Outerwear",
    season: "AW",
    bg: "#4a5d6c",
    image:
      "https://images.pexels.com/photos/1215086/pexels-photo-1215086.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/5a6d7c/8c7c6b?text=Puffer",
  },

  // Evening & Party Wear
  {
    id: 7,
    name: "Silk Slip Dress",
    price: "₹12,999",
    tag: "Evening",
    season: "SS",
    bg: "#c8bfb3",
    image:
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/d4c9bc/8c7c6b?text=Silk+Dress",
  },
  {
    id: 8,
    name: "Bias-Cut Midi Skirt",
    price: "₹8,999",
    tag: "Evening",
    season: "SS",
    bg: "#ccc5bb",
    image:
      "https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/d8cfc3/8c7c6b?text=Midi+Skirt",
  },
  {
    id: 9,
    name: "Sequin Embellished Gown",
    price: "₹20,000",
    tag: "Evening",
    season: "AW",
    bg: "#1a1a2e",
    image:
      "https://images.pexels.com/photos/1020872/pexels-photo-1020872.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/2a2a3e/8c7c6b?text=Sequin+Gown",
  },
  {
    id: 10,
    name: "Velvet Evening Blazer",
    price: "₹15,999",
    tag: "Evening",
    season: "AW",
    bg: "#2d1f2d",
    image:
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/3d2f3d/8c7c6b?text=Velvet+Blazer",
  },
  {
    id: 11,
    name: "Cocktail Dress",
    price: "₹11,999",
    tag: "Evening",
    season: "SS",
    bg: "#d5b8b8",
    image:
      "https://images.pexels.com/photos/6311449/pexels-photo-6311449.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/e5c8c8/8c7c6b?text=Cocktail",
  },
  {
    id: 12,
    name: "Satin Wrap Dress",
    price: "₹9,999",
    tag: "Evening",
    season: "SS",
    bg: "#c2a8a8",
    image:
      "https://images.pexels.com/photos/1288786/pexels-photo-1288786.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/d2b8b8/8c7c6b?text=Wrap+Dress",
  },

  // Essentials (Daily Wear)
  {
    id: 13,
    name: "Linen Trousers",
    price: "₹7,999",
    tag: "Essentials",
    season: "SS",
    bg: "#bfb8ae",
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/cbc2b6/8c7c6b?text=Linen+Trousers",
  },
  {
    id: 14,
    name: "Merino Wool Wrap",
    price: "₹5,999",
    tag: "Essentials",
    season: "AW",
    bg: "#b8b1a7",
    image:
      "https://images.pexels.com/photos/1578401/pexels-photo-1578401.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/c4b9ad/8c7c6b?text=Wool+Wrap",
  },
  {
    id: 15,
    name: "Organic Cotton Tee",
    price: "₹2,499",
    tag: "Essentials",
    season: "SS",
    bg: "#d5cdc0",
    image:
      "https://images.pexels.com/photos/1576757/pexels-photo-1576757.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/dfd5c8/8c7c6b?text=Cotton+Tee",
  },
  {
    id: 16,
    name: "Oversized Hoodie",
    price: "₹4,999",
    tag: "Essentials",
    season: "AW",
    bg: "#9e9689",
    image:
      "https://images.pexels.com/photos/1578402/pexels-photo-1578402.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/aea696/8c7c6b?text=Hoodie",
  },
  {
    id: 17,
    name: "Tailored Shorts",
    price: "₹3,999",
    tag: "Essentials",
    season: "SS",
    bg: "#d1c9bc",
    image:
      "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/e1d9cc/8c7c6b?text=Shorts",
  },
  {
    id: 18,
    name: "Relaxed Sweatpants",
    price: "₹4,499",
    tag: "Essentials",
    season: "AW",
    bg: "#a89f92",
    image:
      "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/b8afa2/8c7c6b?text=Sweatpants",
  },

  // Knitwear (Sweaters & Cardigans)
  {
    id: 19,
    name: "Cashmere Turtleneck",
    price: "₹14,999",
    tag: "Knitwear",
    season: "AW",
    bg: "#d0c9bf",
    image:
      "https://images.pexels.com/photos/1576752/pexels-photo-1576752.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/dcd3c8/8c7c6b?text=Turtleneck",
  },
  {
    id: 20,
    name: "Chunky Wool Cardigan",
    price: "₹11,999",
    tag: "Knitwear",
    season: "AW",
    bg: "#c5bcae",
    image:
      "https://images.pexels.com/photos/1043476/pexels-photo-1043476.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/d5ccbe/8c7c6b?text=Cardigan",
  },
  {
    id: 21,
    name: "Lightweight Cotton Sweater",
    price: "₹6,999",
    tag: "Knitwear",
    season: "SS",
    bg: "#e0d8cc",
    image:
      "https://images.pexels.com/photos/1578412/pexels-photo-1578412.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/efe7db/8c7c6b?text=Sweater",
  },
  {
    id: 22,
    name: "Alpaca Blend Pullover",
    price: "₹16,999",
    tag: "Knitwear",
    season: "AW",
    bg: "#b5aa9a",
    image:
      "https://images.pexels.com/photos/1468378/pexels-photo-1468378.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/c5baaa/8c7c6b?text=Pullover",
  },
  {
    id: 23,
    name: "Cropped Knit Top",
    price: "₹5,499",
    tag: "Knitwear",
    season: "SS",
    bg: "#ddd4c8",
    image:
      "https://images.pexels.com/photos/1578400/pexels-photo-1578400.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/ede4d8/8c7c6b?text=Knit+Top",
  },

  // Tailoring (Suits & Formal)
  {
    id: 24,
    name: "Raw Silk Blazer",
    price: "₹19,999",
    tag: "Tailoring",
    season: "SS",
    bg: "#c0b9af",
    image:
      "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/ccc1b5/8c7c6b?text=Silk+Blazer",
  },
  {
    id: 25,
    name: "Wool Suit Trousers",
    price: "₹10,999",
    tag: "Tailoring",
    season: "AW",
    bg: "#a8a094",
    image:
      "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/b8b0a4/8c7c6b?text=Suit+Pants",
  },
  {
    id: 26,
    name: "Linen Summer Suit",
    price: "₹20,000",
    tag: "Tailoring",
    season: "SS",
    bg: "#cfc6b8",
    image:
      "https://images.pexels.com/photos/1043477/pexels-photo-1043477.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/dfd6c8/8c7c6b?text=Linen+Suit",
  },
  {
    id: 27,
    name: "Double Breasted Vest",
    price: "₹7,999",
    tag: "Tailoring",
    season: "AW",
    bg: "#b8afa0",
    image:
      "https://images.pexels.com/photos/1124467/pexels-photo-1124467.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/c8bfb0/8c7c6b?text=Vest",
  },
  {
    id: 28,
    name: "Tailored Formal Shirt",
    price: "₹5,999",
    tag: "Tailoring",
    season: "SS",
    bg: "#d8cfc0",
    image:
      "https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?auto=compress&cs=tinysrgb&w=800",
    fallback: "https://placehold.co/600x800/e8dfd0/8c7c6b?text=Shirt",
  },
];

const FILTERS = [
  "All",
  "Outerwear",
  "Evening",
  "Essentials",
  "Knitwear",
  "Tailoring",
];

// Image Component with error handling
const ProductImage = ({ src, fallback, alt, bg }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden mb-4"
      style={{ backgroundColor: bg }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-rust border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={() => setImgSrc(fallback)}
        onLoad={() => setIsLoading(false)}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};

export default function Collection() {
  const [active, setActive] = useState("All");
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filtered =
    active === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.tag === active);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const children = gridRef.current.children;
    if (children.length) {
      gsap.fromTo(
        children,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    }
  }, [active]);

  return (
    <div className="bg-bone min-h-screen pt-32">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
          — Veilhaus
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">
          Collection
        </h1>
        <p className="font-body text-muted text-lg max-w-md">
          Each piece is a conversation between structure and ease, tradition and
          innovation.
        </p>
      </div>

      {/* Filters */}
      <div className="border-y border-sand/40 sticky top-16 z-30 bg-bone/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 font-mono text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                active === f
                  ? "bg-ink text-bone"
                  : "border border-sand text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted tracking-wider">
            {filtered.length} pieces
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.map((p) => (
            <div key={p.id} className="group cursor-pointer relative">
              <ProductImage
                src={p.image}
                fallback={p.fallback}
                alt={p.name}
                bg={p.bg}
              />
              {/* Hover quick add button */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <button className="w-full py-2 bg-white/95 backdrop-blur-sm font-mono text-xs tracking-widest uppercase hover:bg-rust hover:text-white transition-colors duration-300 shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  Quick Add
                </button>
              </div>
              {/* Season badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className="bg-bone/90 backdrop-blur-sm px-2 py-1 font-mono text-xs shadow-sm rounded-sm">
                  {p.season}
                </span>
              </div>
              {/* Info */}
              <div className="mt-3">
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                  {p.tag}
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-base font-semibold group-hover:text-rust transition-colors duration-200">
                    {p.name}
                  </h3>
                  <span className="font-body text-sm font-medium text-rust">
                    {p.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="py-5 border-t border-sand/30 overflow-hidden bg-bone">
        <div className="flex whitespace-nowrap animate-marquee">
          {[
            "Handcrafted",
            "—",
            "Sustainable",
            "—",
            "Timeless",
            "—",
            "Considered",
            "—",
          ].map((w, i) => (
            <span
              key={i}
              className={`font-display text-xl italic mx-4 ${w === "—" ? "text-rust" : "text-muted"}`}
            >
              {w}
            </span>
          ))}
          {[
            "Handcrafted",
            "—",
            "Sustainable",
            "—",
            "Timeless",
            "—",
            "Considered",
            "—",
          ].map((w, i) => (
            <span
              key={`dup-${i}`}
              className={`font-display text-xl italic mx-4 ${w === "—" ? "text-rust" : "text-muted"}`}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: fit-content;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
