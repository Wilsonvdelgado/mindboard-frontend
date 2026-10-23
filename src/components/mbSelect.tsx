import { Label, Select, type SelectProps } from "flowbite-react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface MbSelectProps<T extends FieldValues> extends SelectProps {
  id: string;
  label: string;
  errors: FieldErrors<T>;
  dataSource?: { value: string; label: string }[];
}
export function MbSelect<T extends FieldValues>({
  id,
  label,
  errors,
  dataSource,
  ...rest
}: MbSelectProps<T>) {
  return (
    <>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}

      <Select
        id={id}
        {...rest}
        required
        color={errors[id] ? "failure" : "gray"}
      >
        {dataSource?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>

      {errors[id] && (
        <p className="text-sm text-red-600">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </>
  );
}
