import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
  build: {
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    html: `${srcFolder}/html/*.html`,
    scss: `${srcFolder}/scss/*.scss`,
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,tiff}`,
    svg: `${srcFolder}/images/**/*.svg`,
    fontFacesFile: `${srcFolder}/scss/config/_fonts.scss`,
    fonts: `${srcFolder}/fonts/`,
    svgIcons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,svg,tiff}`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
