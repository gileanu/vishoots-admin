import { Badge } from "@/components/ui/badge";
import React from "react";

type IsFeaturedProps = {
  isFeatured: boolean;
};

const IsFeatured: React.FC<IsFeaturedProps> = ({ isFeatured }) => {
  const text = isFeatured ? "Yes" : "No";
  const color = isFeatured
    ? "bg-green-500 text-xs font-bold dark:text-white px-5"
    : "bg-gray-200 text-xs font-bold text-slate-500 px-5";

  return <span className={`${color} p-1 rounded-md`}>{text}</span>;
};

export default IsFeatured;
