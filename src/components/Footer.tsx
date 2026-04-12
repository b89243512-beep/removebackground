import Link from "next/link";
import { Logo } from "@/components/Logo";

const toolLinks = [
  { label: "Background Remover", href: "/" },
  { label: "Image Compressor", href: "/compress" },
  { label: "JPG to PNG Converter", href: "/jpg-to-png" },
  { label: "PNG to JPG Converter", href: "/png-to-jpg" },
  { label: "Image Resizer", href: "/resize" },
  { label: "Image to Base64", href: "/image-to-base64" },
  { label: "All Tools", href: "/tools" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <Logo size={32} />
              <span>Free Remove Background</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Remove image backgrounds instantly with AI. Upload any photo and get a clean, transparent PNG in seconds — completely free, no sign-up needed.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Remove Background. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
