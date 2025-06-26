interface SvgTypes {
  path: string;
  width: string;
  height: string;
}

export default function SvgIcons({ path, height, width }: SvgTypes) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox="0 -960 960 960"
        width={width}
        fill="#e8eaed"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </>
  );
}
