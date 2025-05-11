"use client";

import PageEditor from "~/components/app/page-editor";
import { SessionNavBar } from "~/components/ui/sidebar";

function page() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <SessionNavBar />
      <main className="flex h-screen grow justify-center overflow-auto pt-5">
        <PageEditor />
      </main>
    </div>
  );
}

export default page;
