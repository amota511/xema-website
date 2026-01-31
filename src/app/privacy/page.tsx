import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Xema",
  description: "Xema's privacy policy. Learn how we handle your data.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-sage-950 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sage-500 text-sm mb-12">
            Last updated: January 31, 2026
          </p>

          <div className="prose-xema space-y-8">
            <Section title="1. Introduction">
              <p>
                Xema (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                respects your privacy and is committed to protecting the
                personal information you share with us. This Privacy Policy
                describes how we collect, use, and safeguard your information
                when you use the Xema mobile application (the
                &quot;App&quot;).
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your name, email address, and
                  authentication credentials.
                </li>
                <li>
                  <strong>Health Data:</strong> Symptom logs, body area
                  tracking, and skin photos you voluntarily provide within the
                  App.
                </li>
                <li>
                  <strong>Product Scans:</strong> Information about products
                  you scan, including barcode data and ingredient lists.
                </li>
                <li>
                  <strong>Location Data:</strong> With your permission, we
                  access your location to provide localized weather and air
                  quality data for flare risk predictions.
                </li>
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, and app version for troubleshooting and analytics.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve the App&apos;s features and services</li>
                <li>
                  Generate personalized flare risk predictions and product
                  recommendations
                </li>
                <li>Analyze symptom trends and patterns for your benefit</li>
                <li>Send you relevant notifications and reminders</li>
                <li>
                  Improve and optimize the App&apos;s performance and user
                  experience
                </li>
              </ul>
            </Section>

            <Section title="4. Data Storage and Security">
              <p>
                Your data is stored securely using industry-standard
                encryption. Health data is stored locally on your device and,
                if you opt in, synced to our secure cloud infrastructure
                powered by Firebase. We implement appropriate technical and
                organizational measures to protect your personal information
                against unauthorized access, alteration, or destruction.
              </p>
            </Section>

            <Section title="5. Third-Party Services">
              <p>
                The App uses the following third-party services that may
                collect information:
              </p>
              <ul>
                <li>
                  <strong>Firebase:</strong> Authentication, data storage, and
                  analytics
                </li>
                <li>
                  <strong>RevenueCat:</strong> Subscription management
                </li>
                <li>
                  <strong>OpenAI:</strong> AI-powered analysis features
                  (product scanning, photo analysis)
                </li>
                <li>
                  <strong>Weather APIs:</strong> Environmental data for flare
                  predictions
                </li>
              </ul>
              <p>
                Each third-party service operates under its own privacy
                policy. We encourage you to review their policies.
              </p>
            </Section>

            <Section title="6. Data Sharing">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share anonymized, aggregated data for
                research purposes. We may disclose your information if
                required by law or to protect the rights and safety of our
                users.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent for data processing at any time</li>
              </ul>
              <p>
                You can exercise these rights through the App&apos;s Settings
                page or by contacting us directly.
              </p>
            </Section>

            <Section title="8. Children's Privacy">
              <p>
                The App is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you believe we have collected such information,
                please contact us immediately.
              </p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the updated
                policy within the App and updating the &quot;Last
                updated&quot; date.
              </p>
            </Section>

            <Section title="10. Contact Us">
              <p>
                If you have questions or concerns about this Privacy Policy or
                our data practices, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> support@xema.app
              </p>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-6 border-b border-border/60 last:border-0">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-sage-950 mb-4">
        {title}
      </h2>
      <div className="text-sage-700 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-sage-700 [&_strong]:text-sage-800 [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
