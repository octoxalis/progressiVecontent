/**
 */
module.exports =
{
  strip__s    //: strip formating fake css selector ',\n__'
  (
    css_s,
    ...args_
  )
  {
    return css_s.replace( /,\n__\s+/g, '\n' )
  }
,



}
