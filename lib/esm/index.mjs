import { merge } from "lodash";
export const pick = async (options = {}) => new Promise((resolve, reject) => {
    // Default options
    const defaultOptions = {
        multiple: true,
    };
    // Merged options
    const mergedOptions = merge(defaultOptions, options);
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
export const read = (file, readAs = "text") => new Promise((resolve, reject) => {
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
export const save = (name, data, options) => {
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
const FileManager = {
    read,
    pick,
    save,
};
export default FileManager;
