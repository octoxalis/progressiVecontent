//#code=01
const P_o = require('prismjs')



module.exports =
{
  highlight__s
  (
    code_s,
    lang_s
  )
  {
    return Prism.highlight( code_s, Prism.languages[lang_s], lang_s )
  }
,

}
//#code=01
