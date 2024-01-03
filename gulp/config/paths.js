import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
  build: {
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
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
    favicon: `${srcFolder}/favicon/favicon.svg`,
    static: `${srcFolder}/static/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,svg,tiff}`,
    static: `${srcFolder}/static/**/*.*`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: '',
};

export default filePaths;
