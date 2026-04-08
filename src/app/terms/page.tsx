import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Free Remove Background. Rules and guidelines for using our service.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
          <p><strong>Effective Date:</strong> April 2026</p>
          <p>Welcome to Free Remove Background. By using our website at backroundremove.com, you agree to these Terms of Service.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Description of Service</h2>
          <p>Free Remove Background is a web-based tool that uses AI to remove backgrounds from images. The service is provided free of charge and does not require account registration.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Acceptable Use</h2>
          <p>You agree to use Free Remove Background only for lawful purposes. You may not use the service to process illegal, harmful, or offensive content, attempt to disrupt or overload the service, reverse-engineer or scrape the platform, or use automated tools to abuse the service.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Intellectual Property</h2>
          <p>You retain full ownership of the images you upload and the results you download. All branding, design, and software associated with Free Remove Background are our property.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Output Quality</h2>
          <p>While Free Remove Background strives to deliver accurate results, AI processing may occasionally produce imperfect output. Results are provided as-is and we recommend reviewing them before use in critical applications.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Uploaded Content</h2>
          <p>Images are processed in real time and deleted immediately after processing. Do not upload images containing illegal content or content you do not have rights to process.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Limitation of Liability</h2>
          <p>Free Remove Background is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any damages arising from your use of or inability to use the service.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes to Terms</h2>
          <p>We may modify these terms at any time. Continued use after changes constitutes acceptance of the revised terms.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
          <p>Questions? Contact us at{" "}
            <a href="mailto:legal@backroundremove.com" className="text-primary hover:underline">legal@backroundremove.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
