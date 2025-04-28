import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  disabled?: boolean;
  isRounded?: boolean;
  children: React.ReactNode;
};

const CustomButton: React.FC<Props> = ({
  disabled,
  isRounded,
  children,
}: Props) => {
  return (
    // <button
    //   className={`text-sm ${disabled ? "bg-gray-300" : "bg-blue-300"} ${
    //     isRounded && "rounded-full"
    //   } `}
    // >
    //   {children}
    // </button>

    <button
      className={cn(
        "text-sm px-8 py-4",
        disabled ? "bg-gray-300" : "bg-blue-300",
        isRounded && "rounded-full"
      )}
    >
      {children}
    </button>
  );
};

export default CustomButton;
