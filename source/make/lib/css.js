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
    return (
      css_s
      .replace( /\/\*(=| )?[\s\S]*?(=| )?\*\//g, '' )    //: comments
      .replace( /,\n__\s+/g, '' )    //: 1st
      //????.replace( /__\s\s[\s\S]+\}$/g, '' )    //: 2nd
      .replace( /,\n/g, ',' )
      .replace( /\n{2,16}/g, '\n' )
      .replace( / {2,16}/g, ' ' )    //: space
      .replace( /\n\s+([+\-\*\/])\s+/g, ' $1 ' )    //: multiline calc()
    )
  }
,



}
