import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const TOPICS = [
  "General Inquiry",
  "Order Support",
  "Wholesale",
  "Press & Media",
  "Showroom Visit",
  "Repair Programme",
];

export default function Contact() {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const linesRef = useRef(null);
  const mapRef = useScrollReveal({ from: { opacity: 0, y: 40 } });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.querySelectorAll(".h-anim"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" },
      );
    }
    if (formRef.current) {
      tl.fromTo(
        formRef.current.querySelectorAll(".f-anim"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out" },
        "-=0.4",
      );
    }
    // Animate decorative lines
    if (linesRef.current) {
      gsap.fromTo(
        linesRef.current.querySelectorAll("div"),
        { scaleY: 0 },
        {
          scaleY: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power4.inOut",
          transformOrigin: "top",
          delay: 0.5,
        },
      );
    }
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Animate button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.97,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    await new Promise((r) => setTimeout(r, 1400));

    // Success animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setSubmitted(true);
          setLoading(false);
          if (formRef.current) {
            gsap.fromTo(
              formRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            );
          }
        },
      });
    }
  };

  return (
    <div className="bg-bone min-h-screen pt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 relative">
          <p className="h-anim font-mono text-xs text-muted tracking-widest uppercase mb-4">
            — Get In Touch
          </p>
          <h1 className="h-anim font-display text-6xl md:text-8xl font-bold leading-none mb-6">
            Let's
            <br />
            <em className="text-rust">Talk.</em>
          </h1>
          <p className="h-anim font-body text-muted text-lg max-w-md leading-relaxed">
            Whether you're after a specific piece, a bespoke consultation, or
            just want to say hello — we read every message ourselves.
          </p>

          {/* Decorative lines */}
          <div
            ref={linesRef}
            className="absolute top-0 right-0 flex gap-3 h-48 opacity-20"
          >
            <div className="w-px bg-rust" />
            <div className="w-px bg-sand" />
            <div className="w-px bg-ink" />
          </div>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 pb-24">
          {/* Left: form */}
          <div className="lg:col-span-3">
            <div ref={formRef}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Field */}
                  <div className="f-anim">
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      Full Name <span className="text-rust">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white border border-sand rounded-lg px-4 py-3 font-body text-ink text-base focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all duration-300"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="f-anim">
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      Email Address <span className="text-rust">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      required
                      placeholder="hello@example.com"
                      className="w-full bg-white border border-sand rounded-lg px-4 py-3 font-body text-ink text-base focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all duration-300"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="f-anim">
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 20 7946 0958"
                      className="w-full bg-white border border-sand rounded-lg px-4 py-3 font-body text-ink text-base focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all duration-300"
                    />
                  </div>

                  {/* Topic Selection */}
                  <div className="f-anim">
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-3">
                      Topic of Interest <span className="text-rust">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, topic: t }))}
                          className={`px-4 py-2 font-mono text-xs tracking-wider uppercase border rounded-full transition-all duration-200 ${
                            form.topic === t
                              ? "bg-ink text-bone border-ink"
                              : "border-sand text-muted hover:border-ink hover:text-ink bg-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="f-anim">
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      Your Message <span className="text-rust">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full bg-white border border-sand rounded-lg px-4 py-3 font-body text-ink text-base focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-colors duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="f-anim flex items-center gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-ink text-bone px-10 py-4 font-mono text-xs tracking-widest uppercase hover:bg-rust transition-colors duration-300 disabled:opacity-50 flex items-center gap-3 rounded-lg"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-bone border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <p className="font-mono text-xs text-muted">
                      We reply within 48 hours.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="py-16 text-center bg-white rounded-2xl shadow-lg p-8">
                  <div className="w-16 h-16 border-2 border-rust flex items-center justify-center mx-auto mb-8 rounded-full">
                    <svg
                      className="w-8 h-8 text-rust"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    Message Received!
                  </h2>
                  <p className="font-body text-muted max-w-sm mx-auto mb-8">
                    Thank you,{" "}
                    <span className="font-semibold text-ink">
                      {form.name.split(" ")[0]}
                    </span>
                    ! One of our team members will be in touch within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        topic: "",
                        message: "",
                      });
                    }}
                    className="border border-ink text-ink px-8 py-3 font-mono text-xs tracking-widest uppercase hover:bg-ink hover:text-bone transition-all duration-300 rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: info with images */}
          <div className="lg:col-span-2 space-y-12">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-display text-xl font-bold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rust/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rust text-xl">✉</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                      Email
                    </p>
                    <p className="font-body text-ink font-medium">
                      hello@veilhaus.com
                    </p>
                    <p className="font-mono text-xs text-muted mt-0.5">
                      For all inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rust/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rust text-xl">☎</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                      Phone
                    </p>
                    <p className="font-body text-ink font-medium">
                      +44 20 7946 0958
                    </p>
                    <p className="font-mono text-xs text-muted mt-0.5">
                      Mon–Fri, 10am–6pm GMT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rust/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rust text-xl">⌖</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                      Showroom
                    </p>
                    <p className="font-body text-ink font-medium">
                      14 Chiltern St, London
                    </p>
                    <p className="font-mono text-xs text-muted mt-0.5">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
                Follow Along
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Instagram", "Pinterest", "Twitter", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="border border-sand px-4 py-3 font-mono text-xs text-muted tracking-wider text-center rounded-lg hover:border-rust hover:text-rust hover:bg-rust/5 transition-all duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Map / Location Image */}
            <div
              ref={mapRef}
              className="aspect-square relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="London map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-start p-6">
                <div className="text-white">
                  <p className="font-display text-xl font-bold">
                    14 Chiltern St
                  </p>
                  <p className="font-mono text-xs text-white/80">
                    London, W1U 7PY
                  </p>
                  <button className="mt-3 bg-rust text-white px-4 py-2 font-mono text-xs rounded-lg hover:bg-rust/80 transition">
                    Get Directions →
                  </button>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-ink text-bone rounded-2xl p-6 shadow-lg">
              <h3 className="font-display text-xl font-bold mb-4">
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-xs">Monday - Friday</span>
                  <span className="font-body">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs">Saturday</span>
                  <span className="font-body">11:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs">Sunday</span>
                  <span className="font-body">By appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-sand/30 py-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted tracking-wider">
            📍 14 Chiltern Street, Marylebone, London W1U 7PY
          </p>
          <p className="font-mono text-xs text-muted tracking-wider">
            ✨ All inquiries answered personally within 48 hours
          </p>
        </div>
      </div>
    </div>
  );
}
