type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
};

export function Modal({ children, className, isOpen, setIsOpen }: ModalProps) {
  return (
    <div
      className={`fixed z-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000090] backdrop-blur-lg transition-transform cursor-pointer
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`w-fit max-w-[90vw] md:max-w-[50vw] h-fit max-h-[75dvh] p-6 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md overflow-y-scroll cursor-default
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
