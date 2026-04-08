"use client";

import { useState } from "react";
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
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="gradient-hero-subtle py-8 md:py-10" id="remover">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Free Remove Background{" "}
              <span className="gradient-text">100% Automatically</span>
            </h1>
            <p className="text-sm md:text-base text-muted mt-2 max-w-xl mx-auto leading-relaxed">
              Upload any image and remove its background in seconds with AI. Perfect for e-commerce, headshots, design projects, and more — completely free.
            </p>

            {/* Upload Area */}
            <div className="mt-4 max-w-2xl mx-auto space-y-3">
              {/* Search-style Input Bar */}
              <div className="bg-white/70 backdrop-blur-sm rounded-full border border-border/80 shadow-lg px-5 py-2.5 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Paste an image URL here"
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted/50 focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted/60 hover:text-primary hover:bg-primary/5 transition-colors"
                    aria-label="Upload from URL"
                    title="Upload from URL"
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-border/60" />
                  <button
                    className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-white hover:bg-foreground/80 transition-colors"
                    aria-label="Submit"
                  >
                    <SendHorizonal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drop Zone */}
              <div className="upload-area rounded-2xl py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Image className="w-5 h-5 text-muted/40" />
                  </div>
                  <p className="text-muted text-sm">
                    Drag Image or{" "}
                    <span className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors">
                      Click Here
                    </span>{" "}
                    to upload
                  </p>
                  <p className="text-muted/50 text-xs flex items-center gap-1.5">
                    Command{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">&#8984;</kbd>
                    {" "}+{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">V</kbd>
                    {" "}to paste
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
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
