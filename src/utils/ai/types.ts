
import { Project, Unit, FAQ } from '@/models';

export type QueryResult = {
  text: string;
  type: 'general' | 'unit' | 'project' | 'faq';
  relatedItems?: (Unit | Project | FAQ)[];
  confidence?: 'high' | 'medium' | 'low';
  isLLMGenerated?: boolean;
};

export type QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
) => QueryResult | null;

export type QueryProcessor = {
  name: string;
  process: QueryProcessorFn;
};
