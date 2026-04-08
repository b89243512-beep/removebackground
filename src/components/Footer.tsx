import Link from "next/link";
import { Logo } from "@/components/Logo";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <Logo size={32} />
              <span>Free Remove Background</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Remove image backgrounds instantly with AI. Upload any photo and get a clean, transparent PNG in seconds — completely free, no sign-up needed.
            </p>
          </div>

          <div className="md:text-right">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
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
