export type NodeType = "stakeholder" | "strategy" | "example";

export interface Node {
  type: NodeType;
  name: string;
  label: string;
  summary: string;
}

export interface Stakeholder extends Node {
  type: 'stakeholder';
  strategy_names?: string[];
}

export interface Strategy extends Node {
  type: 'strategy';
  strategy_type?: string;
  example_names?: string[];
}

export interface Example extends Node {
  type: 'example';
  exampleText? : string;
  exampleLink? : string;
  exampleTitle? : string;
  keyStrengths? : string;
  keyConsiderations? : string;
}
