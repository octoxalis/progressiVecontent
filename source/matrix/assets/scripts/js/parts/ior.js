// === IOR_o: ior.js ===
var IOR_o =
{
  init__v
  (
    root_e
  )
  {
    let ior_c =
      new Ior()

    ior_c
      .scan__v( root_e )
  
    const json_s =
      ior_c
        .json__s()      ;console.log( json_s )
  
    if ( json_s )
    {
      SER_o
        ['{{C_o.msg_o.REQ_IMG_s}}__v']
        ( json_s )
    }
  }
}



;console.log( 'ior.js' )