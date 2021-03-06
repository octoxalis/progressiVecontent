// === IND_o: index.js ===

var IND_o =
{
  boot__v    //: register Service Worker & display initial page
  ()    //: method_s argument ignored
  {
    IND_o
      .service__v()

    LIB_o
      .nodeId__o( 'initial_hero' )
      .addEventListener
      (
        'click',
        IND_o.initial__v
      )
  }
,
  
  
  
  initial__v
  (
    method_s
  )
  {
    if ( method_s === 'initial' )  //: skip service activation already done a boot
    {
      IND_o
        .service__v()
    }

    LIB_o
      .nodeId__o( 'initial' )
      .remove()    //: get rid of initial !!!

    IND_o
      .colorMode__v
        ( 'hue_base' )

    IND_o
      .colorMode__v
        ( 'lum_mode' )

    IND_o
      .unfold__v()

    IND_o
      .listen__v()
    }
  ,
  
  

  service__v
  ()
  {
    if ( !'serviceWorker' in navigator )    //:- register service worker
    {
      return void window
        .alert( "To visit {{A_o.NAME_s}}, you have to use a Service Workers enabled browser" )
    }
    //>
    //--window
    //--  .requestIdleCallback
    //--  (
    //--    () =>
          SER_o
            .init__v( '{{U_o.url_s}}{{U_o.SERVICE_PATH_s}}' )
    //--)
  }
,
  
  
  
  unfold__v
  (
    event_o
  )
  {
    //?? LIB_o
    //??   .scroll__v()    //!!! scroll to top
    if ( !LIB_o.nodeId__o( 'section_{{C_o.DOCS_s}}' ) )  //: contents section not yet loaded
    {
      IND_o
        .load__v()    //: default args
    }

    LIB_o
      .toggleId__v
      (
        'sections_slider',
        'aside'
      )
  }
,


  load__v
  (
    path_s='{{C_o.SYS_s}}',
    doc_s='{{C_o.DOCS_s}}',
    doc_n=+'{{C_o.DOCS_n}}',          //: negative indices for C_o.SYS_s slots
    callback_f=null
  )
  {
    LIB_o
      .slot__v
      (
        path_s,
        doc_s,
        doc_n,
        (        //: callback_f
          _e,    //: not used
          section_e,
        ) =>
        {
          section_e.dataset.doc_n = ''+doc_n

          section_e.dataset.doc_s = doc_s

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

          if ( doc_n >= {{C_o.SLOT_n}} )    //: only for content slots
          {
            GRA_o
              .svg_e
              .querySelector( `#node_${doc_n}` )
              ?.classList
              ?.toggle( 'node_on' )
          }
        }
      )
    IND_o
      .clearUrl__v()
  }
,



  colorMode__v
  (
    set_s,   //: hue or luminosity: hue_base || lum_mode
    set_n    //: if initial load, set_n undefined (no parameter)
  )
  {
    let base_s

    if
    (
      set_n === undefined  //: initial load only
    )
    {
      base_s =
        set_s === 'hue_base' ?
          '{{C_o.HUE_P_n}}'
          :
          '{{C_o.LUM_MODE_n}}'

      set_n =
        window
          .localStorage
          .getItem
            ( set_s )
        ||
        base_s    //: 1st site visit or local storage cleared
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
        .querySelector( 'button[data-doc_s]' )
        .addEventListener
        (
          'click',
          () =>
          {
            section_e
              .querySelector( 'article[data-doc_s]' )
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
      .querySelector( 'article[data-doc_s]' )
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



  renew__v
  (
    //--doc_n
  )
  {
    const method_s =
      window
        .localStorage
        .getItem
          ( 'worker_b' )  ?
      'initial'
      :
      'boot'
    IND_o
      [ `${method_s}__v` ]( method_s )

    //======================
    ;console.log( 'code.js' )
  }

}

IND_o
  .renew__v()
