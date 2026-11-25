import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, ShieldCheck, Sparkles, Check } from "lucide-react";

export const metadata = {
  title: "Our Story & Skincare Philosophy | Rugby White",
  description:
    "Discover the philosophy behind Rugby White: clean botanical formulations, mindful everyday beauty rituals, and confidence rooted in genuine care.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#F4CEDF]">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            OUR STORY &amp; HERITAGE
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1C] tracking-tight leading-[1.08]">
            Glow is not a trend.
            <span className="block font-serif italic text-[#581527] font-normal mt-1">
              It&apos;s a feeling.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/75 font-light max-w-xl mx-auto leading-relaxed pt-2">
            Deliver luxury with quality natural products. A refined daily skincare ritual designed to bring care, confidence, and simplicity into every moment.
          </p>
        </div>
      </section>

      {/* Philosophy Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[#F4CEDF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-2xl bg-[#FFFFFF] border border-[#F4CEDF] overflow-hidden shadow-sm">
            <Image
              src="/images/rugby-skin-revival.jpg"
              alt="Rugby White Skin Revival Jar"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
              BEYOND THE ORDINARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#581527] leading-snug">
              &ldquo;Your skin deserves more than a routine. It deserves attention, intention and care.&rdquo;
            </h2>
            <div className="space-y-4 font-sans text-sm text-[#1C1C1C]/80 font-light leading-relaxed">
              <p>
                At RUGBY WHITE, we believe that beauty lives in the details — in the rituals we create and the confidence we carry.
              </p>
              <p>
                Beauty is personal. There is no need to follow every trend. No need to be anything other than yourself. Just thoughtful care, everyday rituals and confidence that feels entirely your own.
              </p>
              <p>
                Rugby White was created to encourage mindful daily consistency — because the greatest luxury is feeling genuinely at ease in your own skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purity Pillars */}
      <section className="py-20 bg-[#581527] text-[#FEF7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold">
              LESS NOISE. MORE CARE.
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              Thoughtful choices. A considered skincare experience.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#3F0E1B]/70 border border-[#AE3E64]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#581527] border border-[#AE3E64]/50 text-[#AE3E64] flex items-center justify-center mx-auto">
                <Leaf className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">PARABEN FREE</h3>
              <p className="text-xs text-[#F4CEDF]/75 font-sans leading-relaxed">
                Formulated safely without artificial parabens or harsh synthetic preservatives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#3F0E1B]/70 border border-[#AE3E64]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#581527] border border-[#AE3E64]/50 text-[#AE3E64] flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">SULPHATE FREE</h3>
              <p className="text-xs text-[#F4CEDF]/75 font-sans leading-relaxed">
                Zero SLS, SLES, or aggressive surfactants that compromise your skin barrier.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#3F0E1B]/70 border border-[#AE3E64]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#581527] border border-[#AE3E64]/50 text-[#AE3E64] flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">CRUELTY FREE</h3>
              <p className="text-xs text-[#F4CEDF]/75 font-sans leading-relaxed">
                We believe beauty must never cause harm. Strictly zero animal testing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#3F0E1B]/70 border border-[#AE3E64]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#581527] border border-[#AE3E64]/50 text-[#AE3E64] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">NO HARSH CHEMICALS</h3>
              <p className="text-xs text-[#F4CEDF]/75 font-sans leading-relaxed">
                Zero hydroquinone, toxic steroids, or bleach. Gentle, restorative care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Experience */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
          THE ART OF EVERYDAY SKINCARE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C]">
          Your Skincare Story Starts Here.
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#8A304C]">
          Care in every detail. Confidence in every moment.
        </p>
        <div className="pt-3">
          <Link
            href="/products/rugby-white-night-cream"
            className="px-8 py-3.5 bg-[#AE3E64] hover:bg-[#8A304C] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase font-bold rounded-full transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <span>DISCOVER RUGBY WHITE NIGHT CREAM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
