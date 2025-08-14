// app/auctions/page.js
'use client';
import React from 'react';
import Link from 'next/link';

const mockAuctions = [
    { id: 1, name: 'Fox #7045', image: 'https://placehold.co/400x400/FFD6A5/4B2B0A?text=Fox' },
    { id: 2, name: 'SMB #2832', image: 'https://placehold.co/400x400/C2F7C2/1A4D1A?text=SMB' },
    { id: 3, name: '500 Bidcoin', image: 'https://placehold.co/400x400/FFC94A/854d0e?text=500' },
    { id: 4, name: '#2578', image: 'https://placehold.co/400x400/FFB3B3/8A0000?text=2578' },
    { id: 5, name: 'DeGod #1234', image: 'https://placehold.co/400x400/A5B4FC/1E3A8A?text=DeGod' },
    { id: 6, name: 'Pudgy Penguin #5678', image: 'https://placehold.co/400x400/BFDBFE/1E40AF?text=Penguin' },
    { id: 7, name: 'Azuki #9876', image: 'https://placehold.co/400x400/FBCFE8/86198F?text=Azuki' },
    { id: 8, name: 'CloneX #5432', image: 'https://placehold.co/400x400/CCFBF1/0F766E?text=CloneX' },
];
const SearchIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);

const GridAuctionCard = ({ auction }) => (
    <Link href={`/auctions/${auction.id}`} className="block bg-[#18181B] border border-zinc-800 rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
        <div className="w-full h-52 bg-zinc-900 flex items-center justify-center">
             <img src={auction.image} alt={auction.name} className="w-full h-full object-cover"/>
        </div>
        <div className="p-4 bg-[#1F1F22]">
            <h3 className="font-semibold text-white truncate">{auction.name}</h3>
        </div>
    </Link>
);

const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-12">
        <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700" disabled>Previous</button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm">1</button>
        <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700">2</button>
        <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700">3</button>
        <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700">Next</button>
    </div>
);

export default function AuctionsPage() {
    return (
        <div className="bg-[#121212] -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 p-8 min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-4">
                            <h3 className="font-bold text-white mb-4">Filters</h3>
                            <div className="space-y-2"><label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" className="form-checkbox bg-zinc-700 border-zinc-600 rounded text-blue-500 focus:ring-blue-500" /><span className="text-sm text-zinc-200">Newbies</span></label></div>
                        </div>
                    </aside>
                    <div className="flex-1">
                        <div className="relative mb-4"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" /><input type="text" placeholder="Search by name or trait" className="w-full bg-[#18181B] border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"/></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mockAuctions.map(auction => <GridAuctionCard key={auction.id} auction={auction} />)}
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}
