// Auto-extracted from src/pages/color/[slug].astro so English and localized
// routes render the exact same tool UI components from one source of truth.
import HexRgbConverter from '../components/color-tools/HexRgbConverter.astro';
import ContrastChecker from '../components/color-tools/ContrastChecker.astro';
import GradientGenerator from '../components/color-tools/GradientGenerator.astro';
import ColorPaletteGenerator from '../components/color-tools/ColorPaletteGenerator.astro';
import TintShadeGenerator from '../components/color-tools/TintShadeGenerator.astro';
import ShadowGenerator from '../components/color-tools/ShadowGenerator.astro';
import ColorMixer from '../components/color-tools/ColorMixer.astro';
import RandomColorGenerator from '../components/color-tools/RandomColorGenerator.astro';

export const componentMap: Record<string, any> = {
  'hex-rgb-converter': HexRgbConverter,
  'contrast-checker': ContrastChecker,
  'gradient-generator': GradientGenerator,
  'color-palette-generator': ColorPaletteGenerator,
  'tint-shade-generator': TintShadeGenerator,
  'shadow-generator': ShadowGenerator,
  'color-mixer': ColorMixer,
  'random-color-generator': RandomColorGenerator,
};
