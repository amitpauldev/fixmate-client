import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const jakarta = Plus_Jakarta_Sans({
	variable: "--font-jakarta",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "FixMate",
	description:
		"FixMate is a platform that connects users with skilled professionals for various services, making it easy to find and hire experts for your needs.",
	icons: {
		icon: "/images/logo.png",
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jakarta.variable} antialiased`}>
				<ThemeProvider>
					{children}
					<Toaster
						position="top-right"
						toastOptions={{
							duration: 4000,
							style: {
								background: "var(--card)",
								color: "var(--card-foreground)",
								border: "1px solid var(--border)",
							},
							success: {
								iconTheme: {
									primary: "var(--secondary)",
									secondary: "var(--primary-foreground)",
								},
							},
							error: {
								iconTheme: {
									primary: "var(--destructive)",
									secondary: "var(--primary-foreground)",
								},
							},
						}}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
