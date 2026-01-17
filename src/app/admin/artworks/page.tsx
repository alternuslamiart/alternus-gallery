"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  commission: number;
  artistEarning: number;
  image: string;
  medium: string;
  style: string;
  dimensions: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "sold";
}

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: "AW-001",
      title: "Sunset Dreams",
      artist: "Marco Rossi",
      artistId: "ART-001",
      price: 12500,
      commission: 5000,
      artistEarning: 7500,
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
      medium: "Oil on Canvas",
      style: "Abstract",
      dimensions: "100 x 150 cm",
      uploadDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "AW-002",
      title: "Urban Symphony",
      artist: "Sophie Chen",
      artistId: "ART-002",
      price: 8300,
      commission: 3320,
      artistEarning: 4980,
      image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600",
      medium: "Digital Art",
      style: "Contemporary",
      dimensions: "80 x 120 cm",
      uploadDate: "2024-01-14",
      status: "pending",
    },
    {
      id: "AW-003",
      title: "Desert Mirage",
      artist: "Ahmed Hassan",
      artistId: "ART-003",
      price: 15700,
      commission: 6280,
      artistEarning: 9420,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
      medium: "Mixed Media",
      style: "Modern",
      dimensions: "120 x 180 cm",
      uploadDate: "2024-01-13",
      status: "approved",
    },
    {
      id: "AW-004",
      title: "Ocean Whispers",
      artist: "Maria Garcia",
      artistId: "ART-004",
      price: 22400,
      commission: 8960,
      artistEarning: 13440,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
      medium: "Watercolor",
      style: "Impressionism",
      dimensions: "90 x 120 cm",
      uploadDate: "2024-01-12",
      status: "sold",
    },
    {
      id: "AW-005",
      title: "Midnight Reflections",
      artist: "Yuki Tanaka",
      artistId: "ART-005",
      price: 18900,
      commission: 7560,
      artistEarning: 11340,
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600",
      medium: "Acrylic on Canvas",
      style: "Abstract",
      dimensions: "110 x 140 cm",
      uploadDate: "2024-01-11",
      status: "pending",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected" | "sold">("all");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleApprove = (id: string) => {
    setArtworks(
      artworks.map((artwork) =>
        artwork.id === id ? { ...artwork, status: "approved" as const } : artwork
      )
    );
  };

  const handleReject = (id: string) => {
    const reason = prompt("Arsyeja e refuzimit:");
    if (reason) {
      setArtworks(
        artworks.map((artwork) =>
          artwork.id === id ? { ...artwork, status: "rejected" as const } : artwork
        )
      );
    }
  };

  const filteredArtworks = artworks.filter((artwork) =>
    filterStatus === "all" ? true : artwork.status === filterStatus
  );

  const stats = {
    total: artworks.length,
    pending: artworks.filter((a) => a.status === "pending").length,
    approved: artworks.filter((a) => a.status === "approved").length,
    rejected: artworks.filter((a) => a.status === "rejected").length,
    sold: artworks.filter((a) => a.status === "sold").length,
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center relative">
            <nav className="flex items-center gap-1">
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/applications"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
                >
                  Applications
                </Link>
                <Link
                  href="/admin/artists"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
                >
                  Artists
                </Link>
                <div className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg relative">
                  Artworks
                  {stats.pending > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      {stats.pending}
                    </span>
                  )}
                </div>
                <Link
                  href="/admin/sales"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
                >
                  Sales
                </Link>
              </nav>

            <div className="absolute right-0 flex items-center gap-3">
              {/* User Menu */}
              <div
                ref={userMenuRef}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-black hidden sm:block">CEO</p>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    AAG
                  </button>
                </div>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-zinc-200 z-50 overflow-hidden">
                    <div className="p-2">
                      <Link
                        href="/admin/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-zinc-600"
                        >
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span className="text-sm font-medium text-black">Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-zinc-200 p-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.location.href = "/";
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-600"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Artwork Management</h2>
          <p className="text-zinc-600">Review and manage all artwork submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-1">Total Artworks</p>
            <p className="text-3xl font-bold text-black">{stats.total}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Pending Approval</p>
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <p className="text-sm text-emerald-700 mb-1">Approved</p>
            <p className="text-3xl font-bold text-emerald-600">{stats.approved}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Sold</p>
            <p className="text-3xl font-bold text-blue-600">{stats.sold}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={filterStatus === "all" ? "bg-black" : ""}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              className={filterStatus === "pending" ? "bg-orange-600" : ""}
            >
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filterStatus === "approved" ? "default" : "outline"}
              onClick={() => setFilterStatus("approved")}
              className={filterStatus === "approved" ? "bg-emerald-600" : ""}
            >
              Approved ({stats.approved})
            </Button>
            <Button
              variant={filterStatus === "sold" ? "default" : "outline"}
              onClick={() => setFilterStatus("sold")}
              className={filterStatus === "sold" ? "bg-blue-600" : ""}
            >
              Sold ({stats.sold})
            </Button>
            <Button
              variant={filterStatus === "rejected" ? "default" : "outline"}
              onClick={() => setFilterStatus("rejected")}
              className={filterStatus === "rejected" ? "bg-red-600" : ""}
            >
              Rejected ({stats.rejected})
            </Button>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  {artwork.status === "pending" && (
                    <Badge className="bg-orange-500 text-white border-0">Pending</Badge>
                  )}
                  {artwork.status === "approved" && (
                    <Badge className="bg-emerald-500 text-white border-0">Approved</Badge>
                  )}
                  {artwork.status === "sold" && (
                    <Badge className="bg-blue-500 text-white border-0">Sold</Badge>
                  )}
                  {artwork.status === "rejected" && (
                    <Badge className="bg-red-500 text-white border-0">Rejected</Badge>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-black mb-1">{artwork.title}</h3>
                <p className="text-zinc-600 text-sm mb-4">by {artwork.artist}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Price</span>
                    <span className="font-semibold text-black">
                      €{artwork.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Commission (40%)</span>
                    <span className="font-semibold text-emerald-600">
                      €{artwork.commission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Artist (60%)</span>
                    <span className="font-semibold text-purple-600">
                      €{artwork.artistEarning.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-4 mb-4 space-y-1 text-sm text-zinc-600">
                  <p>
                    <span className="font-medium">Medium:</span> {artwork.medium}
                  </p>
                  <p>
                    <span className="font-medium">Style:</span> {artwork.style}
                  </p>
                  <p>
                    <span className="font-medium">Dimensions:</span> {artwork.dimensions}
                  </p>
                  <p>
                    <span className="font-medium">Uploaded:</span> {artwork.uploadDate}
                  </p>
                </div>

                {/* Actions */}
                {artwork.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleApprove(artwork.id)}
                    >
                      ✓ Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleReject(artwork.id)}
                    >
                      ✗ Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
            <p className="text-zinc-600">No artworks found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
