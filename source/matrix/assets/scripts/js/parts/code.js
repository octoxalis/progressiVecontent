// === COD_o: code.js ==

var COD_o =
{
  uvar__v:
  (
    target_e
  ) =>
  {
    const uvar_s =
      target_e
        .innerText
    const uvar_a =
      document
        .querySelectorAll( `.i_uv` )
    ;[ ...uvar_a ]
      .forEach
      (
        uvar_e =>
        {
          if
          (
            uvar_e.innerText
            ===
            uvar_s
          )
          {
            uvar_e
              .classList
              .toggle( 'i_uv_hi')
          }
        }
      )
  }
,



line__v:
(
  target_e
) =>
{
  const li_e =
    target_e
      .closest('LI')
  if ( li_e )
  {
    li_e
      .classList
      .toggle( 'i_spot' )
  }
}
,

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
              const target_e =
                click_o.target
              if ( target_e.classList.contains( 'i_uv' ) )
              {
                return (
                  COD_o
                    .uvar__v( target_e )
                )
              }
              //>
              COD_o
                .line__v( target_e )
            }
              
          )
      }
    )
  //>
  ;console.log( 'code.js' )
} ()
