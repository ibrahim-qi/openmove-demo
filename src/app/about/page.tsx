'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:text-3xl lg:text-4xl">
            The <span className="text-primary-500">simplest</span> way to sell<br />
            or let your home
          </h1>

        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-4 lg:space-y-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">1</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                List Your Property
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base mb-3">
                Upload your home details, photos and videos for just £10. No expiry, no hidden fees.
              </p>
              <p className="text-black text-sm leading-relaxed lg:text-base mb-6">
                List your property in three simple steps. Start listing now!
              </p>
              <Link href="/list-property">
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                  List Your Property
                </button>
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">2</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                Talk Directly to Buyers or Tenants
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Talk directly to people interested in your property in real time using our secure chat. Send photos, answer questions and negotiate a price.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">3</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                Send and Receive Offers
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Buyers can send offers at any time, and a PDF document with the offer will be sent to your email. This will also be shown on your profile. Sellers can accept, reject or counter-offer.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">4</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                Accept and Move Forward
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                When you accept an offer, a Memorandum of Sale is created and sent to both the seller and the buyer. A PDF document will be generated and sent to both parties.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">5</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                Your Solicitor Takes Over
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Pass the Memorandum of Sale to your chosen Solicitors who will then handle the legal side.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center lg:w-12 lg:h-12 mb-4">
              <span className="text-white font-bold text-lg lg:text-xl">6</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                Completion
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base mb-3">
                When the sale completes, £500 is paid to yoomoove from the sale proceeds through your solicitor.
              </p>
              <p className="text-black text-sm leading-relaxed lg:text-base font-medium">
                See the savings breakdown below!
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:text-2xl lg:text-3xl">
              Compare the Costs
            </h2>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto">
              See how much you can save with yoomoove
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Estate Agent Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 lg:text-xl">Estate Agent</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-700 mb-4 lg:text-lg">Sale Price: £350,000</p>
                    <div className="border-t border-gray-300 pt-4">
                      <p className="text-gray-600 text-sm mb-2 lg:text-base">Estate Agent Fee (1.5%):</p>
                      <p className="text-2xl font-bold text-gray-800 lg:text-3xl">£5,250</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-600 font-semibold text-sm lg:text-base">You could save</p>
                  <p className="text-xl font-bold text-red-600 lg:text-2xl">£4,740</p>
                </div>
              </div>
            </div>

            {/* Yoomoove Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 lg:p-8 hover:shadow-md transition-shadow relative">
              <div className="absolute -top-3 right-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  SAVE 90%
                </span>
              </div>
              
              <div className="text-center mb-6">
                <img
                  src="/header.png"
                  alt="yoomoove"
                  className="h-6 w-auto mx-auto lg:h-8"
                  style={{
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <p className="text-base font-semibold text-gray-700 mb-4 lg:text-lg">Sale Price: £350,000</p>
                  </div>
                  
                  <div className="space-y-3 text-sm lg:text-base">
                    <div className="flex justify-between items-center py-2 border-b border-primary-200">
                      <span className="text-gray-600">Listing Fee:</span>
                      <span className="font-semibold text-gray-800">£10</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Completion Fee:</span>
                      <span className="font-semibold text-gray-800">£500</span>
                    </div>
                    <div className="border-t-2 border-primary-300 pt-3">
                      <div className="flex justify-between items-center font-bold text-base lg:text-lg">
                        <span className="text-primary-600">Total yoomoove fee:</span>
                        <span className="text-primary-600">£510</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 border border-primary-300 rounded-xl p-6 text-center">
                  <p className="text-primary-700 font-bold text-base mb-2 lg:text-lg">Total Savings</p>
                  <p className="text-2xl font-bold text-primary-700 lg:text-3xl">£4,740</p>
                  <p className="text-primary-600 text-sm mt-2 lg:text-base">That&apos;s 90% less in fees!</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-8 lg:mt-12">
            <p className="text-base text-gray-600 mb-6 sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Ready to save thousands on your property sale?
            </p>
            <Link href="/list-property">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                Start Saving Today - List for £10
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 