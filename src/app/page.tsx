"use client";

import Hero from "~/components/landing/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero
        title={"Your Modular Workspace, Built by Devs for Everyone."}
        description={
          "An open-source, privacy-first Notion alternative. Customizable, local-first, and extendable."
        }
        mockupImage={{
          alt: "AI Platform Dashboard",
          width: 1248,
          height: 765,
          src: "https://www.launchuicomponents.com/app-light.png",
        }}
      />
    </main>
  );
}
