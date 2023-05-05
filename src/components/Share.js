export default function Share({ haiku }) {
  const tweet = encodeURIComponent(haiku + "\n\n - by https://haiku.at");
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${tweet}`}
      target="_blank"
      rel="noreferrer noopener"
      className="share"
    >
      <img src="ico-link.svg" width={15} height={15} alt="Share on Twitter" />
    </a>
  );
}
