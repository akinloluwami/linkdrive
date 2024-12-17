import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EllipsisVertical } from "lucide-react";

interface Option {
  action: () => void;
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

interface MoreOptionsProps {
  options: Option[];
}

const Options = ({ options }: MoreOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full focus:outline-none"
      >
        <EllipsisVertical size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer px-2 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 font-medium ${
                  option.className || ""
                }`}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
              >
                {option.icon && <span>{option.icon}</span>}
                <span>{option.text}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Options;
