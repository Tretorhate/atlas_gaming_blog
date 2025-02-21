"use client";
import React from "react";
import { WavyBackground } from "./wavy-background";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground
      className="w-full mx-auto"
      backgroundFill="white"
      waveOpacity={0.3}
      colors={[
        "#000000", // Pure black
        "#1a1a1a", // Very dark gray
        "#333333", // Dark gray
        "#4d4d4d", // Medium dark gray
        "#666666", // Medium gray
      ]}
    />
  );
}
