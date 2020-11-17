//=== IND_o: index.js ===

var IND_o =
{
  initial__v
  ()
  {
    IND_o
      .unfold__v()
    LIB_o
      .invisible__v
      (
        LIB_o
          .nodeId__o( 'initial' ),
        'add'
      )
    IND_o
      .listen__v()
  }
  ,
  
  
  
  unfold__v
  (
    event_o
  )
  {
    //?? LIB_o
    //??   .scroll__v()    //!!! scroll to top
    if ( !LIB_o.nodeId__o( 'section_{{A_o.DOCS_s}}' ) )  //: docs section not yet loaded
    {
      LIB_o
        .toggleId__v
        (
          'sections_slider',
          'aside'
        )
      IND_o
        .load__v()    //: default args
    }
  }
,


  load__v
  (
    path_s='{{A_o.SYS_s}}',
    slot_s='{{A_o.DOCS_s}}',
    slot_n=-1,          //: negative indices for sys slots
    callback_f=null
  )
  {
    LIB_o
      .slot__v
      (
        path_s,
        slot_s,
        slot_n,
        (        //: callback_f
          _e,    //: not used
          section_e,
        ) =>
        {
          section_e.dataset.slot_n = ''+slot_n
          section_e.dataset.slot_s = slot_s
          callback_f
            && callback_f( section_e )
          IND_o
            .listenSection__v( section_e )
          IND_o
            .toggleSection__v( section_e )
          
          setTimeout    //: avoid unstyled content flash
          (
            () =>
            {
              LIB_o
                .invisible__v
                (
                  section_e
                )
              },
            20
          )
        }
      )
    IND_o
      .clearUrl__v()
  }
,



colorMode__v
  (
    set_s,   //: hue or luminosity: hue_base || lum_mode
    set_n    //: if page load, set_n undefined (no parameter)
  )
  {
    if
    (
      set_n === undefined  //: page load only
    )
    {
      set_n =
        set_s === 'hue_base' ?
        '{{C_o.HUE_P_n}}'
        :
        '{{C_o.LUM_MODE_n}}'
    }
    window
      .localStorage
      .setItem
        ( set_s, set_n )
    LIB_o
      .rootVar__v
        (
          `--${set_s}`,
          set_n
        )
    console
      .log
        ( `Current ${set_s}: ${set_n}` )
  }
,



service__v
()
{
  if ( !'serviceWorker' in navigator )    //:- register service worker
  {
    return void window
      .alert( "To visit {{A_o.NAME_s}}, please use a browser with Service Workers enabled" )
  }
  //>
  SER_o
    .init__v( '{{U_o.url_s}}{{U_o.SERVICE_PATH_s}}' )
}
,



  listen__v
  ()
  {
    LIB_o
      .nodeId__o( 'sections_slider' )
      .addEventListener
      (
        'click',
        event_o =>
        {
          const button_e =
            event_o
              .target
          if
          (
            button_e
              ?.closest( 'button' )
              ?.classList
              ?.contains( 'step_focus' )
          )
          {
            IND_o
              .unfold__v()
          }
        }
      )

  }
,



  listenSection__v
  (
    section_e
  )
  {
      section_e
        .querySelector( 'button[data-slot_s]' )
        .addEventListener
        (
          'click',
          () =>
          {
            section_e
              .querySelector( 'article[data-slot_s]' )
              .classList
              .toggle( 'retract' )
          }
        )
  }
,



  toggleSection__v
  (
    section_e
  )
  {
    section_e
      .querySelector( 'article[data-slot_s]' )
      .classList
      .toggle( 'retract' )
    section_e
      .scrollIntoView( {behavior: "smooth", block: "start"} )
  }
,



clearUrl__v
  ()
  {
    if ( window.location.hash )    //: location from an internal link
    {
      window
        .history
        .pushState
        (
          {
            hash: window.location.hash.slice( 1 )    //: save hash (e.g. '/slots/page.html')
          },
          '{{A_o.NAME_s}}',
          '{{U_o.url_s}}'      //: to site root
        )
    }
  }
,




}


void function    //:- init serviceWorker & launcher event
()
{
  LIB_o
    .rootVar__v
    (
      '--HTML_OPAC',
      '1'        //:- set HTML element opacity (initially transparent)
    )
  IND_o
    .colorMode__v
      ( 'hue_base' )
  IND_o
    .colorMode__v
      ( 'lum_mode' )
  const initial_b = //false   //!!!!! const initial_b = false ///!!! TEMPORARY 
    window
      .localStorage
      .getItem
        ( 'initial_b' )
  if ( !initial_b )
  {
    window
      .requestIdleCallback
        (
          IND_o.service__v
        )
    LIB_o
      .nodeId__o( 'initial' )
      .addEventListener
      (
        'click',    //: wait for visitor entrance
        () =>
        {
          IND_o
            .initial__v()
        }
      )
    return
  }
  //>
  IND_o
    .initial__v()
} ()


