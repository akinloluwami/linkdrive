import classNames from "classnames";
import { AnimatePresence, motion } from "motion/react";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ children, errorMessage, ...props }) => {
  return (
    <div className="">
      <input
        {...props}
        className={classNames(
          "text-accent font-medium bg-white border-gray-100 outline-0 rounded-2xl py-3 w-full px-3 placeholder:text-accent/50 border-2 focus:border-accent",
          props.className
        )}
      />
      <AnimatePresence>
        {errorMessage && (
          <motion.p
            className="text-sm text-red-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 24 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
