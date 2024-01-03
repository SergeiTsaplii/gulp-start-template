import pkg from 'gulp';
import avif from 'gulp-avif';
import webp from 'gulp-webp';
import imagemin, {
  gifsicle, mozjpeg, optipng, svgo,
} from 'gulp-imagemin';
import debug from 'gulp-debug';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const images = (isBuild) => src(filePaths.src.images)
  .pipe(logger.handleError('IMAGES'))
  .pipe(plugins.newer(filePaths.build.images))
  .pipe(plugins.if(isBuild, avif({ quality: 50 })))
  .pipe(plugins.if(isBuild, dest(filePaths.build.images)))
  .pipe(plugins.if(isBuild, src(filePaths.src.images)))
  .pipe(plugins.if(isBuild, plugins.newer(filePaths.build.images)))
  .pipe(plugins.if(isBuild, webp({ quality: 60 })))
  .pipe(plugins.if(isBuild, dest(filePaths.build.images)))
  .pipe(plugins.if(isBuild, src(filePaths.src.images)))
  .pipe(plugins.if(isBuild, plugins.newer(filePaths.build.images)))
  .pipe(plugins.if(isBuild, imagemin([
    gifsicle({ interlaced: true }),
    mozjpeg({ quality: 75, progressive: true }),
    optipng({ optimizationLevel: 3 }),
    svgo({
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
      ],
    }),
  ])))
  .pipe(dest(filePaths.build.images))
  .pipe(src(filePaths.src.svg))
  .pipe(dest(filePaths.build.images))
  .pipe(plugins.if(!isBuild, debug({ title: 'IMAGE files' })))
  .pipe(plugins.browserSync.stream());

export default images;
