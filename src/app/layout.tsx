import "./globals.css";
import localFont from 'next/font/local'
import { ReactNode } from "react";

const peyda = localFont({
    src: [
        { path: '../fonts/PeydaWeb-Regular.woff2', weight: '400', style: 'normal' },
        { path: '../fonts/PeydaWeb-Bold.woff2', weight: '700', style: 'bold' },
    ],
    variable: '--font-peyda',
    display: 'swap',
});

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html dir="rtl">
        <body className={`${peyda.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
