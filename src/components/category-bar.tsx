"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const categories = [
  {
    name: "Paintings",
    href: "/gallery?category=Painting",
    dropdown: {
      columns: [
        {
          title: "By Style",
          links: [
            { name: "Abstract", href: "/gallery?category=Painting&style=Abstract" },
            { name: "Contemporary", href: "/gallery?category=Painting&style=Contemporary" },
            { name: "Impressionism", href: "/gallery?category=Painting&style=Impressionism" },
            { name: "Realism", href: "/gallery?category=Painting&style=Realism" },
            { name: "Expressionism", href: "/gallery?category=Painting&style=Expressionism" },
            { name: "Minimalism", href: "/gallery?category=Painting&style=Minimalism" },
          ],
        },
        {
          title: "By Subject",
          links: [
            { name: "Landscape", href: "/gallery?category=Painting&style=Landscape" },
            { name: "Portrait", href: "/gallery?category=Painting&style=Portrait" },
            { name: "Still Life", href: "/gallery?category=Painting&style=Still+Life" },
            { name: "Nature", href: "/gallery?category=Painting&style=Nature" },
            { name: "Urban", href: "/gallery?category=Painting&style=Urban" },
            { name: "Figurative", href: "/gallery?category=Painting&style=Figurative" },
          ],
        },
      ],
      promo: {
        title: "Original Paintings",
        subtitle: "One-of-a-kind works from talented artists.",
        cta: "Explore Paintings",
        href: "/gallery?category=Painting",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
      },
    },
  },
  {
    name: "Drawings",
    href: "/gallery?category=Drawing",
    dropdown: null,
  },
  {
    name: "Sculpture",
    href: "/gallery?category=Sculpture",
    dropdown: null,
  },
  {
    name: "Photography",
    href: "/gallery?category=Photography",
    dropdown: {
      columns: [
        {
          title: "By Style",
          links: [
            { name: "Fine Art", href: "/gallery?category=Photography&style=Contemporary" },
            { name: "Landscape", href: "/gallery?category=Photography&style=Landscape" },
            { name: "Portrait", href: "/gallery?category=Photography&style=Portrait" },
            { name: "Urban", href: "/gallery?category=Photography&style=Urban" },
            { name: "Nature", href: "/gallery?category=Photography&style=Nature" },
          ],
        },
      ],
      promo: {
        title: "Fine Art Photography",
        subtitle: "Captivating moments, beautifully captured.",
        cta: "View Collection",
        href: "/gallery?category=Photography",
        image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80",
      },
    },
  },
  {
    name: "Digital Art",
    href: "/gallery?category=Digital+Art",
    dropdown: null,
  },
  {
    name: "Prints",
    href: "/gallery?category=Prints",
    dropdown: null,
  },
  {
    name: "Mixed Media",
    href: "/gallery?category=Mixed+Media",
    dropdown: null,
  },
  {
    name: "New Arrivals",
    href: "/gallery?sort=newest",
    dropdown: null,
  },
  {
    name: "Artists",
    href: "/gallery",
    dropdown: {
      columns: [
        {
          title: "Discover",
          links: [
            { name: "All Artists", href: "/gallery" },
            { name: "Emerging Artists", href: "/gallery" },
            { name: "Featured Artists", href: "/gallery" },
          ],
        },
        {
          title: "Services",
          links: [
            { name: "Custom Commissions", href: "/commissions" },
            { name: "Sell Your Art", href: "/apply" },
            { name: "Gift Cards", href: "/gift-cards" },
          ],
        },
      ],
      promo: {
        title: "Become an Artist",
        subtitle: "Join our community and showcase your work.",
        cta: "Apply Now",
        href: "/apply",
        image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
      },
    },
  },
  {
    name: "Commissions",
    href: "/commissions",
    dropdown: null,
  },
];

export function CategoryBar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="hidden lg:block w-full border-b border-gray-100 bg-white relative z-40"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onMouseEnter={() => handleMouseEnter(cat.name)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Link
                href={cat.href}
                className={`inline-flex items-center px-3 py-1.5 text-[13px] font-medium rounded-full transition-all whitespace-nowrap ${
                  activeDropdown === cat.name
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dropdown Panels */}
      {categories.map(
        (cat) =>
          cat.dropdown &&
          activeDropdown === cat.name && (
            <div
              key={`dropdown-${cat.name}`}
              onMouseEnter={() => handleMouseEnter(cat.name)}
              onMouseLeave={handleMouseLeave}
              className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] animate-in fade-in slide-in-from-top-1 duration-200 z-50"
            >
              <div className="container mx-auto px-4 py-8">
                <div className="flex gap-12">
                  {/* Link Columns */}
                  {cat.dropdown.columns.map((col) => (
                    <div key={col.title} className="min-w-[160px]">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                        {col.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {col.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Promo Card */}
                  {cat.dropdown.promo && (
                    <div className="ml-auto">
                      <Link
                        href={cat.dropdown.promo.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group block w-[280px] rounded-2xl overflow-hidden bg-gray-50 hover:shadow-lg transition-all"
                      >
                        <div className="h-[140px] bg-gradient-to-br from-gray-200 to-gray-100 relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cat.dropdown.promo.image}
                            alt={cat.dropdown.promo.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {cat.dropdown.promo.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-3">
                            {cat.dropdown.promo.subtitle}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                            {cat.dropdown.promo.cta}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="transition-transform group-hover:translate-x-0.5"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
