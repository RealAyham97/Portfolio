/**
 * Renders a JSON-LD block. Centralised so the dangerouslySetInnerHTML escape
 * hatch — and its lint suppression — lives in exactly one place rather than
 * being repeated in every route that ships structured data.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
