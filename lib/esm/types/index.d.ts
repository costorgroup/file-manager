export declare const pick: (options?: TPickOptions) => Promise<File | File[]>;
export declare const read: (file: File, readAs?: TReadAs) => Promise<unknown>;
export declare const save: (name: string, data: string, options?: BlobPropertyBag) => void;
declare const FileManager: {
    read: (file: File, readAs?: TReadAs) => Promise<unknown>;
    pick: (options?: TPickOptions) => Promise<File | File[]>;
    save: (name: string, data: string, options?: BlobPropertyBag) => void;
};
export default FileManager;
//# sourceMappingURL=index.d.ts.map