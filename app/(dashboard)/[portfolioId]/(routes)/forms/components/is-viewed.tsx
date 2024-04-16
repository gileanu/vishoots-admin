import { Badge } from "@/components/ui/badge";
import React from "react";

type IsViewedProps = {
  isViewed: boolean;
};

const IsViewed: React.FC<IsViewedProps> = ({ isViewed }) => {
  const text = isViewed ? "New!" : "Viewed";
  const color = isViewed
    ? "bg-green-500 text-xs font-bold dark:text-white px-5"
    : "bg-gray-200 text-xs font-bold text-slate-500 px-5";

  return <span className={`${color} p-1 rounded-md`}>{text}</span>;
};

export default IsViewed;
