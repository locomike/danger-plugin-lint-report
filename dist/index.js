"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanXmlReport = exports.scan = exports.maxParallel = void 0;
const fs_1 = require("fs");
const checkstyle_1 = require("./parse/checkstyle");
exports.maxParallel = 10;
/**
 * This plugin reads checkstyle reports (XML) and posts inline comments in pull requests.
 */
function scan(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const glob = require("glob");
        const root = process.cwd();
        const git = danger.git;
        const files = yield new Promise((resolve, reject) => glob(config.fileMask, (err, result) => (err ? reject(err) : resolve(result))));
        for (const batch of Array.from({ length: Math.ceil(files.length / exports.maxParallel) }, (_, batchIdx) => files.slice(batchIdx * exports.maxParallel, (batchIdx + 1) * exports.maxParallel))) {
            yield Promise.all(batch.map((fileName) => __awaiter(this, void 0, void 0, function* () {
                const xmlReport = fs_1.readFileSync(fileName);
                yield scanXmlReport(git, xmlReport, root, config.requireLineModification, (msg, file, line, severity) => {
                    if (!config.reportSeverity) {
                        severity = "info";
                    }
                    if (config.outputPrefix) {
                        msg = config.outputPrefix + msg;
                    }
                    sendViolationBySeverity(msg, file, line, severity);
                });
            })));
        }
    });
}
exports.scan = scan;
function scanXmlReport(git, xmlReport, root, requireLineModification, messageCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const xmlConverter = require("xml-js");
        const report = xmlConverter.xml2js(xmlReport);
        yield checkstyle_1.scanReport(git, report, root, requireLineModification, messageCallback);
    });
}
exports.scanXmlReport = scanXmlReport;
function sendViolationBySeverity(msg, fileName, line, severity) {
    switch (severity.toLowerCase()) {
        case "information":
        case "info":
            message(msg, fileName, line);
            break;
        case "warning":
        case "warn":
            warn(msg, fileName, line);
            break;
        case "error":
            fail(msg, fileName, line);
            break;
        case "fatal":
            fail(msg, fileName, line);
            break;
    }
}
