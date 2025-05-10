"use client";

import { cn } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import {
  Blocks,
  BookDashedIcon,
  CalendarDaysIcon,
  ChevronsDown,
  ChevronsUpDown,
  CircleHelpIcon,
  FileClock,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  HomeIcon,
  Layout,
  LayoutDashboard,
  LogOut,
  MailboxIcon,
  MessageSquareText,
  MessagesSquare,
  Plus,
  PlusIcon,
  ScrollTextIcon,
  SearchIcon,
  Send,
  Settings,
  UserCircle,
  UserCog,
  UserPlusIcon,
  UserSearch,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { OrgDropdown } from "../app/org-dropdown";
import { TextSeparator } from "../common/text-seporator";
import CommandSearchMenu from "../app/command-search-menu";

const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

export const variants = {
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

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  return (
    <motion.div
      className={cn(
        "sidebar left-0 z-40 h-full shrink-0 border-r fixed bg-sidebar"
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0  border-b p-2">
              <div className=" mt-[1.5px] flex w-full">
                <OrgDropdown variants={variants} isCollapsed={isCollapsed} />
              </div>
            </div>

            <div className=" flex h-full w-full flex-col">
              <div className="flex grow flex-col">
                <div className="p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <CommandSearchMenu isCollapsed={isCollapsed} />
                    <Link
                      href="#"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",

                        pathname?.includes("reports") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <FlaskConical className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <div className="flex items-center gap-2">
                            <p className="ml-2 text-sm font-medium">
                              AI Potion
                            </p>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                    <Link
                      href="#"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",

                        pathname?.includes("reports") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <HomeIcon className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <div className="flex items-center gap-2">
                            <p className="ml-2 text-sm font-medium">Home</p>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                  </div>
                </div>
                <TextSeparator
                  isCollapsed={isCollapsed}
                  text={"Private"}
                  buttonText={"New"}
                />
                <ScrollArea className="grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <Link
                      href="#"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary",
                        pathname?.includes("dashboard") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <ScrollTextIcon className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">
                            Client List
                          </p>
                        )}
                      </motion.li>
                    </Link>
                  </div>
                </ScrollArea>
                <Separator className="w-full" />
                <div className="p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <Link
                      href="#"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary",
                        pathname?.includes("dashboard") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <BookDashedIcon className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Templates</p>
                        )}
                      </motion.li>
                    </Link>
                    <Link
                      href="#"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",

                        pathname?.includes("reports") &&
                          "bg-muted text-blue-600"
                      )}
                    >
                      <UserPlusIcon className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <div className="flex items-center gap-2">
                            <p className="ml-2 text-sm font-medium">
                              Invite members
                            </p>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1.5 w-full max-w-md mx-auto">
                    <motion.div variants={variants}>
                      {!isCollapsed && (
                        <div className="flex gap-4" aria-readonly>
                          <Link href="#">
                            <MailboxIcon className="h-4 w-4" />
                          </Link>
                          <Link href="#">
                            <Send className="h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                    <HelpCircle className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
