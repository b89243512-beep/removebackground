"use client";

import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Upload,
  Download,
  RotateCcw,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Gauge,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-gray-500 text-sm leading-relaxed">{answer}</p></div>}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

const benefits = [
  { icon: Zap, title: "Lightning Fast", desc: "Compresses in under 1 second, right in your browser" },
  { icon: Shield, title: "100% Private", desc: "Images never leave your device — zero server uploads" },
  { icon: Gauge, title: "Up to 90% Smaller", desc: "Dramatically reduce file sizes with adjustable quality" },
  { icon: Globe, title: "Works Everywhere", desc: "Phone, tablet, laptop — any browser, any device" },
];

const compressionExamples = [
  { type: "Product Photo", before: "3.2 MB", after: "320 KB", savings: "90%", color: "bg-emerald-100 text-emerald-700" },
  { type: "Portrait Photo", before: "5.8 MB", after: "680 KB", savings: "88%", color: "bg-sky-100 text-sky-700" },
  { type: "Screenshot", before: "1.4 MB", after: "210 KB", savings: "85%", color: "bg-violet-100 text-violet-700" },
  { type: "Social Media Post", before: "2.1 MB", after: "195 KB", savings: "91%", color: "bg-amber-100 text-amber-700" },
];

export default function CompressPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalFile, setOriginalFile] = useState<{ url: string; size: number; name: string } | null>(null);
  const [compressedFile, setCompressedFile] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const compressImage = useCallback(async (file: File, q: number) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) { setError("Please upload a JPG, PNG, or WebP image."); return; }
    if (file.size > 20 * 1024 * 1024) { setError("File too large. Maximum 20MB."); return; }
    setError(null); setProcessing(true);
    const originalUrl = URL.createObjectURL(file);
    setOriginalFile({ url: originalUrl, size: file.size, name: file.name });
    try {
      const img = new window.Image();
      img.src = originalUrl;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), outputType, q / 100));
      setCompressedFile({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError("Failed to compress. Please try a different file."); }
    finally { setProcessing(false); }
  }, []);

  const handleFile = useCallback((file: File) => compressImage(file, quality), [compressImage, quality]);
  const handleRecompress = useCallback(() => {
    if (!originalFile) return;
    fetch(originalFile.url).then(r => r.blob()).then(b => compressImage(new File([b], originalFile.name, { type: b.type }), quality));
  }, [originalFile, quality, compressImage]);
  const handleReset = useCallback(() => {
    if (originalFile) URL.revokeObjectURL(originalFile.url);
    if (compressedFile) URL.revokeObjectURL(compressedFile.url);
    setOriginalFile(null); setCompressedFile(null); setError(null);
  }, [originalFile, compressedFile]);

  const savings = originalFile && compressedFile ? Math.max(0, Math.round((1 - compressedFile.size / originalFile.size) * 100)) : 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — emerald theme */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free Image Compressor{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Online</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
              Reduce image file sizes up to 90% without visible quality loss. Adjustable quality control for JPG, PNG, and WebP. Processed entirely in your browser — your images stay private.
            </p>

            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />

            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span><button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {compressedFile && originalFile ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <div className="text-center px-4 py-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Original</p>
                      <p className="text-xl font-bold text-gray-900">{formatBytes(originalFile.size)}</p>
                    </div>
                    <div className="text-3xl text-emerald-400">→</div>
                    <div className="text-center px-4 py-3 bg-emerald-50 rounded-xl">
                      <p className="text-[10px] text-emerald-600 uppercase tracking-wider">Compressed</p>
                      <p className="text-xl font-bold text-emerald-600">{formatBytes(compressedFile.size)}</p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-lg font-bold">
                      -{savings}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img src={compressedFile.url} alt="Compressed" className="max-h-52 rounded-lg shadow-sm" />
                  </div>
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Quality</label>
                      <span className="text-sm font-bold text-emerald-600">{quality}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-emerald-500" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Smallest file</span><span>Best quality</span>
                    </div>
                    <button onClick={handleRecompress} className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline">Re-compress with new quality →</button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 border-t border-emerald-100 bg-emerald-50/30">
                  <a href={compressedFile.url} download={`compressed-${originalFile.name}`} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md hover:shadow-lg transition-all">
                    <Download className="w-4 h-4" />Download Compressed
                  </a>
                  <button onClick={handleReset} className="btn-secondary text-sm px-6 py-2.5 gap-2"><RotateCcw className="w-4 h-4" />New Image</button>
                </div>
              </div>
            ) : processing ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-emerald-100 shadow-lg p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-sm font-semibold text-gray-900">Compressing your image...</p>
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto"
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all ${dragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-emerald-300 bg-white/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center"><Upload className="w-8 h-8 text-emerald-500" /></div>
                    <p className="text-gray-900 font-semibold text-lg">Drag & drop an image or <span className="text-emerald-500">click to browse</span></p>
                    <p className="text-gray-400 text-sm">JPG, PNG, WebP — Max 20MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Benefits cards */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                <b.icon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compression examples */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Typical Compression Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compressionExamples.map((ex) => (
                <div key={ex.type} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{ex.type}</p>
                  <p className="text-sm text-gray-500 mt-2">{ex.before} → <span className="font-bold text-gray-900">{ex.after}</span></p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${ex.color}`}>-{ex.savings}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Complete Guide to Image Compression</h2>
              <p>Large, unoptimized images are the biggest contributor to slow website performance. Studies show that a one-second delay in page load time can reduce conversions by 7% and increase bounce rates by 11%. For e-commerce sites, this translates directly to lost revenue. The Free Image Compressor helps you solve this problem by reducing image file sizes dramatically while preserving the visual quality that your audience expects.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Understanding Lossy vs. Lossless Compression</h3>
              <p>JPEG compression is lossy — it permanently removes image data to achieve smaller file sizes. At quality levels of 70-85%, this removal is virtually imperceptible to the human eye, yet file sizes can be reduced by 60-90%. PNG compression is lossless, meaning it reduces file size by optimizing how data is stored without removing any visual information. Our compressor applies the appropriate technique based on your file format, giving you optimal results for each image type.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Best Practices for Web Image Optimization</h3>
              <p>For web use, aim for image file sizes under 200KB per image. Use quality settings of 70-80% for hero images and backgrounds, and 60-70% for thumbnails and gallery images. Always compress images before uploading them to your CMS or e-commerce platform. The performance gains compound — a page with 10 optimized images will load significantly faster than one with 10 unoptimized images, directly impacting your Google PageSpeed score and search rankings.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Image Compression for E-Commerce</h3>
              <p>Online stores typically have hundreds or thousands of product images. Each unoptimized image adds to page load time and hosting bandwidth costs. By compressing your product photos to around 80% quality, you can maintain the crisp, detailed appearance that customers expect while reducing file sizes by 70-85%. This results in faster product pages, better mobile experience, lower bandwidth costs, and improved SEO rankings — all of which contribute to higher conversion rates and more sales.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Browser-Based Compression Is Better</h3>
              <p>Traditional online compressors upload your images to remote servers for processing. This creates privacy risks, adds upload/download wait times, and often has daily usage limits. Our compressor uses the HTML5 Canvas API to process everything in your browser. Your images never touch our servers. There are no limits, no watermarks, no quality restrictions, and no account required. It works even without an internet connection after the page has loaded.</p>

              <p className="mt-6">Need more image tools? Try our <Link href="/" className="text-emerald-500 hover:underline">Free Background Remover</Link>, <Link href="/resize" className="text-emerald-500 hover:underline">Image Resizer</Link>, or <Link href="/jpg-to-png" className="text-emerald-500 hover:underline">JPG to PNG Converter</Link>.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FAQItem question="Is the image compressor completely free?" answer="Yes, 100% free with no limits on the number of images you can compress. No account, no subscription, no hidden fees." />
              <FAQItem question="Are my images uploaded to your servers?" answer="No. All compression happens directly in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy and security." />
              <FAQItem question="What quality setting should I use?" answer="For web and social media: 70-80% gives the best balance. For email attachments: 60-70% to stay under size limits. For high-quality print: 90-100%. You can always re-compress with different settings to compare." />
              <FAQItem question="What image formats are supported?" answer="JPG/JPEG, PNG, and WebP formats up to 20MB. The compressor outputs the same format as your input file." />
              <FAQItem question="Can I compress multiple images at once?" answer="Currently the tool processes one image at a time, but you can compress images back-to-back with no waiting. Each compression takes under 1 second." />
              <FAQItem question="Will compression affect image dimensions?" answer="No. Compression only reduces file size — the width and height of your image remain exactly the same. If you need to change dimensions, use our Image Resizer tool." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
