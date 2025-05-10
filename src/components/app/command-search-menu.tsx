"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { variants } from "../ui/sidebar";

interface CommandSearchMenuProps {
  isCollapsed: boolean;
}
const CommandSearchMenu = ({ isCollapsed }: CommandSearchMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "flex h-8 w-full flex-row rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary hover:cursor"
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4" />{" "}
        <motion.li variants={variants}>
          {!isCollapsed && <p className="ml-2 text-sm font-medium">Search</p>}
        </motion.li>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>Ask AI</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Past 30 days">
            <CommandItem>Ask AI</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandSearchMenu;
