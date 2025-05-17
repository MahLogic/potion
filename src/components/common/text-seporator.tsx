"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

interface TextSeparatorProps {
  text: string;
  buttonText: string;
  onClick?: () => void;
  isCollapsed: boolean;
}

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

export function TextSeparator({
  text,
  buttonText,
  onClick,
  isCollapsed,
}: TextSeparatorProps) {
  return (
    <div className={`relative flex items-center w-full py-5`}>
      <Separator className="absolute full" />
      {!isCollapsed && (
        <>
          <div className="absolute left-1 bg-sidebar text-xs text-sidebar-accent-foreground">
            Private
          </div>
          <div className="absolute right-1 bg-sidebar">
            <PlusIcon
              onClick={() => alert("Clicked")}
              className="w-4 h-4 hover:cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
}
