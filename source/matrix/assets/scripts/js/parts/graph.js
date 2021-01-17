// === GRA_o: graph.js ===

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




  nodes__v    //:- select topic grid nodes
  (
    event_e
  )
  {
    const target_e =
      event_e
        .target
        .closest( '[data-step]' )

    if ( target_e && target_e.classList.contains( 'slide_focus' ) )
    {
      LIB_o
        .invisible__v
        (
          GRA_o.svg_e
        )

      const at_n =
        GRA_o
          .slider_c
          .atStep__n()

      const topic_e =
        LIB_o
          .nodeId__o( 'topics_docs' )
          .querySelector( `li[data-doc_n="${at_n}"]` )

      const docs_a =
        new Set
        (
          topic_e
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
              .querySelector( `circle:nth-child(${at_n})` )    //-- rect
          at_e &&
            at_e
              .classList
              .toggle( 'node_set' )
        }
      )  
  }    
,  



  nodeOpen__v    //:- diplay node data
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
        target_e.classList.contains( 'node_set' )
      )
    SLOT_o
      .dialog__o( 'section_contents' )
      .classList
      .toggle( 'retract' )
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
    SLOT_o
      .dialog__o( 'section_contents' )
      .classList
      .toggle( 'retract' )
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
    const doc_s =
      GRA_o
        .nodeSlot__s( step_s )
    let section_e =
      LIB_o
        .nodeId__o( 'sections' )
        .querySelector
        (
          `section[data-doc_n="${step_s}"]`
          //...`section[data-doc_n="${+step_s + 1}"]`              //: Number cast
        )
    if ( !section_e )  //: not yet fetched
    {
      IND_o
        .load__v
        (
          '{{C_o.SLOTS_s}}',      //: path_s default
          doc_s,
          +step_s,        //: as Number
          section_e =>    //: callback_f
          {
            SLI_o
              .slider_c
              .add__v
              (
                section_e,
                0,    //: NOT auto indexed
                [
                  `data-doc_s=${section_e.dataset.doc_s}`
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
    GRA_o.nodeClose__v()
  }
,



  nodeStep__s
  ()
  {
    return (
      LIB_o
        .id__o
        (
          'dialog_block_title',
          SLOT_o
            .dialog__o( 'section_contents' )
        )
        //XX.getAttribute( 'data-doc_s' )  //: set by node__v
        .dataset.doc_s  //: set by node__v
        .slice( 'node_'.length )
    )
  }
,



  nodeSlot__s
  (
    step_s
  )
  {
    return LIB_o
      .nodeId__o( 'docs_topics' )
      .querySelector( `li[data-doc_n="${step_s}"]` )
      .dataset.doc_s
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
    const topics_e =
      LIB_o
        .nodeId__o( 'docs_topics' )
    const data_e =
      topics_e
        .querySelector( `li[data-doc_n="${at_n}"]` )
    if ( !data_e ) return
    //>
    const section_e =
      SLOT_o
        .dialog__o( 'section_contents' )
    const title_e =
      LIB_o
        .id__o
        (
          'dialog_block_title',
          section_e
        )
    title_e
      .setAttribute
      (
        'data-doc_s',
        node_e.id
      )
    title_e
      .innerHTML =
        data_e
          .dataset
          .doc_s
          .replaceAll
          (
            '_',
            ' '
          )
    const topics_s =
      data_e
      .dataset['-']
    let list_s = ''
    for ( let lab_s of topics_s.split( ' ' ) )
    {
      list_s += `<li>${lab_s.replaceAll( '_', ' ' )}`
    }
    LIB_o
      .id__o( 'dialog_block_list' )
      .innerHTML = list_s
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


  skin__v
  ()
  {
    if ( LIB_o.nodeId__o( 'section_skin' ) )  return    //: already loaded
    //->
    IND_o
      .load__v
      (
        path_s='{{C_o.SYS_s}}',
        doc_s='{{C_o.SKIN_s}}',
        doc_n='{{C_o.SKIN_n}}',          //: negative indices for sys slots
        callback_f=null
      )
  }
,
  

  bookmark__v
  ()
  {
    if ( LIB_o.nodeId__o( 'section_bookmark' ) )  return    //: already loaded
    //->
    IND_o
      .load__v
      (
        path_s='{{C_o.SYS_s}}',
        doc_s='{{C_o.BOOKMARK_s}}',
        doc_n='{{C_o.BOOKMARK_n}}',          //: negative indices for sys slots
        callback_f=null
      )
  }
,



  listen__v
  ()
  {
    GRA_o
      .slider_e
      .addEventListener
      (
        'click',
        GRA_o.nodes__v
      )
    GRA_o
      .svg_e
      .addEventListener
      (
        'click',
        GRA_o.nodeOpen__v
      )
    LIB_o
      .nodeId__o( 'skin_link' )
      .addEventListener
      (
        'click',
        _o =>    //: not used
        {
          GRA_o
            .skin__v()
        }
      )
    LIB_o
      .nodeId__o( 'bookmark_link' )
      .addEventListener
      (
        'click',
        _o =>    //: not used
        {
          GRA_o
            .bookmark__v()
        }
      )
    const section_e =
      SLOT_o
        .dialog__o( 'section_contents' )
    section_e
      .querySelector( 'dl' )
      .addEventListener
      (
        'click',
        GRA_o.nodeLink__v
        )
    LIB_o
      .id__o
      (
        'close',
        section_e
      )
      .addEventListener
      (
        'click',
        GRA_o.nodeClose__v
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
            GRA_o.slider_c.toNearest__v( -1 )
            break
          case ( [ 'ArrowRight', 'Right', 39 ].includes( key_sn ) ) :    //: RIGHT
            GRA_o.slider_c.toNearest__v( 1 )
            break
          case ( [ 'ArrowUp', 'Up', 38 ].includes( key_sn ) ) :    //: UP
            GRA_o.slider_c.toNearest__v( -4 )
            break
          case ( [ 'ArrowDown', 'Down', 40 ].includes( key_sn ) ) :    //: DOWN
            GRA_o.slider_c.toNearest__v( 4 )
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
        const doc_s = click_o.target.dataset.doc_s
        const step_n = GRA_o.slider_c.capacity__n()
        if ( !GRA_o.loaded__b( doc_s ) )
        {
          LIB_o.slot__v( path_s, doc_s, step_n,
           ( _e, section_e ) =>
           {
             section_e.dataset.doc_s = doc_s
             section_e.dataset.doc_n = step_n
             GRA_o.slider_c.add__v( section_e )
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
  //...    .fetch__v( `{{U_o.url_s}}{{C_o.JSON_PATH_s}}graph.json` )
  //...GRA_o.graph_c =
  //...  Graph
  //...    .json__c( json_o )
  GRA_o.svg_e =
    LIB_o
      .nodeId__o( 'graph_svg' )
  GRA_o.slider_e =
    LIB_o
      .nodeId__o( 'graph_slider' )
  const topicsList_e =
    LIB_o
      .nodeId__o( 'topics_docs' )
  GRA_o.slider_c =
    new Slider3D
    (
      GRA_o.slider_e,
      topicsList_e,
    )
  LIB_o
    .rootVar__v
    (
      '--LABELS_CAP',
      topicsList_e.children.length
    )
  GRA_o
    .listen__v()
  //>
  ;console.log( 'graph.js' )
} ()


