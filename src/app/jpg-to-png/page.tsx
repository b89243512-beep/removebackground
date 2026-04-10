"use client";

import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Upload, Download, RotateCcw, Loader2, X, ChevronDown, ChevronUp, FileImage, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-violet-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-violet-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
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

const pngAdvantages = [
  "Lossless compression — no quality loss",
  "Supports transparency (alpha channel)",
  "Sharp edges for text, logos, and graphics",
  "No compression artifacts",
  "Ideal for web graphics and design",
  "Better for images with few colors",
];

export default function JpgToPngPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [converted, setConverted] = useState<{ url: string; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const convert = useCallback(async (file: File) => {
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
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/png"));
      setConverted({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError("Conversion failed. Please try a different image."); }
    finally { setProcessing(false); }
  }, []);

  const handleReset = useCallback(() => {
    if (original) URL.revokeObjectURL(original.url);
    if (converted) URL.revokeObjectURL(converted.url);
    setOriginal(null); setConverted(null); setError(null);
  }, [original, converted]);

  const newName = original ? original.name.replace(/\.[^.]+$/, ".png") : "converted.png";

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — violet theme */}
        <section className="bg-gradient-to-b from-violet-50 to-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <FileImage className="w-4 h-4" /> Format Converter
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free JPG to PNG{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">Converter Online</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
              Convert JPEG images to high-quality PNG format with lossless compression and transparency support. Processed instantly in your browser — your images never leave your device.
            </p>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) convert(f); e.target.value = ""; }} />

            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span><button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {converted && original ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-violet-100 shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Before/After badges */}
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">JPG</div>
                      <div><p className="text-xs text-gray-400">Original</p><p className="text-sm font-bold text-gray-900">{formatBytes(original.size)}</p></div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-violet-400" />
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">PNG</div>
                      <div><p className="text-xs text-violet-500">Converted</p><p className="text-sm font-bold text-violet-700">{formatBytes(converted.size)}</p></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img src={converted.url} alt="Converted PNG" className="max-h-52 rounded-lg shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 border-t border-violet-100 bg-violet-50/30">
                  <a href={converted.url} download={newName} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-violet-500 to-purple-500 shadow-md hover:shadow-lg transition-all">
                    <Download className="w-4 h-4" />Download PNG
                  </a>
                  <button onClick={handleReset} className="btn-secondary text-sm px-6 py-2.5 gap-2"><RotateCcw className="w-4 h-4" />New Image</button>
                </div>
              </div>
            ) : processing ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-violet-100 shadow-lg p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" /><p className="text-sm font-semibold text-gray-900">Converting to PNG...</p>
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto"
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) convert(f); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all ${dragOver ? "border-violet-400 bg-violet-50" : "border-gray-300 hover:border-violet-300 bg-white/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center"><Upload className="w-8 h-8 text-violet-500" /></div>
                    <p className="text-gray-900 font-semibold text-lg">Drop your JPG image here or <span className="text-violet-500">click to browse</span></p>
                    <p className="text-gray-400 text-sm">Any image format accepted — Max 20MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PNG Advantages */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Convert to PNG?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pngAdvantages.map((adv) => (
                <div key={adv} className="flex items-center gap-3 bg-violet-50/50 rounded-xl px-4 py-3 border border-violet-100">
                  <Check className="w-5 h-5 text-violet-500 shrink-0" />
                  <span className="text-sm text-gray-700">{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JPG vs PNG comparison */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">JPG vs PNG: When to Use Which</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-orange-100 p-5">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm mb-3">JPG</div>
                <h3 className="font-bold text-gray-900">Best for photographs</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
                  <li>• Smaller file sizes</li>
                  <li>• Great for photo-realistic images</li>
                  <li>• Widely supported everywhere</li>
                  <li>• No transparency support</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-violet-100 p-5">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm mb-3">PNG</div>
                <h3 className="font-bold text-gray-900">Best for graphics & design</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
                  <li>• Lossless quality</li>
                  <li>• Transparency support</li>
                  <li>• Sharp text and edges</li>
                  <li>• Larger file sizes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Complete Guide to JPG to PNG Conversion</h2>
              <p>JPEG and PNG are the two most widely used image formats on the web, but they serve fundamentally different purposes. JPEG uses lossy compression that permanently discards image data to achieve smaller files, making it ideal for photographs where minor quality reductions go unnoticed. PNG uses lossless compression that preserves every pixel exactly, making it essential for graphics, logos, screenshots, and any image where precision matters.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">When Should You Convert JPG to PNG?</h3>
              <p>Convert your JPG images to PNG when you need to add transparency to an image for overlays and compositing, preserve quality for repeated editing without further degradation, create sharp graphics with text, logos, or line art, prepare images for design software that works better with lossless formats, or when you need to overlay images on colored or patterned backgrounds in web and graphic design projects.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How Our JPG to PNG Converter Works</h3>
              <p>The converter reads your JPG file using the HTML5 Canvas API, which renders the image pixel-by-pixel in your browser. It then re-encodes the pixel data as a PNG file with full lossless compression. This process preserves the exact visual quality of your original JPG while gaining all the benefits of the PNG format. Since everything happens in your browser, the conversion is instant and your images remain completely private — they are never sent to any server.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Understanding File Size Differences</h3>
              <p>PNG files are typically larger than their JPG counterparts because PNG uses lossless compression that retains all pixel data. A 500KB JPG photograph might become a 2-3MB PNG file. This is normal and expected — you are trading file size for quality preservation and feature support. If file size is your primary concern, consider using our <Link href="/compress" className="text-violet-500 hover:underline">Image Compressor</Link> instead, or convert back to JPG using our <Link href="/png-to-jpg" className="text-violet-500 hover:underline">PNG to JPG Converter</Link> when you are done editing.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Common Use Cases for PNG Images</h3>
              <p>Web developers use PNG for icons, logos, and UI elements that require transparency. Graphic designers prefer PNG for layered compositions where image quality cannot be compromised. E-commerce sellers use PNG for product images on transparent backgrounds that can be placed on any colored background. Social media managers use PNG for text-heavy graphics where JPEG compression artifacts would be visible. Game developers use PNG for sprites and textures that need precise pixel rendering.</p>

              <p className="mt-6">Explore our other tools: <Link href="/" className="text-violet-500 hover:underline">Free Background Remover</Link>, <Link href="/compress" className="text-violet-500 hover:underline">Image Compressor</Link>, and <Link href="/resize" className="text-violet-500 hover:underline">Image Resizer</Link>.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FAQItem question="Is JPG to PNG conversion free?" answer="Yes, completely free with no limits. Convert as many images as you want with no account required." />
              <FAQItem question="Will converting to PNG improve my image quality?" answer="Converting preserves the current quality and prevents any further degradation from future edits. However, it cannot recover quality that was already lost during JPG compression." />
              <FAQItem question="Why is the PNG file much larger than my JPG?" answer="PNG uses lossless compression which preserves all pixel data, resulting in larger files. This is the tradeoff for gaining lossless quality and transparency support." />
              <FAQItem question="Can I convert multiple JPGs at once?" answer="Currently the tool processes one image at a time, but conversions are instant — you can convert images back-to-back with no waiting." />
              <FAQItem question="Does the converted PNG support transparency?" answer="The converted PNG file supports the alpha channel. However, if your original JPG had no transparent areas (JPG doesn't support transparency), the converted PNG will have a solid background. Use our Background Remover to make areas transparent." />
              <FAQItem question="Are my images secure?" answer="100% secure. All processing happens in your browser using the Canvas API. Your images are never uploaded to any server." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
