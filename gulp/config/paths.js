import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
  build: {},
  src: {
    html: `${srcFolder}/html/*.html`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.html`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
