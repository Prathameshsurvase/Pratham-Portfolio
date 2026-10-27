import React, { useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

const FONT = '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const SWING_STRENGTH = 1;
const PAPER = '#0F1117';
const INK = '#F8FAFC';
const ACCENT = '#0048DE';
const STRAP = '#C3FF48';

const PAD_MIN = 28;
const PAD_MAX = 88;
const NAME_MIN = 48;
const NAME_MAX = 140;
const META_MIN = 14;
const META_MAX = 36;
const NUM_MIN = 24;
const NUM_MAX = 96;
const PRINT_PAD = 48;
const CARD_DEPTH = 0.1;
const MM_PER_UNIT = 54;
const THICK_MIN = 0.8;
const THICK_MAX = 12;
const THICK_DEFAULT = Math.round(CARD_DEPTH * MM_PER_UNIT * 10) / 10;
const SIZE_MIN = 240;
const SIZE_MAX = 560;
const NARROW_AT = 420;
const JOINTS = 3;
const SEG_LEN = 0.82;
const CARD_W = 1.58;
const CARD_H = 2.12;
const SLEEVE_PAD_W = 0.08;
const SLEEVE_LIP = 0.05;
const SLEEVE_HEAD = 0.16;
const SLEEVE_PAD_H = SLEEVE_LIP + SLEEVE_HEAD;
const SLEEVE_PAD_D = 0.03;
const SLEEVE_SHIFT = (SLEEVE_HEAD - SLEEVE_LIP) / 2;
const HOLE = 0.09;
const ROPE_ITERS = 18;
const GRAVITY = -22;
const AIR = 0.986;
const DT = 1 / 60;
const STRAP_SEGS = 40;
const STRAP_RADIAL = 10;
const STRAP_HALF_W = 0.07;
const STRAP_HALF_T = 0.02;
const CORD_R = 0.032;
const CORD_REPEAT = 14;
const TEX_W = 768;
const TEX_H = 1024;
const STRAP_TEX_W = 256;
const STRAP_TEX_H = 1024;
const STRAP_REPEAT = 3;
const CAM_X = 0;
const CAM_Y = -0.7;
const CAM_Z = 7.1;
const CAM_LOOK_Y = -1.05;
const IDLE_SPRING = 6;
const IDLE_DAMP = 0.9;

const DEFAULT_CONTENT = {
  attendeeName: 'Pratham Survase',
  ticketType: 'UI/UX Designer',
  ticketNumber: 'EMP-0842',
  eventName: '',
  eventDate: '',
  barcodeValue: 'INFOTEK-PRATHAM-UX',
  backText: 'PRATHAM SURVASE • STUDIO',
  strapText: 'PRATHAM SURVASE • UI/UX DESIGN',
};

const DEFAULT_NAME_FONT = {
  fontSize: '78px',
  fontWeight: 700,
  fontStyle: 'normal',
  letterSpacing: '-0.035em',
  lineHeight: '1em',
};

const DEFAULT_META_FONT = {
  fontSize: '26px',
  fontWeight: 400,
  fontStyle: 'normal',
  letterSpacing: '0.01em',
  lineHeight: '1.2em',
};

const DEFAULT_NUMBER_FONT = {
  fontSize: '50px',
  fontWeight: 700,
  fontStyle: 'normal',
  letterSpacing: '-0.03em',
  lineHeight: '1em',
};

const DEFAULT_LOOK = {
  paper: '#0A0C12',
  ink: '#FFFFFF',
  accent: '#FF5D7B',
  strapColor: '#C3FF48',
  strapStyle: 'flat',
  foil: false,
  photo: '/Images/id card image.png',
  photoFit: 'cover',
  finish: 'gloss',
  sleeve: true,
  sleeveTexture: 'clear',
  nameFont: DEFAULT_NAME_FONT,
  metaFont: DEFAULT_META_FONT,
  numberFont: DEFAULT_NUMBER_FONT,
};

const DEFAULT_LIGHT = {
  angle: 25,
  height: 55,
  intensity: 1,
  rim: true,
};

const TYPE_GAP_MIN = 8;
const TYPE_GAP_MAX = 48;
const TYPE_GAP_DEFAULT = 12;

const DEFAULT_LAYOUT = {
  size: 340,
  padding: PRINT_PAD,
  stackGap: TYPE_GAP_DEFAULT,
  thickness: THICK_DEFAULT,
  targetX: 340,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampSize(value) {
  if (!Number.isFinite(value)) return DEFAULT_LAYOUT.size;
  return Math.round(clamp(value, SIZE_MIN, SIZE_MAX));
}

function clampPad(value) {
  if (!Number.isFinite(value)) return DEFAULT_LAYOUT.padding;
  return Math.round(clamp(value, PAD_MIN, PAD_MAX));
}

function clampStackGap(value) {
  if (!Number.isFinite(value)) return DEFAULT_LAYOUT.stackGap;
  return Math.round(clamp(value, TYPE_GAP_MIN, TYPE_GAP_MAX));
}

function asText(value) {
  return typeof value === 'string' ? value : '';
}

function visibleText(value) {
  const text = asText(value).trim();
  return text.length > 0 ? text : null;
}

function parsePx(value, fallback, min, max) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(clamp(value, min, max));
  }
  if (typeof value === 'string') {
    const n = parseFloat(value);
    if (Number.isFinite(n)) return Math.round(clamp(n, min, max));
  }
  return fallback;
}

function asPrintFont(value, fallback) {
  if (!value || typeof value !== 'object') return fallback;
  return { ...fallback, ...value };
}

function fontFamilyOf(font) {
  const family = asText(font.fontFamily).trim();
  return family.length > 0 ? family : FONT;
}

function fontWeightOf(font, fallback) {
  if (typeof font.fontWeight === 'number' && Number.isFinite(font.fontWeight)) {
    return font.fontWeight;
  }
  if (typeof font.fontWeight === 'string') {
    const n = parseFloat(font.fontWeight);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

function fontStyleOf(font) {
  return font.fontStyle === 'italic' ? 'italic' : 'normal';
}

function letterSpacingOf(font, fallback) {
  if (typeof font.letterSpacing === 'number') return `${font.letterSpacing}px`;
  const text = asText(font.letterSpacing).trim();
  return text.length > 0 ? text : fallback;
}

function lineHeightOf(font, size, fallbackRatio) {
  const raw = font.lineHeight;
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return raw > 4 ? raw : size * raw;
  }
  if (typeof raw === 'string') {
    const n = parseFloat(raw);
    if (!Number.isFinite(n)) return size * fallbackRatio;
    if (raw.includes('%')) return size * (n / 100);
    if (raw.includes('px')) return n;
    if (raw.includes('em')) return size * n;
    return n > 4 ? n : size * n;
  }
  return size * fallbackRatio;
}

function typeGap(fromPx, toPx, pad) {
  return Math.round(clamp(Math.max(pad * 0.28, fromPx * 0.16, toPx * 0.6), 10, 72));
}

function lineAdvance(ctx, text, px, lead) {
  const m = ctx.measureText(text);
  const ascent = m.actualBoundingBoxAscent;
  const descent = m.actualBoundingBoxDescent;
  const ink =
    typeof ascent === 'number' &&
    Number.isFinite(ascent) &&
    typeof descent === 'number' &&
    Number.isFinite(descent)
      ? ascent + descent
      : px;
  return Math.round(Math.max(lead, ink + px * 0.08, px));
}

function inkAdvance(ctx, text, px) {
  const m = ctx.measureText(text);
  const ascent = m.actualBoundingBoxAscent;
  const descent = m.actualBoundingBoxDescent;
  const ink =
    typeof ascent === 'number' &&
    Number.isFinite(ascent) &&
    typeof descent === 'number' &&
    Number.isFinite(descent)
      ? ascent + descent
      : px * 0.8;
  return Math.round(clamp(ink, px * 0.7, px));
}

function setPrintFont(ctx, font, px, weight = fontWeightOf(font, 400)) {
  ctx.font = `${fontStyleOf(font)} ${weight} ${px}px ${fontFamilyOf(font)}`;
}

function imageSrc(value) {
  if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  if (!value || typeof value !== 'object') return null;
  const rec = value;
  if (typeof rec.src === 'string' && rec.src.length > 0) return rec.src;
  if (typeof rec.url === 'string' && rec.url.length > 0) return rec.url;
  return null;
}

function asFoil(value) {
  switch (value) {
    case false:
    case 'off':
      return 'off';
    case 'edges':
      return 'edges';
    case 'marks+edges':
    case 'both':
      return 'marks+edges';
    case 'holo':
    case 'marks':
      return 'marks';
    case true:
    default:
      return 'marks+edges';
  }
}

function asStrapStyle(value) {
  return value === 'cord' ? 'cord' : 'flat';
}

function asFinish(value) {
  if (value === 'matte' || value === 'linen') return value;
  return 'gloss';
}

function asSleeveTexture(value) {
  if (value === 'frosted' || value === 'textured') return value;
  return 'clear';
}

function asPhotoFit(value) {
  return value === 'inset' ? 'inset' : 'cover';
}

function foilHasMarks(mode) {
  return mode === 'marks' || mode === 'marks+edges';
}

function foilHasEdges(mode) {
  return mode === 'edges' || mode === 'marks+edges';
}

function reverseLine(custom, legacy, ticketNumber, attendeeName, eventName) {
  if (custom) return custom;
  switch (legacy) {
    case 'name':
      return attendeeName;
    case 'event':
      return eventName;
    case 'none':
      return null;
    default:
      return ticketNumber;
  }
}

function drawContained(ctx, img, x, y, w, h, focusY = 0.5) {
  if (!img || img.width < 1 || img.height < 1) return;
  const ir = img.width / img.height;
  const r = w / h;
  let dw = w;
  let dh = h;
  let dx = x;
  let dy = y;
  if (ir > r) {
    dw = h * ir;
    dx = x - (dw - w) / 2;
  } else {
    dh = w / ir;
    dy = y - (dh - h) * focusY;
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}

function makeStudioEnvironment(three, renderer) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const sky = ctx.createLinearGradient(0, 0, 0, 256);
  sky.addColorStop(0, '#3a3b40');
  sky.addColorStop(0.42, '#1c1d21');
  sky.addColorStop(0.55, '#101114');
  sky.addColorStop(1, '#050506');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 512, 256);

  const softbox = (x, y, w, h, a) => {
    const g = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, Math.max(w, h) / 2);
    g.addColorStop(0, `rgba(255,252,246,${a})`);
    g.addColorStop(0.6, `rgba(255,252,246,${a * 0.55})`);
    g.addColorStop(1, 'rgba(255,252,246,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  };
  softbox(70, 20, 150, 90, 1);
  softbox(210, 40, 120, 70, 0.85);
  softbox(200, 150, 220, 40, 0.3);
  softbox(394, 28, 4, 204, 2.3);

  const equirect = new three.Texture(canvas);
  equirect.mapping = three.EquirectangularReflectionMapping;
  equirect.colorSpace = three.SRGBColorSpace;
  equirect.needsUpdate = true;
  const pmrem = new three.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(equirect).texture;
  equirect.dispose();
  pmrem.dispose();
  return env;
}

function makeFoilMaterial(three, map, alphaMap) {
  const mat = new three.MeshPhysicalMaterial({
    color: 0x202026,
    map,
    emissive: 0xffffff,
    emissiveMap: map,
    emissiveIntensity: 0.5,
    alphaMap: alphaMap ?? undefined,
    transparent: true,
    opacity: 0.55,
    roughness: 0.2,
    metalness: 0.85,
    depthWrite: false,
    envMapIntensity: 1.6,
  });
  mat.iridescence = 1;
  mat.iridescenceIOR = 1.5;
  mat.iridescenceThicknessRange = [120, 520];
  return mat;
}

function parseColor(color) {
  if (!color) return null;
  const hex = color.trim();
  if (hex.startsWith('#') && hex.length === 7) {
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  }
  const m = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(hex);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function isDark(color) {
  const rgb = parseColor(color);
  if (!rgb) return true;
  const [r, g, b] = rgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

function drawCord(ctx, w, h, color) {
  const dark = isDark(color);
  const hi = dark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.4)';
  const lo = dark ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.18)';
  const strands = 6;
  const pitch = h / 2;
  ctx.lineCap = 'butt';
  for (let s = 0; s < strands; s++) {
    const x0 = (s / strands) * w;
    ctx.lineWidth = w / strands;
    ctx.strokeStyle = s % 2 === 0 ? hi : lo;
    for (const off of [-w, 0, w]) {
      ctx.beginPath();
      ctx.moveTo(x0 + off, 0);
      ctx.lineTo(x0 + off + w, pitch);
      ctx.moveTo(x0 + off, pitch);
      ctx.lineTo(x0 + off + w, h);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.28)';
  ctx.lineWidth = 2;
  for (let s = 0; s <= strands; s++) {
    const x0 = (s / strands) * w;
    for (const off of [-w, 0, w]) {
      ctx.beginPath();
      ctx.moveTo(x0 + off, 0);
      ctx.lineTo(x0 + off + w, pitch);
      ctx.moveTo(x0 + off, pitch);
      ctx.lineTo(x0 + off + w, h);
      ctx.stroke();
    }
  }
}

function drawStrap(canvas, ticket) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = ticket.strapColor || '#0048DE';
  ctx.fillRect(0, 0, w, h);

  if (ticket.strapStyle === 'cord') {
    drawCord(ctx, w, h, ticket.strapColor);
    return;
  }

  const dark = isDark(ticket.strapColor);
  const lightHatch = dark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.28)';
  const darkHatch = dark ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1.2;
  for (let i = -h; i < w + h; i += 5) {
    ctx.strokeStyle = i % 10 === 0 ? lightHatch : darkHatch;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i + h, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  const selvedge = dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.2)';
  ctx.fillStyle = selvedge;
  for (const u of [0, 0.5]) {
    ctx.fillRect(Math.round(w * u) - 3, 0, 6, h);
  }

  const text = ticket.strapText;
  if (!text) return;
  const print = `${text.toUpperCase()}   •   `;
  ctx.fillStyle = dark ? 'rgba(244,243,240,0.92)' : 'rgba(10,10,10,0.85)';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.font = `${fontStyleOf(ticket.metaFont)} ${fontWeightOf(ticket.metaFont, 600)} 50px ${fontFamilyOf(ticket.metaFont)}`;
  const runW = Math.max(1, ctx.measureText(print).width);
  const runs = Math.max(1, Math.round(h / runW));
  const stretch = h / (runs * runW);
  const bandU = [0.25, 0.75];
  for (const u of bandU) {
    ctx.save();
    ctx.translate(w * u, 0);
    ctx.rotate(Math.PI / 2);
    ctx.scale(stretch, -1);
    for (let i = 0; i < runs; i++) {
      ctx.fillText(print, i * runW, 0);
    }
    ctx.restore();
  }
}

function edgeTone(three, paper) {
  const color = new three.Color(paper);
  if (isDark(paper)) {
    color.lerp(new three.Color(0xffffff), 0.16);
  } else {
    color.multiplyScalar(0.9);
  }
  return color;
}

function makeNormalTexture(three, size, heightAt, scale, repeatX, repeatY) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      height[y * size + x] = heightAt((x / size) * Math.PI * 2, (y / size) * Math.PI * 2);
    }
  }
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = height[y * size + ((x + size - 1) % size)];
      const r = height[y * size + ((x + 1) % size)];
      const t = height[((y + size - 1) % size) * size + x];
      const b = height[((y + 1) % size) * size + x];
      const nx = (l - r) * scale;
      const ny = (t - b) * scale;
      const len = Math.hypot(nx, ny, 1);
      const o = (y * size + x) * 4;
      img.data[o] = Math.round(((nx / len) * 0.5 + 0.5) * 255);
      img.data[o + 1] = Math.round(((ny / len) * 0.5 + 0.5) * 255);
      img.data[o + 2] = Math.round(((1 / len) * 0.5 + 0.5) * 255);
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const map = new three.CanvasTexture(canvas);
  map.wrapS = three.RepeatWrapping ?? 1000;
  map.wrapT = three.RepeatWrapping ?? 1000;
  map.repeat.set(repeatX, repeatY);
  map.colorSpace = three.NoColorSpace;
  map.needsUpdate = true;
  return map;
}

function softWobble(u, v) {
  return Math.sin(u + Math.cos(v * 2) * 1.1) * 0.6 + Math.sin(v * 2 - Math.sin(u) * 0.9) * 0.4;
}

function crispWobble(u, v) {
  return (
    Math.sin(u * 1.6 + Math.cos(v * 2) * 1.1) * 0.55 +
    Math.sin(v * 2 - Math.sin(u * 1.5) * 0.9) * 0.32 +
    Math.sin((u + v) * 3.2 + Math.cos(u * 2.4) * 0.6) * 0.08
  );
}

function linenWeave(u, v) {
  const warp = Math.sin(u * 16);
  const weft = Math.sin(v * 16);
  const over = Math.sign(Math.sin(u * 8) * Math.sin(v * 8));
  return warp * warp * 0.42 * (1 + over * 0.22) + weft * weft * 0.42 * (1 - over * 0.22);
}

function makeHoloTexture(three) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;
    const g = ctx.createLinearGradient(0, 0, w, h * 0.35);
    g.addColorStop(0, '#ff4fa3');
    g.addColorStop(0.16, '#ffb347');
    g.addColorStop(0.3, '#e9ff5a');
    g.addColorStop(0.46, '#3cf2c8');
    g.addColorStop(0.62, '#3aa0ff');
    g.addColorStop(0.8, '#b06cff');
    g.addColorStop(1, '#ff4fa3');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'overlay';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 3) {
      ctx.strokeStyle = i % 6 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h * 0.6, h);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'soft-light';
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 14;
    for (let i = -h; i < w + h; i += 96) {
      ctx.beginPath();
      ctx.moveTo(i, h);
      ctx.lineTo(i + h * 0.9, 0);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (let n = 0; n < 220; n++) {
      const x = (n * 137) % w;
      const y = (n * 89) % h;
      ctx.fillStyle = `rgba(255,255,255,${n % 3 === 0 ? 0.95 : 0.5})`;
      ctx.fillRect(x, y, n % 4 === 0 ? 2 : 1, 1);
    }
  }
  const map = new three.CanvasTexture(canvas);
  map.wrapS = three.RepeatWrapping ?? 1000;
  map.wrapT = three.RepeatWrapping ?? 1000;
  map.repeat.set(1.4, 1.9);
  map.anisotropy = 4;
  map.needsUpdate = true;
  return map;
}

function drawDefaultPhoto(ctx, x, y, w, h, accent) {
  ctx.save();
  ctx.beginPath();
  const rr = 14;
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
  ctx.clip();
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, accent || '#0048DE');
  g.addColorStop(0.55, '#161922');
  g.addColorStop(1, '#080A0F');
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);

  const lights = [
    [0.22, 0.28, 18, 0.35],
    [0.7, 0.22, 26, 0.28],
    [0.48, 0.55, 14, 0.4],
    [0.18, 0.72, 22, 0.22],
    [0.8, 0.68, 16, 0.3],
    [0.4, 0.38, 10, 0.45],
  ];
  for (const [px, py, r, a] of lights) {
    const lg = ctx.createRadialGradient(x + w * px, y + h * py, 0, x + w * px, y + h * py, r);
    lg.addColorStop(0, `rgba(244,243,240,${a})`);
    lg.addColorStop(1, 'rgba(244,243,240,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();
}

function drawNdMark() {
  // Removed template folded geometric mark
}

function barcodeBars(value) {
  const src = value.length > 0 ? value : 'PASS';
  const bars = [];
  let hash = 2166136261;
  for (let i = 0; i < src.length; i++) {
    hash ^= src.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
    const bits = Math.abs(hash);
    bars.push({ width: (bits % 3) + 1, ink: true });
    bars.push({ width: ((bits >>> 3) % 2) + 1, ink: false });
    bars.push({ width: ((bits >>> 5) % 3) + 1, ink: true });
    bars.push({ width: 1, ink: false });
  }
  return bars;
}

function muteInk(ink) {
  return inkAlpha(ink, 0.55);
}

function inkAlpha(ink, alpha) {
  const rgb = parseColor(ink);
  if (!rgb) return ink;
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function washPaper(ctx, paper, w, h, startY) {
  const g = ctx.createLinearGradient(0, startY, 0, h);
  g.addColorStop(0, inkAlpha(paper, 0));
  g.addColorStop(0.28, inkAlpha(paper, 0.22));
  g.addColorStop(0.58, inkAlpha(paper, 0.88));
  g.addColorStop(1, inkAlpha(paper, 1));
  ctx.fillStyle = g;
  ctx.fillRect(0, Math.max(0, startY), w, Math.max(0, h - startY));
}

function scrimTop(ctx, paper, w, depth) {
  const g = ctx.createLinearGradient(0, 0, 0, depth);
  g.addColorStop(0, inkAlpha(paper, 0.55));
  g.addColorStop(0.55, inkAlpha(paper, 0.18));
  g.addColorStop(1, inkAlpha(paper, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, depth);
}

function pathRoundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, w, h, r) {
  pathRoundRect(ctx, x, y, w, h, r);
  ctx.fill();
}

function paintMaskRect(ctx, x, y, w, h, r, strength = 1) {
  const level = Math.round(clamp(strength, 0, 1) * 255);
  ctx.fillStyle = `rgb(${level}, ${level}, ${level})`;
  fillRoundRect(ctx, x, y, w, h, r);
}

function paintMaskImage(ctx, img, x, y, w, h) {
  const scratch = document.createElement('canvas');
  scratch.width = Math.max(1, Math.round(w));
  scratch.height = Math.max(1, Math.round(h));
  const s = scratch.getContext('2d');
  if (!s) return;
  drawContained(s, img, 0, 0, scratch.width, scratch.height);
  s.globalCompositeOperation = 'source-in';
  s.fillStyle = '#ffffff';
  s.fillRect(0, 0, scratch.width, scratch.height);
  ctx.drawImage(scratch, x, y, w, h);
}

function fitFont(ctx, text, font, startPx, minPx, maxW) {
  let px = startPx;
  const weight = fontWeightOf(font, 600);
  while (px > minPx) {
    setPrintFont(ctx, font, px, weight);
    if (ctx.measureText(text).width <= maxW) break;
    px -= 2;
  }
  setPrintFont(ctx, font, px, weight);
  return px;
}

function wrapName(ctx, text, maxW, font, size, minSize) {
  const weight = fontWeightOf(font, 600);
  setPrintFont(ctx, font, size, weight);
  if (ctx.measureText(text).width <= maxW) {
    return { lines: [text], px: size };
  }
  const words = text.split(/\s+/).filter(Boolean);
  let lines = [text];
  if (words.length >= 2) {
    let best = 1;
    let bestBad = Infinity;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' ');
      const b = words.slice(i).join(' ');
      const bad = Math.abs(ctx.measureText(a).width - ctx.measureText(b).width);
      if (bad < bestBad) {
        bestBad = bad;
        best = i;
      }
    }
    lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')];
  }
  const widest = Math.max(...lines.map((line) => ctx.measureText(line).width));
  const px =
    widest <= maxW
      ? size
      : fitFont(ctx, lines.reduce((a, b) => (a.length >= b.length ? a : b)), font, size, minSize, maxW);
  return { lines, px };
}

function hairline(ctx, x, y, w, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
}

function drawFront(canvas, mask, ticket) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const pad = ticket.pad || 48;
  const col = w - pad * 2;
  const mark = 64;
  const markX = pad;
  const markY = pad;
  const nameSize = parsePx(ticket.nameFont.fontSize, 78, 54, 96);
  const metaSize = parsePx(ticket.metaFont.fontSize, 26, 18, 36);
  const numberSize = parsePx(ticket.numberFont.fontSize, 50, 32, 64);
  const cap = 18;
  const barH = 46;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = ticket.paper || '#0A0C12';
  ctx.fillRect(0, 0, w, h);

  // 1. Photo (Full cover of the man with backwards cap)
  if (ticket.photo) {
    drawContained(ctx, ticket.photo, 0, 0, w, h, 0.24);
  } else {
    drawDefaultPhoto(ctx, 0, 0, w, h, ticket.accent);
  }

  // 2. Smooth gradient washes for typography legibility
  scrimTop(ctx, ticket.paper, w, pad * 2.2);
  washPaper(ctx, ticket.paper, w, h, Math.round(h * 0.50));

  // 3. Top Left: Folded ribbon geometric mark
  if (ticket.logo) {
    ctx.save();
    pathRoundRect(ctx, markX, markY, mark, mark, 4);
    ctx.clip();
    drawContained(ctx, ticket.logo, markX, markY, mark, mark);
    ctx.restore();
  }

  // 4. Top Right: Event / Session Title & Date
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  if (ticket.eventName) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    setPrintFont(ctx, ticket.metaFont, cap, 600);
    ctx.fillText(ticket.eventName.toUpperCase(), w - pad, pad + 4);
  }
  if (ticket.eventDate) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    setPrintFont(ctx, ticket.metaFont, 22, 500);
    ctx.fillText(ticket.eventDate, w - pad, pad + cap + 12);
  }

  // 5. Main Title & Role (Pratham Survase / UI/UX Designer)
  const nameY = h - pad - 235;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  const effectiveNameSize = fitFont(ctx, ticket.attendeeName, ticket.nameFont, nameSize, 40, col);
  setPrintFont(ctx, ticket.nameFont, effectiveNameSize, 700);
  ctx.fillText(ticket.attendeeName, pad, nameY);

  if (ticket.ticketType) {
    ctx.fillStyle = ticket.accent || '#C3FF48';
    setPrintFont(ctx, ticket.metaFont, metaSize, 600);
    ctx.fillText(ticket.ticketType, pad, nameY + effectiveNameSize + 10);

    // Accent line under role
    ctx.fillStyle = ticket.accent || '#C3FF48';
    ctx.fillRect(pad, nameY + effectiveNameSize + metaSize + 16, 42, 3);
  }

  // 6. Bottom Row: Barcode (Left) & Ticket Number (Right)
  let numberW = 0;
  if (ticket.ticketNumber) {
    ctx.fillStyle = 'rgba(240, 244, 250, 0.9)';
    setPrintFont(ctx, ticket.numberFont, numberSize, 700);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    numberW = ctx.measureText(ticket.ticketNumber).width;
    ctx.fillText(ticket.ticketNumber, w - pad, h - pad - 6);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
  }

  if (ticket.barcodeValue) {
    const bars = barcodeBars(ticket.barcodeValue);
    const barW = Math.round(clamp(col - numberW - 60, col * 0.38, col * 0.52));
    const barY = h - pad - 26 - barH;
    const total = bars.reduce((sum, bar) => sum + bar.width, 0) || 1;
    let x = pad;
    for (const bar of bars) {
      const bw = (bar.width / total) * barW;
      if (bar.ink) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, barY, Math.max(1, bw), barH);
      }
      x += bw;
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    setPrintFont(ctx, ticket.metaFont, 16, 500);
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(ticket.barcodeValue, pad, h - pad - 6);
    ctx.textBaseline = 'top';
  }

  if (mask) {
    const m = mask.getContext('2d');
    if (m) {
      m.clearRect(0, 0, w, h);
      m.fillStyle = '#000000';
      m.fillRect(0, 0, w, h);
      if (ticket.logo) {
        paintMaskImage(m, ticket.logo, markX, markY, mark, mark);
      }
    }
  }
}

function drawBack(canvas, mask, ticket) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const pad = ticket.pad;
  const mark = Math.round(w * 0.42);
  const markX = Math.round((w - mark) / 2);
  const markY = Math.round(h * 0.28);
  const darkPaper = isDark(ticket.paper);
  const bg = darkPaper ? ticket.paper : ticket.ink;
  const fg = darkPaper ? ticket.ink : ticket.paper;
  ctx.clearRect(0, 0, w, h);
  if (ticket.backArt) {
    drawContained(ctx, ticket.backArt, 0, 0, w, h);
    ctx.fillStyle = inkAlpha(bg, 0.46);
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.strokeStyle = inkAlpha(fg, 0.12);
  ctx.lineWidth = 2;
  ctx.strokeRect(pad * 0.45, pad * 0.45, w - pad * 0.9, h - pad * 0.9);

  if (ticket.eventName) {
    ctx.fillStyle = inkAlpha(fg, 0.55);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    setPrintFont(ctx, ticket.metaFont, parsePx(ticket.metaFont.fontSize, 22, META_MIN, META_MAX), fontWeightOf(ticket.metaFont, 500));
    ctx.fillText(ticket.eventName.toUpperCase(), w / 2, pad, w - pad * 2);
  }
  if (ticket.logo) {
    drawContained(ctx, ticket.logo, markX, markY, mark, mark);
  }
  const line = ticket.reverseLine;
  if (line) {
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    fitFont(ctx, line, ticket.numberFont, 56, 30, w - pad * 2);
    ctx.fillText(line, w / 2, markY + mark + typeGap(mark * 0.12, 56, pad));
  }
  if (mask) {
    const m = mask.getContext('2d');
    if (m) {
      m.clearRect(0, 0, w, h);
      m.fillStyle = '#000000';
      m.fillRect(0, 0, w, h);
      if (ticket.backArt) {
        paintMaskRect(m, 0, 0, w, h, 0, 0.28);
      }
      if (ticket.logo) {
        paintMaskImage(m, ticket.logo, markX, markY, mark, mark);
      }
    }
  }
}

function applyMaxDist(a, b, maxDist) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  const dist = Math.hypot(dx, dy, dz);
  if (dist <= maxDist || dist < 1e-8) return;
  const frac = (dist - maxDist) / dist;
  const ox = dx * frac;
  const oy = dy * frac;
  const oz = dz * frac;
  if (a.pinned && b.pinned) return;
  if (a.pinned) {
    b.x -= ox;
    b.y -= oy;
    b.z -= oz;
    return;
  }
  if (b.pinned) {
    a.x += ox;
    a.y += oy;
    a.z += oz;
    return;
  }
  a.x += ox * 0.5;
  a.y += oy * 0.5;
  a.z += oz * 0.5;
  b.x -= ox * 0.5;
  b.y -= oy * 0.5;
  b.z -= oz * 0.5;
}

function applyMinDist(a, b, minDist) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  const dist = Math.hypot(dx, dy, dz);
  if (dist >= minDist || dist < 1e-8) return;
  const frac = (minDist - dist) / dist;
  const ox = dx * frac;
  const oy = dy * frac;
  const oz = dz * frac;
  if (a.pinned && b.pinned) return;
  if (a.pinned) {
    b.x += ox;
    b.y += oy;
    b.z += oz;
    return;
  }
  if (b.pinned) {
    a.x -= ox;
    a.y -= oy;
    a.z -= oz;
    return;
  }
  a.x -= ox * 0.5;
  a.y -= oy * 0.5;
  a.z -= oz * 0.5;
  b.x += ox * 0.5;
  b.y += oy * 0.5;
  b.z += oz * 0.5;
}

function particle(x, y, z, pinned = false) {
  return { x, y, z, ox: x, oy: y, oz: z, pinned };
}

function integrateParticle(p, dt, grav, damp) {
  if (p.pinned) {
    p.ox = p.x;
    p.oy = p.y;
    p.oz = p.z;
    return;
  }
  const vx = (p.x - p.ox) * damp;
  const vy = (p.y - p.oy) * damp;
  const vz = (p.z - p.oz) * damp;
  p.ox = p.x;
  p.oy = p.y;
  p.oz = p.z;
  p.x += vx;
  p.y += vy + grav * dt * dt;
  p.z += vz;
}

function makeTubeGeometry(three, pathSegs, radialSegs) {
  const geometry = new three.BufferGeometry();
  const rings = pathSegs + 1;
  const cols = radialSegs + 1;
  const positions = new Float32Array(rings * cols * 3);
  const normals = new Float32Array(rings * cols * 3);
  const uvs = new Float32Array(rings * cols * 2);
  const index = [];
  for (let i = 0; i <= pathSegs; i++) {
    for (let j = 0; j <= radialSegs; j++) {
      const u = i * cols + j;
      uvs[u * 2] = j / radialSegs;
      uvs[u * 2 + 1] = i / pathSegs;
    }
  }
  for (let i = 0; i < pathSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * cols + j;
      const b = (i + 1) * cols + j;
      const c = (i + 1) * cols + j + 1;
      const d = i * cols + j + 1;
      index.push(a, b, d, b, c, d);
    }
  }
  geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new three.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new three.BufferAttribute(uvs, 2));
  geometry.setIndex(index);
  return { geometry, positions, normals, pathSegs, radialSegs };
}

function updateWebbing(three, points, camera, clipSideWorld, halfW, halfT, strap) {
  if (points.length < 2) return;
  const curve = new three.CatmullRomCurve3(points, false, 'catmullrom', 0.45);
  const cols = strap.radialSegs + 1;
  const tan = new three.Vector3();
  const view = new three.Vector3();
  const sideCam = new three.Vector3();
  const sideClip = new three.Vector3();
  const side = new three.Vector3();
  const bin = new three.Vector3();
  const n = new three.Vector3();
  for (let i = 0; i <= strap.pathSegs; i++) {
    const t = i / strap.pathSegs;
    const p = curve.getPoint(t);
    tan.copy(curve.getTangent(t));
    if (tan.lengthSq() < 1e-8) tan.set(0, -1, 0);
    else tan.normalize();
    view.subVectors(camera.position, p);
    if (view.lengthSq() < 1e-8) view.set(0, 0, 1);
    else view.normalize();
    sideCam.crossVectors(tan, view);
    if (sideCam.lengthSq() < 1e-8) {
      sideCam.set(1, 0, 0);
      sideCam.cross(tan);
    }
    if (sideCam.lengthSq() < 1e-8) sideCam.set(1, 0, 0);
    else sideCam.normalize();
    sideClip.copy(clipSideWorld);
    sideClip.addScaledVector(tan, -sideClip.dot(tan));
    if (sideClip.lengthSq() < 1e-8) sideClip.copy(sideCam);
    else sideClip.normalize();
    if (sideClip.dot(sideCam) < 0) sideClip.negate();
    const twist = t < 0.55 ? 0 : (t - 0.55) / 0.45;
    const k = twist * twist * (3 - 2 * twist);
    side.lerpVectors(sideCam, sideClip, k);
    if (side.lengthSq() < 1e-8) side.copy(sideCam);
    else side.normalize();
    bin.crossVectors(tan, side).normalize();
    for (let j = 0; j <= strap.radialSegs; j++) {
      const v = (j / strap.radialSegs) * Math.PI * 2;
      const cx = Math.cos(v);
      const sy = Math.sin(v);
      n.set(
        (cx / halfW) * side.x + (sy / halfT) * bin.x,
        (cx / halfW) * side.y + (sy / halfT) * bin.y,
        (cx / halfW) * side.z + (sy / halfT) * bin.z
      );
      if (n.lengthSq() < 1e-8) n.copy(side);
      else n.normalize();
      const o = (i * cols + j) * 3;
      strap.positions[o] = p.x + cx * side.x * halfW + sy * bin.x * halfT;
      strap.positions[o + 1] = p.y + cx * side.y * halfW + sy * bin.y * halfT;
      strap.positions[o + 2] = p.z + cx * side.z * halfW + sy * bin.z * halfT;
      strap.normals[o] = n.x;
      strap.normals[o + 1] = n.y;
      strap.normals[o + 2] = n.z;
    }
  }
  const pos = strap.geometry.getAttribute('position');
  const nor = strap.geometry.getAttribute('normal');
  pos.needsUpdate = true;
  nor.needsUpdate = true;
  strap.geometry.computeBoundingSphere();
}

/**
 * LanyardPass
 * Interactive 3D Employee Pass & Ticket Badge on rope lanyard with physics.
 */
export default function LanyardPass(props) {
  const content = { ...DEFAULT_CONTENT, ...props.content };
  const look = { ...DEFAULT_LOOK, ...props.look };
  const light = { ...DEFAULT_LIGHT, ...props.light };
  const layout = { ...DEFAULT_LAYOUT, ...props.layout };
  const { style, className = '' } = props;

  const attendeeName = visibleText(content.attendeeName) ?? 'Pratham Survase';
  const ticketType = visibleText(content.ticketType);
  const ticketNumber = visibleText(content.ticketNumber);
  const eventName = visibleText(content.eventName);
  const eventDate = visibleText(content.eventDate);
  const barcodeValue = visibleText(content.barcodeValue) ?? '';
  const reverse = reverseLine(visibleText(content.backText), content.backLine, ticketNumber, attendeeName, eventName);
  const strapText = visibleText(content.strapText) ?? eventName;
  const paper = asText(look.paper) || PAPER;
  const ink = asText(look.ink) || INK;
  const accent = asText(look.accent) || ACCENT;
  const strapColor = asText(look.strapColor) || STRAP;
  const strapStyle = asStrapStyle(look.strapStyle);
  const finish = asFinish(look.finish);
  const sleeveTexture = asSleeveTexture(look.sleeveTexture);
  const photoFit = asPhotoFit(look.photoFit);
  const foil = asFoil(look.foil);
  const sleeveOn = Boolean(look.sleeve);
  const lightAngle = clamp(typeof light.angle === 'number' ? light.angle : DEFAULT_LIGHT.angle, -180, 180);
  const lightHeight = clamp(typeof light.height === 'number' ? light.height : DEFAULT_LIGHT.height, -20, 85);
  const lightIntensity = clamp(typeof light.intensity === 'number' ? light.intensity : DEFAULT_LIGHT.intensity, 0, 2);
  const rimOn = light.rim !== false;
  const logoSrc = imageSrc(look.logo);
  const photoSrc = imageSrc(look.photo);
  const backArtSrc = imageSrc(look.backArt);
  const size = clampSize(typeof layout.size === 'number' ? layout.size : DEFAULT_LAYOUT.size);
  const padding = clampPad(typeof layout.padding === 'number' ? layout.padding : DEFAULT_LAYOUT.padding);
  const stackGap = clampStackGap(typeof layout.stackGap === 'number' ? layout.stackGap : DEFAULT_LAYOUT.stackGap);
  const targetXVal = typeof layout.targetX === 'number' ? layout.targetX : DEFAULT_LAYOUT.targetX;
  const nameFont = asPrintFont(look.nameFont, DEFAULT_NAME_FONT);
  const metaFont = asPrintFont(look.metaFont, DEFAULT_META_FONT);
  const numberFont = asPrintFont(look.numberFont, DEFAULT_NUMBER_FONT);

  const typeKey = [
    fontFamilyOf(nameFont),
    nameFont.fontSize,
    fontWeightOf(nameFont, 600),
    fontStyleOf(nameFont),
    letterSpacingOf(nameFont, '-0.045em'),
    nameFont.lineHeight,
    fontFamilyOf(metaFont),
    metaFont.fontSize,
    fontWeightOf(metaFont, 400),
    fontStyleOf(metaFont),
    letterSpacingOf(metaFont, '0.01em'),
    fontFamilyOf(numberFont),
    numberFont.fontSize,
    fontWeightOf(numberFont, 600),
    fontStyleOf(numberFont),
    letterSpacingOf(numberFont, '-0.04em'),
  ].join('|');

  const thicknessMm = clamp(typeof layout.thickness === 'number' ? layout.thickness : DEFAULT_LAYOUT.thickness, THICK_MIN, THICK_MAX);
  const depth = thicknessMm / MM_PER_UNIT;
  const prefersReducedMotion = useReducedMotion();
  const freeze = Boolean(prefersReducedMotion);

  const [status, setStatus] = useState('boot');
  const rootRef = useRef(null);
  const engineRef = useRef(null);
  const freezeRef = useRef(freeze);
  freezeRef.current = freeze;
  const dropTriggerRef = useRef(Boolean(props.dropTrigger));
  dropTriggerRef.current = Boolean(props.dropTrigger);

  const ticketRef = useRef({
    attendeeName,
    ticketType,
    ticketNumber,
    eventName,
    eventDate,
    barcodeValue,
    paper,
    ink,
    accent,
    pad: padding,
    stackGap,
    nameFont,
    metaFont,
    numberFont,
    reverseLine: reverse,
    strapColor,
    strapStyle,
    strapText,
    logo: null,
    photo: null,
    backArt: null,
    photoFit,
  });

  ticketRef.current = {
    attendeeName,
    ticketType,
    ticketNumber,
    eventName,
    eventDate,
    barcodeValue,
    paper,
    ink,
    accent,
    pad: padding,
    stackGap,
    nameFont,
    metaFont,
    numberFont,
    reverseLine: reverse,
    strapColor,
    strapStyle,
    strapText,
    logo: ticketRef.current.logo,
    photo: ticketRef.current.photo,
    backArt: ticketRef.current.backArt,
    photoFit,
  };

  const artRef = useRef({ logo: null, photo: null, backArt: null });
  const foilRef = useRef(foil);
  foilRef.current = foil;
  const sleeveRef = useRef(sleeveOn);
  sleeveRef.current = sleeveOn;
  const finishRef = useRef(finish);
  finishRef.current = finish;
  const sleeveTexRef = useRef(sleeveTexture);
  sleeveTexRef.current = sleeveTexture;
  const lightRef = useRef({ angle: lightAngle, height: lightHeight, intensity: lightIntensity, rim: rimOn });
  lightRef.current = { angle: lightAngle, height: lightHeight, intensity: lightIntensity, rim: rimOn };
  const depthRef = useRef(depth);
  depthRef.current = depth;
  const targetXRef = useRef(targetXVal);
  targetXRef.current = targetXVal;

  const stageH = useMemo(() => Math.round(size * 1.72), [size]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const host = rootRef.current;
    if (!host) return;

    let cancelled = false;
    let dispose;

    void (async () => {
      try {
        const stage = rootRef.current;
        if (cancelled || !stage) return;
        const stageEl = stage;
        const clipY = 2.05;
        const cardHalfH = CARD_H / 2;

        function hangY() {
          return cardHalfH + (sleeveRef.current ? SLEEVE_HEAD : 0);
        }
        function drop() {
          return hangY() - HOLE;
        }

        const clip = particle(0, clipY, 0, true);
        const joints = [];
        for (let i = 0; i < JOINTS; i++) {
          joints.push(particle(0, clipY - SEG_LEN * (i + 1), 0));
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
        camera.position.set(CAM_X, CAM_Y, CAM_Z);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, CAM_LOOK_Y, 0);
        camera.updateMatrixWorld(true);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        if ('SRGBColorSpace' in THREE) {
          renderer.outputColorSpace = THREE.SRGBColorSpace;
        }
        renderer.shadowMap.enabled = false;
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.touchAction = 'none';
        renderer.domElement.style.cursor = 'grab';
        stageEl.appendChild(renderer.domElement);

        const envMap = makeStudioEnvironment(THREE, renderer);
        if (envMap) {
          scene.environment = envMap;
          scene.environmentIntensity = 1.05;
        }

        const hemi = new THREE.HemisphereLight(0xdfdfeb, 0x0b0c0f, 0.22);
        scene.add(hemi);
        const key = new THREE.DirectionalLight(0xf6f6ff, 1.25);
        key.position.set(1.6, 6.4, 3.8);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0x9fb5d6, 0.22);
        fill.position.set(-3.4, 0.6, 3.2);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xbcd1ff, 1.4);
        rim.position.set(-3.2, 2.2, -2.6);
        scene.add(rim);
        const kicker = new THREE.DirectionalLight(0xffffff, 0.55);
        kicker.position.set(2.4, -1.2, -3.4);
        scene.add(kicker);

        const frontCanvas = document.createElement('canvas');
        frontCanvas.width = TEX_W;
        frontCanvas.height = TEX_H;
        const backCanvas = document.createElement('canvas');
        backCanvas.width = TEX_W;
        backCanvas.height = TEX_H;
        const frontMaskCanvas = document.createElement('canvas');
        frontMaskCanvas.width = TEX_W;
        frontMaskCanvas.height = TEX_H;
        const backMaskCanvas = document.createElement('canvas');
        backMaskCanvas.width = TEX_W;
        backMaskCanvas.height = TEX_H;

        drawFront(frontCanvas, frontMaskCanvas, ticketRef.current);
        drawBack(backCanvas, backMaskCanvas, ticketRef.current);

        const frontMap = new THREE.CanvasTexture(frontCanvas);
        const backMap = new THREE.CanvasTexture(backCanvas);
        const frontMaskMap = new THREE.CanvasTexture(frontMaskCanvas);
        const backMaskMap = new THREE.CanvasTexture(backMaskCanvas);
        frontMap.anisotropy = 8;
        backMap.anisotropy = 8;
        frontMap.colorSpace = THREE.SRGBColorSpace;
        backMap.colorSpace = THREE.SRGBColorSpace;
        frontMaskMap.colorSpace = THREE.NoColorSpace;
        backMaskMap.colorSpace = THREE.NoColorSpace;
        frontMap.needsUpdate = true;
        backMap.needsUpdate = true;
        frontMaskMap.needsUpdate = true;
        backMaskMap.needsUpdate = true;

        const edgeMat = new THREE.MeshStandardMaterial({
          color: edgeTone(THREE, ticketRef.current.paper),
          roughness: 0.34,
          metalness: 0.04,
          envMapIntensity: 1.3,
        });
        const frontMat = new THREE.MeshPhysicalMaterial({
          map: frontMap,
          roughness: 0.26,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.55,
        });
        const backMat = new THREE.MeshPhysicalMaterial({
          map: backMap,
          roughness: 0.26,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.55,
        });

        let cardGeo = new THREE.BoxGeometry(CARD_W, CARD_H, depthRef.current);
        const cardMesh = new THREE.Mesh(cardGeo, [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat]);
        scene.add(cardMesh);

        const holoMap = makeHoloTexture(THREE);
        const holoFrontMat = makeFoilMaterial(THREE, holoMap, frontMaskMap);
        const holoBackMat = makeFoilMaterial(THREE, holoMap, backMaskMap);
        const edgeHoloMap = holoMap.clone();
        edgeHoloMap.repeat.set(0.05, 0.12);
        edgeHoloMap.needsUpdate = true;
        const edgeHoloMat = makeFoilMaterial(THREE, edgeHoloMap, null);
        edgeHoloMat.opacity = 0.9;
        edgeHoloMat.depthWrite = true;

        const holoGeo = new THREE.PlaneGeometry(CARD_W * 0.99, CARD_H * 0.99);
        const holoFront = new THREE.Mesh(holoGeo, holoFrontMat);
        holoFront.position.z = depthRef.current / 2 + 0.003;
        holoFront.renderOrder = 1;
        cardMesh.add(holoFront);

        const holoBack = new THREE.Mesh(holoGeo, holoBackMat);
        holoBack.rotation.y = Math.PI;
        holoBack.position.z = -(depthRef.current / 2 + 0.003);
        holoBack.renderOrder = 1;
        cardMesh.add(holoBack);

        const wobble = makeNormalTexture(THREE, 256, softWobble, 3, 0.7, 1);
        const wobbleCrisp = makeNormalTexture(THREE, 256, crispWobble, 3.4, 1, 1.25);
        const linen = makeNormalTexture(THREE, 256, linenWeave, 1.4, 4, 6);

        const sleeveMat = new THREE.MeshPhysicalMaterial({
          color: 0x0b0c0f,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          roughness: 0.07,
          metalness: 0,
          depthWrite: false,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.8,
          specularIntensity: 1,
          normalMap: wobble ?? undefined,
          normalScale: new THREE.Vector2(0.012, 0.012),
          clearcoatNormalMap: wobble ?? undefined,
          clearcoatNormalScale: new THREE.Vector2(0.02, 0.02),
        });

        let sleeveGeo = new THREE.BoxGeometry(CARD_W + SLEEVE_PAD_W, CARD_H + SLEEVE_PAD_H, depthRef.current + SLEEVE_PAD_D);
        const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
        sleeveMesh.position.y = SLEEVE_SHIFT;
        sleeveMesh.renderOrder = 2;
        sleeveMesh.visible = sleeveRef.current;
        cardMesh.add(sleeveMesh);

        const seamW = 0.045;
        const seamOuter = new THREE.Shape();
        const sw = (CARD_W + SLEEVE_PAD_W) / 2;
        const sh = (CARD_H + SLEEVE_PAD_H) / 2;
        seamOuter.moveTo(-sw, -sh);
        seamOuter.lineTo(sw, -sh);
        seamOuter.lineTo(sw, sh);
        seamOuter.lineTo(-sw, sh);
        seamOuter.closePath();
        const seamInner = new THREE.Path();
        seamInner.moveTo(-sw + seamW, -sh + seamW);
        seamInner.lineTo(sw - seamW, -sh + seamW);
        seamInner.lineTo(sw - seamW, sh - seamW);
        seamInner.lineTo(-sw + seamW, sh - seamW);
        seamInner.closePath();
        seamOuter.holes.push(seamInner);

        const openingY = cardHalfH + 0.02 - SLEEVE_SHIFT;
        const opening = new THREE.Shape();
        opening.moveTo(-sw + seamW, openingY - 0.008);
        opening.lineTo(sw - seamW, openingY - 0.008);
        opening.lineTo(sw - seamW, openingY + 0.008);
        opening.lineTo(-sw + seamW, openingY + 0.008);
        opening.closePath();

        const seamGeo = new THREE.ShapeGeometry([seamOuter, opening]);
        const seamMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.14,
          roughness: 0.55,
          metalness: 0,
          depthWrite: false,
          clearcoat: 0.4,
          clearcoatRoughness: 0.4,
          envMapIntensity: 0.9,
        });
        const seamFront = new THREE.Mesh(seamGeo, seamMat);
        const seamBack = new THREE.Mesh(seamGeo, seamMat);
        seamBack.rotation.y = Math.PI;
        for (const seam of [seamFront, seamBack]) {
          seam.renderOrder = 3;
          sleeveMesh.add(seam);
        }

        const headerShape = new THREE.Shape();
        const hw = sw - 0.005;
        const hTop = sh - 0.005;
        const hBot = cardHalfH - SLEEVE_SHIFT + 0.015;
        headerShape.moveTo(-hw, hBot);
        headerShape.lineTo(hw, hBot);
        headerShape.lineTo(hw, hTop);
        headerShape.lineTo(-hw, hTop);
        headerShape.closePath();

        const slotPath = new THREE.Path();
        const slotW = 0.22;
        const slotH = 0.055;
        const slotR = slotH / 2;
        const slotY = (hTop + hBot) / 2;
        slotPath.moveTo(-slotW / 2 + slotR, slotY - slotR);
        slotPath.lineTo(slotW / 2 - slotR, slotY - slotR);
        slotPath.quadraticCurveTo(slotW / 2, slotY - slotR, slotW / 2, slotY);
        slotPath.quadraticCurveTo(slotW / 2, slotY + slotR, slotW / 2 - slotR, slotY + slotR);
        slotPath.lineTo(-slotW / 2 + slotR, slotY + slotR);
        slotPath.quadraticCurveTo(-slotW / 2, slotY + slotR, -slotW / 2, slotY);
        slotPath.quadraticCurveTo(-slotW / 2, slotY - slotR, -slotW / 2 + slotR, slotY - slotR);
        slotPath.closePath();
        headerShape.holes.push(slotPath);

        const headerMat = new THREE.MeshStandardMaterial({
          color: 0x0a0b0e,
          roughness: 0.5,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        const headerGeo = new THREE.ShapeGeometry(headerShape);
        const headerFront = new THREE.Mesh(headerGeo, headerMat);
        const headerBack = new THREE.Mesh(headerGeo, headerMat);
        headerFront.position.z = (depthRef.current + SLEEVE_PAD_D) / 2 + 0.002;
        headerBack.position.z = -((depthRef.current + SLEEVE_PAD_D) / 2 + 0.002);
        headerBack.rotation.y = Math.PI;
        headerFront.renderOrder = 4;
        headerBack.renderOrder = 4;
        sleeveMesh.add(headerFront);
        sleeveMesh.add(headerBack);

        function placeSeams(d) {
          const z = (d + SLEEVE_PAD_D) / 2 + 0.0015;
          seamFront.position.z = z;
          seamBack.position.z = -z;
          headerFront.position.z = z + 0.0005;
          headerBack.position.z = -(z + 0.0005);
        }
        placeSeams(depthRef.current);

        const clipMat = new THREE.MeshStandardMaterial({
          color: 0x2e3035, // gunmetal dark grey
          metalness: 0.85,
          roughness: 0.32,
        });
        const clipShape = new THREE.Shape();
        const cw = 0.26;
        const ch = 0.078;
        const cr = 0.022;
        clipShape.moveTo(-cw / 2 + cr, -ch / 2);
        clipShape.lineTo(cw / 2 - cr, -ch / 2);
        clipShape.quadraticCurveTo(cw / 2, -ch / 2, cw / 2, -ch / 2 + cr);
        clipShape.lineTo(cw / 2, ch / 2 - cr);
        clipShape.quadraticCurveTo(cw / 2, ch / 2, cw / 2 - cr, ch / 2);
        clipShape.lineTo(-cw / 2 + cr, ch / 2);
        clipShape.quadraticCurveTo(-cw / 2, ch / 2, -cw / 2, ch / 2 - cr);
        clipShape.lineTo(-cw / 2, -ch / 2 + cr);
        clipShape.quadraticCurveTo(-cw / 2, -ch / 2, -cw / 2 + cr, -ch / 2);

        const clipGeo = new THREE.ExtrudeGeometry(clipShape, {
          depth: 0.08,
          bevelEnabled: true,
          bevelThickness: 0.008,
          bevelSize: 0.007,
          bevelSegments: 3,
          curveSegments: 6,
        });
        clipGeo.center();
        const badgeClip = new THREE.Mesh(clipGeo, clipMat);
        badgeClip.position.set(0, cardHalfH + 0.016, 0);
        cardMesh.add(badgeClip);

        const clipSlot = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.018, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.2, roughness: 0.8 })
        );
        clipSlot.position.set(0, 0.04, 0);
        badgeClip.add(clipSlot);

        const clipMesh = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.016, 10, 22), clipMat);
        clipMesh.position.set(0, clipY, 0);
        clipMesh.rotation.x = Math.PI / 2;
        scene.add(clipMesh);

        const strap = makeTubeGeometry(THREE, STRAP_SEGS, STRAP_RADIAL);
        const strapCanvas = document.createElement('canvas');
        strapCanvas.width = STRAP_TEX_W;
        strapCanvas.height = STRAP_TEX_H;
        drawStrap(strapCanvas, ticketRef.current);
        const strapMap = new THREE.CanvasTexture(strapCanvas);
        strapMap.colorSpace = THREE.SRGBColorSpace;
        strapMap.wrapS = THREE.RepeatWrapping;
        strapMap.wrapT = THREE.RepeatWrapping;
        strapMap.repeat.set(1, STRAP_REPEAT);
        strapMap.anisotropy = 8;
        strapMap.needsUpdate = true;
        const strapMat = new THREE.MeshStandardMaterial({ map: strapMap, roughness: 0.82, metalness: 0 });
        const strapMesh = new THREE.Mesh(strap.geometry, strapMat);
        scene.add(strapMesh);

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const dragPlane = new THREE.Plane();
        const planeHit = new THREE.Vector3();
        const camDir = new THREE.Vector3();
        const holeWorld = new THREE.Vector3();
        const clipAxis = new THREE.Vector3();
        const faceNormal = new THREE.Vector3();
        const viewDir = new THREE.Vector3();
        const jointPts = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
        const grabOff = { x: 0, y: 0, z: 0 };
        const grabState = { down: false, pointerId: -1, lastT: 0, lastNdcX: 0, vx: 0, vy: 0, vz: 0 };
        let acc = 0;
        let spinY = 0.16;
        let spinVel = 0;
        let simT = 0;
        let lastDepth = depthRef.current;

        function paintTicket() {
          ticketRef.current.logo = artRef.current.logo;
          ticketRef.current.photo = artRef.current.photo;
          ticketRef.current.backArt = artRef.current.backArt;
          drawFront(frontCanvas, frontMaskCanvas, ticketRef.current);
          drawBack(backCanvas, backMaskCanvas, ticketRef.current);
          drawStrap(strapCanvas, ticketRef.current);
          frontMap.needsUpdate = true;
          backMap.needsUpdate = true;
          frontMaskMap.needsUpdate = true;
          backMaskMap.needsUpdate = true;
          strapMap.needsUpdate = true;
          edgeMat.color.copy(edgeTone(THREE, ticketRef.current.paper));
          applyCardLook();
          if (freezeRef.current) presentStill();
        }

        function presentStill() {
          frameCamera();
          syncVisuals();
          renderer.render(scene, camera);
        }

        function applyCardLook() {
          const d = depthRef.current;
          if (Math.abs(d - lastDepth) > 1e-4) {
            lastDepth = d;
            const nextCard = new THREE.BoxGeometry(CARD_W, CARD_H, d);
            cardMesh.geometry.dispose();
            cardMesh.geometry = nextCard;
            cardGeo = nextCard;
            const nextSleeve = new THREE.BoxGeometry(CARD_W + SLEEVE_PAD_W, CARD_H + SLEEVE_PAD_H, d + SLEEVE_PAD_D);
            sleeveMesh.geometry.dispose();
            sleeveMesh.geometry = nextSleeve;
            sleeveGeo = nextSleeve;
            holoFront.position.z = d / 2 + 0.003;
            holoBack.position.z = -(d / 2 + 0.003);
            badgeClip.scale.z = Math.max(1, (d + 0.03) / 0.08);
            placeSeams(d);
          }
          const mode = foilRef.current;
          const marks = foilHasMarks(mode);
          const edges = foilHasEdges(mode);
          holoFront.visible = marks;
          holoBack.visible = marks;
          cardMesh.material = edges
            ? [edgeHoloMat, edgeHoloMat, edgeHoloMat, edgeHoloMat, frontMat, backMat]
            : [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];

          applyLight();
          sleeveMesh.visible = sleeveRef.current;
          badgeClip.position.y = hangY() + 0.016;

          let clearcoat = 1;
          let roughness = 0.26;
          let envMapIntensity = 1.55;
          let normalMap = null;
          let normalScale = 0;

          switch (finishRef.current) {
            case 'gloss':
              clearcoat = 1;
              roughness = 0.26;
              envMapIntensity = 1.55;
              break;
            case 'matte':
              clearcoat = 0;
              roughness = 0.82;
              envMapIntensity = 0.7;
              break;
            case 'linen':
              clearcoat = 0.22;
              roughness = 0.68;
              envMapIntensity = 0.92;
              normalMap = linen;
              normalScale = 0.18;
              break;
            default:
              break;
          }

          if (sleeveRef.current) {
            clearcoat = Math.min(clearcoat, 0.08);
            roughness = Math.max(roughness, 0.62);
            envMapIntensity = Math.min(envMapIntensity, 0.5);
          }

          for (const face of [frontMat, backMat]) {
            face.clearcoat = clearcoat;
            face.roughness = roughness;
            face.envMapIntensity = envMapIntensity;
            if (face.normalMap !== normalMap) {
              face.normalMap = normalMap;
              face.needsUpdate = true;
            }
            face.normalScale.set(normalScale, normalScale);
          }
        }

        let lastLightKey = '';
        function applyLight() {
          const l = lightRef.current;
          const sig = `${l.angle}|${l.height}|${l.intensity}|${l.rim}`;
          if (sig === lastLightKey) return;
          lastLightKey = sig;
          const az = (l.angle * Math.PI) / 180;
          const el = (l.height * Math.PI) / 180;
          const r = 7.5;
          const x = r * Math.cos(el) * Math.sin(az);
          const y = r * Math.sin(el);
          const z = r * Math.cos(el) * Math.cos(az);
          key.position.set(x, y, z);
          key.intensity = 1.25 * l.intensity;
          fill.position.set(-x * 0.7, Math.max(0.4, y * 0.1), Math.abs(z) * 0.85);
          fill.intensity = 0.22 * l.intensity;
          rim.position.set(-x * 0.75, Math.max(1.2, y * 0.35), -Math.abs(z) * 0.7);
          rim.intensity = l.rim ? 1.4 * l.intensity : 0;
          kicker.position.set(x * 0.6, -1.2, -Math.abs(z) * 0.9);
          kicker.intensity = l.rim ? 0.55 * l.intensity : 0.2 * l.intensity;
          hemi.intensity = 0.22 * l.intensity;
          scene.environmentIntensity = 1.05 * l.intensity;
          scene.environmentRotation.set(0, ((l.angle - DEFAULT_LIGHT.angle) * Math.PI) / 180, 0);
        }

        function poseHang(angle) {
          for (let i = 0; i < JOINTS; i++) {
            const dist = SEG_LEN * (i + 1);
            const j = joints[i];
            j.x = Math.sin(angle) * dist;
            j.y = clipY - Math.cos(angle) * dist;
            j.z = 0;
            j.ox = j.x;
            j.oy = j.y;
            j.oz = j.z;
            j.pinned = false;
          }
        }

        function solveRope() {
          const min = SEG_LEN * 0.34;
          const chain = [clip, ...joints];
          for (let n = 0; n < ROPE_ITERS; n++) {
            for (let i = 0; i < chain.length - 1; i++) {
              applyMaxDist(chain[i], chain[i + 1], SEG_LEN);
              applyMinDist(chain[i], chain[i + 1], min);
            }
          }
          const floor = clipY - SEG_LEN * JOINTS * 1.45;
          for (const joint of joints) {
            if (joint.y > clipY - 0.03) joint.y = clipY - 0.03;
            if (joint.y < floor) joint.y = floor;
            joint.z *= 0.92;
          }
        }

        function simulate() {
          const hole = joints[JOINTS - 1];
          hole.pinned = grabState.down;
          for (const joint of joints) {
            integrateParticle(joint, DT, GRAVITY, AIR);
          }
          solveRope();
          simT += DT;
          if (!grabState.down) {
            const turn = Math.PI * 2;
            const home = Math.round(spinY / turn) * turn;
            const sway = Math.sin(simT * 0.55) * 0.07;
            const target = home + sway;
            const fast = Math.abs(spinVel) > 1.6;
            if (fast) {
              spinVel *= 0.985;
            } else {
              spinVel += (target - spinY) * IDLE_SPRING * DT;
              spinVel *= Math.pow(IDLE_DAMP, DT * 60);
            }
            spinY += spinVel * DT;
            hole.x += Math.sin(simT * 0.7) * 45e-5;
          }
        }

        function settle() {
          poseHang(0);
          for (let i = 0; i < 48; i++) simulate();
          spinY = 0.16;
          spinVel = 0;
        }

        function cardCenter() {
          const hole = joints[JOINTS - 1];
          return { x: hole.x, y: hole.y - drop(), z: hole.z };
        }

        function syncVisuals() {
          const hole = joints[JOINTS - 1];
          const reach = SEG_LEN * JOINTS || 1;
          const swing = clamp(hole.x / reach, -1, 1);
          const lift = clamp((clipY - SEG_LEN * JOINTS - hole.y) / reach, -1, 1);
          cardMesh.position.set(hole.x, hole.y - drop(), hole.z);
          cardMesh.rotation.set(-0.18 + lift * 0.22, spinY, swing * 0.12);
          cardMesh.updateMatrixWorld(true);

          jointPts[0].set(clip.x, clip.y, clip.z);
          jointPts[1].set(joints[0].x, joints[0].y, joints[0].z);
          jointPts[2].set(joints[1].x, joints[1].y, joints[1].z);
          holeWorld.set(0, hangY() + 0.02, 0);
          holeWorld.applyMatrix4(cardMesh.matrixWorld);
          jointPts[3].copy(holeWorld);

          clipAxis.set(1, 0, 0);
          clipAxis.transformDirection(cardMesh.matrixWorld);
          const cord = ticketRef.current.strapStyle === 'cord';
          updateWebbing(THREE, jointPts, camera, clipAxis, cord ? CORD_R : STRAP_HALF_W, cord ? CORD_R : STRAP_HALF_T, strap);
          const repeat = cord ? CORD_REPEAT : STRAP_REPEAT;
          if (strapMap.repeat.y !== repeat) {
            strapMap.repeat.set(1, repeat);
            strapMat.roughness = cord ? 0.7 : 0.82;
            badgeClip.scale.x = cord ? 0.6 : 1;
          }
          applyCardLook();

          const mode = foilRef.current;
          if (foilHasMarks(mode) || foilHasEdges(mode)) {
            faceNormal.set(0, 0, 1);
            faceNormal.transformDirection(cardMesh.matrixWorld);
            viewDir.subVectors(camera.position, cardMesh.position).normalize();
            const facing = faceNormal.dot(viewDir);
            const glance = clamp((0.92 - Math.abs(facing)) / 0.6, 0, 1);
            const sweep = glance * glance * (3 - 2 * glance);
            holoMap.offset.x = spinY * 0.35 + facing * 0.9;
            holoMap.offset.y = spinY * 0.12 - facing * 0.25;
            edgeHoloMap.offset.x = holoMap.offset.x * 0.6;
            const foilAlpha = 0.5 + 0.35 * sweep;
            const glow = 0.32 + 0.9 * sweep;
            const thick = [110 + sweep * 120, 460 + Math.abs(spinY) * 24];
            holoFrontMat.opacity = foilAlpha;
            holoBackMat.opacity = foilAlpha;
            holoFrontMat.emissiveIntensity = glow;
            holoBackMat.emissiveIntensity = glow;
            holoFrontMat.iridescenceThicknessRange = thick;
            holoBackMat.iridescenceThicknessRange = thick;
            edgeHoloMat.emissiveIntensity = 0.18 + 0.55 * sweep;
            edgeHoloMat.iridescenceThicknessRange = thick;
          }
        }

        function frameCamera() {
          const w = Math.max(1, stageEl.clientWidth);
          const h = Math.max(1, stageEl.clientHeight);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.fov = 30;

          // On desktop (stageEl width > 600px), position camera so the card anchor rests comfortably at targetX from left
          // of canvas, providing huge clearance to the right and completely eliminating any card cropping.
          let camX = 0;
          if (w > 600) {
            const targetX = targetXRef.current ?? 340;
            const vSpan = 2 * CAM_Z * Math.tan((camera.fov * Math.PI) / 360);
            const unitPerPx = vSpan / h;
            camX = (w / 2 - targetX) * unitPerPx;
          }

          camera.position.set(camX, CAM_Y, CAM_Z);
          camera.lookAt(camX, CAM_LOOK_Y, 0);
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld(true);
        }

        function pointerNdc(event) {
          const rect = renderer.domElement.getBoundingClientRect();
          const w = rect.width || 1;
          const h = rect.height || 1;
          pointer.x = ((event.clientX - rect.left) / w) * 2 - 1;
          pointer.y = -(((event.clientY - rect.top) / h) * 2 - 1);
        }

        function onDown(event) {
          if (freezeRef.current) return;
          pointerNdc(event);
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObject(cardMesh, true);
          if (hits.length === 0) return;
          event.preventDefault();
          renderer.domElement.setPointerCapture(event.pointerId);
          renderer.domElement.style.cursor = 'grabbing';
          grabState.down = true;
          grabState.pointerId = event.pointerId;
          grabState.lastT = performance.now();
          grabState.vx = 0;
          grabState.vy = 0;
          grabState.vz = 0;
          grabState.lastNdcX = pointer.x;
          const center = cardCenter();
          const hit = hits[0].point;
          grabOff.x = center.x - hit.x;
          grabOff.y = center.y - hit.y;
          grabOff.z = center.z - hit.z;
          camera.getWorldDirection(camDir);
          dragPlane.setFromNormalAndCoplanarPoint(camDir, hit);

          // Dispatch Batman reaction for grabbing pass!
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('batman-reaction', { detail: { type: 'pass_grab' } }));
          }
        }

        function updateHover(event) {
          if (grabState.down) return;
          if (stageEl.clientWidth > NARROW_AT) {
            pointerNdc(event);
            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObject(cardMesh, true);
            const isOver = hits.length > 0;
            renderer.domElement.style.pointerEvents = isOver ? 'auto' : 'none';
            renderer.domElement.style.cursor = isOver ? 'grab' : 'default';
          } else {
            renderer.domElement.style.pointerEvents = 'auto';
            renderer.domElement.style.cursor = 'grab';
          }
        }

        function onMove(event) {
          if (!grabState.down) {
            updateHover(event);
            return;
          }
          if (event.pointerId !== grabState.pointerId) return;
          pointerNdc(event);
          raycaster.setFromCamera(pointer, camera);
          const hit = raycaster.ray.intersectPlane(dragPlane, planeHit);
          if (!hit) return;
          const travel = stageEl.clientWidth < NARROW_AT ? 0.52 : 1;
          const give = 1 + 0.28 * SWING_STRENGTH;
          const maxR = SEG_LEN * JOINTS * 0.85 * travel * give;
          const tx = hit.x + grabOff.x;
          const ty = hit.y + grabOff.y;
          const tz = clamp(hit.z + grabOff.z, -0.4, 0.4);
          const restY = clipY - SEG_LEN * JOINTS - drop();
          const dx = tx;
          const dy = ty - restY;
          const reach = Math.hypot(dx, dy);
          let gx = tx;
          let gy = ty;
          if (reach > maxR) {
            gx = (dx / reach) * maxR;
            gy = restY + (dy / reach) * maxR;
          }
          const now = performance.now();
          const stepDt = Math.max(DT, (now - grabState.lastT) / 1000);
          const hole = joints[JOINTS - 1];
          const nx = gx;
          const ny = gy + drop();
          const nz = tz;
          grabState.vx = (nx - hole.x) / stepDt;
          grabState.vy = (ny - hole.y) / stepDt;
          grabState.vz = (nz - hole.z) / stepDt;
          const dYaw = (pointer.x - grabState.lastNdcX) * 3.4;
          spinY += dYaw;
          spinVel = dYaw / stepDt;
          grabState.lastNdcX = pointer.x;
          grabState.lastT = now;
          hole.x = nx;
          hole.y = ny;
          hole.z = nz;
          hole.ox = nx;
          hole.oy = ny;
          hole.oz = nz;
        }

        function onUp(event) {
          if (!grabState.down || event.pointerId !== grabState.pointerId) return;
          grabState.down = false;
          try {
            renderer.domElement.releasePointerCapture(event.pointerId);
          } catch {
            /* released */
          }

          // Dispatch Batman reaction for pass bounce / swing!
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('batman-reaction', { detail: { type: 'pass_bounce' } }));
          }

          if (stageEl.clientWidth > NARROW_AT) {
            pointerNdc(event);
            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObject(cardMesh, true);
            const isOver = hits.length > 0;
            renderer.domElement.style.pointerEvents = isOver ? 'auto' : 'none';
            renderer.domElement.style.cursor = isOver ? 'grab' : 'default';
          } else {
            renderer.domElement.style.cursor = 'grab';
          }
          const travel = stageEl.clientWidth < NARROW_AT ? 0.55 : 1;
          const scale = 0.55 * SWING_STRENGTH * travel;
          const hole = joints[JOINTS - 1];
          hole.pinned = false;
          const vx = clamp(grabState.vx * scale, -10, 10);
          const vy = clamp(grabState.vy * scale, -12, 12);
          const vz = clamp(grabState.vz * scale, -4, 4);
          hole.ox = hole.x - vx * DT;
          hole.oy = hole.y - vy * DT;
          hole.oz = hole.z - vz * DT;
          spinVel += clamp(-vx * 0.28, -8, 8);
        }

        paintTicket();
        settle();
        frameCamera();
        syncVisuals();
        renderer.render(scene, camera);

        let raf = 0;
        let last = performance.now();
        const running = { on: false };

        function loop(now) {
          raf = requestAnimationFrame(loop);
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          if (!freezeRef.current) {
            acc += dt;
            let steps = 0;
            while (acc >= DT && steps < 2) {
              simulate();
              acc -= DT;
              steps += 1;
            }
            if (acc >= DT) acc = 0;
          } else {
            acc = 0;
            poseHang(0);
          }
          syncVisuals();
          renderer.render(scene, camera);
        }

        function startLoop() {
          if (running.on) return;
          running.on = true;
          last = performance.now();
          acc = 0;
          raf = requestAnimationFrame(loop);
        }

        function stopLoop() {
          running.on = false;
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        }

        const live = { inView: true, pageHidden: document.hidden };
        function shouldRun() {
          return !freezeRef.current && (live.inView || dropTriggerRef.current) && !live.pageHidden;
        }
        function syncLoop() {
          if (shouldRun()) {
            startLoop();
            return;
          }
          stopLoop();
          presentStill();
        }

        syncLoop();

        const io = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            live.inView = Boolean(entry && entry.isIntersecting);
            syncLoop();
          },
          { threshold: 0.01 }
        );
        io.observe(stageEl);

        function onVis() {
          live.pageHidden = document.hidden;
          syncLoop();
        }
        document.addEventListener('visibilitychange', onVis);

        const ro = new ResizeObserver(() => {
          if (running.on) {
            frameCamera();
            return;
          }
          presentStill();
        });
        ro.observe(stageEl);

        const canvas = renderer.domElement;
        canvas.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);

        function jolt() {
          const hole = joints[JOINTS - 1];
          if (!hole) return;
          hole.ox = hole.x - 0.06;
          hole.oy = hole.y - 0.05;
          hole.oz = hole.z + 0.04;
          spinVel += 0.12;
        }

        engineRef.current = {
          paint: paintTicket,
          frameCamera,
          jolt,
          dropTriggerChanged: () => {
            syncLoop();
          },
          freezeChanged: () => {
            syncLoop();
          },
        };

        if (!cancelled) startTransition(() => setStatus('ready'));

        dispose = () => {
          engineRef.current = null;
          stopLoop();
          io.disconnect();
          document.removeEventListener('visibilitychange', onVis);
          ro.disconnect();
          canvas.removeEventListener('pointerdown', onDown);
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
          cardGeo.dispose();
          strap.geometry.dispose();
          badgeClip.geometry.dispose();
          sleeveGeo.dispose();
          seamGeo.dispose();
          seamMat.dispose();
          wobble?.dispose();
          wobbleCrisp?.dispose();
          linen?.dispose();
          holoGeo.dispose();
          holoMap.dispose();
          edgeHoloMap.dispose();
          holoFrontMat.dispose();
          holoBackMat.dispose();
          edgeHoloMat.dispose();
          frontMaskMap.dispose();
          backMaskMap.dispose();
          frontMap.dispose();
          backMap.dispose();
          edgeMat.dispose();
          frontMat.dispose();
          backMat.dispose();
          clipMat.dispose();
          clipSlot.geometry.dispose();
          clipSlot.material.dispose();
          strapMap.dispose();
          strapMat.dispose();
          sleeveMat.dispose();
          clipMesh.geometry.dispose();
          renderer.dispose();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        };

        if (cancelled) dispose();
      } catch (err) {
        console.error('LanyardPass WebGL init error:', err);
        if (!cancelled) startTransition(() => setStatus('fail'));
      }
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;
    const load = (src, key) => {
      if (!src) {
        artRef.current[key] = null;
        engineRef.current?.paint();
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (cancelled) return;
        artRef.current[key] = img;
        engineRef.current?.paint();
      };
      img.onerror = () => {
        if (cancelled) return;
        artRef.current[key] = null;
        engineRef.current?.paint();
      };
      img.src = src;
    };
    load(logoSrc, 'logo');
    load(photoSrc, 'photo');
    load(backArtSrc, 'backArt');
    return () => {
      cancelled = true;
    };
  }, [logoSrc, photoSrc, backArtSrc]);

  useEffect(() => {
    engineRef.current?.paint();
  }, [
    attendeeName,
    ticketType,
    ticketNumber,
    eventName,
    eventDate,
    barcodeValue,
    paper,
    ink,
    accent,
    reverse,
    strapColor,
    strapStyle,
    strapText,
    foil,
    finish,
    sleeveOn,
    sleeveTexture,
    padding,
    stackGap,
    typeKey,
    photoFit,
    backArtSrc,
    lightAngle,
    lightHeight,
    lightIntensity,
    rimOn,
    depth,
  ]);

  useEffect(() => {
    engineRef.current?.frameCamera?.();
  }, [targetXVal]);

  const dropTrigger = props.dropTrigger;
  const lastDropRef = useRef(false);
  useEffect(() => {
    engineRef.current?.dropTriggerChanged?.();
    if (dropTrigger && !lastDropRef.current) {
      // Fire 3D physics jolt precisely when card hits bottom of free fall (at ~420ms)
      const timer = setTimeout(() => {
        engineRef.current?.jolt();
      }, 420);
      return () => clearTimeout(timer);
    }
    lastDropRef.current = Boolean(dropTrigger);
  }, [dropTrigger]);

  return (
    <div
      ref={rootRef}
      data-lanyard-stage="true"
      aria-label={`${eventName ?? 'Event'} pass for ${attendeeName}`}
      className={className}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: stageH,
        overflow: 'visible',
        background: 'transparent',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div
        role="status"
        aria-live="polite"
        aria-hidden={status === 'ready'}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: status === 'ready' ? 0 : 1,
          color: ink,
          fontFamily: fontFamilyOf(metaFont),
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          transition: 'opacity 0.3s ease',
        }}
      >
        {status === 'fail' ? 'Interactive 3D unavailable' : status === 'boot' ? 'Loading pass...' : ''}
      </div>
    </div>
  );
}
