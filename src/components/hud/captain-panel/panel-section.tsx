import { StarcraftButton } from "@/components/ui/starcraft-button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type PanelSectionProps = PropsWithChildren;
function PanelSection({ children }: PanelSectionProps) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-cyan-500/20 bg-black/60">
      {children}
    </div>
  )
}

type SectionTitleProps = { text: string }
function SectionTitle({ text }: SectionTitleProps) {
  return (
    <h3 className="text-lg font-starcraft tracking-wider text-cyan-300 uppercase">{text}</h3>
  )
}

type SectionSubtitleProps = {
  className?: string,
  text: string,
}
function SectionSubtitle({ className, text }: SectionSubtitleProps) {
  return (
    <p className={cn("text-cyan-400/80 font-starcraft tracking-wider uppercase", className)}>
      {text}
    </p>
  )
}

type SectionDescriptionProps = { text: string }
function SectionDescription({ text }: SectionDescriptionProps) {
  return (
    <p className="text-sm text-cyan-500/60 font-starcraft tracking-wider uppercase">
      {text}
    </p>
  )
}

type SectionPlaceholderProps = { text: string }
function SectionPlaceholder({ text }: SectionPlaceholderProps) {
  return (
    <p className="text-sm text-cyan-500/60 font-starcraft tracking-wider uppercase">
      {text}
    </p>
  )
}

type SectionButtonProps = {
  className?: string,
  disabled?: boolean,
  variant?: "primary" | "secondary",
  text: string,
  onClick: () => void,
}
function SectionButton({ className, disabled, text, variant = "secondary", onClick }: SectionButtonProps) {
  return (
    <StarcraftButton
      size={variant === "primary" ? "lg" : "sm"}
      disabled={!!disabled}
      variant={variant}
      onClick={onClick}
      className={cn("mt-2", className)}
    >
      {text}
    </StarcraftButton>
  )
}

PanelSection.Title = SectionTitle;
PanelSection.Subtitle = SectionSubtitle;
PanelSection.Placeholder = SectionPlaceholder;
PanelSection.Description = SectionDescription;
PanelSection.Button = SectionButton;
export { PanelSection }