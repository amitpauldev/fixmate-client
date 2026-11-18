"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		subscribeToClient,
		getClientSnapshot,
		getServerSnapshot,
	);

	if (!mounted) {
		return (
			<button
				type="button"
				aria-label="Toggle theme"
				className="size-10 rounded-full border border-border"
			/>
		);
	}

	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
			className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
		>
			{isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
		</button>
	);
}
