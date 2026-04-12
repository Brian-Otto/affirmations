interface FooterIconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  ariaLabel: string;
  className?: string;
}

function FooterIconButton({
  onClick,
  icon,
  ariaLabel,
  className = "",
}: FooterIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-ctp-crust h-10 w-10 flex justify-center items-center rounded-full p-1 cursor-pointer text-ctp-subtext0 hover:text-ctp-text ${className}`}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

export default FooterIconButton;
