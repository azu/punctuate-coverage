// LICENSE : MIT
"use strict";
import {readFileSync} from "fs"
import path from "path"
function createCoverage(line) {
    return line.split(/、/).length;
}

function createSource(code) {
    var covList = code.split("\n").map((line, index)=> {
        return {
            "index": String(index + 1),
            "source": line,
            "coverage": String(createCoverage(line))
        };
    });
    var results = {};
    covList.forEach(({index, source, coverage}) => {
        results[index] = {
            source,
            coverage
        };
    });
    return results;
}

export function coverage(filePathList, options = {
    baseDir: process.cwd()
}) {
    if (!Array.isArray(filePathList)) {
        throw new Error("should pass filePath list");
    }
    var files = filePathList.map(filePath => {
        return [filePath, readFileSync(filePath, "utf-8")];
    }).map(([filePath, code]) => {
        /*
        {
          "filename": "fixture.js",
          "coverage": 100,
          "hits": 2,
          "misses": 0,
          "sloc": 2,
          "source": {
            "1": {
              "source": "'use strict';",
              "coverage": ""
            },
            "2": {
              "source": "",
              "coverage": ""
            },
            "3": {
              "source": "function hello(){",
              "coverage": ""
            },
            "4": {
              "source": "  return 'Hello!';",
              "coverage": 1
            },
            "5": {
              "source": "}",
              "coverage": ""
            },
            "6": {
              "source": "",
              "coverage": ""
            },
            "7": {
              "source": "module.exports = hello;",
              "coverage": 1
            },
            "8": {
              "source": "",
              "coverage": ""
            }
          }
        }
         */
        return {
            "filename": path.relative(options.baseDir, filePath),
            "source": createSource(code)
        };
    });

    return {
        files
    }
}