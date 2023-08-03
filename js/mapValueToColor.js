const { abs, min, max, round } = Math;

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [round(r * 255), round(g * 255), round(b * 255)];
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

// Function to map the data values to grayscale color
export default function mapValueToColor(value, type) {
  if (type === "topopt") {
    const colorValue = Math.floor(value * 255); // Map [0, 1] to [0, 255]
    return `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
  }
  if (type === "VM") {
    const hue = (1 - value) * 240; // Map value to hue range [0, 240]
    const saturation = 100; // Set saturation to maximum
    const brightness = 100; // Set brightness to maximum
    const rgb = hslToRgb(hue, saturation, brightness);
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  if (type === "TC") {
    let r = 0;
    let b = 0;
    if (value < 0) {
      r = 0;
      b = 255;
    } else {
      r = 255;
      b = 0;
    }
    const g = 0;

    return `rgb(${r},0,${b})`;
  }
}
