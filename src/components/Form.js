"use client";

import { useState } from "react";
import { useSpring, a, config } from "@react-spring/web";

import HaikuCard from "@/components/HaikuCard";

export default function Form(props) {
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(null);
  const [haiku, setHaiku] = useState(null);

  const spring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.molasses,
    delay: 1500,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log("Adding a new tag...");
    fetch(`/api/addTag?name=${newTag}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add tag");
        }
        return response.json();
      })
      .then((data) => {
        console.log("New tag:", data.tag);
        console.log("Tags:", data.tags);
        console.log("New haiku:", data.haiku);
        setNewTag("");
        setTags(data.tags);
        setHaiku(data.haiku);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleChange(event) {
    setNewTag(event.target.value);
  }

  return (
    <>
      <HaikuCard tags={tags} haiku={haiku} />
      <a.form onSubmit={(e) => handleSubmit(e)} style={spring}>
        <label htmlFor="tagName">Drop a word to inspire the next Haiku.</label>
        <div className="relative w-fit mx-auto">
          <input
            type="text"
            pattern="[a-zA-ZÀ-ÖØ-öø-ÿ]+"
            placeholder="Sunflowers"
            size={10}
            maxLength={10}
            minLength={2}
            value={newTag}
            onChange={handleChange}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            <img width={18} height={18} src="ico-submit.svg" />
          </button>
        </div>
      </a.form>
    </>
  );
}
