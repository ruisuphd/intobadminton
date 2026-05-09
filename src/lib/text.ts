/**
 * Convert snake_case enum values into space-separated lowercase prose.
 * Used to display fields like `head_light` or `extra_stiff` to humans.
 */
export function humanize(s: string): string {
  return s.replace(/_/g, " ");
}
