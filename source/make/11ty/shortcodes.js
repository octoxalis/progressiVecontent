const FIL_o = require('fs-extra')

const REPLACE__s = require( '../lib/block_replace.js' )
const SPLIT__a   = require( '../lib/block_split.js' )
const CODE_o     = require( '../lib/code.js' )
const C_o        = require( '../data/C_o.js' )
const F_o        = require( '../data/F_o.js' )
const S_o        = require( '../data/S_o.js' )



const CODES_o =
{
  anchor__s:
  content_s =>
  {
    const cleanContent_s = content_s.trim()
    const level_n = cleanContent_s.indexOf( ' ' )
    const title_s = cleanContent_s.substring( level_n + 1 )
    return `<h${level_n} data-slot_s=n>${title_s}</h${level_n}>`
  }
,



  note_txt__s:
  content_s =>
  `<${C_o.NOTE_TAG} data-id="note_txt"><button aria-label="unfold note"></button><${C_o.NOTE_CONTENT_TAG} data-id="note_content">${content_s}</${C_o.NOTE_CONTENT_TAG}></${C_o.NOTE_TAG}>`,



  note_img__s:
  (
    content_s,
    legend_a
  ) =>
  {
    let legend_s = ''
    let data_s = ''
    if ( legend_a )
    {
      legend_a.forEach( ( at_s, at_n ) =>
        {
          const tag_s = !at_n ? 'b' : 'i'  //: 1st entry: name, 2nd entry as title
          data_s += `<${tag_s}>${at_s}</${tag_s}>`
          legend_s += `${at_s}`
          if ( at_n < legend_a.length - 1 ) legend_s += ' - '
        } )
    }
    return `<${C_o.NOTE_TAG} data-id="note_img"><button aria-label="unfold image" data-legend="${legend_s}"><label data-id="img_legend">${data_s}</label></button><${C_o.NOTE_CONTENT_TAG} data-id="note_content">${content_s}</${C_o.NOTE_CONTENT_TAG}></${C_o.NOTE_TAG}>`
  }
,



/**
 * Use an <a> as button to click without closing
 */
note_link__s:
  link_a =>
  {
    let link_s = `<${C_o.NOTE_LINK_TAG} class="note_link_a">`
    link_a.forEach( atlink_s =>
      {
      let [ act_s, icon_s, ...arg_a ] = atlink_s.split( ',' )
      let parameter_s = ''
      icon_s = icon_s.trim()
      arg_a.forEach( arg_s => parameter_s += `${arg_s.trim()},` )
      link_s += `<a class="note_link" role="button" tabindex="0"
      data-method="${act_s}" data-param="${parameter_s.slice( 0, -1 )}">${S_o.symbol__s( icon_s )}</a>`
    } )
    return `${link_s}</${C_o.NOTE_LINK_TAG}>`
  }
  ,
  
  
//#code=01
code_block__s:
content_s =>
  {
    let [ content_a, content_o ] =
    SPLIT__a
      (
        content_s,
        '_code_block'
        )
    let safe_s =
      content_a[1]
        //?? .replace
        //??   (
        //??     /\n\n+/g, '\n<br/>\n'  //: avoid Markdown <p> insert
        //??   )
      .trim()
    const title_s =
    content_o
        .title_s
        .charAt(0) === '#' ?  //: # for nonlink title
          content_o
          .title_s
            .slice(1)    //: strip starting '#' char
        :
        F_o.codeUrl__s( content_o.title_s )
    const code_s =
      CODE_o
        .highlight__s
        (
          safe_s,
          content_o.lang_s
        )
    return `<pre data-id="code"><code data-id="code" class="language-${content_o.lang_s}">${code_s}</code></pre>
<div data-id="code_ref"><dl data-id="code_ref"><dt>${title_s}</dt>
<dd><a href="https://prismjs.com" target="_blank" title="Highlighting provided by Prism.js">Prism</a></dd>
</dl></div>`    //: <pre> and <div> as wrappers for full width <code> and <dl>
  }
  ,
//#code=01

  

  code__s:
  (
    path_s    //: 'path/to/file.ext#index_s'
    ) =>
    {
    const LANDMARK_s = '\\/\\/#code='
    const [ file_s, index_s ] =
    path_s
        .split( '#' )
    const code_re =
    new RegExp( `${LANDMARK_s}${index_s}([\\s\\S]*?)${LANDMARK_s}${index_s}` )
    const source_s =
      FIL_o
        .readFileSync
        (
          file_s,
          'utf8',
          'r'
        )
        const code_a = source_s.match( code_re )
    return code_a ?
    code_a[1]
      :
      ''
    }
,



replace_all__s:
  content_s =>
  {
    let [ content_a, content_o ] = SPLIT__a( content_s, '_replace_all' )
    return REPLACE__s( content_o, content_a[1] )
  }
,


  more_to_come__s:
  content_s =>
  `<p data-id="important">${content_s}<em>(to be continued...)</em></p>`
,

}




module.exports = make_o =>
{
  [ 'note_link',
    'code'
].forEach( code_s => make_o.addNunjucksShortcode( `${code_s}`, arg_ => CODES_o[ `${code_s}__s` ]( arg_ ) ) ),

  [ 'anchor',
    'note_txt',
    'note_img',
    'code_block',
    'replace_all',
    'more_to_come'
  ].forEach( code_s => make_o.addPairedShortcode( `_${code_s}`, ( content_s, arg_ ) => CODES_o[ `${code_s}__s` ]( content_s, arg_ ) ) )
}
