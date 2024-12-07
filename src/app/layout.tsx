import Authprovider from "@/context/Authprovider";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Authprovider>
          {children}
        </Authprovider>
      </body>
    </html>
  );
}
