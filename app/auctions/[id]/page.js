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
    { id: '1', name: 'Fox #7045', image: 'https://placehold.co/600x600/FFD6A5/4B2B0A?text=Fox', description: "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.", priceETH: 0.145, endTime: new Date().getTime() + 2 * 60 * 60 * 1000, leader: '0xAb...c1', bidHistory: [{bidder: '0xAb...c1', amount: '0.145 ETH'}, {bidder: '0xCd...e2', amount: '0.140 ETH'}], related: [2, 3] },
    { id: '2', name: 'SMB #2832', image: 'https://placehold.co/600x600/C2F7C2/1A4D1A?text=SMB', description: "A collection of pixelated monkeys with a penchant for business.", priceETH: 0.1545, endTime: new Date().getTime() + 1 * 60 * 60 * 1000, leader: 'NFTKing', bidHistory: [{bidder: 'NFTKing', amount: '0.1545 ETH'}], related: [1, 4] },
    { id: '3', name: '500 Bidcoin', image: 'https://placehold.co/600x600/FFC94A/854d0e?text=500', description: "A treasure chest overflowing with the platform's native currency.", priceETH: 0.1145, endTime: new Date().getTime() + 5 * 60 * 60 * 1000, leader: 'CryptoChad', bidHistory: [], related: [1, 2] },
    { id: '4', name: '#2578', image: 'https://placehold.co/600x600/FFB3B3/8A0000?text=2578', description: "A mysterious NFT from a forgotten collection, its origins unknown.", priceETH: 0.2245, endTime: new Date().getTime() + 12 * 60 * 60 * 1000, leader: 'ArtCollector', bidHistory: [], related: [2, 3] },
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

const RelatedAuctions = ({ relatedIds }) => {
    const relatedItems = mockAuctionsData.filter(auction => relatedIds.includes(parseInt(auction.id)));
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Related Auctions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedItems.map(item => (
                    <Link href={`/auctions/${item.id}`} key={item.id} className="block bg-[#18181B] border border-zinc-800 rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
                         <img src={item.image} alt={item.name} className="w-full h-40 object-cover"/>
                         <div className="p-4">
                            <h4 className="font-semibold text-white truncate">{item.name}</h4>
                            <div className="mt-3 w-full bg-blue-600 text-white text-center font-bold py-2 rounded-lg text-sm">View</div>
                         </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

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
                        <img src={auction.image} alt={auction.name} className="w-full h-auto object-cover rounded-lg border border-zinc-800 mb-8" />
                        <BidHistory history={auction.bidHistory} />
                        <RelatedAuctions relatedIds={auction.related} />
                    </div>
                    <div className="space-y-8">
                        <AuctionInfo auction={auction} timeLeft={timeLeft} />
                        <BidBotSetup />
                    </div>
                </div>
            </div>
        </div>
    );
}
