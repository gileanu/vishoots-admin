import { Badge } from "@/components/ui/badge";
import React from "react";

type IsViewedProps = {
  isViewed: boolean;
};

const IsViewed: React.FC<IsViewedProps> = ({ isViewed }) => {
  const text = isViewed ? "New!" : "Viewed";
  const color = isViewed
    ? "bg-green-500 text-xs dark:text-white"
    : "bg-gray-200 text-xs text-slate-500";

  return <Badge className={`${color}`}>{text}</Badge>;
};

export default IsViewed;
