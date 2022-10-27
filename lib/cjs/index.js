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
exports.save = exports.read = exports.pick = void 0;
const lodash_1 = require("lodash");
const pick = (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // Default options
        const defaultOptions = {
            multiple: true,
        };
        // Merged options
        const mergedOptions = (0, lodash_1.merge)(defaultOptions, options);
        // Creating element
        const virtualFilePickerElement = document.createElement("input");
        // Setting Type to file
        virtualFilePickerElement.type = "file";
        // Check if multiple
        if (mergedOptions.multiple) {
            virtualFilePickerElement.multiple = true;
        }
        // Listening on change
        virtualFilePickerElement.addEventListener("change", (e) => {
            // Getting files from input
            const { files } = e.target;
            // If there are no files, reject
            if (!files || !files.length)
                return reject();
            // Check if multiple
            if (mergedOptions.multiple) {
                const data = [];
                for (let i = 0; i < files.length; i++) {
                    data.push(files[i]);
                }
                virtualFilePickerElement.value = "";
                // Resolving array of files
                return resolve(data);
            }
            else {
                virtualFilePickerElement.value = "";
                // Resolving single file
                return resolve(files[0]);
            }
        });
        // Call picker
        virtualFilePickerElement.click();
    });
});
exports.pick = pick;
const read = (file, readAs = "text") => new Promise((resolve, reject) => {
    // Reader
    const reader = new FileReader();
    // Resolve on load
    reader.addEventListener("load", (e) => {
        if (!e.target)
            return reject();
        resolve(e.target.result);
    });
    // Read as type
    if (readAs === "text") {
        reader.readAsText(file);
    }
    else if (readAs === "array-buffer") {
        reader.readAsArrayBuffer(file);
    }
    else if (readAs === "binary-string") {
        reader.readAsBinaryString(file);
    }
    else if (readAs === "data-url") {
        reader.readAsDataURL(file);
    }
});
exports.read = read;
const save = (name, data, options) => {
    // Creating file
    const file = new Blob([data], options);
    // Creating element
    const virtualAnchorElement = document.createElement("a");
    // Setting element href
    virtualAnchorElement.href = URL.createObjectURL(file);
    // Setting element name
    virtualAnchorElement.download = name;
    // Call save
    virtualAnchorElement.click();
};
exports.save = save;
const FileManager = {
    read: exports.read,
    pick: exports.pick,
    save: exports.save,
};
exports.default = FileManager;
