import "./global.css"

export const metadata = {
    title: "F1 GPT",
    description: "F1 GPT - Your Formula 1 AI Assistant",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

export default RootLayout