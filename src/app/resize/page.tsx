"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Upload, Download, RotateCcw, Loader2, X, Lock, Unlock, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-rose-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-rose-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-gray-500 text-sm leading-relaxed">{answer}</p></div>}
    </div>
  );
}

export default function ResizePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const loadImage = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (f.size > 20 * 1024 * 1024) { setError("File too large. Maximum 20MB."); return; }
    setError(null); setResult(null); setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new window.Image();
    img.onload = () => { setOrigW(img.naturalWidth); setOrigH(img.naturalHeight); setWidth(img.naturalWidth); setHeight(img.naturalHeight); };
    img.src = url;
  }, []);

  const handleWidthChange = useCallback((w: number) => {
    setWidth(w);
    if (lockAspect && origW > 0) setHeight(Math.round((w / origW) * origH));
  }, [lockAspect, origW, origH]);

  const handleHeightChange = useCallback((h: number) => {
    setHeight(h);
    if (lockAspect && origH > 0) setWidth(Math.round((h / origH) * origW));
  }, [lockAspect, origW, origH]);

  const handleResize = useCallback(async () => {
    if (!preview || width <= 0 || height <= 0) return;
    setProcessing(true);
    try {
      const img = new window.Image();
      img.src = preview;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      const outputType = file?.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), outputType, 0.92));
      setResult({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError("Failed to resize. Please try again."); }
    finally { setProcessing(false); }
  }, [preview, width, height, file]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result.url);
    setFile(null); setPreview(null); setResult(null); setWidth(0); setHeight(0); setError(null);
  }, [preview, result]);

  const presets = [
    { label: "Instagram Post", w: 1080, h: 1080 },
    { label: "Instagram Story", w: 1080, h: 1920 },
    { label: "Facebook Cover", w: 820, h: 312 },
    { label: "Twitter Header", w: 1500, h: 500 },
    { label: "YouTube Thumb", w: 1280, h: 720 },
    { label: "LinkedIn Banner", w: 1584, h: 396 },
  ];

  const ext = file?.type === "image/png" ? "png" : "jpg";
  const newName = file ? file.name.replace(/\.[^.]+$/, `-${width}x${height}.${ext}`) : `resized.${ext}`;

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-rose-50 to-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free Image Resizer{" "}
              <span className="bg-gradient-to-r from-rose-500 to-cyan-500 bg-clip-text text-transparent">Online</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl mx-auto">
              Resize any image to exact pixel dimensions. Keep aspect ratio or set custom sizes. Social media presets included — free, no sign-up.
            </p>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) loadImage(f); e.target.value = ""; }} />

            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span><button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {preview ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Preview */}
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-center mb-5">
                    <img src={result ? result.url : preview} alt="Preview" className="max-h-48 rounded-lg" />
                  </div>

                  {/* Original info */}
                  <p className="text-xs text-gray-400 mb-4">Original: {origW} × {origH} px</p>

                  {/* Dimension inputs */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Width (px)</label>
                      <input type="number" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} min={1} max={10000}
                        className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-rose-300" />
                    </div>
                    <button onClick={() => setLockAspect(!lockAspect)} className="mt-5 p-2 rounded-lg hover:bg-gray-100 transition-colors" title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}>
                      {lockAspect ? <Lock className="w-4 h-4 text-rose-500" /> : <Unlock className="w-4 h-4 text-gray-400" />}
                    </button>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Height (px)</label>
                      <input type="number" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} min={1} max={10000}
                        className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-rose-300" />
                    </div>
                  </div>

                  {/* Presets */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {presets.map((p) => (
                      <button key={p.label} onClick={() => { setWidth(p.w); setHeight(p.h); setLockAspect(false); }}
                        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:text-sky-600 hover:border-rose-200 hover:bg-sky-50 transition-colors">
                        {p.label} ({p.w}×{p.h})
                      </button>
                    ))}
                  </div>

                  {!result && (
                    <button onClick={handleResize} disabled={processing}
                      className="btn-primary text-sm px-8 py-2.5 gap-2 mx-auto">
                      {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {processing ? "Resizing..." : "Resize Image"}
                    </button>
                  )}
                </div>

                {result && (
                  <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-200 bg-gray-50">
                    <a href={result.url} download={newName} className="btn-primary text-sm px-6 py-2.5 gap-2 inline-flex items-center">
                      <Download className="w-4 h-4" />Download ({width}×{height})
                    </a>
                    <button onClick={handleReset} className="btn-secondary text-sm px-6 py-2.5 gap-2"><RotateCcw className="w-4 h-4" />New Image</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto"
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) loadImage(f); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl py-10 cursor-pointer transition-all ${dragOver ? "border-rose-400 bg-rose-50" : "border-gray-300 hover:border-rose-300 bg-white/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center"><Upload className="w-7 h-7 text-rose-500" /></div>
                    <p className="text-gray-900 font-semibold">Drag & drop an image or <span className="text-rose-500">click to browse</span></p>
                    <p className="text-gray-400 text-sm">JPG, PNG, WebP — Max 20MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Social Media Size Guide */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Social Media Image Size Cheat Sheet</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { platform: "Instagram Post", size: "1080 × 1080", ratio: "1:1", color: "bg-pink-50 border-pink-100 text-pink-600" },
                { platform: "Instagram Story", size: "1080 × 1920", ratio: "9:16", color: "bg-purple-50 border-purple-100 text-purple-600" },
                { platform: "Facebook Cover", size: "820 × 312", ratio: "2.6:1", color: "bg-blue-50 border-blue-100 text-blue-600" },
                { platform: "Twitter Header", size: "1500 × 500", ratio: "3:1", color: "bg-sky-50 border-sky-100 text-sky-600" },
                { platform: "YouTube Thumb", size: "1280 × 720", ratio: "16:9", color: "bg-red-50 border-red-100 text-red-600" },
                { platform: "LinkedIn Banner", size: "1584 × 396", ratio: "4:1", color: "bg-indigo-50 border-indigo-100 text-indigo-600" },
              ].map((s) => (
                <div key={s.platform} className={`rounded-xl border p-4 ${s.color}`}>
                  <p className="font-bold text-sm text-gray-900">{s.platform}</p>
                  <p className="text-lg font-mono font-bold mt-1">{s.size}</p>
                  <p className="text-xs text-gray-400 mt-1">Aspect ratio: {s.ratio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Complete Guide to Image Resizing</h2>
              <p>Every digital platform has specific image dimension requirements. Upload an image that is too large and it gets cropped awkwardly. Too small and it looks blurry and unprofessional. The Free Image Resizer eliminates this problem by giving you precise pixel-level control over your image dimensions, complete with one-click presets for every major social media platform.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Image Dimensions Matter</h3>
              <p>Social media algorithms favor properly sized content. An Instagram post uploaded at 1080×1080 pixels displays perfectly in the feed, while an oddly sized image gets cropped by the platform — often cutting off important parts of your composition. The same principle applies to Facebook covers, YouTube thumbnails, Twitter headers, and LinkedIn banners. Each platform has optimal dimensions, and using them ensures your content displays exactly as intended across all devices.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Aspect Ratio Lock: When to Use It</h3>
              <p>The aspect ratio lock maintains the proportional relationship between width and height. When locked, changing the width automatically adjusts the height (and vice versa) to prevent image distortion. Keep it locked when resizing photographs to avoid stretching faces or objects. Unlock it when you need to fit an image into a specific frame size, such as converting a landscape photo into a square Instagram post or a wide banner format.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Downsizing vs. Upsizing: What to Know</h3>
              <p>Reducing image dimensions (downsizing) always produces clean results because the tool has more pixel data than it needs. It selectively discards pixels to create a smaller, sharp image. Increasing dimensions (upsizing) is more challenging because the tool must generate new pixels that did not exist in the original. Our resizer uses high-quality bicubic interpolation for the best possible upscaling results, but for critical work, it is always better to start with a larger original image.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Image Resizing for Web Performance</h3>
              <p>One of the most common web performance mistakes is serving images that are much larger than their display size. If your website displays an image at 400×300 pixels, uploading the original 4000×3000 pixel file forces browsers to download 10x more data than necessary. Resizing images to their actual display dimensions before uploading dramatically improves page load speed, reduces bandwidth consumption, and contributes to better Core Web Vitals scores — all of which positively impact your Google search rankings.</p>

              <p className="mt-6">Need more tools? Try our <Link href="/" className="text-rose-500 hover:underline">Free Background Remover</Link>, <Link href="/compress" className="text-rose-500 hover:underline">Image Compressor</Link>, and <Link href="/jpg-to-png" className="text-rose-500 hover:underline">JPG to PNG Converter</Link>.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FAQItem question="Is the image resizer completely free?" answer="Yes, 100% free with no limits. Resize as many images as you want without signing up or paying anything." />
              <FAQItem question="Can I resize without losing quality?" answer="Downsizing always maintains excellent quality. Upsizing may reduce sharpness slightly because the tool generates new pixels. For best results when upsizing, keep the increase under 200% of the original dimensions." />
              <FAQItem question="What social media presets are available?" answer="Instagram Post (1080×1080), Instagram Story (1080×1920), Facebook Cover (820×312), Twitter Header (1500×500), YouTube Thumbnail (1280×720), and LinkedIn Banner (1584×396). Click any preset to instantly set dimensions." />
              <FAQItem question="Can I resize to custom dimensions?" answer="Yes. Enter any width and height in pixels. Use the aspect ratio lock to maintain proportions, or unlock it for custom dimensions." />
              <FAQItem question="Are my images uploaded to a server?" answer="No. All resizing happens locally in your browser using the Canvas API. Your images never leave your device." />
              <FAQItem question="What formats are supported?" answer="JPG, JPEG, PNG, WebP, and most other image formats up to 20MB. The output format matches your input file." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
