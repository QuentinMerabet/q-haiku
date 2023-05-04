import "./globals.css";

export const metadata = {
  title: "Haiku | Write a haiku, together.",
  description: "Drop a word, get an haiku inspired by the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
