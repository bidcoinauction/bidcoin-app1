// app/auctions/profile/page.js
'use client';
import React, { useState } from 'react';

// --- MOCK DATA ---
const mockActiveBids = [
    { id: 1, name: 'Fox #7045', myBid: '0.145 ETH', timeLeft: '01:23:45' },
    { id: 8, name: 'CloneX #5432', myBid: '5.9 ETH', timeLeft: '03:12:10' },
];
const mockPastBids = [
    { id: 2, name: 'SMB #2832', result: 'Won', finalPrice: '0.1545 ETH' },
    { id: 4, name: '#2578', result: 'Outbid', finalPrice: '0.2300 ETH' },
];

// --- PROFILE PAGE COMPONENTS ---
const TabButton = ({ label, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(label)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === label
                ? 'bg-blue-600 text-white'
                : 'text-zinc-300 hover:bg-zinc-800'
        }`}
    >
        {label}
    </button>
);

const getResultBadgeClass = (result) => {
    const styles = {
        Won: 'bg-green-500/20 text-green-400',
        Outbid: 'bg-red-500/20 text-red-400',
    };
    return `px-3 py-1 text-xs font-semibold rounded-full ${styles[result] || 'bg-zinc-500/20 text-zinc-400'}`;
};

const MyBidsTab = () => (
    <div>
        <h3 className="text-xl font-bold text-white mb-4">Active Bids</h3>
        <div className="space-y-3">
            {mockActiveBids.map(bid => (
                <div key={bid.id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-white">{bid.name}</p>
                        <p className="text-sm text-zinc-400">Your Bid: {bid.myBid}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-zinc-400">Time Left</p>
                        <p className="font-mono text-white">{bid.timeLeft}</p>
                    </div>
                </div>
            ))}
        </div>
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Past Bids</h3>
        <div className="space-y-3">
            {mockPastBids.map(bid => (
                <div key={bid.id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-white">{bid.name}</p>
                        <p className="text-sm text-zinc-400">Final Price: {bid.finalPrice}</p>
                    </div>
                    <span className={getResultBadgeClass(bid.result)}>
                        {bid.result}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const RewardsTab = () => (
    <div>
        <h3 className="text-xl font-bold text-white mb-4">Rewards & Achievements</h3>
        <div className="bg-zinc-800 p-6 rounded-lg text-center">
            <p className="text-zinc-400">Rewards program coming soon!</p>
            <p className="text-sm text-zinc-500 mt-2">Earn free bids, raffle entries, and other perks by participating in auctions.</p>
        </div>
    </div>
);

const SettingsTab = () => (
    <div>
        <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Username</label>
                <input type="text" defaultValue="NFTKing" className="w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Email for Notifications</label>
                <input type="email" placeholder="you@example.com" className="w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Save Changes
            </button>
        </div>
    </div>
);


export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('My Bids');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Rewards':
                return <RewardsTab />;
            case 'Settings':
                return <SettingsTab />;
            case 'My Bids':
            default:
                return <MyBidsTab />;
        }
    };

    return (
        <div className="bg-[#121212] text-white -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 p-8 min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar for Tabs */}
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-[#18181B] border border-zinc-800 rounded-lg p-4 flex flex-col space-y-2">
                            <TabButton label="My Bids" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton label="Rewards" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-[#18181B] border border-zinc-800 rounded-lg p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
