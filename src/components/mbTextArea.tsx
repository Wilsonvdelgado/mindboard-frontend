import { Label, Textarea, type TextareaProps } from "flowbite-react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface MbTextInputProps<T extends FieldValues> extends TextareaProps {
  id: string;
  label: string;
  errors: FieldErrors<T>;
}
export function MbTextArea<T extends FieldValues>({
  id,
  label,
  errors,
  ...rest
}: MbTextInputProps<T>) {
  return (
    <>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <Textarea
        id={id}
        {...rest}
        color={errors[id] ? "failure" : "gray"}
        rows={4}
      />
      {errors[id] && (
        <p className="text-sm text-red-600">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </>
  );
}
