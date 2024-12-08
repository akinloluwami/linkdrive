import classNames from "classnames";
import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "text-white bg-accent rounded-2xl py-3 w-full hover:bg-accent/90 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed",
        props.className
      )}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
