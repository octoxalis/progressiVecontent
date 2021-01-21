// === IOR_o: ior.js ===
var IOR_o =
{

}


void function
()
{
  let ior_c =
    new Ior()

  const json_s =
    ior_c
      .json__s()
  
  //;console.log( json_s )

  if ( !json_s )
  {
    return
  }
  //>
  SER_o
    ['{{C_o.msg_o.REQ_IMG_s}}__v']
    ( json_s )

  //>
  ;console.log( 'ior.js' )
}()