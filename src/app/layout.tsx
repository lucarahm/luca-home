import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from "@/components/Header";
import StickyFooter from "@/components/StickyFooter";

export const metadata = {
    title: 'Luca Home',
    description: 'Lucas home page',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeRegistry>
            <Header/>
            {children}
            <StickyFooter/>
        </ThemeRegistry>
        </body>
        </html>
    );
}
