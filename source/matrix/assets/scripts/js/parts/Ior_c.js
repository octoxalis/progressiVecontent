// === Ior.js ===

const DEF_a =
  [
    'id_s',
    'region_s',
    'size_s',
    'rotate_s',
    'format_s',
  ]


class Ior    //: Image on request map class (Array of definitions)
{
  //:- server_s:   IIIF server
  //:- prefix_s:   ____ prefix


  constructor
  (
    server_s='{{ U_o.url_s }}',
    prefix_s='{{ C_o.MEDIA_PATH_s }}' + '{{ C_o.IIIF_DIR_s }}'
  )
  {
    this.server_s = server_s

    this.prefix_s = prefix_s

    this.map_o =
      new Object( null )            //: IOR id_s dictionnary

    this
      .init__v()
}



  init__v    //: scan document for ior nodes
  ()
  {
    document
      .querySelectorAll( `[data-ior_path]` )    //: IDENT
      .forEach
      (
        ul_e =>
        {
          const id_s =
            this
              .id__s
              (
                ul_e
                  .dataset
                    .ior_path        //-- {{C_o.IOR_ID_s}}
              )

          this
            .spot__v( id_s )
            
          this
            .legend__v
            (
              id_s,
              ul_e
            )
        }
      )
  }



  id__s
  (
    path_s    //: identifier/region/size/rotation/format
  )
  {
    const def_o = {}

    let id_s

    path_s
      .split( '/' )        //-- {{C_o.IOR_SPLIT_s}}
      .forEach
      (
        (
          split_s,
          at_n
        ) =>
        {
          if ( !at_n )    //: path_s first part is identifier
          {
            id_s = split_s
          }
          else            //: subsequent part are region/size/rotation/format
          {
            def_o
              [DEF_a[at_n]] = split_s
          }
        }
      )
    
      this
        .map_o
          [id_s] = def_o
      
      return id_s
  }



  spot__v
  (
    id_s
  )
  {
    const shot_a = []

    document
      .querySelectorAll( `[data-ior_spot^="${id_s}"]` )    //: SPOT shots list
      .forEach
      (
        spot_e =>
        {
          spot_e
            .querySelectorAll( `[data-ior_shot]` )    //: SHOT
            .forEach
            (
              shot_e =>
              {
                const shot_s =
                  shot_e
                    .dataset
                      .ior_shot
              
                if ( shot_s )
                {
                  shot_a
                    .push( shot_s )
                }
    
              }
            )

          this
            .map_o
              [id_s]
                .shot_a = shot_a

        }
      )
  }



  legend__v
  (
    id_s,
    ul_e
  )
  {
    const legend_a = []

    ul_e
      .querySelectorAll( 'li' )    //: legend parts
      .forEach
      (
        li_e =>
        {
          legend_a
            .push
            (
              li_e
                .innerHTML
                  .trim()
            )
        }
      )

    this
      .map_o
        [id_s]
          .legend_a = legend_a
  }



  //=== API ===
  json__s    //: get map_o as JSON
  ()
  {
    return (
      JSON
        .stringify( this.map_o )
    )
  }



  legend__a    //: get legend parts Array
  (
    id_s
  )
  {
    return (
      this
        .map_o
          [id_s]
            .legend_a
    )
  }



  shot__a    //: get shots Array
  (
    id_s
  )
  {
    return (
      this
        .map_o
          [id_s]
            .shot_a
    )
  }
}

