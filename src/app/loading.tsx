import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderIcon className="size-8 animate-spin" />
    </div>
  );
};

export default Loading;
