// Auto-extracted from src/pages/student/[slug].astro so English and localized
// routes render the exact same tool UI components from one source of truth.
import CgpaCalculator from '../components/student-tools/CgpaCalculator.astro';
import GpaCalculator from '../components/student-tools/GpaCalculator.astro';
import AttendanceCalculator from '../components/student-tools/AttendanceCalculator.astro';
import MarksPercentageCalculator from '../components/student-tools/MarksPercentageCalculator.astro';
import ExamCountdown from '../components/student-tools/ExamCountdown.astro';
import StudyPlanner from '../components/student-tools/StudyPlanner.astro';
import PomodoroTimer from '../components/student-tools/PomodoroTimer.astro';
import GpaGoalCalculator from '../components/student-tools/GpaGoalCalculator.astro';

export const componentMap: Record<string, any> = {
  'cgpa-calculator': CgpaCalculator,
  'gpa-calculator': GpaCalculator,
  'attendance-calculator': AttendanceCalculator,
  'marks-percentage-calculator': MarksPercentageCalculator,
  'exam-countdown': ExamCountdown,
  'study-planner': StudyPlanner,
  'pomodoro-timer': PomodoroTimer,
  'gpa-goal-calculator': GpaGoalCalculator,
};
