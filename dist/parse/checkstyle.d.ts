import { GitDSL } from "danger";
declare type MarkdownString = string;
/**
 *
 * @param git Git object used to access changesets
 * @param report JavaScript object representation of the lint report
 * @param root Root directory to sanitize absolute paths
 */
export declare function scanReport(git: GitDSL, report: any, root: string, requireLineModification: boolean, messageCallback: (msg: MarkdownString, fileName: string, line: number, severity: string) => void): Promise<void>;
export {};
