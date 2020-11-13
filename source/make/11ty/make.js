const CONF_o = require( '../../configure.js' )



const MAKE_o =
{
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine:     'njk',
  dataTemplateEngine:     'njk',
  templateFormats:        [ 'njk', 'md' ],
  passthroughFileCopy:    true,
  pathPrefix:             '/',
  dir:
    {
      input:    '.',
      output:   '../site',
      data:     'matter/assets/scripts/js/lib',
      includes: 'matrix',
    },

  tag_a:    //: to create collections
    [
      {
        tag_s: `${CONF_o.SLOTS_s}`,
        sort_f: 'sortByRank__a'
      },
    ],
  static_o:
    {
      "matrix/assets/static": "assets"    //: static files
    },
  dirs_o:
    {
      makeDir_s:  './',
      //XX pagesPartsDir_s: './matter/content/slots/parts',
    }
}



module.exports = make_o =>
{
  make_o.tag_a = MAKE_o.tag_a
  make_o.matrixDir_s = MAKE_o.dir.includes
  make_o.pagesPartsDir_s = MAKE_o.dirs_o.pagesPartsDir_s
  make_o.addPassthroughCopy( MAKE_o.static_o )
; [ 'libraries',
    'shortcodes',
    'filters',
    'collections'
  ].forEach( make_s => require( `${MAKE_o.dirs_o.makeDir_s}${make_s}.js` )( make_o ) )
  return MAKE_o    // : return the configuration object for further customization
}
