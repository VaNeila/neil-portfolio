"use client";

import type { ImageLoaderProps } from "next/image";

// For approved raster images, prepare each configured width beside the source:
// cover.webp -> cover-480.webp, cover-768.webp, cover-1200.webp, cover-1600.webp.
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) {
    throw new Error("Project images must use local /images/*.webp assets.");
  }
  return src.replace(/\.webp$/, `-${width}.webp`);
}
