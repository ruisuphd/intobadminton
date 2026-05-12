export function serialiseJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
