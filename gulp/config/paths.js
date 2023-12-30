import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
