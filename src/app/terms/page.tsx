import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-6 sm:text-3xl">
              Terms of Use
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8">
            <div className="space-y-6 text-black text-sm leading-relaxed lg:text-base">
              
              <p>
                These Terms of Use set out the terms on which you may access and use the yoomoove platform. By registering an account or using any part of the platform, you agree to be legally bound by these terms. If you do not agree, you must not use the platform.
              </p>

              <p>
                yoomoove is a UK-based online platform that allows users to list, manage, and negotiate the sale or rental of residential property directly. You must be at least 18 years of age and legally able to enter into contracts in order to use our services.
              </p>

              <p>
                To create an account, you are required to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. We reserve the right to suspend or terminate accounts that violate these terms or are used unlawfully.
              </p>

              <p>
                If you are listing a property, you must be the legal owner or have the necessary authority to do so. You must submit proof of ownership prior to the listing being made public. You are responsible for the accuracy of all details submitted. Each listing requires a one-time non-refundable payment of £10. The listing will remain active without expiry.
              </p>

              <p>
                Buyers must upload a valid Decision in Principle before they are permitted to submit offers. When an offer is accepted, the platform automatically generates a Memorandum of Sale in PDF format, which can be shared with the solicitors acting on behalf of both parties. This document is not a legally binding contract.
              </p>

              <p>
                On completion of a sale, a success fee of £500 is payable to yoomoove. This amount is deducted from the seller&apos;s proceeds and transferred via the solicitor handling the transaction. All payments must be processed via Stripe or any other payment gateway integrated into the platform. We do not directly handle or store card information.
              </p>

              <p>
                The platform may only be used for lawful purposes. You agree not to submit false or misleading information, upload malicious content, harass or threaten other users, or attempt to interfere with the operation of the platform. yoomoove reserves the right to remove content or suspend access where these terms are breached.
              </p>

              <p>
                All intellectual property rights in the design, content, and branding of the platform are owned by yoomoove. No part of the platform may be copied, reproduced, or distributed without our express written consent.
              </p>

              <p>
                yoomoove is not an estate agent and does not act as a party to any property transaction. We do not guarantee the accuracy of property valuations, legal ownership, or user-submitted documentation. It is your responsibility to obtain independent legal, financial, or professional advice as required.
              </p>

              <p>
                yoomoove shall not be liable for any indirect, incidental, or consequential loss arising from your use of the platform. Our total liability shall not exceed the total amount of fees you have paid to us in the 12 months preceding any claim.
              </p>

              <p>
                These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts. If any part of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
              </p>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
