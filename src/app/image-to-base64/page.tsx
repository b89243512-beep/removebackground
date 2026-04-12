"use client";

import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Upload, Download, RotateCcw, Loader2, X, ChevronDown, ChevronUp,
  Copy, Check, Code, FileCode, Hash, Lock, Zap, Globe, FileImage
} from "lucide-react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
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

type Format = "dataUri" | "raw" | "css" | "html" | "json";

const FORMAT_LABELS: Record<Format, string> = {
  dataUri: "Data URI",
  raw: "Base64 Only",
  css: "CSS",
  html: "HTML <img>",
  json: "JSON",
};

export default function ImageToBase64Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<Format>("dataUri");

  const convert = useCallback((file: File) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/bmp", "image/x-icon"];
    if (!allowed.includes(file.type)) {
      setError("Please upload a valid image (JPG, PNG, WebP, GIF, SVG, BMP, ICO).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum 10MB.");
      return;
    }
    setError(null);
    setProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const rawBase64 = dataUri.split(",")[1];
      setImageUrl(dataUri);
      setBase64(rawBase64);
      setMimeType(file.type);
      setFileName(file.name);
      setFileSize(file.size);
      setProcessing(false);
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setProcessing(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReset = useCallback(() => {
    setImageUrl(null);
    setBase64(null);
    setMimeType("");
    setFileName("");
    setFileSize(0);
    setError(null);
    setCopied(false);
    setFormat("dataUri");
  }, []);

  // Output string based on format
  const output = useCallback(() => {
    if (!base64 || !imageUrl) return "";
    switch (format) {
      case "dataUri": return imageUrl;
      case "raw": return base64;
      case "css": return `background-image: url("${imageUrl}");`;
      case "html": return `<img src="${imageUrl}" alt="${fileName}" />`;
      case "json": return JSON.stringify({ name: fileName, mimeType, size: fileSize, data: imageUrl }, null, 2);
    }
  }, [base64, imageUrl, format, fileName, mimeType, fileSize])();

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const extMap: Record<Format, string> = { dataUri: "txt", raw: "txt", css: "css", html: "html", json: "json" };
    const ext = extMap[format];
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "")}-base64.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const outputSize = output.length;
  const sizeIncrease = fileSize > 0 ? Math.round(((outputSize - fileSize) / fileSize) * 100) : 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — indigo theme */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Hash className="w-4 h-4" /> Encoder Tool
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free Image to{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Base64 Converter</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
              Convert any image to a Base64 encoded string or Data URI instantly. Perfect for embedding images directly in HTML, CSS, JSON, and APIs. Processed entirely in your browser — your files stay private.
            </p>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) convert(f); e.target.value = ""; }} />

            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span><button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {base64 && imageUrl ? (
              <div className="mt-6 max-w-3xl mx-auto bg-white rounded-2xl border border-indigo-100 shadow-lg overflow-hidden">
                {/* Image + info */}
                <div className="p-5 md:p-6 border-b border-indigo-50">
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Preview */}
                    <div className="w-full md:w-48 shrink-0">
                      <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-center h-40">
                        <img src={imageUrl} alt={fileName} className="max-h-full max-w-full object-contain rounded" />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 text-left w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <FileImage className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-semibold text-gray-900 truncate">{fileName}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-gray-400 uppercase tracking-wider mb-0.5">Type</p>
                          <p className="font-semibold text-gray-900 truncate">{mimeType.split("/")[1]}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-gray-400 uppercase tracking-wider mb-0.5">Size</p>
                          <p className="font-semibold text-gray-900">{formatBytes(fileSize)}</p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-2">
                          <p className="text-indigo-500 uppercase tracking-wider mb-0.5">Base64</p>
                          <p className="font-semibold text-indigo-700">{formatBytes(outputSize)}</p>
                        </div>
                      </div>
                      {sizeIncrease > 0 && (
                        <p className="text-xs text-gray-400 mt-2">
                          Base64 is ~{sizeIncrease}% larger than the original (normal for this encoding).
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Format selector */}
                <div className="px-5 md:px-6 py-4 bg-gray-50/50 border-b border-indigo-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-left">Output Format</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          format === f
                            ? "bg-indigo-500 text-white shadow-sm"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-200 hover:text-indigo-600"
                        }`}
                      >
                        {f === "dataUri" && <Hash className="w-3 h-3" />}
                        {f === "raw" && <Code className="w-3 h-3" />}
                        {f === "css" && <FileCode className="w-3 h-3" />}
                        {f === "html" && <FileCode className="w-3 h-3" />}
                        {f === "json" && <FileCode className="w-3 h-3" />}
                        {FORMAT_LABELS[f]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Output</p>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      {copied ? (<><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>) : (<><Copy className="w-3.5 h-3.5" /> Copy</>)}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 max-h-56 overflow-auto">
                    <pre className="text-[11px] md:text-xs text-gray-300 font-mono break-all whitespace-pre-wrap text-left leading-relaxed">
                      {output}
                    </pre>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 p-4 border-t border-indigo-50 bg-indigo-50/30">
                  <button onClick={handleCopy} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-indigo-500 to-violet-500 shadow-md hover:shadow-lg transition-all">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy Output"}
                  </button>
                  <button onClick={handleDownload} className="btn-secondary text-sm px-6 py-2.5 gap-2 inline-flex items-center">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button onClick={handleReset} className="btn-secondary text-sm px-6 py-2.5 gap-2">
                    <RotateCcw className="w-4 h-4" /> New
                  </button>
                </div>
              </div>
            ) : processing ? (
              <div className="mt-6 max-w-2xl mx-auto bg-white rounded-2xl border border-indigo-100 shadow-lg p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-sm font-semibold text-gray-900">Encoding your image...</p>
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto"
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) convert(f); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all ${dragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-300 hover:border-indigo-300 bg-white/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center"><Upload className="w-8 h-8 text-indigo-500" /></div>
                    <p className="text-gray-900 font-semibold text-lg">Drop your image here or <span className="text-indigo-500">click to browse</span></p>
                    <p className="text-gray-400 text-sm">JPG, PNG, WebP, GIF, SVG, BMP, ICO — Max 10MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "Instant", desc: "Encoded in milliseconds" },
              { icon: Lock, title: "Private", desc: "100% in your browser" },
              { icon: Code, title: "5 Formats", desc: "Data URI, CSS, HTML, JSON, raw" },
              { icon: Globe, title: "Any Device", desc: "Works on all browsers" },
            ].map((b) => (
              <div key={b.title} className="text-center p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <b.icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases with code snippets */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-gray-900">Embed in HTML</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">Inline images without separate file requests.</p>
                <pre className="bg-gray-900 text-gray-300 text-[11px] rounded-lg p-3 overflow-x-auto">
{`<img src="data:image/png;base64,iVBORw..." />`}
                </pre>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-gray-900">CSS Background</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">Reduce HTTP requests, cache with stylesheet.</p>
                <pre className="bg-gray-900 text-gray-300 text-[11px] rounded-lg p-3 overflow-x-auto">
{`.hero {
  background-image: url("data:image/png;base64,...");
}`}
                </pre>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-gray-900">API Payloads</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">Send images in JSON without multipart uploads.</p>
                <pre className="bg-gray-900 text-gray-300 text-[11px] rounded-lg p-3 overflow-x-auto">
{`{
  "avatar": "data:image/jpeg;base64,..."
}`}
                </pre>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-gray-900">Email Templates</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">Embed images so they display offline.</p>
                <pre className="bg-gray-900 text-gray-300 text-[11px] rounded-lg p-3 overflow-x-auto">
{`<img src="data:image/png;base64,..."
     alt="Logo" />`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Complete Guide to Image Base64 Encoding</h2>
              <p>Base64 encoding converts binary image data into a text string using 64 printable ASCII characters. This encoded string can then be embedded directly in HTML documents, CSS stylesheets, JSON payloads, or any other text-based format. The Free Image to Base64 Converter makes this encoding instant and easy — just drop your image and get the encoded output in multiple ready-to-use formats.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What Is a Data URI and Why Use It?</h3>
              <p>A Data URI is a scheme that allows you to embed media files directly into text documents. Instead of referencing an external image file with a URL, the entire image is included inline as a Base64-encoded string. This eliminates the need for a separate HTTP request to fetch the image, which can improve page load performance for small images like icons, logos, and decorative graphics. Data URIs also allow you to bundle images directly into CSS or JavaScript files, making single-file distribution simpler.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">When to Use Base64 Image Encoding</h3>
              <p>Base64 encoding shines in specific scenarios. Use it for small UI icons and logos under 5KB to reduce HTTP requests. Use it to embed images in email templates so they display even when external resources are blocked. Use it for API responses that need to include image data in JSON without multipart uploads. Use it for offline-first applications where assets are bundled into the main document. Use it for design tools and configuration files that need self-contained visual references.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">When NOT to Use Base64 Encoding</h3>
              <p>Base64 encoding is not always the right choice. Encoded images are approximately 33% larger than the original binary file, which can hurt performance for large images. Because they are inline, they cannot be cached separately by browsers — every page load re-transfers the full image. For large images, background photos, or frequently reused assets, traditional file hosting with proper HTTP caching is far more efficient. A general rule: if an image is under 5KB, Base64 often wins; if it is over 50KB, use a regular image URL.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How This Free Image to Base64 Converter Works</h3>
              <p>The converter reads your image file using the FileReader API built into every modern browser. It extracts the binary data and encodes it using JavaScript&apos;s native Base64 algorithms. The output is provided in five formats: Data URI (ready to paste anywhere), raw Base64 string, CSS background-image rule, HTML img tag, and JSON object. Because all processing happens in your browser, your images never touch any server — ensuring complete privacy and instant conversion.</p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Supported Image Formats</h3>
              <p>The converter accepts all common web image formats: JPG/JPEG, PNG, WebP, GIF, SVG, BMP, and ICO. The MIME type is automatically detected and included in the Data URI output, ensuring your encoded image displays correctly wherever you paste it. Maximum file size is 10MB, which is more than sufficient for any practical Base64 embedding use case.</p>

              <p className="mt-6">Need more image tools? Try our <Link href="/" className="text-indigo-500 hover:underline">Background Remover</Link>, <Link href="/compress" className="text-indigo-500 hover:underline">Image Compressor</Link>, <Link href="/resize" className="text-indigo-500 hover:underline">Image Resizer</Link>, or <Link href="/jpg-to-png" className="text-indigo-500 hover:underline">JPG to PNG Converter</Link>.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FAQItem question="Is the Image to Base64 converter free?" answer="Yes, completely free with unlimited conversions. No account, no sign-up, no watermarks." />
              <FAQItem question="Are my images uploaded to a server?" answer="No. All encoding happens locally in your browser using the FileReader API. Your images never leave your device." />
              <FAQItem question="What image formats are supported?" answer="JPG, JPEG, PNG, WebP, GIF, SVG, BMP, and ICO. The converter auto-detects the MIME type." />
              <FAQItem question="Why is the Base64 output larger than the original image?" answer="Base64 encoding uses 4 characters to represent 3 bytes of data, resulting in a ~33% size increase. This is normal and unavoidable with any Base64 encoding." />
              <FAQItem question="How do I use the Data URI in my code?" answer="Paste the Data URI directly into an HTML img src, CSS url(), or JSON field. The encoding scheme is universally supported by browsers and most text-based formats." />
              <FAQItem question="Is there a file size limit?" answer="Yes, maximum 10MB per image. For best performance with Data URIs, we recommend images under 50KB since larger Base64 strings can hurt page load times." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
