import "./globals.css";

export const metadata = {
  title: "Haiku",
  description: "Write an haiku, together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
