const A_o = require( '../../matter/assets/scripts/js/lib/A_o.js' )
const U_o = require( '../../matter/assets/scripts/js/lib/U_o.js' )


const SEC_o =
{
  content__v    //:- Wrap `content_s` (if starting with a h1-6 element) to a (button + div) collapsible content 
  (
    content_s,
    slot_s
  )
  {
    const head_o = /<(h[1-6][\s\S]*?)>([\s\S]*?)<\/h[1-6]>/i    //:- wrap content head (h1-h6) with a button
    const head_a = content_s.match( head_o )
    if ( !head_a ) return content_s
    //>
    const head_s = head_a[0]
    const main_s = content_s.slice( head_s.length + 1 )
    const trash_s = slot_s === A_o.DOCS_s ?
      ''
      :
      `<span class="span_icon" data-slot_s="${slot_s}"><svg class="svg_icon"><use href="#icon_trash" class="use_icon"></use></svg></span>`
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
    const redirect_s = `<a href="${U_o.url_s}${A_o.URL_H_s}/${permalink_s}" data-id="redirect" tabindex=-1>Go to Site Open</a>`
    return `${section_s}${output_s}${redirect_s}</section>`
  },
  
}
