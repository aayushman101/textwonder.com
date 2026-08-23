// Inline SVG icons for the non-PDF sections: Dev, Image, Calc, Unit, Health,
// Student, Colour and Data — 89 tools.
//
// Same rules as src/data/pdf-icons.js: one 24×24 grid, stroke-based, no fills,
// `currentColor` so the section accent applies. Inline means no extra request
// and nothing for a CSP to block.
//
// Shared motifs are defined once below so tools that do the same *kind* of job
// look related across sections — a converter reads as a converter whether it is
// turning CSV into JSON or metres into feet.

const IMG   = '<rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.4"/><path d="M3 16.5l4.5-4.5 4 4 3-3 4.5 4.5"/>';
const TABLE = '<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><path d="M3 9.5h18M3 14.5h18M9 4.5v15"/>';
const BRACE = '<path d="M9 4c-2 0-2.5 1.2-2.5 3S6 10.5 4.5 12c1.5 1.5 2 1.2 2 3s.5 3 2.5 3"/><path d="M15 4c2 0 2.5 1.2 2.5 3S18 10.5 19.5 12c-1.5 1.5-2 1.2-2 3s-.5 3-2.5 3"/>';
const ARROW = '<path d="M10 12h4"/><path d="M12.5 10l2 2-2 2"/>';   // small, sits mid-icon
const CLOCK = '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.2 2"/>';
const COIN  = '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M14.2 9.6c-.5-.7-1.3-1-2.2-1-1.3 0-2.2.7-2.2 1.7 0 2.4 4.6 1.2 4.6 3.6 0 1-1 1.7-2.4 1.7-1 0-1.8-.4-2.3-1.1"/>';
const PERSON = '<circle cx="12" cy="6.5" r="3"/><path d="M5.5 20.5a6.5 6.5 0 0 1 13 0"/>';

export const TOOL_ICONS = {
  // ── DevWonder ───────────────────────────────────────────────────────────
  'json-formatter':        BRACE,
  'html-formatter':        '<path d="M8.5 8L4 12l4.5 4"/><path d="M15.5 8L20 12l-4.5 4"/><path d="M13.5 5.5l-3 13"/>',
  'markdown-previewer':    '<rect x="2.5" y="6" width="19" height="12" rx="1.5"/><path d="M6 15V9l2.5 3L11 9v6"/><path d="M15 9v4.5"/><path d="M13 12.5l2 2.5 2-2.5"/>',
  'regex-tester':          '<path d="M12 4.5v9"/><path d="M8.1 6.8l7.8 4.4M15.9 6.8l-7.8 4.4"/><circle cx="7" cy="18" r="1.8"/>',
  'base64-encoder':        '<path d="M4 9h6M4 9l2.5-2.5M4 9l2.5 2.5"/><path d="M20 15h-6M20 15l-2.5-2.5M20 15l-2.5 2.5"/><path d="M13.5 5.5h3.5v4h-3.5z"/><path d="M7 14.5h3.5v4H7z"/>',
  // Three segments with a signature, not another key — password-generator already owns the key.
  'jwt-decoder': '<rect x="2.5" y="8.5" width="6" height="7" rx="1"/><rect x="9" y="8.5" width="6" height="7" rx="1"/><rect x="15.5" y="8.5" width="6" height="7" rx="1"/><path d="M18.5 8.5V6.5a2 2 0 0 0-4 0"/>',
  'url-parser':            '<path d="M9.5 14.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M14.5 9.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l1-1"/>',
  'text-to-html':          '<path d="M3 7h6M3 11h6M3 15h4"/>' + ARROW + '<path d="M17 9l2.5 3-2.5 3"/>',
  'uuid-generator':        '<rect x="3" y="7" width="4" height="4" rx="1"/><rect x="10" y="7" width="4" height="4" rx="1"/><rect x="17" y="7" width="4" height="4" rx="1"/><path d="M3 15.5h18"/><path d="M3 19h11"/>',
  'password-generator':    '<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21"/><path d="M18 12v3.5M21 12v2.5"/>',
  'qr-code-generator':     '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5h-2.5z"/><path d="M20.5 14.5v3M17.5 20.5h3"/>',
  'hash-generator':        '<path d="M9 4l-1.5 16M16.5 4L15 20M4.5 9h15M3.5 15h15"/>',
  'number-base-converter': '<path d="M4 8.5h5M6.5 8.5v7M4 15.5h5"/>' + ARROW + '<path d="M16 8.5h4l-4 7h4"/>',
  'unix-timestamp':        CLOCK + '<path d="M12 2.5v1.5"/>',
  // Two swatches with a swap arrow, not a droplet — a droplet is the water
  // icon over in HealthWonder, and this converts between colour notations.
  'color-converter':       '<rect x="2.5" y="6.5" width="8" height="8" rx="1.5"/><rect x="13.5" y="9.5" width="8" height="8" rx="1.5"/><path d="M11 10.5h2"/><path d="M11.8 9.2l1.7 1.3-1.7 1.3"/>',
  'cron-parser':           '<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15.5" r="2.5"/><path d="M12 14v1.7l1.2.8"/>',
  'text-to-speech':        '<path d="M4 10v4h3l4 3.5v-11L7 10H4z"/><path d="M15 9.5a4 4 0 0 1 0 5"/><path d="M17.8 7a7.5 7.5 0 0 1 0 10"/>',

  // ── ImageWonder ─────────────────────────────────────────────────────────
  'image-resizer':         '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 13V8h5"/><path d="M8 8l3.5 3.5"/><path d="M16 11v5h-5"/><path d="M16 16l-3.5-3.5"/>',
  'image-cropper':         '<path d="M6 2v14a1 1 0 0 0 1 1h14"/><path d="M2 6h14a1 1 0 0 1 1 1v14"/>',
  'image-rotate-flip':     '<rect x="3.5" y="7" width="17" height="12" rx="1.5"/><path d="M8 4.5a7 7 0 0 1 8 0"/><path d="M8 2.5v2.2h2.2"/>',
  // Arrows driving inward against a centre line. The first attempt was a
  // down-arrow (read as download); the second put two chevrons close enough
  // that they formed an X in a box, which reads as delete.
  'image-compressor': '<path d="M3 12h5.5"/><path d="M6.2 9.6L8.8 12l-2.6 2.4"/><path d="M21 12h-5.5"/><path d="M17.8 9.6L15.2 12l2.6 2.4"/><path d="M12 4.5v15"/>',
  'image-converter':       IMG + '<path d="M15.5 21.5h5l-1.8-2"/>',
  'image-scanner':         '<path d="M3 8V5a1 1 0 0 1 1-1h3M21 8V5a1 1 0 0 0-1-1h-3M3 16v3a1 1 0 0 0 1 1h3M21 16v3a1 1 0 0 1-1 1h-3"/><path d="M3.5 12h17"/>',
  'image-brightness':      '<circle cx="12" cy="12" r="5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
  'image-effects':         '<path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z"/><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  'blur-face':             '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 10.2h.01M12 9.4h.01M15.4 10.2h.01M9.4 13.6h.01M12.8 14.4h.01M16 13.2h.01M10.6 16.6h.01M14 17h.01"/>',
  'meme-generator':        '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 7.5h10M8.5 16.5h7"/><circle cx="9.5" cy="11.5" r="1"/><circle cx="14.5" cy="11.5" r="1"/>',
  'image-watermark':       IMG + '<path d="M12 21.5c-1.6 0-2.8-1.2-2.8-2.7 0-1.3 1-2.7 2.8-4.6 1.8 1.9 2.8 3.3 2.8 4.6 0 1.5-1.2 2.7-2.8 2.7z" fill="var(--tw-bg,#0b0f1a)"/>',
  'html-to-image':         '<path d="M6.5 6L3 9.5 6.5 13"/><path d="M10.5 4.5l-2 10"/>' + '<rect x="12.5" y="10.5" width="9" height="8" rx="1"/><circle cx="15" cy="13" r="0.9"/><path d="M12.5 17l2.5-2.5 2 2"/>',
  'image-to-pdf':          '<rect x="2.5" y="7" width="8.5" height="8" rx="1"/><circle cx="5.4" cy="9.9" r="0.85"/><path d="M2.5 13.5l2.6-2.6 2.4 2.4"/><path d="M12.5 11h2.5"/><path d="M13.8 9.2l1.8 1.8-1.8 1.8"/><path d="M17.5 4h2.5L22 6v13a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>',
  'image-to-base64':       '<rect x="2.5" y="7" width="8.5" height="8" rx="1"/><circle cx="5.4" cy="9.9" r="0.85"/><path d="M2.5 13.5l2.6-2.6 2.4 2.4"/><path d="M12.5 11h3"/><path d="M14 9.2l1.8 1.8-1.8 1.8"/><path d="M17.5 8.5h4v3h-4z"/><path d="M17.5 13.5h4v3h-4z"/>',
  'base64-to-image':       '<path d="M2.5 8.5h4v3h-4z"/><path d="M2.5 13.5h4v3h-4z"/><path d="M8.5 11h3"/><path d="M10 9.2l1.8 1.8-1.8 1.8"/><rect x="13" y="7" width="8.5" height="8" rx="1"/><circle cx="15.9" cy="9.9" r="0.85"/><path d="M13 13.5l2.6-2.6 2.4 2.4"/>',
  'image-color-picker':    '<path d="M17.5 3.5a2.5 2.5 0 0 1 3.5 3.5l-1.6 1.6-3.5-3.5z"/><path d="M15.4 5.6L5.5 15.5 4 20l4.5-1.5 9.9-9.9z"/>',
  'image-metadata':        IMG + '<circle cx="18" cy="18" r="4" fill="var(--tw-bg,#0b0f1a)"/><path d="M18 17v2.5M18 15.3h.01"/>',

  // ── CalcWonder ──────────────────────────────────────────────────────────
  'emi-calculator':        '<path d="M3.5 9.5L12 4l8.5 5.5"/><path d="M5.5 10.5v8h13v-8"/><path d="M10 18.5v-4h4v4"/>',
  'sip-calculator':        '<path d="M3.5 18.5l5-5 3.5 3.5 8-8.5"/><path d="M20 5.5v4.5h-4.5"/><path d="M3.5 21h17"/>',
  // A curve that actually accelerates; the old one hooked back on itself.
  'compound-interest-calculator': '<path d="M3.5 18.5c4 0 7-1.5 9-4.5s3.5-6.5 4-9"/><path d="M12.5 4.5H17V9"/><path d="M3.5 21h17"/>',
  'simple-interest-calculator':   '<path d="M3.5 19L19 7"/><path d="M14.5 6.5H19V11"/><path d="M3.5 21h17"/>',
  'gst-calculator': '<path d="M5.5 3.5h13v17l-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6-2.1-1.6-2.2 1.6z"/><path d="M14.5 8.5l-5 7"/><circle cx="9.8" cy="9" r="1"/><circle cx="14.2" cy="15" r="1"/>',
  // A vault dial — the old rect-plus-circle read as a camera.
  'fd-calculator': '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5v7M8.5 12h7"/><path d="M3 8h18"/>',
  'ppf-calculator':        '<path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  'tip-calculator':        '<path d="M4 16h16a8 8 0 0 0-16 0z"/><path d="M2.5 19.5h19"/><path d="M12 4.5v3"/>',
  'discount-calculator':   '<path d="M3.5 11V5.5a2 2 0 0 1 2-2H11l9 9-7.5 7.5-9-9z"/><circle cx="8" cy="8" r="1.4"/>',
  'weighted-average-calculator': '<path d="M12 4v16"/><path d="M5 8h14"/><path d="M5 8l-2.5 5h5z"/><path d="M19 8l-2.5 5h5z"/><path d="M8 20.5h8"/>',
  'commission-calculator': '<path d="M8 6.5l8 11"/><circle cx="8" cy="7.5" r="2.5"/><circle cx="16" cy="16.5" r="2.5"/>',
  'sales-tax-calculator':  '<rect x="4.5" y="3" width="15" height="18" rx="1.5"/><path d="M8 7.5h8"/><path d="M8 12h2M12 12h2M16 12h.01"/><path d="M8 16h2M12 16h2M16 16h.01"/>',
  'age-calculator':        '<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9.5 15.5l1.8 1.8 3.7-3.8"/>',
  'percentage-calculator': '<path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
  // A hammer head, not a diagonal stroke that reads as a pencil.
  'renovation-cost-calculator': '<path d="M14.5 3.5l6 6-2.5 2.5-6-6z"/><path d="M12.5 8.5L4 17v3h3l8.5-8.5"/>',

  // ── UnitWonder ──────────────────────────────────────────────────────────
  'length-converter':      '<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5"/>',
  'weight-converter':      '<path d="M6 8h12l2 12.5H4z"/><path d="M9.5 8a2.5 2.5 0 0 1 5 0"/>',
  'area-converter':        '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 8h8v8H8z" stroke-dasharray="2 2"/>',
  'volume-converter':      '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  'temperature-converter': '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v6"/>',
  'speed-converter':       '<path d="M3.5 17a9 9 0 1 1 17 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.3"/>',
  'time-converter':        CLOCK,
  'digital-storage-converter': '<ellipse cx="12" cy="6.5" rx="8" ry="3"/><path d="M4 6.5v11c0 1.7 3.6 3 8 3s8-1.3 8-3v-11"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',

  // ── HealthWonder ────────────────────────────────────────────────────────
  'bmi-calculator':        PERSON + '<path d="M17.5 13.5h4M19.5 11.5v4"/>',
  'bmr-calculator':        '<path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-1.8.8-3.5 1.8-4.9.4 1.4 1.3 2.4 2.2 2.4 1.3 0 1.5-2.3 1-6.5z"/>',
  'body-fat-calculator':   PERSON + '<path d="M4 11.5h4.5M15.5 11.5H20"/>',
  'ideal-weight-calculator': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  // A piece of fruit with a count line — bmr-calculator is the flame.
  'calorie-calculator': '<path d="M12 7.5c4 0 7 2.6 7 6a6.5 6.5 0 0 1-14 0c0-3.4 3-6 7-6z"/><path d="M12 7.5c0-1.6.9-2.8 2.5-3.5-.3 1.6.1 2.7 1 3.3"/><path d="M9.5 13.5h5"/>',
  'macro-calculator':      '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v8.5l7.5 4"/><path d="M12 12L5 8"/>',
  // Weighted bar with collars, so it reads at 16px rather than as a thin line.
  'protein-intake-calculator': '<path d="M7 8.5v7M4.5 10v4M17 8.5v7M19.5 10v4"/><path d="M7 12h10"/><path d="M9.5 9.5v5M14.5 9.5v5"/>',
  'water-intake-calculator': '<path d="M12 3.5c3.2 3.6 5 6.3 5 8.5a5 5 0 0 1-10 0c0-2.2 1.8-4.9 5-8.5z"/>',

  // ── StudentWonder ───────────────────────────────────────────────────────
  'cgpa-calculator':       '<path d="M12 4L2.5 8.5 12 13l9.5-4.5z"/><path d="M6.5 10.8V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.2"/>',
  // Tassel hangs and beads, so it is not the CGPA cap repeated.
  'gpa-calculator': '<path d="M12 4L2.5 8.5 12 13l9.5-4.5z"/><path d="M6.5 10.8V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.2"/><path d="M21.5 8.5v6"/><circle cx="21.5" cy="15.5" r="1.2"/>',
  'gpa-goal-calculator':   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/>',
  // A marksheet carrying a percent sign, so it is not just the CalcWonder
  // percentage icon repeated in another section.
  'marks-percentage-calculator': '<path d="M6.5 3h7l4.5 4.5V20a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13.5 3v4.5H18"/><path d="M14.5 12.5l-5 5"/><circle cx="10.2" cy="13.2" r="1.1"/><circle cx="13.8" cy="16.8" r="1.1"/>',
  'attendance-calculator': '<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14l1.6 1.6L13 12"/><path d="M15.5 17.5h3"/>',
  'exam-countdown':        '<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15.5" r="3"/><path d="M12 13.8v1.9l1.4.9"/>',
  'study-planner':         '<path d="M5 4.5h13a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5z"/><path d="M5 4.5a1.5 1.5 0 0 0 0 3h2"/><path d="M9.5 9.5h6M9.5 13h6M9.5 16.5h3.5"/>',
  'pomodoro-timer':        '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.5"/><path d="M9.5 3.5h5"/><path d="M12 3.5v2.5"/>',

  // ── ColorWonder ─────────────────────────────────────────────────────────
  'hex-rgb-converter':     '<rect x="3" y="7" width="7" height="7" rx="1"/><rect x="14" y="10" width="7" height="7" rx="1"/><path d="M10.5 9.5h3"/><path d="M12 8l1.8 1.5L12 11"/>',
  'contrast-checker':      '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" stroke="none"/>',
  'color-mixer':           '<circle cx="9" cy="10" r="5.5"/><circle cx="15" cy="14" r="5.5"/>',
  'gradient-generator':    '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3 18.5l18-13" stroke-dasharray="1.5 2"/>',
  'color-palette-generator': '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-.9 2-1.8 0-1.6-1.4-1.8-1.4-3 0-1 .9-1.7 2-1.7h1.9a4 4 0 0 0 4-4c0-3.6-3.8-6.5-8.5-6.5z"/><circle cx="8" cy="9.5" r="1.1"/><circle cx="12.5" cy="7.5" r="1.1"/><circle cx="7.5" cy="14.5" r="1.1"/>',
  'tint-shade-generator':  '<rect x="3" y="6" width="4.5" height="12" rx="1"/><rect x="9.7" y="6" width="4.5" height="12" rx="1"/><rect x="16.4" y="6" width="4.5" height="12" rx="1"/>',
  'shadow-generator':      '<rect x="3.5" y="3.5" width="12" height="12" rx="1.5"/><path d="M8.5 20.5h10a2 2 0 0 0 2-2v-10" stroke-dasharray="2 2"/>',
  'random-color-generator': '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.2"/><circle cx="15.5" cy="8.5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="8.5" cy="15.5" r="1.2"/><circle cx="15.5" cy="15.5" r="1.2"/>',

  // ── DocWonder ───────────────────────────────────────────────────────────
  'rent-receipt-generator':
    '<path d="M5.5 3.5h13v17l-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6-2.1-1.6-2.2 1.6z"/><path d="M8.5 10.5L12 8l3.5 2.5"/><path d="M9.8 11.3v3.4h4.4v-3.4"/>',
  'salary-slip-generator':
    '<rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M3.5 9h17"/><path d="M7 12.5h4M7 16h6"/><path d="M16.5 12v5M18 13.4c-.4-.5-1-.7-1.6-.7-.9 0-1.5.5-1.5 1.2 0 1.6 3.2.8 3.2 2.4 0 .7-.7 1.2-1.7 1.2-.7 0-1.3-.3-1.6-.8"/>',
  'experience-letter-generator':
    '<path d="M6 3.5h9l3.5 3.5v8H6z"/><path d="M15 3.5V7h3.5"/><path d="M8.5 9.5h6M8.5 12h4"/><circle cx="12" cy="18" r="2.5"/><path d="M10.4 19.9L9.8 22.5l2.2-1.2 2.2 1.2-.6-2.6"/>',
  'relieving-letter-generator':
    '<path d="M5.5 3.5h8l4 4V17a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M13.5 3.5V7.5h4"/><path d="M7.5 10h6M7.5 13h4"/><path d="M15 21h6"/><path d="M18.5 18.5L21 21l-2.5 2.5"/>',
  'proforma-invoice-generator':
    '<path d="M5.5 3.5h13v17l-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6-2.1-1.6-2.2 1.6z"/><path d="M8.5 8.5h7M8.5 11.5h7M8.5 14.5h4"/><path d="M13.5 14.5h2"/>',
  'leave-application-generator':
    '<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 15.5l2 2 4-4"/>',
  'noc-generator':
    '<path d="M6.5 3.5h7l4 4V20a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M13.5 3.5V7.5h4"/><path d="M8.5 10.5h6"/><circle cx="14.5" cy="15.5" r="3.5"/><path d="M13 15.5l1.2 1.2 2.3-2.4"/>',

  'csv-to-json': '<rect x="2.5" y="6" width="12" height="12" rx="1.5"/><path d="M2.5 10h12M8.5 6v12"/><path d="M16.5 12h4.5"/><path d="M19 9.8l2.2 2.2-2.2 2.2"/>',
  'yaml-to-json': '<path d="M2.5 8h2M6 8h6M2.5 12h2M6 12h6M2.5 16h2M6 16h4"/><path d="M15.5 12h5.5"/><path d="M18.8 9.8l2.2 2.2-2.2 2.2"/>',
  'xml-to-json': '<path d="M6.5 8.5L3 12l3.5 3.5"/><path d="M11.5 7l-2.5 10"/><path d="M15.5 12h5.5"/><path d="M18.8 9.8l2.2 2.2-2.2 2.2"/>',
  'json-to-csv': '<rect x="9.5" y="6" width="12" height="12" rx="1.5"/><path d="M9.5 10h12M15.5 6v12"/><path d="M7 12H2.5"/><path d="M4.8 9.8L2.6 12l2.2 2.2"/>',
  'json-to-yaml': '<path d="M21.5 8h-2M18 8h-6M21.5 12h-2M18 12h-6M21.5 16h-2M18 16h-4"/><path d="M8.5 12H3"/><path d="M5.2 9.8L3 12l2.2 2.2"/>',
  'tsv-to-csv':    '<rect x="2.5" y="6.5" width="8" height="11" rx="1"/><path d="M2.5 10h8"/><rect x="13.5" y="6.5" width="8" height="11" rx="1"/><path d="M13.5 10h8M17.5 6.5v11"/>',
  'csv-to-table':  TABLE,
  // Grouped digits with a separator; the earlier attempt drew unreadable numerals.
  'number-formatter': '<path d="M4 8.5v7M7.5 8.5v7M11 8.5v7"/><path d="M13.6 15.5c.7-.4 1-1 1-1.8"/><path d="M17.5 8.5v7M21 8.5v7"/>',
};

/** Groups per section: the order and headings shown in each mega-menu. */
export const SECTION_MENUS = {
  devwonder: {
    accent: '#06b6d4',
    groups: [
      { title: 'Format & test', slugs: ['json-formatter', 'html-formatter', 'markdown-previewer', 'regex-tester'] },
      { title: 'Encode & decode', slugs: ['base64-encoder', 'jwt-decoder', 'url-parser', 'text-to-html'] },
      { title: 'Generate', slugs: ['uuid-generator', 'password-generator', 'qr-code-generator', 'hash-generator'] },
      { title: 'Convert', slugs: ['number-base-converter', 'unix-timestamp', 'color-converter', 'cron-parser', 'text-to-speech'] },
    ],
  },
  imagewonder: {
    accent: '#f43f5e',
    groups: [
      { title: 'Resize & crop', slugs: ['image-resizer', 'image-cropper', 'image-rotate-flip'] },
      { title: 'Optimise', slugs: ['image-compressor', 'image-converter', 'image-scanner'] },
      { title: 'Adjust', slugs: ['image-brightness', 'image-effects', 'blur-face'] },
      { title: 'Create', slugs: ['meme-generator', 'image-watermark', 'html-to-image'] },
      { title: 'Convert & inspect', slugs: ['image-to-pdf', 'image-to-base64', 'base64-to-image', 'image-color-picker', 'image-metadata'] },
    ],
  },
  calc: {
    accent: '#10b981',
    groups: [
      { title: 'Loans & savings', slugs: ['emi-calculator', 'sip-calculator', 'compound-interest-calculator', 'simple-interest-calculator', 'fd-calculator', 'ppf-calculator'] },
      { title: 'Tax & billing', slugs: ['gst-calculator', 'sales-tax-calculator', 'commission-calculator', 'discount-calculator'] },
      { title: 'Everyday', slugs: ['age-calculator', 'percentage-calculator', 'tip-calculator', 'weighted-average-calculator', 'renovation-cost-calculator'] },
    ],
  },
  unit: {
    accent: '#6366f1',
    groups: [
      { title: 'Size & mass', slugs: ['length-converter', 'weight-converter', 'area-converter', 'volume-converter'] },
      { title: 'Rate & scale', slugs: ['temperature-converter', 'speed-converter', 'time-converter', 'digital-storage-converter'] },
    ],
  },
  health: {
    accent: '#22c55e',
    groups: [
      { title: 'Body', slugs: ['bmi-calculator', 'bmr-calculator', 'body-fat-calculator', 'ideal-weight-calculator'] },
      { title: 'Nutrition', slugs: ['calorie-calculator', 'macro-calculator', 'protein-intake-calculator', 'water-intake-calculator'] },
    ],
  },
  student: {
    accent: '#3b82f6',
    groups: [
      { title: 'Grades', slugs: ['cgpa-calculator', 'gpa-calculator', 'gpa-goal-calculator', 'marks-percentage-calculator'] },
      { title: 'Study', slugs: ['attendance-calculator', 'exam-countdown', 'study-planner', 'pomodoro-timer'] },
    ],
  },
  color: {
    accent: '#ec4899',
    groups: [
      { title: 'Convert & check', slugs: ['hex-rgb-converter', 'contrast-checker', 'color-mixer'] },
      { title: 'Generate', slugs: ['gradient-generator', 'color-palette-generator', 'tint-shade-generator', 'shadow-generator', 'random-color-generator'] },
    ],
  },
  doc: {
    accent: '#0d9488',
    // Tools live under /tools/, not /docwonder/ — the hub is new, the tool
    // pages predate it and carry search traffic worth not disturbing.
    basePath: '/tools/',
    groups: [
      { title: 'Employment', slugs: ['salary-slip-generator', 'experience-letter-generator', 'relieving-letter-generator', 'leave-application-generator'] },
      { title: 'Property & billing', slugs: ['rent-receipt-generator', 'proforma-invoice-generator', 'noc-generator'] },
    ],
  },
  data: {
    accent: '#f59e0b',
    groups: [
      { title: 'Into JSON', slugs: ['csv-to-json', 'yaml-to-json', 'xml-to-json'] },
      { title: 'Out of JSON', slugs: ['json-to-csv', 'json-to-yaml'] },
      { title: 'Tables & numbers', slugs: ['tsv-to-csv', 'csv-to-table', 'number-formatter'] },
    ],
  },
};
