const FS_o = require('fs-extra')

const REPLACE__s = require( '../lib/block_replace.js' )
const SPLIT__a   = require( '../lib/block_split.js' )
const CODE_o     = require( '../lib/code.js' )
const REX_o      = require( '../lib/regex.js' )
const C_o        = require( '../data/C_o.js' )
const F_o        = require( '../data/F_o.js' )
const S_o        = require( '../data/S_o.js' )



const CODES_o =
{
  anchor__s:
  content_s =>
  {
    const cleanContent_s =
      content_s
        .trim()

    const level_n =
      cleanContent_s
        .indexOf( ' ' )

    const title_s =
      cleanContent_s
        .substring( level_n + 1 )

    return (
      /*HTML*/
      `<h${level_n} data-doc_s=n>
      ${title_s}
      </h${level_n}>`
      )
  }
,



  note_txt__s:
  content_s => (
    /*HTML*/
    `<${C_o.NOTE_TAG_s} data-id="note_txt">
    <button aria-label="unfold note"></button>
    <${C_o.NOTE_CONTENT_TAG_s} data-id="note_content">${content_s}</${C_o.NOTE_CONTENT_TAG_s}>
    </${C_o.NOTE_TAG_s}>`
    )
  ,



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
      legend_a
        .forEach
        (
          (
            at_s,
            at_n
          ) =>
          {
            const tag_s =  //: 1st entry: name, 2nd entry as title
              !at_n
              ?
                'b'
              :
                'i'

            data_s += `<${tag_s}>${at_s}</${tag_s}>`

            legend_s += `${at_s}`

            if ( at_n < legend_a.length - 1 )
            {
              legend_s += ' - '
            }
          }
        )
    }
    
    return (
      /*HTML*/
      `<${C_o.NOTE_TAG_s} data-id="note_img">
      <button aria-label="unfold image" data-legend="${legend_s}">
      <label data-id="img_legend">${data_s}</label>
      </button>
      <${C_o.NOTE_CONTENT_TAG_s} data-id="note_content">${content_s}</${C_o.NOTE_CONTENT_TAG_s}>
      </${C_o.NOTE_TAG_s}>`
    )
  }
,



/**
 * Use an <a> as button to click without closing
 */
note_link__s:
  link_a =>
  {
    let link_s =
      /*HTML*/
      `<${C_o.NOTE_LINK_TAG_s} class="note_link_a">`

    link_a
      .forEach( atlink_s =>
        {
          let [ act_s, icon_s, ...arg_a ] =
            atlink_s
              .split( ',' )
  
          let parameter_s = ''
  
          icon_s =
            icon_s
              .trim()
  
          arg_a
            .forEach
            (
              arg_s => parameter_s += `${arg_s.trim()},`
            )
  
          link_s +=
            /*HTML*/
            `<a class="note_link"
            role="button" tabindex="0"
            data-method="${act_s}"
            data-param="${parameter_s.slice( 0, -1 )}">${S_o.symbol__s( icon_s )}</a>`
        } )

    return (
      /*HTML*/
      `${link_s}</${C_o.NOTE_LINK_TAG_s}>`
    )
  }
  ,
  






  ior_path__s:
  (
    content_s,    //: newline-separated legend items
    path_s
  ) =>
  {
    let legend_s = ''

    if ( content_s )
    {
      content_s
        .trim()
        .split( '\n' )
        .forEach
        (
          at_s =>
          {
            legend_s +=
              `<li>${at_s}`
          }
        )
    }
    //>

    
    return (
      /*HTML*/
      `<ul data-ior_path="${path_s}">${legend_s}</ul>`
    )
  }
  ,
  




  ior_spot__s:
  (
    content_s,    //: newline-separated title/attributes items
    id_s
  ) =>
  {
    let shots_s = ''

    if ( content_s )
    {
      content_s
        .trim()
        .split( '\n' )
        .forEach
        (
          at_s =>
          {
            const at_a =
              at_s
                .split( '==' )

            shots_s +=
              `<li data-ior_shot="${at_a[1].trim()}">${at_a[0].trim()}`
          }
        )
    }
    
    return (
      /*HTML*/
      `<ul data-ior_spot="${id_s}">${shots_s}</ul>`
    )
  }
  ,

  



  
//code=01
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
          .charAt(0) === '#'  //: # for nonlink title
          ?
            content_o
              .title_s
              .slice(1)    //: strip starting '#' char
          :
            F_o
              .codeUrl__s( content_o.title_s )

    const code_s =
      CODE_o
        .ilite__s
        (
          safe_s,
          content_o
            .lang_s,
          content_o
            .spot_a,
        )

    return (
      /*HTML*/`<div data-id="code_ref">
      <dl data-id="code_ref">
      <dt>Source: ${title_s}</dt>
      <dd>
      <a href="https://ilite.netlify.app" target="_blank" title="Interactively highlighted by ilite.js">ilite</a>
      </dd></dl></div>
      <pre data-id="code">    //: <pre> and <div> as wrappers for full width <code> and <dl>
      <code data-id="code" data-lang="${content_o.lang_s}">${code_s}</code>
      </pre>`
    )
  }
,
//code=01

  

  code__s:
  (
    path_s    //: 'path/to/file.ext#index_s', index_s is empty for full file
  ) =>
  {
    const [ file_s, index_s ] =
      path_s
        .split( '#' )

    const source_s =
    FS_o
      .readFileSync
      (
        file_s,
        'utf8',
        'r'
      )

    if ( index_s === '' )    //: keep full file
    {
      return source_s
    }
    //>
    const CODE_TAG_s =
      `
      @code     //: code tag
      =         //: code ID delimiter
      `

    const smRE_o =
      REX_o
        .new__re( 'sm' )    //: non-global regex

    const code_re =
      smRE_o
      `
      ${CODE_TAG_s}${index_s}
      (       //: open capture group
      [       //: open char range
      \s\S    //: anything
      ]       //: close char range
      *?      //: non-greedy...
      )       //: close capture group
      ${CODE_TAG_s}${index_s}
      `

    const code_a =
      source_s
        .match( code_re )

    return (
      code_a
      ?
        code_a[1]
      :
        ''
      )
  }
,



  replace_all__s:
  content_s =>
  {
    let [ content_a, content_o ] =
      SPLIT__a
      (
        content_s,
        '_replace_all'
      )

    return (
      REPLACE__s
      ( 
        content_o,
        content_a[1]
      )
    )
  }
,

}




module.exports = make_o =>
{
  [
    'note_link',
    'code'
  ]
    .forEach
    (
      code_s =>
        make_o
          .addNunjucksShortcode
          (
            `${code_s}`,
            arg_ =>
              CODES_o
                [ `${code_s}__s` ]
                ( arg_ )
          )
    )
  ,

  [ 'anchor',
    'note_txt',
    'note_img',
    'ior_path',
    'ior_spot',
    'code_block',
    'replace_all',
  ]
    .forEach
    (
      code_s =>
        make_o
          .addPairedShortcode
          (
            `_${code_s}`,
            (
              content_s,
              arg_
            ) =>
              CODES_o
                [ `${code_s}__s` ]
                (
                  content_s,
                  arg_
                )
          )
      )
}
