import { Label, TextInput, type TextInputProps } from "flowbite-react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface MbTextInputProps<T extends FieldValues> extends TextInputProps {
  id: string;
  label?: string;
  errors?: FieldErrors<T>;
}
export function MbTextInput<T extends FieldValues>({
  id,
  label,
  errors,
  ...rest
}: MbTextInputProps<T>) {
  const elementError = errors && errors[id];
  return (
    <>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}

      <TextInput id={id} {...rest} color={elementError ? "failure" : "gray"} />
      {elementError && (
        <p className="text-sm text-red-600">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </>
  );
}
