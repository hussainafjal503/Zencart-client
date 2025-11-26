import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";

function LoadingButton({
  type,
  text,
  loading,
  className,
  onClickHandler = null,
  ...props
}) {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={onClickHandler}
      className={cn("", className)}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      <p className="font-bold ">{text}</p>
    </Button>
  );
}

export default LoadingButton;
