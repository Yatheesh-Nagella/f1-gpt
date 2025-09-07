import type { Metadata } from 'next';
import "./global.css";

export const metadata: Metadata = {
    title: "F1 GPT",
    description: "F1 GPT - Your Formula 1 AI Assistant",
};

const RootLayout = ({ 
    children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
};

export default RootLayout;