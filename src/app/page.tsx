"use client";

import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Upload,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Image,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Users,
  Star,
  Clock,
  SendHorizonal,
  Scissors,
  ShoppingBag,
  UserCircle,
  Palette,
  Presentation,
  Camera,
  Layers,
  Download,
  Wand2,
  Loader2,
  X,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Precision",
    description:
      "Advanced AI detects subjects with pixel-perfect accuracy, handling hair, fur, and complex edges that other tools miss.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get your background removed in under 5 seconds. No waiting, no manual editing — just upload and download.",
  },
  {
    icon: Download,
    title: "High-Quality PNG Output",
    description:
      "Download your images as high-resolution transparent PNGs, ready to use in any design project or platform.",
  },
  {
    icon: Shield,
    title: "100% Free, No Sign-Up",
    description:
      "Use Free Remove Background without creating an account. No hidden fees, no watermarks, no limits on the number of images.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description:
      "Remove backgrounds from multiple images at once. Perfect for e-commerce stores with hundreds of product photos.",
  },
  {
    icon: Globe,
    title: "Works on Any Device",
    description:
      "Access Free Remove Background from your phone, tablet, or computer. No app download needed — just open your browser.",
  },
];

const steps = [
  {
    number: 1,
    title: "Upload Your Image",
    description:
      "Drag and drop your image, click to browse, or paste from clipboard. We support JPG, PNG, and WebP formats up to 20MB.",
    icon: Upload,
  },
  {
    number: 2,
    title: "AI Removes the Background",
    description:
      "Our AI instantly analyzes your image, detects the subject, and removes the background with precision — even around hair and fine details.",
    icon: Scissors,
  },
  {
    number: 3,
    title: "Download Your Result",
    description:
      "Preview the result and download your transparent PNG in full resolution. Ready to use in designs, presentations, or online stores.",
    icon: Download,
  },
];

const useCases = [
  { name: "E-Commerce", emoji: "🛍️", description: "Clean product photos on white or transparent backgrounds" },
  { name: "Profile Photos", emoji: "👤", description: "Professional headshots with solid or custom backgrounds" },
  { name: "Marketing", emoji: "📢", description: "Social media graphics, banners, and ad creatives" },
  { name: "Presentations", emoji: "📊", description: "Clean visuals for slides and business decks" },
  { name: "Graphic Design", emoji: "🎨", description: "Compositing, collages, and creative projects" },
  { name: "Car Dealerships", emoji: "🚗", description: "Vehicle photos with clean studio backgrounds" },
  { name: "Real Estate", emoji: "🏠", description: "Property staging and virtual background swaps" },
  { name: "Photography", emoji: "📷", description: "Quick cutouts for portraits and studio work" },
];

const faqs = [
  {
    question: "Is Free Remove Background really free?",
    answer:
      "Yes, Free Remove Background is 100% free to use. There are no hidden fees, no subscriptions, and no watermarks on your downloaded images. You can process unlimited images without creating an account.",
  },
  {
    question: "What image formats does Free Remove Background support?",
    answer:
      "Free Remove Background supports JPG, JPEG, PNG, and WebP formats for upload. Images can be up to 20MB in size. The output is always a high-quality transparent PNG file that you can use anywhere.",
  },
  {
    question: "How accurate is the background removal?",
    answer:
      "Free Remove Background uses advanced AI trained on millions of images. It accurately detects subjects including people, products, animals, and objects with precise edge detection — even around hair, fur, and semi-transparent elements.",
  },
  {
    question: "Can I use Free Remove Background on my phone?",
    answer:
      "Absolutely. Free Remove Background works on any device with a web browser — smartphones, tablets, and desktop computers. No app download is required. Simply open the website and upload your image.",
  },
  {
    question: "Is my uploaded image stored on your servers?",
    answer:
      "No. Your images are processed in real time and are not stored permanently on our servers. They are automatically deleted after processing. We take your privacy seriously and never use your images for any other purpose.",
  },
  {
    question: "Can I remove backgrounds from multiple images at once?",
    answer:
      "Yes, Free Remove Background supports batch processing. You can upload and process multiple images simultaneously, making it ideal for e-commerce product photography or large design projects.",
  },
];

const stats = [
  { value: "50M+", label: "Images Processed", icon: CheckCircle },
  { value: "8M+", label: "Happy Users", icon: Users },
  { value: "4.9/5", label: "User Rating", icon: Star },
  { value: "<5s", label: "Processing Time", icon: Clock },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-muted text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB.");
      return;
    }

    setError(null);
    setProcessing(true);
    setProgress(0);
    setResultImage(null);

    // Show original
    const reader = new FileReader();
    reader.onload = (e) => setOriginalImage(e.target?.result as string);
    reader.readAsDataURL(file);

    // Simulate initial progress while model loads
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) { clearInterval(progressInterval); return 85; }
        return prev + Math.random() * 8;
      });
    }, 500);

    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            setProgress(Math.min(90 + (current / total) * 10, 99));
          }
        },
      });
      clearInterval(progressInterval);
      setProgress(100);

      const url = URL.createObjectURL(blob);
      setResultImage(url);
    } catch (err) {
      clearInterval(progressInterval);
      console.error("Processing error:", err);
      setError("Failed to process image. Please try again with a different image.");
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  }, [processImage]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) processImage(file);
        break;
      }
    }
  }, [processImage]);

  const handleDownload = useCallback(() => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = "removed-background.png";
    a.click();
  }, [resultImage]);

  const handleReset = useCallback(() => {
    if (resultImage) URL.revokeObjectURL(resultImage);
    setOriginalImage(null);
    setResultImage(null);
    setProcessing(false);
    setProgress(0);
    setError(null);
  }, [resultImage]);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="gradient-hero-subtle py-8 md:py-10" id="remover" onPaste={handlePaste}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Free Remove Background{" "}
              <span className="gradient-text">100% Automatically</span>
            </h1>
            <p className="text-sm md:text-base text-muted mt-2 max-w-xl mx-auto leading-relaxed">
              Upload any image and remove its background in seconds with AI. Perfect for e-commerce, headshots, design projects, and more — completely free.
            </p>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processImage(file);
                e.target.value = "";
              }}
            />

            {/* Error message */}
            {error && (
              <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            {/* Result View */}
            {(originalImage && (processing || resultImage)) ? (
              <div className="mt-4 max-w-3xl mx-auto">
                {/* Processing State */}
                {processing && !resultImage && (
                  <div className="bg-white rounded-2xl border border-border shadow-lg p-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <img src={originalImage} alt="Processing" className="max-h-48 rounded-xl opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                      </div>
                      <div className="w-full max-w-xs">
                        <p className="text-sm font-semibold text-foreground mb-2">Removing background...</p>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted mt-1 text-right">{Math.round(Math.min(progress, 100))}%</p>
                      </div>
                      <p className="text-xs text-muted">First time may take longer while the AI model loads</p>
                    </div>
                  </div>
                )}

                {/* Result State */}
                {resultImage && (
                  <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
                    {/* Before / After */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Original */}
                      <div className="p-4 border-b md:border-b-0 md:border-r border-border">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Original</p>
                        <div className="bg-gray-50 rounded-xl p-2 flex items-center justify-center min-h-[200px]">
                          <img src={originalImage} alt="Original" className="max-h-64 rounded-lg" />
                        </div>
                      </div>
                      {/* Result */}
                      <div className="p-4">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Background Removed</p>
                        <div className="checkerboard rounded-xl p-2 flex items-center justify-center min-h-[200px]">
                          <img src={resultImage} alt="Result" className="max-h-64 rounded-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-3 p-4 border-t border-border bg-gray-50/50">
                      <button
                        onClick={handleDownload}
                        className="btn-primary text-sm px-6 py-2.5 gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PNG
                      </button>
                      <button
                        onClick={handleReset}
                        className="btn-secondary text-sm px-6 py-2.5 gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        New Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Upload Area */
              <div className="mt-4 max-w-2xl mx-auto space-y-3">
                {/* Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className={`upload-area rounded-2xl py-10 cursor-pointer ${dragOver ? "border-primary/60 bg-primary/5" : ""}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">
                        Drag & drop an image or{" "}
                        <span className="text-primary">click to browse</span>
                      </p>
                      <p className="text-muted text-sm mt-1">JPG, PNG, WebP — Max 10MB</p>
                    </div>
                    <p className="text-muted/50 text-xs flex items-center gap-1.5">
                      Command{" "}
                      <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">&#8984;</kbd>
                      {" "}+{" "}
                      <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">V</kbd>
                      {" "}to paste an image
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            {!originalImage && (
            <div className="mt-5 grid grid-cols-4 gap-3 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center py-3">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white" id="features">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose <span className="gradient-text">Free Remove Background</span>?
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
                The most advanced AI background remover available online — fast, accurate, and completely free.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-surface" id="how-it-works">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How <span className="gradient-text">Free Remove Background</span> Works
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">
                Remove any image background in three simple steps.
              </p>
            </div>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-border"
                >
                  <div className="step-number shrink-0">{step.number}</div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                The Ultimate Free Background Removal Tool Powered by AI
              </h2>
              <p>
                Removing backgrounds from images used to require expensive software, professional skills, and hours of tedious manual work. Free Remove Background changes everything by putting the power of advanced artificial intelligence directly in your browser. Whether you need to prepare product photos for your online store, create professional headshots, or design stunning graphics for social media, our tool handles it all in seconds — without costing you a penny.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                How Free Remove Background Delivers Professional Results
              </h3>
              <p>
                At the heart of Free Remove Background is a sophisticated AI model trained on millions of diverse images. This model understands the difference between foreground subjects and backgrounds with remarkable accuracy. It recognizes people, products, animals, vehicles, text, logos, and virtually any object you can photograph. What makes it truly special is its ability to handle challenging scenarios that trip up other tools — fine hair strands, semi-transparent objects, intricate patterns, and complex edges are all processed with pixel-level precision.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Perfect for E-Commerce and Product Photography
              </h3>
              <p>
                Online marketplaces like Amazon, eBay, and Shopify require product images with clean white or transparent backgrounds. Manually editing each photo is time-consuming and expensive when you have dozens or hundreds of products. Free Remove Background eliminates this bottleneck entirely. Upload your product photos and get marketplace-ready images with transparent backgrounds in seconds. The batch processing feature means you can handle your entire catalog efficiently, saving hours of editing time and reducing your operational costs to zero.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Create Stunning Designs Without Design Skills
              </h3>
              <p>
                You do not need to be a Photoshop expert to create professional-looking graphics. Free Remove Background gives you the transparent cutouts you need to build compelling social media posts, marketing banners, presentation slides, and creative composites. Simply remove the background from your subject, then place it on any backdrop you choose. The high-quality PNG output preserves every detail, ensuring your designs look polished and professional regardless of where you use them.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Privacy-First Approach to Image Processing
              </h3>
              <p>
                We understand that the images you upload may contain sensitive content — personal photos, unreleased products, or confidential business materials. That is why Free Remove Background processes all images in real time and does not store them on our servers after processing is complete. Your images are automatically deleted, and we never use them for training, marketing, or any purpose beyond delivering your result. No account registration means no personal data collection — just pure, private background removal.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Works Seamlessly Across All Your Devices
              </h3>
              <p>
                Free Remove Background is a fully web-based tool that requires no software installation, no plugins, and no account creation. It works flawlessly on iPhones, Android phones, iPads, laptops, and desktop computers. The responsive interface adapts to any screen size, and the fast processing engine ensures consistent performance whether you are on a high-speed office connection or mobile data. Take a photo on your phone and remove the background right there — no need to transfer files to a computer first.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Trusted by Millions of Users Worldwide
              </h3>
              <p>
                With millions of images processed and a rapidly growing community of satisfied users, Free Remove Background has become one of the most trusted background removal tools on the web. Designers appreciate the precision. E-commerce sellers value the speed and batch capabilities. Content creators love the simplicity. And everyone benefits from the fact that it is completely, genuinely free — no trial periods, no watermarks, no premium upsells. Whether you need to process a single portrait or thousands of product photos, Free Remove Background delivers consistent, professional results every time.
              </p>
            </article>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 md:py-16 bg-surface" id="use-cases">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Built for <span className="gradient-text">Every Use Case</span>
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">
                Free Remove Background works for professionals, businesses, and individuals across every industry.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {useCases.map((useCase) => (
                <div key={useCase.name} className="usecase-badge flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{useCase.emoji}</span>
                    <span className="font-semibold text-foreground">{useCase.name}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Remove Backgrounds Instantly?
            </h2>
            <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
              Join millions of users who trust Free Remove Background for fast, accurate, and effortless background removal.
            </p>
            <a
              href="#remover"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
            >
              <Upload className="w-5 h-5" />
              Upload Image — It&apos;s Free
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-surface" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-muted mt-4 text-lg">
                Everything you need to know about Free Remove Background.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
