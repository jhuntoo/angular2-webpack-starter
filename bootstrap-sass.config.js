// Example file. Copy this to your project. Change then names of the referenced files or comment
// them out. Convention is to name sass partials to start with an '_'
module.exports = {
  verbose: false, // Set to false to show diagnostic information

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used
  // by bootstrap mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

  // Use preBootstrapCustomizations to change $brand-primary. Ensure this
  // preBootstrapCustomizations does not depend on other bootstrap variables.
  preBootstrapCustomizations: './src/public/styles/_pre-bootstrap-customizations.scss',

  // Use bootstrapCustomizations to utilize other sass variables defined in
  // preBootstrapCustomizations or the _variables.scss file. This is useful to set one
  // customization value based on another value.
  bootstrapCustomizations: './src/public/styles/_bootstrap-customizations.scss',

  mainSass: './src/public/styles/_main.scss',

  // Default for the style loading
  styleLoader: 'style-loader!css-loader!sass-loader',
  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
  //     styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
  //
  // If you want expanded CSS
  //   styleLoader: ExtractTextPlugin.extract('style-loader',
  // 'css-loader!sass?outputStyle=expanded'),

  scripts: {
    'transition': false,
    'alert': false,
    'button': false,
    'carousel': false,
    'collapse': false,
    'dropdown': false,
    'modal': false,
    'tooltip': false,
    'popover': false,
    'scrollspy': false,
    'tab': false,
    'affix': false
  },
  styles: {
    'mixins': false,

    'normalize': false,
    'print': false,
    'glyphicons': false,

    'scaffolding': false,
    'type': false,
    'code': false,
    'grid': false,
    'tables': false,
    'forms': false,
    'buttons': false,

    'component-animations': false,
    'dropdowns': false,
    'button-groups': false,
    'input-groups': false,
    'navs': false,
    'navbar': false,
    'breadcrumbs': false,
    'pagination': false,
    'pager': false,
    'labels': false,
    'badges': false,
    'jumbotron': false,
    'thumbnails': false,
    'alerts': false,
    'progress-bars': false,
    'media': false,
    'list-group': false,
    'panels': false,
    'wells': false,
    'responsive-embed': false,
    'close': false,

    'modals': false,
    'tooltip': false,
    'popovers': false,
    'carousel': false,

    'utilities': false,
    'responsive-utilities': false
  }
};
