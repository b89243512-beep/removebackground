import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Free Remove Background. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
          <p><strong>Effective Date:</strong> April 2026</p>
          <p>At Free Remove Background, your privacy matters to us. This Privacy Policy explains what information we collect, how we use it, and how we protect your data when you use our service at removebackground.com.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>Free Remove Background is designed with privacy in mind. We do not require account registration. When you use our service, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Uploaded Images:</strong> Images you submit for background removal. These are processed in real time and automatically deleted after processing.</li>
            <li><strong>Usage Data:</strong> Anonymous, aggregated data such as page views, device type, and browser type to improve our service.</li>
            <li><strong>Cookies:</strong> Essential cookies for functionality and analytics cookies to understand site usage.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use collected information to process background removal requests, improve AI accuracy and performance, analyze usage trends, and maintain platform security and stability.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Sharing</h2>
          <p>We do not sell, rent, or share your personal information with third parties for marketing. We may share anonymized analytics with service providers who help operate the platform.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Image Data Retention</h2>
          <p>Uploaded images are processed in real time and are not stored permanently. Images are automatically deleted immediately after background removal is complete. We never use your images for AI training or any other purpose.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Data Security</h2>
          <p>We use HTTPS encryption and secure server infrastructure to protect data in transit. However, no method of internet transmission is 100% secure.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Children&apos;s Privacy</h2>
          <p>We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact Us</h2>
          <p>Questions about this Privacy Policy? Contact us at{" "}
            <a href="mailto:privacy@removebackground.com" className="text-primary hover:underline">privacy@removebackground.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
