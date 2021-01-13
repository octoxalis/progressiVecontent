const REX_o = require( './regex.js' )

const A_o = require( '../data/A_o.js' )
const C_o = require( '../data/C_o.js' )
const U_o = require( '../data/U_o.js' )


const SEC_o =
{
  content__v    //:- Wrap `content_s` (starting with a ':' delimiter !!no blank line after!!) to a (button + div) collapsible content 
  (
    content_s,
    slot_s
  )
  {
    const RE_o =
    REX_o
      .new__re( '' )    //!!! NOT global !!! wrap content head with a button
    const head_re =
      RE_o
        `
        :     //: title delimiter
        (     //: open capture group
        [     //: open char range
        ^:    //: word and space chars
        ]     //: close char range
        *?    //: non-greedy...
        )     //: close capture group
        :     //: title delimiter
        `
    const head_a = content_s.match( head_re )
    if ( !head_a ) return content_s
    //>
    let head_s = head_a[0]
    const main_s = content_s.replace( head_s, '' )    //: head_s consummed by header button
    head_s = head_s.replace( head_re, `<${C_o.SECTION_BTN_TAG_s}>$1</${C_o.SECTION_BTN_TAG_s}>` )   //: replace ':' delimiters by <${C_o.SECTION_BTN_TAG_s}> tag
    const trash_s = slot_s === C_o.DOCS_s ?
      ''
      :
      `<${C_o.CLOSE_ICON_TAG_s} class="close_icon" data-slot_s="${slot_s}"><svg class="svg_icon"><use href="#icon_close"></use></svg></${C_o.CLOSE_ICON_TAG_s}>`
    return `<button data-slot_s="${slot_s}">${head_s}${trash_s}</button><article data-slot_s="${slot_s}" class="retract">${main_s}</article>`
  }
,

}


module.exports =
{
  section__s:    //:- wrap slot content in a section element with anchor and link for SEO
  (
    content_s,
    permalink_s,
    rank_n
  ) =>
  {
    const slot_s = permalink_s.slice( permalink_s.lastIndexOf( '/' ) + 1, -5 )  //: '.html'.length
    const section_s = `<section id="section_${slot_s}" data-rank_n="${rank_n}" class="invisible">`
    const output_s  = SEC_o.content__v( content_s, slot_s )
    const redirect_s = `<a href="${U_o.url_s}${C_o.URL_S_s}${permalink_s}" data-id="redirect" tabindex=-1><br/>This content is part of <em>${A_o.NAME_s}</em> site</a>`
    return `${section_s}${output_s}${redirect_s}</section>`
  },
  
}
