"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportViolationsForLines = void 0;
function reportViolationsForLines(violations, fileDiffs, requireLineModification, messageCallback) {
    // we got all changed lines in fileDiffs (file => list of line)
    violations.forEach(violation => {
        const file = violation.file;
        const line = violation.line;
        const diff = fileDiffs.find(element => element.file === file);
        if (diff) {
            if (!requireLineModification || diff.added_lines.includes(line)) {
                messageCallback(violation.message, violation.file, violation.line, violation.severity);
            }
        }
    });
}
exports.reportViolationsForLines = reportViolationsForLines;
