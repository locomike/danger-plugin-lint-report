declare type MarkdownString = string;
export declare function reportViolationsForLines(violations: Violation[], fileDiffs: FileDiff[], requireLineModification: boolean, messageCallback: (msg: MarkdownString, fileName: string, line: number, severity: string) => void): void;
export {};
