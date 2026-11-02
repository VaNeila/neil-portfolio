import type { Project } from "@/types/content";

// Code-native concept covers. These are deliberately not product screenshots,
// contain no client information, and are only used by unapproved review drafts.
export function ProjectVisual({ variant }: { variant: Project["cover"] }) {
  if (variant === "invitation")
    return (
      <div className="project-visual invitation-visual" aria-hidden="true">
        <svg viewBox="0 0 640 400" focusable="false">
          <rect width="640" height="400" fill="#ecebe3" />
          <path d="M0 320 200 140 455 400H0Z" fill="#e1e1d6" />
          <path d="M640 10 435 220 640 338Z" fill="#e3e2d9" />
          <g transform="translate(183 25) rotate(-7 132 175)">
            <rect
              width="264"
              height="350"
              rx="3"
              fill="#d8d6c9"
              opacity=".45"
              transform="translate(7 9)"
            />
            <rect width="264" height="350" rx="3" fill="#fffdf7" />
            <rect
              x="15"
              y="15"
              width="234"
              height="320"
              rx="110"
              fill="none"
              stroke="#d3d4be"
            />
            <text
              x="132"
              y="70"
              textAnchor="middle"
              fill="#606854"
              fontFamily="sans-serif"
              fontSize="8"
              letterSpacing="2.4"
            >
              YOU’RE INVITED
            </text>
            <path
              d="M132 99v26m0-4c-16-1-23-9-21-19 14 0 22 8 21 19Zm0-8c15-1 22-9 20-18-13 0-21 8-20 18Z"
              fill="none"
              stroke="#7e8a66"
              strokeWidth="1.2"
            />
            <text
              x="132"
              y="165"
              textAnchor="middle"
              fill="#47533d"
              fontFamily="Georgia, serif"
              fontSize="31"
              fontStyle="italic"
            >
              <tspan x="132">Good things</tspan>
              <tspan x="132" dy="38">
                bring people
              </tspan>
              <tspan x="132" dy="38">
                together.
              </tspan>
            </text>
            <path d="M112 275h40" stroke="#b0b797" />
            <text
              x="132"
              y="302"
              textAnchor="middle"
              fill="#606854"
              fontFamily="sans-serif"
              fontSize="7"
              letterSpacing="1.6"
            >
              A MOMENT WORTH SHARING
            </text>
          </g>
          <g fill="none" stroke="#879071" strokeWidth="2" opacity=".75">
            <path d="M503 400c-25-65-3-158 67-226m-71 176c-42-7-57-36-45-63 29 9 49 28 45 63Zm5-56c-11-41 2-70 32-77 10 30-1 62-32 77Zm20-38c5-39 25-55 51-50-1 28-20 45-51 50Zm-18 95c29-38 59-45 80-26-19 26-47 36-80 26Z" />
          </g>
        </svg>
        <span className="visual-caption">Concept illustration</span>
      </div>
    );
  return (
    <div className="project-visual gate-visual" aria-hidden="true">
      <svg viewBox="0 0 640 400" focusable="false">
        <defs>
          <pattern
            id="gate-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="#263d5d"
              strokeWidth=".7"
            />
          </pattern>
        </defs>
        <rect width="640" height="400" fill="#142a47" />
        <rect width="640" height="400" fill="url(#gate-grid)" />
        <text
          x="43"
          y="51"
          fontFamily="sans-serif"
          fill="#9eb8d5"
          fontSize="9"
          letterSpacing="2.5"
        >
          CONNECTED WORKFLOWS
        </text>
        <text
          x="43"
          y="102"
          fontFamily="sans-serif"
          fill="#f1f6fc"
          fontSize="29"
          letterSpacing="-1"
        >
          A clearer way through.
        </text>
        <g transform="translate(43 155)">
          <path
            d="M90 66H459"
            fill="none"
            stroke="#729acb"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
          <rect
            x="0"
            y="0"
            width="148"
            height="137"
            rx="8"
            fill="#203b5c"
            stroke="#527194"
          />
          <rect x="198" y="0" width="148" height="137" rx="8" fill="#e6f0fc" />
          <rect
            x="396"
            y="0"
            width="115"
            height="137"
            rx="8"
            fill="#203b5c"
            stroke="#527194"
          />
          <g fill="none" stroke="#b8d0ea" strokeWidth="2">
            <circle cx="74" cy="47" r="12" />
            <path d="M53 82v-7a21 21 0 0 1 42 0v7" />
            <path d="M437 42h31v43h-31zm8 0V30h14v12" />
          </g>
          <g fill="none" stroke="#2563eb" strokeWidth="2">
            <rect x="256" y="31" width="32" height="47" rx="3" />
            <path d="m264 52 6 6 13-14M265 68h14" />
          </g>
          <text
            x="74"
            y="113"
            textAnchor="middle"
            fill="#d1e0f1"
            fontSize="10"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            VISITOR
          </text>
          <text
            x="272"
            y="113"
            textAnchor="middle"
            fill="#254667"
            fontSize="10"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            REGISTRATION
          </text>
          <text
            x="453"
            y="113"
            textAnchor="middle"
            fill="#d1e0f1"
            fontSize="10"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            GATE
          </text>
        </g>
        <text
          x="43"
          y="355"
          fontFamily="sans-serif"
          fill="#b1c6df"
          fontSize="9"
          letterSpacing="1.8"
        >
          REACT / LARAVEL / MYSQL
        </text>
      </svg>
      <span className="visual-caption">Concept illustration</span>
    </div>
  );
}
