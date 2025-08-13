

'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; 

const Nav = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const links = [
        { id: 1, title: 'Gallery', url: '/' },
        { id: 2, title: 'Contact', url: '/' },
        { id: 3, title: 'Team', url: '/' },
        { id: 4, title: 'About', url: '/' },
    ]; 
    return (
        <nav
            style={{ fontFamily: 'cursive' }}
            className="flex justify-between items-center w-full px-8 py-5 shadow-md fixed top-0 left-0 z-50 bg-white"
        >
     
            <div className="flex-1">
                <Link href="/"> 
                    <h1 className="font-bold text-md md:text-2xl">ZIT</h1>
                </Link>
            </div>  

  
            <div className="hidden md:flex justify-center flex-1 gap-6">
                {links.map(link => (
                    <Link
                        className="text-gray-900 hover:text-green-500 transition font-semibold"
                        href={link.url}
                        key={link.id}
                    >
                        {link.title}
                    </Link>

                ))}
            </div>

    
            <div className="flex-1 flex justify-end relative">
                <button
                    onClick={() => setShowDropdown(prev => !prev)}
                    className="flex items-center gap-2 font-semibold py-2 px-6 rounded-md bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Login
                    <ChevronDown className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} size={18} />
                </button>
                
                {showDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white border rounded-md shadow-lg z-50 animate-fade-in">
                        <Link
                            href="/adminLogin"
                            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        >
                            Admin Login
                        </Link>
                        <Link
                            href="/studentLogin"
                            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        >
                            Student Login
                        </Link>
                        <Link
                            href="/teacherLogin"
                            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        >
                            Teacher Login
                        </Link>
                        <Link
                            href="/parentsLogin"
                            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        >
                            Parent Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
