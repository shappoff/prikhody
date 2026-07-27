import type {ReactNode} from "react";
import type {Viewport} from "next";
import GAAnalytics from "@/components/shared/GAAnalytics";
import YandexMetrika from "@/components/shared/YandexMetrika";
import Prikhody from "@/components/featured/prikhody/Prikhody";
import {rootMetadata} from "@/lib/seo/metadata";

export const metadata = rootMetadata;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
        {
            !!process.env.DEBUG ? <></> : (
                <>
                    <GAAnalytics />
                    <YandexMetrika />
                </>
            )
        }
        <body>
        <>
            <Prikhody>
                {children}
            </Prikhody>
            <div id="slide-panel-info" />
        </>
        </body>
        </html>
    );
}
