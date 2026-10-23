import { useEffect, useState } from "react";
import { Label, Radio } from "flowbite-react";
import { COLORS, getCardColor } from "../lib/utils";

interface IProps {
  initialColor?: string;
  onChange: (value: string) => void;
}

export function ColorSelect({
  initialColor = COLORS[0].label,
  onChange,
}: IProps) {
  const [selected, setSelected] = useState<string>(initialColor);

  function handleOnChange(value: string) {
    setSelected(value);
    onChange(value);
  }

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {COLORS.map((item) => (
        <div
          key={item.value}
          className="flex items-center gap-0.5"
          onClick={() => handleOnChange(item.label)}
        >
          <Radio
            id={item.label}
            name="colors"
            value="USA"
            checked={item.label === selected}
            onChange={(event) => handleOnChange(event.target.value)}
          />
          <Label htmlFor={item.label}></Label>
          <div
            className={`h-6 flex-1 rounded-md border border-gray-300 ${getCardColor(item.label)}`}
          ></div>
        </div>
      ))}
    </div>
  );
}
