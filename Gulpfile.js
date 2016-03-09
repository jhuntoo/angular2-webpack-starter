var gulp = require('gulp');
var responsive = require('gulp-responsive');

gulp.task('images', function () {
    return gulp.src('src/assets/img/*.jpg')
        .pipe(responsive({
            '*.jpg': [{
                width: '33.33%',
                rename: {
                    suffix: '-1x',
                    extname: '.jpg',
                },
                format: 'jpeg',
            }, {
                width: '66.66%',
                rename: {
                    suffix: '-2x',
                    extname: '.jpg',
                },
                // format option can be omitted because
                // format of output image is detected from new filename
                // format: 'jpeg'
            }, {
                width: '100%',
                rename: {
                    suffix: '-3x',
                    extname: '.jpg',
                },
                // Do not enlarge the output image if the input image are already less than the required dimensions.
                withoutEnlargement: true,
            }
            //    , {
            //    // Convert images to the webp format
            //    width: 630,
            //    rename: {
            //        suffix: '-630px',
            //        extname: '.webp',
            //    },
            //}
            ],
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 80,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
            // Do not emit the error when image is enlarged.
            errorOnEnlargement: false,
        }))
        .pipe(gulp.dest('src/assets/img/dist'));
});

gulp.task('default', ['images']);
