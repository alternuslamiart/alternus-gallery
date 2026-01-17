"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { paintings } from "@/lib/paintings";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers";

export default function VirtualGalleryPage() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { formatPrice } = useLanguage();

  const rooms = [
    {
      id: 0,
      name: "Main Hall",
      background: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=1600&q=80",
      artworks: paintings.slice(0, 4),
    },
    {
      id: 1,
      name: "Contemporary Wing",
      background: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1600&q=80",
      artworks: paintings.slice(4, 8),
    },
    {
      id: 2,
      name: "Modern Collection",
      background: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1600&q=80",
      artworks: paintings.slice(8, 12),
    },
    {
      id: 3,
      name: "Classic Masterpieces",
      background: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1600&q=80",
      artworks: paintings.slice(12, 16),
    },
  ];

  const room = rooms[currentRoom];

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Virtual Gallery" }]} />

        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Virtual Gallery Experience</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated art collection in an immersive 3D gallery environment
          </p>
        </div>

        {/* Virtual Gallery Viewer */}
        <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "rounded-2xl overflow-hidden shadow-2xl"}`}>
          {/* Background Room */}
          <div className="relative aspect-[16/9] bg-gray-900">
            <Image
              src={room.background}
              alt={room.name}
              fill
              className="object-cover opacity-70"
            />

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

            {/* Room Title */}
            <div className="absolute top-8 left-8">
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                <h2 className="text-white text-2xl font-bold">{room.name}</h2>
                <p className="text-white/70 text-sm">Room {currentRoom + 1} of {rooms.length}</p>
              </div>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm p-3 rounded-lg hover:bg-black/70 transition-colors"
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              )}
            </button>

            {/* Artworks on the walls */}
            <div className="absolute inset-0 flex items-center justify-center gap-8 px-16">
              {room.artworks.map((artwork, index) => (
                <Link
                  key={artwork.id}
                  href={`/gallery/${artwork.id}`}
                  className="group relative transition-all duration-300 hover:scale-110"
                  style={{
                    width: "18%",
                    aspectRatio: "4/5",
                    transform: `perspective(1000px) rotateY(${(index - 1.5) * 5}deg)`,
                  }}
                >
                  <div className="relative w-full h-full shadow-2xl">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover rounded-sm"
                    />
                    {/* Frame */}
                    <div className="absolute inset-0 border-8 border-gray-800 rounded-sm"></div>

                    {/* Info overlay on hover */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-white font-bold text-sm mb-1">{artwork.title}</p>
                      <p className="text-white/70 text-xs mb-2">{artwork.artist}</p>
                      <p className="text-white font-semibold text-sm">{formatPrice(artwork.price)}</p>
                      <Button size="sm" variant="secondary" className="mt-3 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Wall label */}
                  <div className="absolute -bottom-8 left-0 right-0 bg-black/50 backdrop-blur-sm px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">{artwork.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
              <Button
                onClick={prevRoom}
                size="lg"
                variant="secondary"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>

              <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="flex gap-2">
                  {rooms.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentRoom(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentRoom
                          ? "bg-white w-8"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={nextRoom}
                size="lg"
                variant="secondary"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-24 left-8 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white/70 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Click on artworks to view details
              </p>
            </div>
          </div>
        </div>

        {/* Room Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {rooms.map((r, index) => (
            <button
              key={r.id}
              onClick={() => setCurrentRoom(index)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                currentRoom === index
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-200"
              }`}
            >
              <Image src={r.background} alt={r.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <span className="text-white font-semibold text-sm">{r.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M2 8h20" />
                <path d="m2 8 7.3 14.6a1 1 0 0 0 1.7 0L20 8" />
                <path d="m10 8 1.9-4.7a1 1 0 0 1 1.9 0L16 8" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">360° Gallery View</h3>
            <p className="text-sm text-muted-foreground">
              Navigate through our curated gallery spaces with immersive 3D perspectives
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Curated Collections</h3>
            <p className="text-sm text-muted-foreground">
              Explore artworks organized by style, period, and artistic movement
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Instant Purchase</h3>
            <p className="text-sm text-muted-foreground">
              Click on any artwork to view details and purchase directly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
