import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";

interface DropdownMenuItem {
  label: string;
  icon?: IconSvgElement;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger?: ReactNode;
  align?: "left" | "right" | "auto";
}

interface Position {
  horizontal: "left" | "right";
  vertical: "top" | "bottom";
}

export function DropdownMenu({
  items,
  trigger,
  align = "auto",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    horizontal: "right",
    vertical: "bottom",
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 192; // w-48 = 12rem = 192px
    const menuHeight = items.length * 44 + 8; // Approximate height based on items
    const padding = 8;

    // Space available on each side
    const spaceRight = window.innerWidth - triggerRect.left; // Space from left edge of trigger to right edge of viewport
    const spaceLeft = triggerRect.right; // Space from right edge of trigger to left edge of viewport
    const spaceBottom = window.innerHeight - triggerRect.bottom;
    const spaceTop = triggerRect.top;

    let horizontal: "left" | "right" = "right";
    let vertical: "top" | "bottom" = "bottom";

    // Determine horizontal position
    // "right" means menu aligns its right edge to trigger's right edge (opens left)
    // "left" means menu aligns its left edge to trigger's left edge (opens right)
    if (align === "auto") {
      // Default to aligning right edge (menu opens to the left of trigger)
      // Only align left edge if there's not enough space on the left but enough on the right
      if (spaceLeft < menuWidth + padding && spaceRight >= menuWidth + padding) {
        horizontal = "left";
      }
    } else if (align === "left") {
      horizontal = "left";
    }

    // Determine vertical position
    if (spaceBottom < menuHeight + padding && spaceTop > menuHeight + padding) {
      vertical = "top";
    }

    setPosition({ horizontal, vertical });
  }, [align, items.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition]);

  const handleToggle = () => {
    if (!isOpen) {
      calculatePosition();
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  // Group items by separators (before danger items)
  const groupedItems: (DropdownMenuItem | "separator")[] = [];
  let hasAddedSeparator = false;

  items.forEach((item, index) => {
    if (item.variant === "danger" && !hasAddedSeparator && index > 0) {
      groupedItems.push("separator");
      hasAddedSeparator = true;
    }
    groupedItems.push(item);
  });

  const getPositionClasses = () => {
    const classes: string[] = ["absolute", "min-w-48", "z-20"];

    if (position.vertical === "bottom") {
      classes.push("top-full", "mt-1");
    } else {
      classes.push("bottom-full", "mb-1");
    }

    if (position.horizontal === "right") {
      classes.push("right-0");
    } else {
      classes.push("left-0");
    }

    return classes.join(" ");
  };

  const getAnimationProps = () => {
    const yOffset = position.vertical === "bottom" ? -4 : 4;
    return {
      initial: { opacity: 0, scale: 0.95, y: yOffset },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: yOffset },
    };
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
      >
        {trigger || (
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            className="w-5 h-5 text-gray-500"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            {...getAnimationProps()}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`${getPositionClasses()} bg-white rounded-xl shadow-lg border border-gray-100 py-1`}
          >
            {groupedItems.map((item, index) =>
              item === "separator" ? (
                <hr key={`sep-${index}`} className="my-1 border-gray-100" />
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item.onClick)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                    item.variant === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.icon && (
                    <HugeiconsIcon icon={item.icon} className="w-4 h-4" />
                  )}
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
