/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import pkg from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const svgSprites = () => src(filePaths.src.svgIcons)
  .pipe(logger.handleError('SVG-SPRITES'))
  .pipe(svgmin({ js2svg: { pretty: true } }))
  .pipe(
    cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true },
    }),
  )
  .pipe(plugins.replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite/sprite.svg',
      },
    },
  }))
  .pipe(dest(`${filePaths.srcFolder}/images`));

export default svgSprites;
