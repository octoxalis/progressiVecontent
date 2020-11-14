//=== GRA_o: graph.js ===

var GRA_o =
{
  graph_c:  null,
  dim_n: 24,
  gap_n: 2,
  minDim_n: 16,
  maxDim_n: 32,
  node_s: 'node_',

  slider_e: null,
  svg_e: null,
  selected_a: new Set(),


  
  async fetch__v
  (
    url_s
  )
  {
    let fetch_o =
      await fetch
      (
        url_s
      )
    if ( !fetch_o.ok ) return void alert( `"HTTP-Error: ${fetch_o.status}` )  //!!! TODO: better alert
    //-->
    const json =
      await fetch_o
        .json()
    //-->
    return json
  }
,




  nodes__v    //:- select grid nodes
  (
    event_e
  )
  {
    const target_e =
      event_e
        .target
        .closest( '[data-step]' )
    if ( target_e.classList.contains( 'slide_focus' ) )
    {
      LIB_o
        .invisible__v
        (
          GRA_o.svg_e
        )
      const at_n =
        GRA_o
          .slider
          .atStep__n()
      const label_e =
        LIB_o
          .nodeId__o( 'labels_docs' )
          .querySelector( `li[data-slot_n="${at_n}"]` )
      const docs_a =
        new Set
        (
          label_e
            .dataset['-']
            .split( ' ' )
        )
      SET_o
        .disjoint__a
        (
          GRA_o.selected_a,
          docs_a
        )
        .forEach
        (
          at_a =>
            GRA_o
              .toggle__v( at_a )
        )
      GRA_o
        .selected_a = docs_a
    }
  }
,



  toggle__v
  (
    set_a
  )  
  {
    set_a
      .forEach
      (
        at_n =>
        {
          const at_e =
            GRA_o
              .svg_e
              .querySelector( `rect:nth-child(${at_n})` )
          at_e &&
            at_e
              .classList
              .toggle( 'node_selected' )
        }
      )  
  }    
,  



  openNode__v    //:- diplay node data
  (
    event_e
  )
  {
    const target_e =
      event_e
        .target
    GRA_o
      .node__v
      (
        target_e,
        target_e.classList.contains( 'node_selected' )
      )
    LIB_o
      .nodeId__o( 'node_display' )
      .classList
      .toggle( 'unseen' )
    const node_e =
      GRA_o
        .svg_e
        .querySelector( '.node_focus' )
    if ( node_e )    //: deselect previous focused node
    {
      node_e
       .classList
       .remove( 'node_focus' )
    }
    target_e    //: select new focused node
      .classList
      .add( 'node_focus' )
  }
,



  nodeClose__v
  ()
  {
    LIB_o
     .nodeId__o( 'node_display' )
     .classList.toggle( 'unseen' )
  }
,



  sectionSlider__v
  ()
  {
    SLI_o
      .slider_c
      .cycle__v( SLI_o.slider_c.capacity__n() - 1 )
  }
,



  nodeLink__v
  ()
  {
    const step_s =
      GRA_o
        .nodeStep__s()
    const slot_s =
      GRA_o
        .nodeSlot__s( step_s )
    let section_e =
      document
        .querySelector
        (
          `section[data-slot_n="${step_s}"]`
          //...`section[data-rank="${+step_s + 1}"]`              //: Number cast
        )
    if ( !section_e )  //: not yet fetched
    {
      IND_o
        .load__v
        (
          '{{A_o.SLOTS_s}}',      //: path_s default
          slot_s,
          +step_s,        //: Number
          section_e =>    //: callback_f
          {
            SLI_o
              .slider_c
              .add__v
              (
                section_e,
                0,    //: NOT auto indexed
                [
                  `data-section=${step_s}`,
                  `data-slot_s=${section_e.dataset.slot_s}`
                ],
                () =>    //: callback_f
                {
                  GRA_o
                    .sectionSlider__v()
                  LIB_o
                    .rootVar__v
                    (
                      '--SECTIONS_CAP',
                      SLI_o.slider_c.capacity__n()
                    )
                }
              )
          }
        )
    }  
  }
,



nodeStep__s
  ()
  {
    return LIB_o
      .nodeId__o( 'node_link' )
      .getAttribute( 'data-slot_s' )
      .slice( 'node_'.length )
  }
,



  nodeSlot__s
  (
    step_s
  )
  {
    return LIB_o
      .nodeId__o( 'docs_labels' )
      .querySelector( `li[data-slot_n="${step_s}"]` )
      .dataset.slot_s
  }
,



  node__v
  (
    node_e,
    selected_b
  )
  {
    const at_n =
      +node_e    //: number cast
        .id
        .slice
        (
          GRA_o
            .node_s
            .length
        )
    const labels_e =
      LIB_o
        .nodeId__o( 'docs_labels' )
    const data_e =
      labels_e
        .querySelector( `li[data-slot_n="${at_n}"]` )
    if ( !data_e ) return
    //>
    const doc_e =
      LIB_o
        .nodeId__o( 'node_link' )
    doc_e
      .setAttribute
      (
        'data-slot_s',
        node_e.id
      )
    LIB_o
      .nodeId__o( 'node_document' )
      .innerHTML =
        data_e
          .dataset
          .slot_s
          .replace
          (
            '_',
            ' '
          )
    const labels_s =
      data_e
      .dataset['-']
    let html_s = ''
    for ( let lab_s of labels_s.split( ' ' ) )
    {
      html_s += `<li>${lab_s}`
    }
    LIB_o
      .nodeId__o( 'node_labels' )
      .innerHTML = `<ul>${html_s}</ul>`
    const select_s =
      selected_b ?
        'NODE_BACK_SELECTED'
        :
        'NODE_BACK_NOT_SELECTED'
    LIB_o
      .rootVar__v
      (
        '--NODE_BACK',
        LIB_o
          .rootVar__s
            (
              `--${select_s}`
            ) 
      )
  }
,


tools__v
()
{
  if ( LIB_o.nodeId__o( 'section_tools' ) )  return    //: already loaded
  //->
  IND_o
    .load__v
    (
      path_s='{{A_o.SYS_s}}',
      slot_s='{{A_o.TOOLS_s}}',
      slot_n=-2,          //: negative indices for sys slots
      callback_f=null
    )
  }
,



  listen__v
  ()
  {
    GRA_o.slider_e
      .addEventListener
      (
        'click',
        GRA_o.nodes__v
      )
    GRA_o.svg_e
      .addEventListener
      (
        'click',
        GRA_o.openNode__v
      )
    GRA_o.svg_e
      .addEventListener
      (
        'touchstart',
        GRA_o.openNode__v
      )
    LIB_o
      .nodeId__o( 'node_display' )
      .addEventListener
      (
        'click',
        GRA_o.nodeClose__v
      )
    LIB_o
      .nodeId__o( 'node_link' )
      .addEventListener
      (
        'click',
        GRA_o.nodeLink__v
      )
    LIB_o
      .nodeId__o( 'tools_link' )
      .addEventListener
      (
        'click',
        event_o =>
        {
          GRA_o
            .tools__v()
        }
      )
  //: keyboard
  /*
  document.addEventListener( 'keyup',
    key_o =>
    {
      if ( key_o.defaultPrevented || !GRA_o.onv}iew__b() ) return
      //>
      const key_sn = key_o.key || key_o.keyCode
      if ( [ 'Escape', 'Esc', 27 ].includes( key_sn ) ||
           [ 'Backspace', 'Back', 8 ].includes( key_sn ) ) GRA_o.onview__s()    // ESC || BACKSPACE close
      else
      {
        switch ( true )
        {
          case ( [ 'ArrowLeft', 'Left', 37 ].includes( key_sn ) ) :    //: LEFT
            GRA_o.slider.toNearest__v( -1 )
            break
          case ( [ 'ArrowRight', 'Right', 39 ].includes( key_sn ) ) :    //: RIGHT
            GRA_o.slider.toNearest__v( 1 )
            break
          case ( [ 'ArrowUp', 'Up', 38 ].includes( key_sn ) ) :    //: UP
            GRA_o.slider.toNearest__v( -4 )
            break
          case ( [ 'ArrowDown', 'Down', 40 ].includes( key_sn ) ) :    //: DOWN
            GRA_o.slider.toNearest__v( 4 )
            break
          case ( [ 'Enter', 13 ].includes( key_sn ) ) :    //: ENTER
            GRA_o.onview__s()
            break
          default:
            break
        }
      }
      key_o.preventDefault()
      key_o.stopPropagation()
    }, true )
  */
  

  /*//XXXXXXXXXXXXXXXX
  document.querySelector( '[data-path]' )    //:!!! TEMPORARY: will be graph nodes
    .addEventListener( 'click',
      click_o =>
      {
        const path_s = click_o.target.dataset.path
        const slot_s = click_o.target.dataset.slot_s
        const step_n = GRA_o.slider.capacity__n()
        if ( !GRA_o.loaded__b( slot_s ) )
        {
          LIB_o.slot__v( path_s, slot_s, step_n,
           ( _e, section_e ) =>
           {
             section_e.dataset.slot_s = slot_s
             section_e.dataset.slot_n = step_n
             GRA_o.slider.add__v( section_e )
           } )
       
        }
        const view_s = GRA_o.onview__s()
        GRA_o.view__v( view_s )
      } )
      */
  
  }
,



}



void async function
()
{
  //...let json_o =
  //...  await GRA_o
  //...    .fetch__v( `{{U_o.url_s}}{{U_o.JSON_PATH_s}}graph.json` )
  //...GRA_o.graph_c =
  //...  Graph
  //...    .json__c( json_o )
  //?? IND_o
  //??   .colorMode__v
  //??     ( 'hue_base' )
  //?? IND_o
  //??   .colorMode__v
  //??     ( 'lum_mode' )
  GRA_o.svg_e =
    LIB_o
      .nodeId__o( 'graph_svg' )
  GRA_o.slider_e =
    LIB_o
      .nodeId__o( 'graph_slider' )
  const labelsList_e =
    LIB_o
      .nodeId__o( 'labels_docs' )
  GRA_o.slider =
    new Slider3D
    (
      GRA_o.slider_e,
      labelsList_e,
    )
  LIB_o
    .rootVar__v
    (
      '--LABELS_CAP',
      labelsList_e.children.length
    )
  GRA_o
    .listen__v()
} ()


