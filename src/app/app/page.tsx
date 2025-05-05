"use client";

import { SessionNavBar } from "~/components/ui/sidebar";

function page() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto"></main>
    </div>
  );
}

export default page;
