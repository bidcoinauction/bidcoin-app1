// app/auctions/[id]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// --- HOOKS ---
const useCountdown = (endTime) => {
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    useEffect(() => {
        if (!endTime) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft({
                days: String(days).padStart(2, '0'),
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
];

// --- DETAILED COMPONENTS ---

const AuctionInfo = ({ auction, timeLeft }) => {
    const { publicKey } = useWallet();

    return (
        <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white">{auction.name}</h1>
            <p className="text-zinc-400 mt-2">{auction.description}</p>
            
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                    <span className="text-zinc-400 text-sm">Time Left</span>
                    <p className="text-xl font-bold text-white mt-1 font-mono">{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</p>
                </div>
                <div>
                    <span className="text-zinc-400 text-sm">Current Price</span>
                    <p className="text-xl font-bold text-white mt-1">{auction.priceETH} ETH</p>
                </div>
                <div>
                    <span className="text-zinc-400 text-sm">Leader</span>
                    <p className="text-xl font-bold text-white mt-1 font-mono truncate">{auction.leader}</p>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-700">
                {publicKey ? (
                    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg">Place Bid</button>
                ) : (
                    <WalletMultiButton />
                )}
            </div>
        </div>
    );
};


const BidHistory = ({ history }) => (
    <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-6">
        <h3 className="font-bold text-white mb-4">Bid History ({history.length})</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img src={auction.image} alt={auction.name} className="w-full h-auto object-cover rounded-lg border border-zinc-800" />
                    </div>
                    <div className="space-y-8">
                        <AuctionInfo auction={auction} timeLeft={timeLeft} />
                        <BidHistory history={auction.bidHistory} />
                    </div>
                </div>
            </div>
        </div>
    );
}
