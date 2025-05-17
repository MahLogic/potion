import { clsx, type ClassValue } from "clsx";
import type { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { createRoot } from "react-dom/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function jsxToString(element: JSX.Element): Promise<string> {
  const container = document.createElement("div");
  const root = createRoot(container);

  root.render(element);

  return new Promise<string>((resolve) => {
    // Wait for the render to finish
    setTimeout(() => {
      resolve(container.innerHTML);
      root.unmount(); // Clean up
    }, 0);
  });
}
