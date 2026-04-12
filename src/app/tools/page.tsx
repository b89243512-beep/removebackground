import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Scissors, Minimize2, ArrowRightLeft, Maximize2, Hash } from "lucide-react";

const tools = [
  {
    href: "/",
    icon: Scissors,
    title: "Free Background Remover",
    tagline: "Remove image backgrounds in one click",
    description: "Automatically remove backgrounds from any photo using advanced AI. Get transparent PNG files perfect for e-commerce product shots, professional headshots, marketing materials, and creative design projects. Our AI handles complex edges including hair, fur, and semi-transparent elements with pixel-perfect precision.",
    color: "text-sky-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    href: "/compress",
    icon: Minimize2,
    title: "Free Image Compressor",
    tagline: "Shrink file sizes without losing quality",
    description: "Reduce JPG, PNG, and WebP file sizes by up to 90% while maintaining visual quality that is virtually indistinguishable from the original. Ideal for speeding up website load times, meeting email attachment limits, saving storage space, and optimizing images for social media uploads. Adjustable quality slider gives you full control.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    href: "/jpg-to-png",
    icon: ArrowRightLeft,
    title: "Free JPG to PNG Converter",
    tagline: "Convert JPEG to lossless PNG format",
    description: "Transform your JPG and JPEG images into high-quality PNG format. PNG supports transparency and lossless compression, making it the preferred format for logos, icons, graphics with text, and any image that requires sharp edges without compression artifacts. Perfect for designers and web developers who need pixel-perfect output.",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    href: "/png-to-jpg",
    icon: ArrowRightLeft,
    title: "Free PNG to JPG Converter",
    tagline: "Convert PNG to smaller JPG files",
    description: "Convert large PNG files to compressed JPG format for dramatically smaller file sizes. Transparent areas are automatically filled with a clean white background. Adjustable quality control lets you find the perfect balance between file size and image quality. Great for reducing photo storage, sharing via email, and uploading to social platforms that prefer JPG.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    href: "/resize",
    icon: Maximize2,
    title: "Free Image Resizer",
    tagline: "Resize to exact pixel dimensions",
    description: "Resize any image to precise pixel dimensions with aspect ratio control. Built-in presets for Instagram Post (1080×1080), Instagram Story (1080×1920), Facebook Cover (820×312), Twitter Header (1500×500), YouTube Thumbnail (1280×720), and LinkedIn Banner (1584×396). Lock or unlock aspect ratio for complete flexibility.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    href: "/image-to-base64",
    icon: Hash,
    title: "Free Image to Base64 Converter",
    tagline: "Encode images to Data URI, CSS, HTML, JSON",
    description: "Convert any image file to a Base64 encoded string or Data URI for embedding directly in HTML, CSS, JSON, and API payloads. Supports JPG, PNG, WebP, GIF, SVG, BMP, and ICO formats with five ready-to-use output formats. Ideal for developers who need inline images, offline-first applications, email templates, and single-file distribution.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-sky-50 to-white py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free Image Tools{" "}
              <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">Online</span>
            </h1>
            <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
              Every image tool you need, completely free. Remove backgrounds, compress photos, convert formats, and resize images — all processing happens directly in your browser. Your images never leave your device.
            </p>
          </div>
        </section>

        {/* Tool Cards with descriptions */}
        <section className="py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            {tools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group flex flex-col md:flex-row gap-5 bg-white rounded-2xl border ${tool.border} p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl ${tool.bg} flex items-center justify-center shrink-0`}>
                  <tool.icon className={`w-7 h-7 ${tool.color}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">{tool.tagline}</p>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">{tool.description}</p>
                  <span className={`inline-block mt-3 text-sm font-semibold ${tool.color} group-hover:underline`}>
                    Use this tool →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Your Complete Free Image Editing Toolkit</h2>
              <p>
                Professional image editing used to require expensive desktop software, technical knowledge, and significant time investment. Our collection of free online image tools eliminates all of those barriers. Every tool in this suite processes your images directly in your web browser using modern web technologies like the Canvas API and WebAssembly-powered AI models. This means your photos never leave your device — complete privacy is guaranteed, and processing speeds are instant regardless of your internet connection.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Who Are These Tools For?</h3>
              <p>
                Whether you are an e-commerce seller who needs clean product photos with transparent backgrounds and optimized file sizes, a social media manager creating content across multiple platforms with different dimension requirements, a web developer optimizing images for page speed and Core Web Vitals, a student preparing a presentation, or simply someone who needs a quick edit on their phone — these tools are designed for you. No technical skills required, no software to install, and no account to create.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Privacy-First Image Processing</h3>
              <p>
                Unlike most online image tools that upload your files to remote servers for processing, every tool on this site works entirely in your browser. Your images are processed using client-side JavaScript and WebAssembly, meaning they never touch our servers. This is not just a privacy benefit — it also means faster processing because there is no upload or download wait time. Whether you are working with confidential business documents, personal photos, or unreleased product images, your data remains completely private.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Optimized for Every Device</h3>
              <p>
                All tools work seamlessly on desktop computers, laptops, tablets, and smartphones. The responsive interfaces adapt to any screen size, and the processing engines are optimized to run efficiently even on mobile devices. Take a photo on your phone and edit it right there — no need to transfer files to a computer. Supported browsers include Chrome, Firefox, Safari, and Edge on all major operating systems.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
