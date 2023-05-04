"use client";

import { useSpring, a, config } from "@react-spring/web";

export default function Footer() {
  const spring = useSpring({
    from: {
      transform: "translateY(30px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0px)",
      opacity: 1,
    },
    config: config.molasses,
    delay: 3000,
  });

  return (
    <a.footer style={spring}>
      Built & designed by{" "}
      <a
        href="https://twitter.com/quentinmerabet"
        target="_blank"
        rel="noreferrer noopener"
      >
        @quentinmerabet
      </a>
    </a.footer>
  );
}
