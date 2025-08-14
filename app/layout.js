// app/layout.js
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// --- ICONS ---
const LogoIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">B</text></svg>);
const MoonIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>);

const Header = () => {
    const pathname = usePathname();
    const isDarkTheme = pathname.startsWith('/auctions');

    const headerClasses = isDarkTheme
        ? "sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-lg border-b border-zinc-800 text-white"
        : "sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 text-slate-900";

    return (
        <header className={headerClasses}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-3">
                            <LogoIcon />
                            <span className="font-bold text-lg">Bidcoin</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? (isDarkTheme ? 'text-white' : 'text-purple-600') : (isDarkTheme ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}>Home</Link>
                            <Link href="/auctions" className={`text-sm font-medium transition-colors ${pathname.startsWith('/auctions') ? (isDarkTheme ? 'text-white' : 'text-purple-600') : (isDarkTheme ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}>Auctions</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                         <button className={`p-2 rounded-full transition-colors ${isDarkTheme ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
                            <MoonIcon className="w-5 h-5" />
                        </button>
                        <button className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Header />
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
