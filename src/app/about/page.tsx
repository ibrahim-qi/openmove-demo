'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Users, Clock, Shield, Camera, MessageSquare, PoundSterling, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              How Openmove Works
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
              Revolutionary peer-to-peer property platform connecting buyers and sellers directly
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple. Direct. Revolutionary.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Skip the estate agents and connect directly with buyers. Here's how it works:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. List Your Property</h3>
              <p className="text-gray-600">
                Upload photos, add details, and set your price. Our simple form makes listing quick and easy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Connect with Buyers</h3>
              <p className="text-gray-600">
                Interested buyers contact you directly through our secure messaging system.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Complete the Sale</h3>
              <p className="text-gray-600">
                Arrange viewings, negotiate terms, and complete your sale - all without expensive agent fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Openmove?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to sell your property successfully
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <PoundSterling className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Thousands</h3>
              <p className="text-gray-600">
                No commission fees. Just a simple £10 listing fee.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Speak directly with buyers. No middleman delays.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Faster</h3>
              <p className="text-gray-600">
                Streamlined process means quicker sales completion.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You're in Control</h3>
              <p className="text-gray-600">
                Manage your listing, pricing, and viewings your way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              For Property Buyers
            </h2>
            <p className="text-lg text-gray-600">
              Find your perfect home with more transparency and better prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Better Prices</h3>
                  <p className="text-gray-600">
                    Sellers save on agent fees, meaning better prices for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Direct Access</h3>
                  <p className="text-gray-600">
                    Speak directly with property owners. Get honest answers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Faster Process</h3>
                  <p className="text-gray-600">
                    No agent delays. Arrange viewings and make offers quickly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">More Transparency</h3>
                  <p className="text-gray-600">
                    Get the full story directly from the seller, not through an agent.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Start Browsing Today</h3>
              <p className="text-white/90 mb-6">
                Thousands of properties listed by owners just like you. No agent markup, no hidden fees.
              </p>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Try a Better Way?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of homeowners who have saved money by selling directly
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
              List Your Property - £10
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-semibold text-lg">
              Browse Properties
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 