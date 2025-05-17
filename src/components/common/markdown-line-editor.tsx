"use client";

import type React from "react";

import { useState, useRef, type KeyboardEvent } from "react";
import {
  ChevronDown,
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Code,
} from "lucide-react";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type BlockType =
  | "paragraph"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "bullet-list"
  | "numbered-list"
  | "code";

interface Block {
  id: string;
  type: BlockType;
  content: string;
  isFocused: boolean;
}

export const LineEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "heading-1", content: "Hi Im Kelly", isFocused: true },
  ]);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [activeBlockId, setActiveBlockId] = useState("1");
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [Editing, setEditing] = useState<Block>();

  // Generate a unique ID for new blocks
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Handle block focus
  const focusBlock = (id: string) => {
    setBlocks(
      blocks.map((block) => ({
        ...block,
        isFocused: block.id === id,
      }))
    );
    setActiveBlockId(id);
  };

  // Create a new block
  const createNewBlock = (afterId: string) => {
    const newId = generateId();
    const index = blocks.findIndex((block) => block.id === afterId);

    const newBlocks: Block[] = [
      ...blocks.slice(0, index + 1),
      { id: newId, type: "paragraph", content: "", isFocused: true },
      ...blocks
        .slice(index + 1)
        .map((block) => ({ ...block, isFocused: false })),
    ];

    setBlocks(newBlocks);
    setActiveBlockId(newId);

    // Focus the new block after render
    setTimeout(() => {
      if (blockRefs.current[newId]) {
        blockRefs.current[newId]?.focus();
      }
    }, 0);

    return newId;
  };

  // Delete a block
  const deleteBlock = (id: string) => {
    if (blocks.length === 1) {
      // Don't delete the last block, just clear it
      setBlocks([{ id, type: "paragraph", content: "", isFocused: true }]);
      return;
    }

    const index = blocks.findIndex((block) => block.id === id);
    const newBlocks = blocks.filter((block) => block.id !== id);

    // Focus the previous block or the next one if there's no previous
    const newFocusIndex = Math.max(0, index - 1);
    const newFocusId = newBlocks[newFocusIndex]?.id || "1";

    setBlocks(
      newBlocks.map((block) => ({
        ...block,
        isFocused: block.id === newFocusId,
      }))
    );

    setActiveBlockId(newFocusId);

    // Focus the block after render
    setTimeout(() => {
      if (blockRefs.current[newFocusId]) {
        blockRefs.current[newFocusId]?.focus();

        // Place cursor at the end of the text
        const selection = window.getSelection();
        const range = document.createRange();
        if (selection && blockRefs.current[newFocusId]?.firstChild) {
          range.selectNodeContents(blockRefs.current[newFocusId]!);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 0);
  };

  // Update block content
  const updateBlockContent = (id: string, content: string) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  // Change block type
  const changeBlockType = (id: string, type: BlockType) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, type } : block))
    );
    setCommandMenuOpen(false);
  };

  // Handle key down events
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, block: Block) => {
    // Handle Enter key to create a new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createNewBlock(block.id);
    }

    // Handle Backspace on empty block to delete it
    if (e.key === "Backspace" && block.content === "") {
      e.preventDefault();
      deleteBlock(block.id);
    }

    // Handle slash command
    if (e.key === "/" && block.content === "") {
      e.preventDefault();
      setCommandMenuOpen(true);

      // Position the command menu
      const rect = e.currentTarget.getBoundingClientRect();
      setCommandMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }

    // Close command menu on escape
    if (e.key === "Escape" && commandMenuOpen) {
      e.preventDefault();
      setCommandMenuOpen(false);
    }
  };

  // Render the appropriate block based on type
  const renderBlock = (block: Block) => {
    const commonProps = {
      ref: (el: HTMLDivElement) => (blockRefs.current[block.id] = el),
      className: cn(
        "outline-none py-1 px-2 min-h-[1.5em] w-full",
        block.isFocused && "bg-blue-50/50"
      ),
      contentEditable: true,
      suppressContentEditableWarning: true,
      onFocus: () => focusBlock(block.id),
      onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, block),
      onInput: (e: React.FormEvent<HTMLDivElement>) =>
        updateBlockContent(block.id, e.currentTarget.textContent || ""),
      "data-block-id": block.id,
    };

    switch (block.type) {
      case "heading-1":
        return (
          <h1
            className={cn(commonProps.className, "text-3xl font-bold")}
            onClick={}
          >
            {block.content}
          </h1>
        );
      case "heading-2":
        return (
          <h2 className={cn(commonProps.className, "text-2xl font-bold")}>
            {block.content}
          </h2>
        );
      case "heading-3":
        return (
          <h3 className={cn(commonProps.className, "text-xl font-bold")}>
            {block.content}
          </h3>
        );
      case "bullet-list":
        return (
          <div className="flex">
            <div className="mt-1.5 mr-2">•</div>
            <div className={cn(commonProps.className)}>{block.content}</div>
          </div>
        );
      case "numbered-list":
        const index =
          blocks
            .filter((b) => b.type === "numbered-list")
            .findIndex((b) => b.id === block.id) + 1;
        return (
          <div className="flex">
            <div className="mt-1.5 mr-2 min-w-[1.5em] text-right">{index}.</div>
            <div className={cn(commonProps.className)}>{block.content}</div>
          </div>
        );
      case "code":
        return (
          <div className="my-1 bg-gray-100 rounded">
            <pre
              className={cn(
                commonProps.className,
                "font-mono bg-gray-100 p-3 rounded"
              )}
            >
              {block.content}
            </pre>
          </div>
        );
      default:
        return <div className={cn(commonProps.className)}>{block.content}</div>;
    }
  };

  // Command menu options
  const commandOptions = [
    {
      label: "Text",
      icon: <span className="mr-2">📝</span>,
      action: () => changeBlockType(activeBlockId, "paragraph"),
    },
    {
      label: "Heading 1",
      icon: <span className="mr-2">H1</span>,
      action: () => changeBlockType(activeBlockId, "heading-1"),
    },
    {
      label: "Heading 2",
      icon: <span className="mr-2">H2</span>,
      action: () => changeBlockType(activeBlockId, "heading-2"),
    },
    {
      label: "Heading 3",
      icon: <span className="mr-2">H3</span>,
      action: () => changeBlockType(activeBlockId, "heading-3"),
    },
    {
      label: "Bullet List",
      icon: <List className="h-4 w-4 mr-2" />,
      action: () => changeBlockType(activeBlockId, "bullet-list"),
    },
    {
      label: "Numbered List",
      icon: <ListOrdered className="h-4 w-4 mr-2" />,
      action: () => changeBlockType(activeBlockId, "numbered-list"),
    },
    {
      label: "Code",
      icon: <Code className="h-4 w-4 mr-2" />,
      action: () => changeBlockType(activeBlockId, "code"),
    },
  ];

  return (
    <div className="p-4 min-h-[300px]">
      {/* Toolbar */}
      <div className="flex items-center mb-4 p-1 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded px-2 py-1">
            <span>Format</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "paragraph")}
            >
              <span className="mr-2">📝</span> Text
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "heading-1")}
            >
              <span className="mr-2">H1</span> Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "heading-2")}
            >
              <span className="mr-2">H2</span> Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "heading-3")}
            >
              <span className="mr-2">H3</span> Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "bullet-list")}
            >
              <List className="h-4 w-4 mr-2" /> Bullet List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "numbered-list")}
            >
              <ListOrdered className="h-4 w-4 mr-2" /> Numbered List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeBlockType(activeBlockId, "code")}
            >
              <Code className="h-4 w-4 mr-2" /> Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex space-x-1 ml-2">
          <button className="p-1 rounded hover:bg-gray-100" title="Bold">
            <Bold className="h-4 w-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100" title="Italic">
            <Italic className="h-4 w-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-100" title="Image">
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Blocks */}
      <div className="space-y-1">
        {blocks.map((block) => (
          <div key={block.id} className="relative group">
            {renderBlock(block)}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Command Menu */}
      {commandMenuOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-md border border-gray-200 z-10 w-64"
          style={{
            top: commandMenuPosition.top,
            left: commandMenuPosition.left,
          }}
        >
          <div className="p-2 text-sm text-gray-500 border-b">Basic blocks</div>
          <div className="py-1">
            {commandOptions.map((option, index) => (
              <button
                key={index}
                className="flex items-center w-full px-3 py-1.5 text-left hover:bg-gray-100"
                onClick={option.action}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
