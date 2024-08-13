"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import CarLoading from "./carLoading/CarLoading";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <>
      {isPending ? (
        <div className="p-8">
        <CarLoading />  
        </div>
        
      ) : (
        <button {...props} type="submit" aria-disabled={pending}>
          {children}
        </button>
      )}
    </>
  );
}
