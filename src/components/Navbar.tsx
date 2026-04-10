"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Upload, Menu, X, ChevronDown } from "lucide-react";

const toolLinks = [
  { href: "/compress", label: "Image Compressor" },
  { href: "/jpg-to-png", label: "JPG to PNG Converter" },
  { href: "/png-to-jpg", label: "PNG to JPG Converter" },
  { href: "/resize", label: "Image Resizer" },
  { href: "/tools", label: "View All Tools →" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Logo size={32} />
          <span>Remove Background</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <Link href="/tools" className="flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors">
              All Tools <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-50">
                {toolLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-sky-50 transition-colors"
                    onClick={() => setToolsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="#features" className="text-sm font-medium text-muted hover:text-primary transition-colors">Features</Link>
          <Link href="#faq" className="text-sm font-medium text-muted hover:text-primary transition-colors">FAQ</Link>

          <Link href="#remover" className="btn-primary text-sm px-4 py-2 gap-2">
            <Upload className="w-4 h-4" />
            Upload Image
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="flex flex-col gap-1 px-4 pb-4 md:hidden bg-white border-b border-border">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">All Tools</p>
          {toolLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-primary hover:bg-surface transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2" />
          <Link href="#features" className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Features</Link>
          <Link href="#faq" className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-primary" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <Link href="#remover" className="btn-primary text-sm px-4 py-2.5 mt-2 gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Upload className="w-4 h-4" />Upload Image
          </Link>
        </div>
      )}
    </header>
  );
}
