// === CODE_o: code.js ==

var CODE_o =
{

}



void function ()
{
  return  //..................................
  document
    .querySelector( `#${IND_o.code_s}` )
    .addEventListener
    (
      'click',
      click_o =>    //: handler
      {
        const li_e =
          click_o
            .target
            .closest('LI')
        if ( li_e )
        {
          li_e
            .classList
            .toggle( 'i_spot' )
        }
      }
        
    )
} ()


