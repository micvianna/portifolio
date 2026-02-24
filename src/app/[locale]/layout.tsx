import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';
import '../components.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
    weight: ['400', '500'],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });

    return {
        title: t('title'),
        description: t('description'),
        icons: { icon: '/favicon.ico' },
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale === 'pt-br' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
