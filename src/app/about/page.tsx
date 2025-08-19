'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// SwipeableComparison Component
function SwipeableComparison() {
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cards = [
    {
      id: 'estate-agent',
      type: 'estate-agent'
    },
    {
      id: 'yoomoove',
      type: 'yoomoove'
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0);
    setIsDragging(true);
    setIsTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !touchStart) return;
    
    // Prevent default to avoid interference with scrolling
    e.preventDefault();
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit drag distance to prevent over-scrolling
    const maxDrag = 120;
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    
    // Apply resistance at the edges for better feedback
    let resistance = 1;
    if ((currentCard === 0 && limitedDiff > 0) || (currentCard === cards.length - 1 && limitedDiff < 0)) {
      resistance = 0.25; // Stronger resistance for better edge feedback
    }
    
    setDragOffset(limitedDiff * resistance);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    setIsDragging(false);
    setIsTransitioning(true);
    
    const distance = touchStart - touchEnd;
    const threshold = 60; // Reduced threshold for more responsive swipes
    
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else if (isRightSwipe && currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
    
    setDragOffset(0);
    
    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Calculate transform with drag offset and bidirectional peek effect
  const getTransform = () => {
    const cardWidth = 88; // 88% width for better card size with peek
    const spacing = 6; // 6% spacing between cards for peek effect
    
    // For card 0: start at 6% to show next card
    // For card 1: move to -(88+6)% + 6% to center and show previous card  
    const baseTransform = currentCard === 0 ? 6 : -88;
    const dragTransform = isDragging ? (dragOffset / (typeof window !== 'undefined' ? window.innerWidth : 400)) * (cardWidth + spacing) : 0;
    return baseTransform + dragTransform;
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 lg:max-w-4xl">
      {/* Mobile & Tablet Swipeable Container */}
      <div className="lg:hidden relative">
        <div 
          className={`relative mt-6 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but handle horizontal touches
        >
          <div className="overflow-visible">
            <div 
              className={`flex ${isDragging ? '' : 'transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'}`}
              style={{ 
                transform: `translateX(${getTransform()}%)`
              }}
            >
              {cards.map((card, index) => (
                <div key={card.id} className="flex-shrink-0 px-2" style={{ width: '88%', marginRight: '6%' }}>
                  {card.type === 'estate-agent' ? (
                    /* Estate Agent Card - Original Design */
                    <div className={`bg-white rounded-xl p-6 border-2 border-gray-300 min-h-[500px] flex flex-col transition-all duration-200 ${
                      isDragging ? 'shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
                    }`}>
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Estate Agent</h3>
                      </div>
                      
                      <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="text-center">
                            <p className="text-base font-semibold text-gray-700 mb-4">Sale Price: £350,000</p>
                            <div className="border-t-2 border-gray-400 pt-4">
                              <p className="text-gray-600 text-sm mb-2">Estate Agent Fee (1.5%):</p>
                              <p className="text-2xl font-bold text-gray-800">£5,250</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                          <p className="text-red-600 font-semibold text-sm">You could save</p>
                          <p className="text-xl font-bold text-red-600">£4,740</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Yoomoove Card - Original Design */
                    <div className={`bg-white rounded-xl p-6 border-2 border-primary-300 relative min-h-[500px] flex flex-col pt-10 transition-all duration-200 ${
                      isDragging ? 'shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
                    }`}>
                      <div className="absolute top-3 right-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          SAVE 90%
                        </span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <img
                          src="/header.png"
                          alt="yoomoove"
                          className="h-6 w-auto mx-auto"
                          style={{
                            imageRendering: 'crisp-edges'
                          }}
                        />
                      </div>
                      
                      <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
                          <div className="text-center mb-4">
                            <p className="text-base font-semibold text-gray-700 mb-4">Sale Price: £350,000</p>
                          </div>
                          
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center py-2 border-b-2 border-primary-300">
                              <span className="text-gray-600">Listing Fee:</span>
                              <span className="font-semibold text-gray-800">£10</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">Completion Fee:</span>
                              <span className="font-semibold text-gray-800">£500</span>
                            </div>
                            <div className="border-t-2 border-primary-400 pt-3">
                              <div className="flex justify-between items-center font-bold text-base">
                                <span className="text-primary-600">Total yoomoove fee:</span>
                                <span className="text-primary-600">£510</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-primary-50 border-2 border-primary-400 rounded-xl p-6 text-center">
                          <p className="text-primary-700 font-bold text-base mb-2">Total Savings</p>
                          <p className="text-2xl font-bold text-primary-700">£4,740</p>
                          <p className="text-primary-600 text-sm mt-2">That&apos;s 90% less in fees!</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Navigation Arrows */}
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="hidden md:block lg:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextCard}
          disabled={currentCard === cards.length - 1}
          className="hidden md:block lg:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile Swipe Indicator */}
        <div className="flex items-center justify-center mt-6 md:hidden">
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-gray-700 text-xs font-medium">Swipe or drag</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-3 lg:hidden">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === currentCard) return;
                setIsTransitioning(true);
                setCurrentCard(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                index === currentCard ? 'bg-gray-800 shadow-md' : 'bg-gray-400 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Side-by-Side Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 mt-6">
        {/* Estate Agent Card */}
        <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-300 hover:shadow-2xl transition-all duration-300 min-h-[500px] flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Estate Agent</h3>
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 mb-4">Sale Price: £350,000</p>
                <div className="border-t-2 border-gray-400 pt-4">
                  <p className="text-gray-600 text-base mb-2">Estate Agent Fee (1.5%):</p>
                  <p className="text-3xl font-bold text-gray-800">£5,250</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
              <p className="text-red-600 font-semibold text-base">You could save</p>
              <p className="text-2xl font-bold text-red-600">£4,740</p>
            </div>
          </div>
        </div>

        {/* Yoomoove Card */}
        <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-primary-300 hover:shadow-2xl transition-all duration-300 relative min-h-[500px] flex flex-col pt-14">
          <div className="absolute top-4 right-6">
            <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
              SAVE 90%
            </span>
          </div>
          
          <div className="text-center mb-6">
            <img
              src="/header.png"
              alt="yoomoove"
              className="h-8 w-auto mx-auto"
              style={{
                imageRendering: 'crisp-edges'
              }}
            />
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
              <div className="text-center mb-4">
                <p className="text-lg font-semibold text-gray-700 mb-4">Sale Price: £350,000</p>
              </div>
              
              <div className="space-y-3 text-base">
                <div className="flex justify-between items-center py-2 border-b-2 border-primary-300">
                  <span className="text-gray-600">Listing Fee:</span>
                  <span className="font-semibold text-gray-800">£10</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Completion Fee:</span>
                  <span className="font-semibold text-gray-800">£500</span>
                </div>
                <div className="border-t-2 border-primary-400 pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span className="text-primary-600">Total yoomoove fee:</span>
                    <span className="text-primary-600">£510</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 border-2 border-primary-400 rounded-xl p-6 text-center">
              <p className="text-primary-700 font-bold text-lg mb-2">Total Savings</p>
              <p className="text-3xl font-bold text-primary-700">£4,740</p>
              <p className="text-primary-600 text-base mt-2">That&apos;s 90% less in fees!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:text-3xl lg:text-4xl">
            The <span className="text-primary-500">Simplest</span> Way to<br />
            Sell or Let Your Home
          </h1>

        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-4 lg:space-y-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">1</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
                List Your Property
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base mb-3">
                Upload your home details, photos and videos for just £10. No expiry, no hidden fees.
              </p>
              <p className="text-black text-sm leading-relaxed lg:text-base mb-6">
                List your property in three simple steps. Start listing now!
              </p>
              <Link href="/list-property">
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors">
                  List Your Property
                </button>
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">2</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
                Talk Directly to Buyers or Tenants
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Talk directly to people interested in your property in real time using our secure chat. Send photos, answer questions and negotiate a price.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">3</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
                Send and Receive Offers
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Buyers can send offers at any time, and a PDF document with the offer will be sent to your email. This will also be shown on your profile. Sellers can accept, reject or counter-offer.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">4</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
                Accept and Move Forward
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                When you accept an offer, a Memorandum of Sale is created and sent to both the seller and the buyer. A PDF document will be generated and sent to both parties.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">5</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
                Your Solicitor Takes Over
              </h3>
              <p className="text-black text-sm leading-relaxed lg:text-base">
                Pass the Memorandum of Sale to your chosen Solicitors who will then handle the legal side.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 lg:p-8 hover:shadow-xl transition-shadow relative">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center lg:w-10 lg:h-10 mb-4">
              <span className="text-white font-bold text-sm lg:text-base">6</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-500 mb-3 lg:text-xl">
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
      <section className="py-8 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:text-2xl lg:text-3xl">
              Compare the Costs
            </h2>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto">
              See how much you can save with yoomoove
            </p>
          </div>
          
          <SwipeableComparison />
          
          {/* Call to Action */}
          <div className="text-center mt-12 lg:mt-16">
            <p className="text-base text-gray-600 mb-6 sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Ready to save thousands on your property sale?
            </p>
            <Link href="/list-property">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors">
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