//=== SLI_o: slider.js ===
var SLI_o =
{
  slider_e: null,


  slider__n    //: init Slider3D & setup slide[0] data-section
  ()
  {
    SLI_o.slider_e =
      LIB_o
        .nodeId__o( 'sections_slider' )
    const sections_e =
      LIB_o
        .nodeId__o( 'sections' )
    SLI_o
      .slider_c =
        new Slider3D(
          SLI_o.slider_e,
          sections_e
        )
    const slide_e = 
      document
        .querySelector( `nav[data--="slide_list"] > dl[data-step="0"]`)
    LIB_o
      .attribute__v(
        slide_e,
        [
          ['data-section', '0'],
          ['data-slot_s', '{{A_o.DOCS_s}}'],
        ]
      )
    return SLI_o
      .slider_c
      .capacity__n()
  }
,


  loaded__b    //:- is  slot already loaded?
  (
    slot_s
  )
  { return document.querySelector( `section[data-slot_s="${slot_s}"]` ) !== null }
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
      const step_s =
        step_e
          .dataset
          .step
      const slot_s =
        document
          .querySelector( `dl[data-section][data-step="${step_s}"]` )
          .dataset
          .slot_s
      SLI_o
        .location__v( slot_s )
    }
  }
,
  
  
  
  
  location__v
  (
    slot_s
  )
  {
    document
      .querySelector( `section[data-slot_s="${slot_s}"]` )
      .scrollIntoView( {behavior: "smooth", block: "start"} )
    //?? window
    //??   .location
    //??   .hash = `#${slot_s}`
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

}


void function
()
{
  LIB_o
    .rootVar__v( '--SECTIONS_CAP', SLI_o.slider__n() )
  SLI_o
    .listen__v()
  SER_o
    .send__v
    (
      'RESTORE',
      null
    )
} ()


