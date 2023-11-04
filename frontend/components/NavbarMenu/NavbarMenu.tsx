import React from 'react';
import Link from "next/link";
import ToggleTheme from "@/components/ToggleTheme";

const NavbarMenu = () => {
    const pages = [
        {text: 'Home', href: '/'},
        {text: 'Strava', href: '/strava'},
        {text: 'Plants', href: '/plants'},
    ];

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {pages.map(page => <li id={page.text}>
                            <Link href={page.href}>{page.text}</Link>
                        </li>)}

                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    <img width='150px' src={"logo.png"} alt="LucaHome"/>
                </Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {pages.map(page => <li key={page.text}>
                        <Link href={page.href}>{page.text}</Link>
                    </li>)}
                </ul>
            </div>
            <div className="navbar-end pr-2">
                <ToggleTheme/>
            </div>
        </div>
    );
};

export default NavbarMenu;