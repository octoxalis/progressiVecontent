// === IOR_o: ior.js ===
var IOR_o =
{
  renew__v
  (
    doc_n
  )
  {
    const section_e =
      document
        .querySelector( `section[data-doc_n="${doc_n}"]` )

    let ior_c =
      new Ior()

    ior_c
      .scan__v( section_e )
  
    const json_s =
      ior_c
        .json__s()      //;console.log( json_s )
  
    if ( json_s )
    {
      SER_o
        ['{{C_o.msg_o.REQ_IMG_s}}__v']
        ( json_s )
    }

    //======================
    ;console.log( 'ior.js' )
  }
}


