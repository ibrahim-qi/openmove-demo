import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-6 sm:text-3xl">
              Privacy Policy
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8">
            <div className="space-y-6 text-black text-sm leading-relaxed lg:text-base">
              
              <p>
                This Privacy Policy explains how yoomoove collects, uses, and protects personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>

              <p>
                yoomoove is committed to protecting your privacy and ensuring the security of your personal information. We process personal data lawfully, fairly, and transparently. This notice describes the categories of data we collect, the reasons for collection, and how that data is handled.
              </p>

              <p>
                We collect personal information when you register an account, list a property, upload documents, make or receive offers, communicate via our platform, or interact with our payment systems. This information may include your name, email address, phone number, property details, photos, videos, IP address, usage data, chat messages, payment references, and legal documents such as proof of ownership or a Decision in Principle.
              </p>

              <p>
                We collect and process this information to deliver the core functionality of the yoomoove platform. This includes verifying user identity and ownership, publishing listings, facilitating secure communication between buyers and sellers, generating offer summaries and sale documentation, and processing payments. The legal basis for processing your data may be contractual necessity, compliance with legal obligations, consent (where applicable), or legitimate interests related to platform security and fraud prevention.
              </p>

              <p>
                We may share your information with trusted third-party providers such as Stripe (for payments), Firebase by Google (for authentication, chat, and storage), and solicitors acting on your behalf in property transactions. Data is stored in the UK or EEA and protected by strong technical and organisational measures including encryption, access controls, and secure hosting. We do not sell or rent your data to third parties.
              </p>

              <p>
                You have the right to access your data, request correction or deletion, restrict or object to processing, and request data portability. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) if you believe your rights have been infringed.
              </p>

              <p>
                We retain personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by law. If you close your account, your data will be anonymised or securely deleted within a reasonable period, subject to legal obligations.
              </p>

              <p>
                We use cookies to improve user experience, monitor platform performance, and support authentication. You can adjust your cookie preferences through your browser settings at any time.
              </p>

              <p>
                This Privacy Policy may be updated periodically to reflect changes in the platform or legal requirements. Material changes will be communicated via email or prominent notice on the platform.
              </p>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
