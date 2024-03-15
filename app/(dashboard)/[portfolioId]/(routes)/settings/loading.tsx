"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="p-10">Loading Settings...</h1>
      <Loader />
    </div>
  );
};

export default Loading;
