/** Renders `text`, setting the first occurrence of `accent` in the gold accent colour. */
export default function Accent({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-warm">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
