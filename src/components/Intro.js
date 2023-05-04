"use client";

import React from "react";
import { useSpring, useTrail, a, config } from "@react-spring/web";

export default function Intro() {
  function Trail({ children }) {
    const items = children.split(" ");
    const trail = useTrail(items.length, {
      from: {
        display: "inline-block",
        whiteSpace: "break-spaces",
        opacity: 0,
        transform: "translateY(30px)",
      },
      to: { opacity: 1, transform: "translateY(0px)" },
      config: { ...config.gentle, precision: 0.01 },
    });

    return (
      <>
        {trail.map(({ ...style }, index) => (
          <a.div key={index} style={style}>
            {items[index] + " "}
          </a.div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="intro-margin top"></div>
      <div className="intro">
        <a.h4>
          <Trail>Featuring the magic of AI</Trail>
        </a.h4>

        <a.h1>
          <Trail>Haiku, inspired by you.</Trail>
        </a.h1>
      </div>
      <div className="intro-margin bottom"></div>
    </>
  );
}
