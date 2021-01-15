module.exports = make_o =>
{
  //: date
  //xx make_o.addFilter('readable_date', date_o => require('luxon').fromJSDate( date_o ).toFormat('dd LLL yyyy') )
  
  //: css minify
  const CSS_f = require('clean-css')
  make_o.addFilter('minify_css', code_s => new CSS_f({}).minify( code_s ).styles )


  //: js minify
  make_o
    .addNunjucksAsyncFilter
    (
      'minify_js',
      (
        input_s,
        callback_f
      ) =>
      {
        const MINIFY_o =
          require('terser')
        MINIFY_o
          .minify( input_s )
          .then
            (
              output_o =>
              {
                if( MINIFY_o.error )
                {
                  console.log('terser error: ', MINIFY_o.error)
                  callback_f
                    (
                      null,
                      input_s
                    )
                }
                callback_f
                  (
                    null,
                    output_o.code
                  )
              }
            )
      }
    )




  //: html minify filter
  make_o.addFilter('minify_html', code_s => require('html-minifier').minify( code_s,
    { removeAttributeQuotes: false,
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      keepClosingSlash: true,    //: for XML validation
    }) )


  const BUI_o = require('../lib/builder.js')
  make_o.addFilter( 'head_end', ( head_s, ...args_ ) => BUI_o.head__s( head_s, ...args_ ) )
  make_o.addFilter( 'body_end', ( body_s, ...args_ ) => BUI_o.body__s( body_s, ...args_ ) )
  make_o.addFilter( 'template_start', ( start_s, ...args_ ) => BUI_o.start__s( start_s, ...args_ ) )
  make_o.addFilter( 'template_end', ( end_s, ...args_ ) => BUI_o.end__s( end_s, ...args_ ) )

  const SEC_o = require('../lib/section.js')
  make_o.addFilter( 'section', ( slot_s, permalink, doc_n ) => SEC_o.section__s( slot_s, permalink, doc_n ) )
  
  const SPO_o = require('../lib/spot.js')
  make_o.addFilter( 'spot', ( slot_s, ...args_ ) => SPO_o.spot__s( slot_s, ...args_ ) )
  
  const CSS_o = require('../lib/css.js')
  make_o.addFilter( 'strip', ( css_s, ...args_ ) => CSS_o.strip__s( css_s, ...args_ ) )
    

  //: NOT USED
  //XX const MIXIN_o = require('../lib/mixin.js')
  //XX make_o.addFilter('font_face', ( face_a, ...args_ ) => MIXIN_o.font_face__s( face_a, ...args_ ) )
}



  //: RSS feed
  //XX make_o.addFilter('feed_content', code_s => require('../lib/feed_content.js')( code_s ) )

  //XX const ISODATE__s = require('../lib/dateToISO.js')
  //XX make_o.addNunjucksFilter( "feed_date", date_o => ISODATE__s( date_o ) )

  //XX make_o.addNunjucksFilter( "feed_last_date", collection =>
  //XX {
  //XX   if( !collection || !collection.length ) throw new Error( "Collection is empty in feed_last_date filter." )
  //XX   return ISODATE__s( collection[ collection.length - 1 ].date )
  //XX } )
