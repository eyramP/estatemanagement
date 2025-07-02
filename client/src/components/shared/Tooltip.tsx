import React from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, content, position = "bottom" }: TooltipProps) {
    const positionClasses: {[key: string]: string} = {
        top: "bottom-full mt-2",
        bottom: "top-full mb-2",
        left: "right-full ml-2",
        right: "left-full mr-2",
    };

  return (
    <div className="group relative flex items-center">
      {children}
      <div className={`${positionClasses[position]} dark:bg-electricIndigo absolute hidden w-max rounded-md  bg-black p-2 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100`}>
        {content}
      </div>
    </div>
  )
}