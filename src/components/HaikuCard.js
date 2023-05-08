"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import useSWR from "swr";
import { useSpring, useTrail, a, config } from "@react-spring/web";
import Share from "./Share";
import Spinner from "./Spinner";

export default function HaikuCard(props) {
  const { tags, haiku } = props;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const {
    data: tagsData,
    isLoading: tagsLoading,
    revalidate: tagsRevalidate,
  } = useSWR("/api/getLastTags", fetcher, {
    //refreshInterval: 15000,
  });
  const {
    data: haikuData,
    isLoading: haikuLoading,
    revalidate: haikuRevalidate,
  } = useSWR("/api/getLastHaiku", fetcher, {
    //refreshInterval: 15000,
  });

  const spring = useSpring({
    from: {
      transform: "translateY(-30px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0px)",
      opacity: 1,
    },
    config: config.molasses,
    delay: 300,
  });

  function TrailTags({ children }) {
    const items = React.Children.toArray(children);

    const trail = useTrail(items.length, {
      from: { opacity: 0, transform: "translateY(30px)" },
      to: { opacity: 1, transform: "translateY(0px)" },
      config: config.wobbly,
      delay: 600,
    });

    return (
      <>
        {trail.map(({ ...style }, index) => (
          <a.div key={index} style={style}>
            {items[index]}
          </a.div>
        ))}
      </>
    );
  }

  function TrailHaiku({ children }) {
    const words = children.split(/(\s+|\n+)/);

    const trail = useTrail(words.length, {
      from: {
        display: "inline",
        whiteSpace: "break-spaces",
        filter: "blur(10px)",
        opacity: 0,
      },
      to: { opacity: 1, filter: "blur(0px)" },
      config: {
        tension: 600,
        friction: 50,
        precision: 0.1,
      },
    });

    return (
      <>
        {trail.map(({ ...style }, index) => (
          <a.div key={index} style={style}>
            {words[index]}
          </a.div>
        ))}
      </>
    );
  }

  const Tags = useMemo(() => {
    return (
      <div className="tags">
        <TrailTags>
          {tags
            ? tags.map((tag, i) => {
                return (
                  <div key={i} className="tag">
                    {tag.name}
                  </div>
                );
              })
            : tagsData?.tags.map((tag, i) => {
                return (
                  <div key={i} className="tag">
                    {tag.name}
                  </div>
                );
              })}
        </TrailTags>
      </div>
    );
  }, [tagsData, tags]);

  const Haiku = useMemo(() => {
    return (
      <a.pre>
        {haikuData && (
          <TrailHaiku>{haiku ? haiku : haikuData?.haiku.text}</TrailHaiku>
        )}
      </a.pre>
    );
  }, [haikuData, haiku]);

  if (!haikuLoading && !tagsLoading && haikuData && tagsData) {
    return (
      <a.div className="haiku-card" style={spring}>
        <Share haiku={haiku || haikuData?.haiku.text} />
        {Haiku}
        {Tags}
      </a.div>
    );
  } else {
    return <Spinner />;
  }
}
