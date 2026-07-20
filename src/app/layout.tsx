import type {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import GAAnalytics from "@/components/shared/GAAnalytics";
import YandexMetrika from "@/components/shared/YandexMetrika";
import Prikhody from "@/components/featured/prikhody/Prikhody";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'shappoff',
  verification: {
    google: "WcZLxrvNHupEwOXBZ_xza8RMaDFrJ_7Nc_Ax_vyo0zw",
    yandex: "cd605c554612fb41"
  },
  other: {
    robots: "index, follow",
    charset: "UTF-8",
  },
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
