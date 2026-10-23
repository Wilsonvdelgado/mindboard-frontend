import { Button, Spinner, type ButtonProps } from "flowbite-react";
import type React from "react";

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export function MbButton({
  loading,
  children,
  disabled = false,
  onClick,
  ...rest
}: PrimaryButtonProps) {
  function handelClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur();
    onClick?.(event);
  }

  const isButtonDisabled = loading ?? disabled;

  return (
    <Button
      onClick={handelClick}
      disabled={isButtonDisabled}
      className="disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-60 "
      {...rest}
    >
      {loading && (
        <Spinner
          size="sm"
          aria-label="Info spinner example"
          className="me-3 flex items-center"
          light
        />
      )}
      {children}
    </Button>
  );
}
