import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f8fafc"/><rect x="64" y="65" width="42" height="4" fill="#2563eb"/><text x="64" y="145" font-family="Arial,sans-serif" font-size="21" letter-spacing="4" fill="#475569">NEIL TRISTAN A. ATIENZA</text><text x="60" y="286" font-family="Arial,sans-serif" font-size="76" letter-spacing="-4" fill="#0f172a">Thoughtful interfaces.</text><text x="60" y="375" font-family="Arial,sans-serif" font-size="76" letter-spacing="-4" fill="#2563eb">Reliable foundations.</text><path d="M64 459H1136" stroke="#e2e8f0"/><text x="64" y="514" font-family="Arial,sans-serif" font-size="23" fill="#0f172a">Full-Stack Web Developer</text><text x="1135" y="514" font-family="Arial,sans-serif" text-anchor="end" font-size="20" fill="#475569">React / Next.js / Laravel</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("app/opengraph-image.png");

const icon = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="14" fill="#2563eb"/><path d="M18 46V22h7v3c3-5 18-7 18 6v15h-7V32c0-7-11-5-11 1v13Z" fill="white"/><circle cx="49" cy="45" r="4" fill="#bfdbfe"/></svg>`;
const png = await sharp(Buffer.from(icon)).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 64;
header[7] = 64;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([header, png]));
console.log("Generated original site social image and favicon.");
