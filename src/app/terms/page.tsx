import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use — Xema",
  description: "Xema's terms of use. Please read before using the app.",
};

export default function TermsOfUse() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-sage-950 mb-4">
            Terms of Use
          </h1>
          <p className="text-sage-500 text-sm mb-12">
            Last updated: January 31, 2026
          </p>

          <div className="space-y-8">
            <Section title="1. Acceptance of Terms">
              <p>
                By downloading, installing, or using Xema (the
                &quot;App&quot;), you agree to be bound by these Terms of Use.
                If you do not agree to these terms, do not use the App.
              </p>
            </Section>

            <Section title="2. Description of Service">
              <p>
                Xema is an eczema management application that provides tools
                for symptom tracking, flare-up prediction, product scanning,
                and educational content. The App is designed to help users
                manage their eczema but is not a substitute for professional
                medical advice, diagnosis, or treatment.
              </p>
            </Section>

            <Section title="3. Medical Disclaimer">
              <p>
                <strong>
                  Xema is not a medical device and does not provide medical
                  advice.
                </strong>{" "}
                The information provided by the App, including flare risk
                predictions, product analysis, and educational content, is for
                informational purposes only. Always consult a qualified
                healthcare provider for medical decisions. Do not disregard or
                delay seeking professional medical advice because of
                information obtained through the App.
              </p>
            </Section>

            <Section title="4. User Accounts">
              <p>
                You may create an account to access certain features. You are
                responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under
                your account. You agree to provide accurate and complete
                information when creating your account.
              </p>
            </Section>

            <Section title="5. Subscriptions and Payments">
              <p>
                Xema offers a free tier and a premium subscription
                (&quot;Xema Plus&quot;). Subscriptions are billed through your
                app store account (Apple App Store or Google Play Store).
                Subscription terms, pricing, and cancellation policies are
                governed by the respective app store&apos;s terms. You may
                cancel your subscription at any time through your app store
                account settings.
              </p>
            </Section>

            <Section title="6. User Content">
              <p>
                You retain ownership of all content you submit to the App,
                including symptom logs, photos, and product scans. By using
                the App, you grant us a limited license to process this
                content solely for the purpose of providing and improving our
                services to you. We will not use your personal health data for
                advertising purposes.
              </p>
            </Section>

            <Section title="7. Acceptable Use">
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use the App for any unlawful purpose or in violation of any
                  applicable laws
                </li>
                <li>
                  Attempt to reverse engineer, decompile, or disassemble the
                  App
                </li>
                <li>
                  Interfere with or disrupt the App&apos;s functionality or
                  servers
                </li>
                <li>
                  Share your account credentials with others or create
                  multiple accounts
                </li>
                <li>
                  Use the App to collect information about other users without
                  their consent
                </li>
              </ul>
            </Section>

            <Section title="8. Intellectual Property">
              <p>
                The App, including its design, features, content, and
                underlying technology, is owned by Xema and protected by
                intellectual property laws. You may not copy, modify,
                distribute, or create derivative works based on the App
                without our prior written consent.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Xema shall not be
                liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of or inability to
                use the App. Our total liability for any claims related to the
                App shall not exceed the amount you paid for the App in the
                twelve months preceding the claim.
              </p>
            </Section>

            <Section title="10. Disclaimer of Warranties">
              <p>
                The App is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express
                or implied. We do not warrant that the App will be
                uninterrupted, error-free, or that the results obtained from
                using the App will be accurate or reliable.
              </p>
            </Section>

            <Section title="11. Termination">
              <p>
                We may suspend or terminate your access to the App at any time
                for violation of these Terms. You may stop using the App and
                delete your account at any time. Upon termination, your right
                to use the App will immediately cease.
              </p>
            </Section>

            <Section title="12. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms at any time. We
                will notify you of material changes by posting the updated
                Terms within the App. Your continued use of the App after
                changes are posted constitutes your acceptance of the revised
                Terms.
              </p>
            </Section>

            <Section title="13. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the United States, without regard to
                conflict of law principles.
              </p>
            </Section>

            <Section title="14. Contact Us">
              <p>
                If you have questions about these Terms of Use, please
                contact us at:
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
