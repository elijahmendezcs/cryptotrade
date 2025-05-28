export interface Strategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number | string>;
  enabled: boolean;
}
