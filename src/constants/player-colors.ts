export const PLAYER_COLORS = [
  // Primary Colors
  "#FF0000", // Red
  "#00FF00", // Lime
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan

  // Secondary Colors
  "#FF8000", // Orange
  "#8000FF", // Purple
  "#00FF80", // Spring Green
  "#FF0080", // Rose
  "#80FF00", // Chartreuse
  "#0080FF", // Azure

  // Tertiary Colors
  "#FF4000", // Vermilion
  "#FF0040", // Raspberry
  "#4000FF", // Indigo
  "#00FF40", // Harlequin
  "#40FF00", // Lawn Green
  "#0040FF", // Cobalt
] as const;

export type PlayerColor = (typeof PLAYER_COLORS)[number];
