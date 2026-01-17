"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function GiftCardsPage() {
  const { formatPrice } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("classic");
  const [isPurchased, setIsPurchased] = useState(false);

  const presetAmounts = [50, 100, 250, 500, 1000];
  const designs = [
    { id: "classic", name: "Classic", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800" },
    { id: "modern", name: "Modern", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800" },
    { id: "elegant", name: "Elegant", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800" },
  ];

  if (isPurchased) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center">
        <div className="container max-w-2xl text-center bg-white rounded-2xl shadow-xl p-12">
          <h1 className="text-3xl font-bold mb-4">Gift Card Purchased!</h1>
          <p className="mb-8">Gift card sent to {recipientEmail}</p>
          <Button onClick={() => window.location.href = "/"}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gift Cards" }]} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gift Cards</h1>
          <p className="text-lg text-muted-foreground">Give the gift of art</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setIsPurchased(true); }} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block font-semibold mb-3">Select Amount</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {presetAmounts.map((amt) => (
                <button key={amt} type="button" onClick={() => setSelectedAmount(amt)}
                  className={`p-4 rounded-lg border-2 font-bold ${selectedAmount === amt ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                  {formatPrice(amt)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-3">Choose Design</label>
            <div className="grid grid-cols-3 gap-3">
              {designs.map((d) => (
                <button key={d.id} type="button" onClick={() => setSelectedDesign(d.id)}
                  className={`rounded-lg overflow-hidden border-2 ${selectedDesign === d.id ? "border-primary ring-2 ring-primary" : "border-gray-200"}`}>
                  <div className="relative aspect-video">
                    <Image src={d.image} alt={d.name} fill className="object-cover" />
                  </div>
                  <p className="text-sm p-2">{d.name}</p>
                </button>
              ))}
            </div>
          </div>

          <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient Name" className="w-full px-4 py-2 border rounded-lg" />
          <input type="email" required value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Recipient Email" className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" />

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-3xl font-bold">{formatPrice(selectedAmount)}</span>
            </div>
            <Button type="submit" size="lg" className="w-full">Purchase Gift Card</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
