const C_o = require( '../data/C_o.js' )

const PATH_s =   'content/'



const WORD_o =
{
  tag_re:   new RegExp( `${C_o.tag_o.ATAG_s}${C_o.tag_o.PTAG_s}`, 'g' ),    //: No tag
  open_re:  new RegExp( `${C_o.tag_o.ATAG_s}([${C_o.tag_o.REGEX_s}]+?)?${C_o.tag_o.PTAG_s}`, 'g' ),
  close_re: new RegExp( `${C_o.tag_o.PTAG_s}${C_o.tag_o.ATAG_s}`, 'g' ),
  term_re:  new RegExp( `${C_o.tag_o.ATAG_s}([${C_o.tag_o.REGEX_s}]+?)?${C_o.tag_o.PTAG_s}([\\s\\S]*?)${C_o.tag_o.PTAG_s}${C_o.tag_o.ATAG_s}`, 'g' ),
  
  
  url__s
  (
    url_s
  )
  { return url_s.slice( url_s.indexOf( PATH_s ) + PATH_s.length ) }
,



}

module.exports =
{
  tag__s
  (
    input_s
  )
  {
    return input_s
      .replace( WORD_o.tag_re, `${C_o.tag_o.ATAG_s}${C_o.tag_o.TAG_s}${C_o.tag_o.PTAG_s}` )  //: must be first replace
      .replace( WORD_o.open_re, `<${C_o.MARK_DATA_TAG_s} ${C_o.tag_o.DATA_s}="$1">` )
      .replace( WORD_o.close_re, `</${C_o.MARK_DATA_TAG_s}>` )
  },
  
}
