// app/page.js
import React from 'react';
import Link from 'next/link';

const FeaturedAuctionCard = ({ item }) => (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
             <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
            <Link href={`/auctions/${item.id}`} className="block mt-4 w-full text-center bg-purple-600 text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 transition-colors">
                View Auction
            </Link>
        </div>
    </div>
);

const HeroSection = () => (
    <div className="text-center py-20 lg:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
            The Future of Auctions is Here
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Bid on exclusive digital assets, luxury goods, and collectibles with the power and transparency of the blockchain.
        </p>
        <div className="mt-8 flex justify-center gap-4">
            <Link href="/auctions" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors">
                Join Now
            </Link>
        </div>
    </div>
);

const FeaturedAuctions = () => {
    const featuredItems = [
        { id: 1, name: 'CryptoPunk #7804', image: 'https://placehold.co/400x400/FFD6A5/4B2B0A?text=Punk' },
        { id: 2, name: 'Bored Ape #8817', image: 'https://placehold.co/400x400/C2F7C2/1A4D1A?text=Ape' },
        { id: 3, name: 'Art Blocks: Fidenza', image: 'https://placehold.co/400x400/FFC94A/854d0e?text=Art' },
    ];
    return (
        <div className="py-16">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Featured Auctions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredItems.map(item => <FeaturedAuctionCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

const CategoriesGrid = () => {
    const categories = ["NFTs", "Luxury", "Collectibles", "Art", "Gaming", "Domains"];
    return (
        <div className="py-16"><h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Explore Categories</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{categories.map(cat => (<a href="#" key={cat} className="block bg-white border border-slate-200 rounded-lg p-6 text-center font-semibold text-slate-800 hover:bg-slate-50 hover:border-purple-500 transition-all">{cat}</a>))}</div></div>
    );
};

const HowItWorks = () => (
    <div className="py-16 bg-white rounded-lg border border-slate-200"><div className="container mx-auto px-4 text-center"><h2 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"><div className="p-6"><div className="text-3xl font-bold text-purple-600 mb-2">1.</div><h3 className="text-xl font-semibold text-slate-900 mb-2">Connect Wallet</h3><p className="text-gray-600">Securely connect your preferred cryptocurrency wallet to get started in seconds.</p></div><div className="p-6"><div className="text-3xl font-bold text-purple-600 mb-2">2.</div><h3 className="text-xl font-semibold text-slate-900 mb-2">Place Your Bids</h3><p className="text-gray-600">Browse auctions and place bids using crypto. Each bid is a secure on-chain transaction.</p></div><div className="p-6"><div className="text-3xl font-bold text-purple-600 mb-2">3.</div><h3 className="text-xl font-semibold text-slate-900 mb-2">Win & Claim</h3><p className="text-gray-600">If you're the last bidder when the timer runs out, the asset is yours. Claim it directly to your wallet.</p></div></div></div></div>
);

export default function HomePage() {
  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
            <FeaturedAuctions />
            <CategoriesGrid />
            <HowItWorks />
        </div>
    </div>
  );
}
