// === IOR_o: ior_worker.js ===

var IOR_o =
{
  utlPart_a:
    [
      'region_s',
      'size_s',
      'rotation_s',
      'format_s'
    ]
  ,




  parse__a
  (
    json_s
  )
  {
    const json_o =
      JSON
        .parse( json_s )

    const urlMap_o =
      new Object( null )

    for ( let id_s in json_o )
    {
      let url_o =
        new Object( null )
      
      IOR_o
        .utlPart_a
          .forEach
          (
            part_s =>
            {
              url_o[ part_s ] =
                json_o[ id_s ][ part_s ]
            }
          )

      urlMap_o[id_s] =
          IOR_o
            .shot__a
            (
              json_o
                [ id_s ]
                  .shot_a,
                  { ...url_o }    //: clone
            )
    }

    return urlMap_o
  }
  ,



  shot__a
  (
    shot_a,
    url_o
  )
  {
    const url_a = []

    shot_a
      .forEach
    (
      shot_s =>
      {
        shot_s
          .split( '/' )
          .forEach
          (
            part_s =>
            {
              const [ key_s, val_s ] =
                part_s
                  .split( ':' )

              url_o[`${key_s}_s`] = val_s
            }
          )

        url_a
          .push
          (
            `${url_o.region_s}/${url_o.size_s}/${url_o.rotation_s}/${url_o.quality_s}.${url_o.format_s}`
          )


      }
    )

    return url_a
  }
  ,








}
