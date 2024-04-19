import Link from "next/link";

export function HeaderLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link className="header-link p-1.5" href={href}>
      <div className={`p-0.5 text-base font-semibold ${className}`}>
        {label}
      </div>
      <div className="header-link-underline w-full px-2 h-0.5 bg-[var(--primaryColor)] bg-slate-500 transition-transform rounded-full" />
    </Link>
  );
}
