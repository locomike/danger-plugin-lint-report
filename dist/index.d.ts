export declare const maxParallel = 10;
declare type MarkdownString = string;
export declare function message(message: MarkdownString, file?: string, line?: number): void;
export declare function warn(message: string, file?: string, line?: number): void;
export declare function fail(message: string, file?: string, line?: number): void;
export declare function markdown(message: string, file?: string, line?: number): void;
/**
 * This plugin reads checkstyle reports (XML) and posts inline comments in pull requests.
 */
export declare function scan(config: CheckstyleConfig): Promise<void>;
export declare function scanXmlReport(git: any, xmlReport: any, root: any, requireLineModification: any, messageCallback: (msg: any, file: any, line: any, severity: any) => void): Promise<void>;
export {};
