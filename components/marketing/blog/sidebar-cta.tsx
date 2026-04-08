import Link from "next/link";

type SidebarCtaProps = {
  heading?: string;
  description?: string;
  primaryLink?: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
};

export function SidebarCta({
  heading = "Transform Your Production Schedule",
  description = "RMDB delivers finite capacity scheduling with a one-time license and 5-day implementation. Trusted by GE, US Navy, and BAE Systems.",
  primaryLink = "/contact-us",
  primaryLabel = "Schedule a Free Demo",
  secondaryLink = "/product-downloads",
  secondaryLabel = "Download Free Trial",
}: SidebarCtaProps) {
  return (
    <aside className="rounded-lg border border-cyan-100 bg-gradient-to-b from-cyan-50 to-white p-5">
      <h3 className="text-lg font-bold text-slate-900">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-4 space-y-2.5">
        <Link
          href={primaryLink}
          className="block w-full rounded-lg bg-cyan-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryLink}
          className="block w-full text-center text-sm font-medium text-cyan-600 underline transition-colors hover:text-cyan-700"
        >
          {secondaryLabel}
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Trusted for 35+ years in manufacturing
      </p>
    </aside>
  );
}
