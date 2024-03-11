export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/_/g, "-") // Replace underscores with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-") // Replace multiple dashes with a single dash
    .replace(/^-+/, "") // Trim dashes from the beginning of the string
    .replace(/-+$/, ""); // Trim dashes from the end of the string
}
