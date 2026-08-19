// Auto-extracted from src/pages/data/[slug].astro so English and localized
// routes render the exact same tool UI components from one source of truth.
import CsvToJson from '../components/data-tools/CsvToJson.astro';
import JsonToCsv from '../components/data-tools/JsonToCsv.astro';
import JsonToYaml from '../components/data-tools/JsonToYaml.astro';
import YamlToJson from '../components/data-tools/YamlToJson.astro';
import TsvToCsv from '../components/data-tools/TsvToCsv.astro';
import CsvToTable from '../components/data-tools/CsvToTable.astro';
import NumberFormatter from '../components/data-tools/NumberFormatter.astro';
import XmlToJson from '../components/data-tools/XmlToJson.astro';

export const componentMap: Record<string, any> = {
  'csv-to-json': CsvToJson,
  'json-to-csv': JsonToCsv,
  'json-to-yaml': JsonToYaml,
  'yaml-to-json': YamlToJson,
  'tsv-to-csv': TsvToCsv,
  'csv-to-table': CsvToTable,
  'number-formatter': NumberFormatter,
  'xml-to-json': XmlToJson,
};
