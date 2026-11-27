import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "quiet";
type ButtonSize = "xs" | "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-[2px] font-sans font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-40";

const sizes: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-[11px]",
  sm: "h-7 px-2.5 text-[12px]",
  md: "h-8 px-3 text-[12.5px]",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-pine text-paper hover:bg-pine-deep shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
  outline:
    "border border-rule bg-paper-raise text-ink-soft hover:border-rule-strong hover:text-ink",
  ghost: "text-ink-soft hover:bg-ink/6 hover:text-ink",
  quiet: "text-ink-mute hover:text-ink",
};

interface CommonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  /** Renders a link when provided; disabled links render as inert text. */
  href?: string;
  disabled?: boolean;
  title?: string;
}

type ButtonProps = CommonProps & {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function BrandButton({
  children,
  variant = "outline",
  size = "md",
  icon,
  iconRight,
  className,
  href,
  disabled = false,
  title,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {icon && <Icon name={icon} size={size === "xs" ? 12 : 13} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "xs" ? 12 : 13} />}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} title={title} className={classes}>
        {content}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span className={cn(classes, "pointer-events-none opacity-40")} aria-disabled="true" title={title}>
        {content}
      </span>
    );
  }

  return (
    <button type={type} title={title} disabled={disabled} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
