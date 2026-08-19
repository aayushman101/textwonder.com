// Auto-extracted from src/pages/devwonder/[slug].astro so English and localized
// routes render the exact same tool UI components from one source of truth.
import JsonFormatter from '../components/dev-tools/JsonFormatter.astro';
import JwtDecoder from '../components/dev-tools/JwtDecoder.astro';
import RegexTester from '../components/dev-tools/RegexTester.astro';
import UnixTimestamp from '../components/dev-tools/UnixTimestamp.astro';
import HashGenerator from '../components/dev-tools/HashGenerator.astro';
import UuidGenerator from '../components/dev-tools/UuidGenerator.astro';
import ColorConverter from '../components/dev-tools/ColorConverter.astro';
import NumberBaseConverter from '../components/dev-tools/NumberBaseConverter.astro';
import CronParser from '../components/dev-tools/CronParser.astro';
import UrlParser from '../components/dev-tools/UrlParser.astro';
import HtmlFormatter from '../components/dev-tools/HtmlFormatter.astro';
import MarkdownPreviewer from '../components/dev-tools/MarkdownPreviewer.astro';
import TextToSpeech from '../components/dev-tools/TextToSpeech.astro';
import TextToHtml from '../components/dev-tools/TextToHtml.astro';
import PasswordGenerator from '../components/dev-tools/PasswordGenerator.astro';
import QrCodeGenerator from '../components/dev-tools/QrCodeGenerator.astro';
import Base64Encoder from '../components/dev-tools/Base64Encoder.astro';

export const componentMap: Record<string, any> = {
  'json-formatter': JsonFormatter,
  'jwt-decoder': JwtDecoder,
  'regex-tester': RegexTester,
  'unix-timestamp': UnixTimestamp,
  'hash-generator': HashGenerator,
  'uuid-generator': UuidGenerator,
  'color-converter': ColorConverter,
  'number-base-converter': NumberBaseConverter,
  'cron-parser': CronParser,
  'url-parser': UrlParser,
  'html-formatter': HtmlFormatter,
  'markdown-previewer': MarkdownPreviewer,
  'text-to-speech': TextToSpeech,
  'text-to-html': TextToHtml,
  'password-generator': PasswordGenerator,
  'qr-code-generator': QrCodeGenerator,
  'base64-encoder': Base64Encoder,
};
