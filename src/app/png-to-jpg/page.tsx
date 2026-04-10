"use client";

import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Upload, Download, RotateCcw, Loader2, X, ChevronDown, ChevronUp, FileImage, ArrowRight, HardDrive, Mail, Share2, Globe } from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-amber-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
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

const useCases = [
  { icon: HardDrive, title: "Save Storage", desc: "JPG files are 3-5x smaller than PNG" },
  { icon: Mail, title: "Email Friendly", desc: "Stay under attachment size limits" },
  { icon: Share2, title: "Easy Sharing", desc: "Universally compatible format" },
  { icon: Globe, title: "Faster Websites", desc: "Smaller images = faster page loads" },
];

export default function PngToJpgPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [converted, setConverted] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const convert = useCallback(async (file: File, q?: number) => {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (file.size > 20 * 1024 * 1024) { setError("File too large. Maximum 20MB."); return; }
    setError(null); setProcessing(true);
    const url = URL.createObjectURL(file);
    setOriginal({ url, size: file.size, name: file.name });
    try {
      const img = new window.Image();
      img.src = url;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", (q ?? quality) / 100));
      setConverted({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError("Conversion failed. Please try a different image."); }
    finally { setProcessing(false); }
  }, [quality]);

  const handleReset = useCallback(() => {
    if (original) URL.revokeObjectURL(original.url);
    if (converted) URL.revokeObjectURL(converted.url);
    setOriginal(null); setConverted(null); setError(null);
  }, [original, converted]);

  const handleReconvert = useCallback(() => {
    if (!original) return;
    fetch(original.url).then(r => r.blob()).then(b => convert(new File([b], original.name, { type: b.type }), quality));
  }, [original, quality, convert]);

  const newName = original ? original.name.replace(/\.[^.]+$/, ".jpg") : "converted.jpg";
  const savings = original && converted && original.size > converted.size ? Math.round((1 - converted.size / original.size) * 100) : 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — amber/orange theme */}
        <section className="bg-gradient-to-b from-amber-50 to-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <FileImage className="w-4 h-4" /> Format Converter
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free PNG to JPG{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Converter Online</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
              Convert PNG images to compressed JPG format for dramatically smaller file sizes. Adjustable quality slider. Transparent areas become clean white. Processed in your browser — 100% private.
            </p>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) convert(f); e.target.value = ""; }} />

            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span><button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {converted && original ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-amber-100 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">PNG</div>
                      <div><p className="text-xs text-gray-400">Original</p><p className="text-sm font-bold text-gray-900">{formatBytes(original.size)}</p></div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">JPG</div>
                      <div><p className="text-xs text-amber-500">Converted</p><p className="text-sm font-bold text-amber-700">{formatBytes(converted.size)}</p></div>
                    </div>
                    {savings > 0 && <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold">-{savings}%</div>}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img src={converted.url} alt="Converted JPG" className="max-h-52 rounded-lg shadow-sm" />
                  </div>
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">JPG Quality</label>
                      <span className="text-sm font-bold text-amber-600">{quality}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-amber-500" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>Smallest file</span><span>Best quality</span></div>
                    <button onClick={handleReconvert} className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium hover:underline">Re-convert with new quality →</button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 border-t border-amber-100 bg-amber-50/30">
                  <a href={converted.url} download={newName} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-amber-500 to-orange-500 shadow-md hover:shadow-lg transition-all">
                    <Download className="w-4 h-4" />Download JPG
                  </a>
                  <button onClick={handleReset} className="btn-secondary text-sm px-6 py-2.5 gap-2"><RotateCcw className="w-4 h-4" />New Image</button>
                </div>
              </div>
            ) : processing ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-amber-100 shadow-lg p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" /><p className="text-sm font-semibold">Converting to JPG...</p>
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto"
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) convert(f); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all ${dragOver ? "border-amber-400 bg-amber-50" : "border-gray-300 hover:border-amber-300 bg-white/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center"><Upload className="w-8 h-8 text-amber-500" /></div>
                    <p className="text-gray-900 font-semibold text-lg">Drop your PNG here or <span className="text-amber-500">click to browse</span></p>
                    <p className="text-gray-400 text-sm">Any image format accepted — Max 20MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Use cases */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Convert PNG to JPG?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {useCases.map((uc) => (
                <div key={uc.title} className="text-center p-4 rounded-xl border border-amber-100 bg-amber-50/30">
                  <uc.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{uc.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Complete Guide to PNG to JPG Conversion</h2>
              <p>PNG files offer superior quality with lossless compression, but this quality comes at the cost of significantly larger file sizes. A single high-resolution PNG image can easily be 5-10MB, while the equivalent JPG at 85% quality might be only 500KB-1MB. For most practical purposes — sharing on social media, embedding in emails, uploading to websites, or storing on your phone — JPG provides more than adequate visual quality at a fraction of the file size.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What Happens to Transparent Areas?</h3>
              <p>JPG does not support transparency. When you convert a PNG with transparent areas to JPG, those transparent pixels need to be filled with a color. Our converter automatically fills transparent areas with a clean white background, which is the standard approach and works well for most use cases. If you need your image on a different colored background, consider editing the PNG first using our <Link href="/" className="text-amber-500 hover:underline">Background Remover</Link> tool.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Choosing the Right JPG Quality Setting</h3>
              <p>The quality slider (10-100%) controls the compression level. At 90-100%, the output is nearly identical to the original with modest file size reduction. At 70-85%, you get significant file size savings with quality loss that is difficult to notice in most images. Below 70%, compression artifacts become visible but file sizes are dramatically smaller. For most users, 80-85% represents the sweet spot between quality and file size.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">When Should You Keep PNG Instead?</h3>
              <p>Keep your images as PNG when you need transparency support for logos, icons, or overlays. Keep PNG for images with sharp text that would blur with JPG compression. Keep PNG for graphics with large areas of solid color where JPG would introduce visible banding. And keep PNG when you need to edit the image further, since each JPG save cycle introduces additional quality loss. For everything else — photographs, social media sharing, email attachments, web display — JPG is the practical choice.</p>

              <p className="mt-6">Need the reverse? Use our <Link href="/jpg-to-png" className="text-amber-500 hover:underline">JPG to PNG Converter</Link>. Also try our <Link href="/compress" className="text-amber-500 hover:underline">Image Compressor</Link> and <Link href="/resize" className="text-amber-500 hover:underline">Image Resizer</Link>.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FAQItem question="What happens to transparent areas in my PNG?" answer="Transparent areas are automatically filled with a clean white background. JPG does not support transparency, so a solid color fill is required." />
              <FAQItem question="Can I control the output quality?" answer="Yes! Use the quality slider from 10% to 100%. Higher values produce better quality but larger files. 80-85% is recommended for most uses." />
              <FAQItem question="Is PNG to JPG conversion free?" answer="Completely free with unlimited conversions. No account needed, no watermarks added." />
              <FAQItem question="How much smaller will my file be?" answer="Typically 60-85% smaller, depending on the image content and quality setting. Photographs compress best, while graphics with solid colors see moderate reduction." />
              <FAQItem question="Are my images uploaded to a server?" answer="No. All conversion happens locally in your browser. Your images never leave your device." />
              <FAQItem question="Can I batch convert multiple PNGs?" answer="Currently one image at a time, but each conversion is instant. You can convert images back-to-back with no delay." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
