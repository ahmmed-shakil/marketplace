import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-md border border-[#ced0d4] bg-white px-3 py-2 text-[15px] text-[#050505] placeholder:text-[#65676b] outline-none transition-all focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(inputClass, className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(inputClass, "min-h-[80px]", className)} {...props} />
);
Textarea.displayName = "Textarea";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputClass, className)} {...props}>
      {children}
    </select>
  );
}
