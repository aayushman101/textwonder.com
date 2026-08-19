// Auto-extracted from src/pages/health/[slug].astro so English and localized
// routes render the exact same tool UI components from one source of truth.
import BmiCalculator from '../components/health-tools/BmiCalculator.astro';
import BmrCalculator from '../components/health-tools/BmrCalculator.astro';
import CalorieCalculator from '../components/health-tools/CalorieCalculator.astro';
import IdealWeightCalculator from '../components/health-tools/IdealWeightCalculator.astro';
import BodyFatCalculator from '../components/health-tools/BodyFatCalculator.astro';
import WaterIntakeCalculator from '../components/health-tools/WaterIntakeCalculator.astro';
import ProteinIntakeCalculator from '../components/health-tools/ProteinIntakeCalculator.astro';
import MacroCalculator from '../components/health-tools/MacroCalculator.astro';

export const componentMap: Record<string, any> = {
  'bmi-calculator': BmiCalculator,
  'bmr-calculator': BmrCalculator,
  'calorie-calculator': CalorieCalculator,
  'ideal-weight-calculator': IdealWeightCalculator,
  'body-fat-calculator': BodyFatCalculator,
  'water-intake-calculator': WaterIntakeCalculator,
  'protein-intake-calculator': ProteinIntakeCalculator,
  'macro-calculator': MacroCalculator,
};
