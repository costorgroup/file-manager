export type TFileManagerPickOptions = {
  multiple: boolean;
};

export type TFileManagerReadFormat = 'text' | 'data-url' | 'array-buffer' | 'binary-string';

export const pick = async (options: Partial<TFileManagerPickOptions> = {}) =>
  new Promise((resolve, reject) => {
    const { multiple }: TFileManagerPickOptions = Object.assign({ multiple: false }, options);

    const virtualFilePickerElement = document.createElement('input');
    virtualFilePickerElement.type = 'file';
    virtualFilePickerElement.multiple = multiple;
    virtualFilePickerElement.addEventListener('change', (e: Event) => {
      const { files } = e.target as HTMLInputElement;

      if (!files || files.length < 1) return reject(`No ${multiple ? 'files' : 'file'} provided`);

      const filesArray = Array.from(files);

      virtualFilePickerElement.value = '';
      if (multiple) {
        return resolve(filesArray);
      }

      const singleFile = filesArray.shift();
      return resolve(singleFile as File);
    });
    virtualFilePickerElement.click();
  });

export const read = (file: File, readAs: TFileManagerReadFormat = 'text') =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      if (!e.target) return reject();
      resolve(e.target.result);
    });

    switch (readAs) {
      case 'text':
        reader.readAsText(file);
        break;
      case 'array-buffer':
        reader.readAsArrayBuffer(file);
        break;
      case 'binary-string':
        reader.readAsBinaryString(file);
        break;
      case 'data-url':
        reader.readAsDataURL(file);
        break;
      default:
        throw new Error('Invalid read format');
    }
  });

export const save = (name: string, data: string, options?: BlobPropertyBag) => {
  const file = new Blob([data], options);
  const virtualAnchorElement = document.createElement('a');
  virtualAnchorElement.href = URL.createObjectURL(file);
  virtualAnchorElement.download = name;
  virtualAnchorElement.click();
};

export default { pick, read, save };
