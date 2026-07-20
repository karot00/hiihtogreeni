import { Montserrat, Fira_Sans } from "next/font/google";

// Display and UI: Montserrat (variable font covers 600/700/800 used by the style book).
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Body and functional text: Fira Sans (not a variable font; load only required weights).
export const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-fira-sans",
});

export const fontVariables = `${montserrat.variable} ${firaSans.variable}`;
