/* eslint-disable no-tabs */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import pkg from 'gulp';
import fs from 'fs';
import debug from 'gulp-debug';
import ttf2woff2 from 'gulp-ttf2woff2';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const fontFacesFile = filePaths.src;
const italicRegex = /italic/i;
const cleanSeparator = /(?:_|__|-|\s)?(italic)/i;

const fontWeights = {
  thin: 100,
  hairline: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
  extrablack: 950,
  ultrablack: 950,
};

const fontFaceTemplate = (name, file, weight, style) => `@font-face {
	font-family: ${name};
	font-display: swap;
	src: url("../fonts/${file}.woff2") format("woff2");
	font-weight: ${weight};
	font-style: ${style};
}\n`;

const ttfToWoff = (isBuild) => {
  if (fs.existsSync(fontFacesFile)) {
    return src(`${filePaths.src.fonts}/*.woff2`, {})
      .pipe(logger.handleError('FONTS [ttfToWoff]'))
      .pipe(dest(filePaths.build.fonts))
      .pipe(plugins.if(!isBuild, debug({ title: 'FONTS files' })));
  }

  /** Поиск шрифтов [.ttf] и конвертация в [.woff2] */
  return src(`${filePaths.src.fonts}/*.ttf`, {})
    .pipe(logger.handleError('FONTS [ttfToWoff]'))
    .pipe(ttf2woff2())
    .pipe(dest(filePaths.src.fonts))
  /** Поиск шрифтов [.woff, .woff2] и выгрузка в финальную папку */
    .pipe(src(`${filePaths.src.fonts}/*.{woff2}`))
    .pipe(dest(filePaths.build.fonts))
    .pipe(plugins.if(!isBuild, debug({ title: 'FONTS files' })));
};

const fontStyle = async () => {
  try {
    if (fs.existsSync(fontFacesFile)) {
      logger.warning('Файл scss/config/fonts.scss уже существует.\nДля обновления файла его нужно удалить!');
      return;
    }

    const fontFiles = await fs.promises.readdir(filePaths.build.fonts);

    if (!fontFiles) {
      logger.error('Нет сконвертированных шрифтов');
      return;
    }

    await fs.promises.writeFile(fontFacesFile, '');
    let newFileOnly;

    for (const file of fontFiles) {
      const [fileName] = file.split('.');

      if (newFileOnly !== fileName) {
        const [name, weight = 'regular'] = fileName.split('-');
        const weightString = fontWeights[weight.replace(cleanSeparator, '').toLowerCase()];
        const fontStyle = italicRegex.test(fileName) ? 'italic' : 'normal';

        await fs.promises.appendFile(fontFacesFile, fontFaceTemplate(name, fileName, weightString, fontStyle));
        newFileOnly = fileName;
      }
    }
  } catch (err) {
    logger.error('Ошибка при обработке шрифтов:\n', err);
  }
};

export { ttfToWoff, fontStyle };
