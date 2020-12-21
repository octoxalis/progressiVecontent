// === CODE_o: code.js ==

var CODE_o =
{

}



void function ()
{
  const code_a =
    document
      .querySelectorAll( `code[data-id="code"]` )
  ;[ ...code_a ]
    .forEach
    (
      code_e =>
      {
        code_e
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
      }
    )
} ()
