import classNames from "classnames";
import { AnimatePresence, motion } from "motion/react";
import React, { InputHTMLAttributes, useState } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  errorMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="">
      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={classNames(
            "text-accent font-medium bg-white border-gray-100 outline-0 rounded-2xl py-3 w-full px-3 placeholder:text-accent/50 border-2 focus:border-accent",
            props.className
          )}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
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

export default PasswordInput;
