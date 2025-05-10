"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  Bolt,
  BookOpen,
  Check,
  ChevronsDown,
  ChevronsUp,
  CircleUserRound,
  Layers2,
  LogOut,
  Moon,
  Pin,
  Plus,
  Settings,
  Sun,
  UserCircle,
  UserPen,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useTheme } from "next-themes";
import { useState } from "react";

interface OrgDropdownProps {
  variants: {
    open: {
      x: number;
      opacity: number;
      transition: {
        x: {
          stiffness: number;
          velocity: number;
        };
      };
    };
    closed: {
      x: number;
      opacity: number;
      transition: {
        x: {
          stiffness: number;
        };
      };
    };
  };
  isCollapsed: boolean;
}
function OrgDropdown({ variants, isCollapsed }: OrgDropdownProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="w-full">
        <Button
          variant="ghost"
          size="sm"
          className="flex w-full items-center gap-2  px-2"
        >
          <Avatar className="w-5 h-5">
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <motion.li
            variants={variants}
            className="flex w-full items-center gap-2"
          >
            {!isCollapsed && (
              <>
                <p className="text-sm font-medium">Kelly Mahlangu</p>
                {isOpen ? (
                  <ChevronsUp className="ml-auto h-4 w-4 text-muted-foreground/50" />
                ) : (
                  <ChevronsDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                )}
              </>
            )}
          </motion.li>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <Avatar className="flex w-6 h-6 align-middle">
            {/* <AvatarImage
              src="https://originui.com/avatar.jpg"
              alt="Avatar"
            /> */}
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              Kelly Mahlangu
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              kellymahlangu01@gmail.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-light text-gray-400">
            Workspace's
          </DropdownMenuLabel>
          <DropdownMenuItem className="gap-2">
            {true ? (
              <Check className="w-4 h-4" />
            ) : (
              <Avatar className="w-4 h-4">
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
            )}

            <span className="truncate text-sm text-foreground">
              Kelly Mahlangu's Workspace
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="truncate text-gray-400 text-sm gap-2">
            <Plus className="w-4 h-5" />
            <span>New workspace</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}{" "}
            App Theme
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { OrgDropdown };
