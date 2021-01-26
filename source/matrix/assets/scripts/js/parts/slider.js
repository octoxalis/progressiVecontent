// === SLI_o: slider.js ===
var SLI_o =
{
  slider_e: null,
  slider_c: null,


  slider__n    //: init Slider3D & setup slide[0] data-section
  ()
  {
    SLI_o.slider_e =
      LIB_o
        .nodeId__o( 'sections_slider' )

    SLI_o
      .slider_c =
        new Slider3D(
          SLI_o.slider_e,
          LIB_o.nodeId__o( 'sections' )
          )

    return (
      SLI_o
        .slider_c
        .capacity__n()
      )
  }  
,


  section__v    //:- change view to section
  (
    event_o
  )
  {
    const step_e =
      event_o
        .target
        .closest( '[data-step]' )

    if ( step_e )
    {
      const step_n =
        +step_e
          .dataset
          .step

      const doc_n =
        +LIB_o
          .nodeId__o( 'sections_slider' )
          .querySelector( `dl[data-step="${step_n}"]` )
          .dataset
          .section
          
      SLI_o
        .location__v
        (
          LIB_o
            .docS__o( doc_n )
        )
    }
  }
,



  remove__v
  ()
  {
    LIB_o
      .resetNode__o( 'sections_slider' )
    SLI_o
      .slider_c
      .init__v()
  }
,


  
  location__v
  (
    doc_s
  )
  {
    document
      .querySelector( `section[data-doc_s="${doc_s}"]` )
      .scrollIntoView( {behavior: "smooth", block: "start"} )
    //?? window
    //??   .location
    //??   .hash = `#${doc_s}`
  }
,



  listen__v
  ()
  {
    SLI_o
      .slider_e
      .addEventListener( 'click', SLI_o.section__v )
    //?? SLI_o.slider_e.addEventListener( 'touchstart', SLI_o.section__v )
    
    //: keyboard
    /*
    document.addEventListener( 'keyup',
      key_o =>
      {
        if ( key_o.defaultPrevented || !SLI_o.onv}iew__b() ) return
        //>
        const key_sn = key_o.key || key_o.keyCode
        if ( [ 'Escape', 'Esc', 27 ].includes( key_sn ) ||
             [ 'Backspace', 'Back', 8 ].includes( key_sn ) ) SLI_o.onview__s()    // ESC || BACKSPACE close
        else
        {
          switch ( true )
          {
            case ( [ 'ArrowLeft', 'Left', 37 ].includes( key_sn ) ) :    //: LEFT
              SLI_o.slider_c.toNearest__v( -1 )
              break
            case ( [ 'ArrowRight', 'Right', 39 ].includes( key_sn ) ) :    //: RIGHT
              SLI_o.slider_c.toNearest__v( 1 )
              break
            case ( [ 'ArrowUp', 'Up', 38 ].includes( key_sn ) ) :    //: UP
              SLI_o.slider_c.toNearest__v( -4 )
              break
            case ( [ 'ArrowDown', 'Down', 40 ].includes( key_sn ) ) :    //: DOWN
              SLI_o.slider_c.toNearest__v( 4 )
              break
            case ( [ 'Enter', 13 ].includes( key_sn ) ) :    //: ENTER
              SLI_o.onview__s()
              break
            default:
              break
          }
        }
        key_o.preventDefault()
        key_o.stopPropagation()
      }, true )
    */
    
  }
,



  renew__v
  (
    //~~section_e=document
    //--doc_n
  )
  {
    LIB_o
      .rootVar__v
      (
        '--SECTIONS_CAP',
        SLI_o.slider__n()
      )

    SER_o
      .send__v
      (
        '{{C_o.msg_o.RESTORE_s}}',
        null
      )

    SLI_o
      .listen__v()

    //======================
    ;console.log( 'slider.js' )
  }

}

SLI_o
  .renew__v()
