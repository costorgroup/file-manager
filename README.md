# @costorgroup/file-manager

The package includes methods for opening a file picker dialog, reading the selected file, and saving the file, which can be easily integrated into web applications. The supported file formats include text files, images, audio files, and more.

## Features

- Picking files from your machine
- Reading files
- Downloading files to your machine

## Installation

Run one of the following commands to add **@costorgroup/file-manager** to your project:

npm

```bash
  npm install @costorgroup/file-manager
```

yarn

```bash
  yarn add @costorgroup/file-manager
```

pnpm

```bash
  pnpm install @costorgroup/file-manager
```

## Usage/Examples

### File picking

The pick function of the provides a simple and convenient way to choose a file from the user's local file system and load it into a web application.

```javascript
import { pick } from '@costorgroup/file-manager';

const file = await pick();
```

You can also pass option object for additional control.

```javascript
const photos = await pick({
  multiple: true,
  accept: 'image/jpeg',
});
```

### File reading

The read function allows you to read the contents of a file. The function accepts a File object representing the file to be read, as well as an optional second parameter specifying the format in which the file contents should be read.

```javascript
import { pick, read } from '@costorgroup/file-manager';

const file = await pick({ accept: 'image/png' });

const source = await read(file, 'data-url');

const image = document.createElement('img');
image.src = source;
```

### File saving

The save function allows you to save a File object to the local file system with a specified file name. This function can be useful for enabling users to download files from your web application.

```javascript
import { save } from '@costorgroup/file-manager';

save(file, 'image.png');
```

You can also save text simply by passing a blob with text.

```javascript
save(new Blob(['An example text'], { type: 'text/plain' }), 'text.txt');
```

Here is an example with JSON:

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 24,
};

const json = JSON.stringify(person);

save(new Blob([json], { type: 'application/json' }), 'person.json');
```

## Feedback

If you have any feedback, please reach out to us at costorgroup@gmail.com

## Links

- [Website](https://www.costorgroup.com)
- [Twitter](https://twitter.com/costorgroup)
- [Linkedin](https://www.linkedin.com/company/costorgroup)
- [Instagram](https://www.instagram.com/costorgroup)
