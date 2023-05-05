export default function Share({ haiku }) {
  const tweet = encodeURIComponent(haiku);
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${tweet}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      Share
    </a>
  );
}
