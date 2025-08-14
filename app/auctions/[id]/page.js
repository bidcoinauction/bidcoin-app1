// app/auctions/[id]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- HOOKS ---
const useCountdown = (endTime) => {
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
    useEffect(() => {
        if (!endTime) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
                return;
            }
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft({
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);
    return timeLeft;
};


// In a real app, this data would be fetched from an API or a shared module.
const mockAuctionsData = [
    { id: '1', name: 'Fox #7045', image: 'https://placehold.co/600x600/FFD6A5/4B2B0A?text=Fox', description: "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.", priceETH: 0.145, endTime: new Date().getTime() + 2 * 60 * 60 * 1000, leader: '0xAb...c1', bidHistory: [{bidder: '0xAb...c1', amount: '0.145 ETH'}, {bidder: '0xCd...e2', amount: '0.140 ETH'}] },
    { id: '2', name: 'SMB #2832', image: 'https://placehold.co/600x600/C2F7C2/1A4D1A?text=SMB', description: "A collection of pixelated monkeys with a penchant for business.", priceETH: 0.1545, endTime: new Date().getTime() + 1 * 60 * 60 * 1000, leader: 'NFTKing', bidHistory: [{bidder: 'NFTKing', amount: '0.1545 ETH'}] },
    { id: '3', name: '500 Bidcoin', image: 'https://placehold.co/600x600/FFC94A/854d0e?text=500', description: "A treasure chest overflowing with the platform's native currency.", priceETH: 0.1145, endTime: new Date().getTime() + 5 * 60 * 60 * 1000, leader: 'CryptoChad', bidHistory: [] },
    { id: '4', name: '#2578', image: 'https://placehold.co/600x600/FFB3B3/8A0000?text=2578', description: "A mysterious NFT from a forgotten collection, its origins unknown.", priceETH: 0.2245, endTime: new Date().getTime() + 12 * 60 * 60 * 1000, leader: 'ArtCollector', bidHistory: [] },
    { id: '5', name: 'DeGod #1234', image: 'https://placehold.co/600x600/A5B4FC/1E3A8A?text=DeGod', description: "A deflationary collection of misfits, punks, and degenerates.", priceETH: 7.5, endTime: new Date().getTime() + 24 * 60 * 60 * 1000, leader: 'DiamondHands', bidHistory: [] },
    { id: '6', name: 'Pudgy Penguin #5678', image: 'https://placehold.co/600x600/BFDBFE/1E40AF?text=Penguin', description: "A collection of 8,888 cute, chubby penguins.", priceETH: 4.2, endTime: new Date().getTime() + 2 * 24 * 60 * 60 * 1000, leader: 'MetaverseMogul', bidHistory: [] },
    { id: '7', name: 'Azuki #9876', image: 'https://placehold.co/600x600/FBCFE8/86198F?text=Azuki', description: "A brand for the metaverse. Built by the community.", priceETH: 11.3, endTime: new Date().getTime() + 3 * 24 * 60 * 60 * 1000, leader: '0x12...34', bidHistory: [] },
    { id: '8', name: 'CloneX #5432', image: 'https://placehold.co/600x600/CCFBF1/0F766E?text=CloneX', description: "Avatars that are ready for the metaverse.", priceETH: 5.9, endTime: new Date().getTime() + 4 * 24 * 60 * 60 * 1000, leader: '0x56...78', bidHistory: [] },
];

// --- DETAILED COMPONENTS ---

const AuctionInfo = ({ auction, timeLeft }) => (
    <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 flex flex-col">
        <div>
            <h1 className="text-3xl font-bold text-white">{auction.name}</h1>
            <p className="text-zinc-400 mt-2">{auction.description}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-zinc-700 flex-grow flex flex-col justify-end">
            <div className="flex justify-between items-baseline">
                <div>
                    <span className="text-zinc-400 text-sm">Current Price</span>
                    <p className="text-3xl font-bold text-white mt-1">{auction.priceETH} ETH</p>
                </div>
                <div>
                    <span className="text-zinc-400 text-sm">Time Left</span>
                    <p className="text-xl font-bold text-white mt-1 font-mono">{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</p>
                </div>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Place Bid</button>
        </div>
    </div>
);

const BidBotSetup = () => {
    const [isBotActive, setIsBotActive] = useState(false);
    return (
        <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6">
            <div className="flex justify-between items-center"><h3 className="font-bold text-white">BidBot Setup</h3><label htmlFor="toggle" className="flex items-center cursor-pointer"><div className="relative"><input type="checkbox" id="toggle" className="sr-only" checked={isBotActive} onChange={() => setIsBotActive(!isBotActive)} /><div className="block bg-zinc-600 w-14 h-8 rounded-full"></div><div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isBotActive ? 'transform translate-x-full bg-green-400' : ''}`}></div></div></label></div>
            <p className="text-zinc-400 mt-2 text-sm">Set your max bid and let the bot do the work.</p>
            <div className="mt-4"><label className="text-sm font-medium text-zinc-300">Max Bid (ETH)</label><input type="number" placeholder="0.5" className="w-full mt-1 bg-zinc-700 border-zinc-600 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" disabled={!isBotActive}/></div>
            <button className="mt-4 w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-zinc-500 disabled:cursor-not-allowed" disabled={!isBotActive}>Activate BidBot</button>
        </div>
    );
};

const BidHistory = ({ history }) => (
    <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6 mt-8">
        <h3 className="font-bold text-white mb-4">Bid History ({history.length})</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
            {history.length > 0 ? history.map((bid, index) => (
                <div key={index} className="flex justify-between bg-zinc-900 p-3 rounded-md text-sm">
                    <span className="font-mono text-zinc-300 truncate">{bid.bidder}</span>
                    <span className="font-mono text-white">{bid.amount}</span>
                </div>
            )) : <p className="text-zinc-500 text-sm">No bids yet. Be the first!</p>}
        </div>
    </div>
);

export default function AuctionDetailPage() {
    const params = useParams();
    const { id } = params;
    const auction = mockAuctionsData.find(a => a.id === id);
    const timeLeft = useCountdown(auction?.endTime);

    if (!auction) {
        return (
            <div className="bg-[#121212] text-white -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 p-8 min-h-screen"><div className="container mx-auto text-center"><h1 className="text-3xl font-bold">Auction Not Found</h1><Link href="/auctions" className="mt-4 inline-block text-blue-400 hover:underline">&larr; Back to all auctions</Link></div></div>
        );
    }

    return (
        <div className="bg-[#121212] text-white -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 p-8 min-h-screen">
            <div className="container mx-auto">
                <div className="mb-6"><Link href="/auctions" className="text-sm text-blue-400 hover:underline">&larr; Back to all auctions</Link></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={auction.image} alt={auction.name} className="w-full h-auto object-cover rounded-lg border border-zinc-800" />
                            <div className="flex flex-col gap-8">
                                <AuctionInfo auction={auction} timeLeft={timeLeft} />
                                <BidBotSetup />
                            </div>
                        </div>
                        <BidHistory history={auction.bidHistory} />
                    </div>
                    <div className="space-y-8">
                         <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6">
                            <h3 className="font-bold text-white mb-4">Auction Rules</h3>
                            <p className="text-sm text-zinc-400">Each bid resets the timer. The last bidder wins.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}