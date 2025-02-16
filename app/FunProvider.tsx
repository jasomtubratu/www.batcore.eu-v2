"use client";
import React, { useEffect } from "react";

export default function FunProvider() {
  function emojiFun() {
    const emojis = ["🦇", "⚡", "🔋", "💀", "🔊"];
    let urlAnimate = () => {
      window.location.hash = emojis[Math.floor(Math.random() * emojis.length)];
      setTimeout(urlAnimate, 1000);
    };
    urlAnimate();
  }

  useEffect(() => {
    emojiFun();
  }, []);

  return <></>;
}
