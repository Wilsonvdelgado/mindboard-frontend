interface MbTableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "delete";
  confirmAction?: boolean;
  children: React.ReactNode;
}
export function MbTableButton({
  variant = "default",
  children,
  ...props
}: MbTableButtonProps) {
  const customStyles =
    variant === "delete"
      ? "text-red-600  hover:underline"
      : "text-primary-600 hover:underline";

  return (
    <>
      <button
        type="button"
        className={`text-heading ${customStyles} box-border border border-transparent font-medium leading-5 rounded-full text-sm  py-2.5 focus:outline-none`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
