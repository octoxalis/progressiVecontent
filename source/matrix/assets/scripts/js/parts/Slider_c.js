// === Slider_c.js ===
//-- Refactored from: https://lgse.github.io/micro-slider

class Slider3D
{
  static default_o =
  {
    //-- classes
    slideList_s:  'slide_list',
    slideFocus_s: 'slide_focus',
    slideTitle_s: 'slide_title',

    step_s:       'step',
    stepList_s:   'step_list',
    stepFocus_s:  'step_focus',

    scroll_s:     'scroll',

    //:- tags
    slideListTag_s: 'nav',
    slideTag_s:     'dl',
    titleTag_s:     'dt',

    stepListTag_s: 'nav',
    stepTag_s:     'button',

    //:- step_list insertion
    stepBefore_b: false,

    //:- attributes
    hyphen_s:   '-',
    slot_s:   'slot_s',


    clip_b:  false,
    wide_b:  false,

    step_a:  null,
    cycle_f: null,

    padding_n:         0,
    shift_n:           0,
    perspective_n:     30,  //: slides number
    translateWidth_n:  .5,  //: [0...1] : .5 to center
    translateHeight_n: 0,   //: idem
    zoom_n:            -50,
    opac_n:            .05,
    transition_n:      100,
    tick_n:            60,
  }


  constructor
  (
    container_e,
    sectionList_e,
    options_o={}
  )
  {
    this.container_e = container_e
    this.sectionList_e = sectionList_e
    this.option_o = Object.assign( {}, Slider3D.default_o, options_o )

    this.sectionList = null
    this.slide_e  = null
    this.step_e   = null

    this.slide_a  = []
    this.step_a   = []

    this.slide_n  = 0
    this.atStep_n = 0

    this.listener_b = false
    this.pressed_b  = false
    this.scroll_b   = false
    this.dragX_b    = false
    this.dragY_b    = false

    this.coords_o     = { atX_n: 0, atY_n: 0 }
    this.amplitude_n  = 0
    this.center_n     = 0
    this.lastCenter_n = 0
    this.offset_n     = 0
    this.frame_n      = 0
    this.target_n     = 0
    this.timeout_n    = 0
    this.ticker_n     = 0
    this.stamp_n      = 0
    this.velocity_n   = 0

    this.init__v()
  }



  init__v =
  () =>
  {
    [ 'slide',
      'step',
      'fill',
      'geometry',
      'refresh',
      'listen'
    ].forEach( method_s => this[`${method_s}__v`]() )
  }



  slide__v =
  () =>
  {
    this.slideContainer = document.createElement( this.option_o.slideListTag_s )
    this.slideContainer.dataset[this.option_o.hyphen_s] = this.option_o.slideList_s
    this.slideContainer.setAttribute( 'class', this.option_o.slideList_s )
    this.container_e.prepend( this.slideContainer )
  }



  step__v =
  () =>
  {
    this.stepContainer = document.createElement( this.option_o.stepListTag_s )
    this.stepContainer.className = this.option_o.stepList_s
    const method_s = this.option_o.stepBefore_b ? 'prepend' : 'append'
    this.container_e[method_s]( this.stepContainer )
  }


  fill__v =
  () =>
  {
    [...this.sectionList_e.children].forEach(
    ( slot_e, slot_n )  =>
      {
        this.addStep__v( slot_e, slot_n )
        this.addSlide__v( slot_e, slot_n )
      } )
  }



  geometry__v =
  () =>
  {
    this.size__v()
    this.perspective__v()
  }



  add__v =
  ( 
    slot_e,
    slot_n=0,
    attribute_a=null,
    callback_f=null
  ) =>
  {
    const slide_n = slot_n || this.slide_n    //: before incrementing
    this.addSlide__v( slot_e, slide_n, attribute_a )
    this.addStep__v( slot_e, slide_n )
    this.geometry__v()
    this.refresh__v()
    callback_f && callback_f()
  }



  addSlide__v =
  (
    slot_e,
    slot_n,
    attribute_a=null
  ) =>
  {
    const slide_e = document.createElement( this.option_o.slideTag_s )
    slide_e.dataset[this.option_o.step_s] = slot_n
    slide_e.innerHTML = `<${this.option_o.titleTag_s} class="${this.option_o.slideTitle_s}">${slot_e.dataset[this.option_o.slot_s]}</${this.option_o.titleTag_s}>`
    if ( attribute_a )
    {
      for ( const at_s of attribute_a )
      {
        const [ name_s, value_s ] = at_s.split( '=' )
        slide_e.setAttribute( name_s, value_s )
      }
    }
    //... const title_e = document.createElement( this.option_o.titleTag_s )
    this.slideContainer.appendChild( slide_e )
    this.slide_a.push( slide_e )
    this.slide_n = this.slide_a.length
  }



  addStep__v =
  (
    slot_e,
    slot_n
  ) =>
  {
  const step_e = document.createElement( this.option_o.stepTag_s )
  step_e.dataset[this.option_o.step_s] = slot_n
  const title_s = slot_e.dataset[this.option_o.slot_s]
  step_e.setAttribute( 'title', title_s )
  if ( slot_n === 0 )
  {
    this.step_e = step_e
    step_e.classList.add(this.option_o.stepFocus_s)
  }
  step_e.addEventListener( 'click', _o => this.toCurrent__v( slot_n ) )
  this.stepContainer.appendChild( step_e )
  this.step_a.push( step_e )
  }



  capacity__n =
  () =>
  { return this.slide_a.length }

  

  size__v =
  () =>
  {
    if ( !this.slide_a.length ) return
    //>
    const slide_e = this.slide_a[0]
    this.dimension__v( `${slide_e.offsetHeight}px`, `${slide_e.offsetWidth}px` )
  }



  dimension__v =
  (
    height_n='100px',
    width_n='100px'
  ) =>
  {
    this.dimension_o = { width_n: parseInt( width_n ), height_n: parseInt( height_n ) }
    this.size_n = ( this.dimension_o.width_n * 2 ) + this.option_o.padding_n
  }
  

  
  perspective__v =
  () =>
  {
    this.slideContainer.style.perspective =
      this.option_o.wide_b ?
      'none' :
      `${this.dimension_o.height_n * this.option_o.perspective_n}px`
  }



  position__n =
  (
    event_o,
    axis_s    //: axis_s is 'X' || 'Y'
  ) =>
  {
    let position_n = event_o[`client${axis_s}`]
    if ( event_o.targetTouches &&
        (event_o.targetTouches.length >= 1 ) ) position_n = event_o.targetTouches[0][`client${axis_s}`]
    return position_n
  }



  clip__n =
  (
    clip_n
  ) =>
  {
    const at_n = this.slide_n
    return ( clip_n >= at_n ) ?
      clip_n % at_n
      : ( clip_n < 0 ) ?
        this.clip__n( at_n + ( clip_n % at_n ) )
          : clip_n
  }



  closest__o =
  (
    item_e
  ) =>
  {
    if ( item_e.dataset[this.option_o.step_s] ) return item_e
    //>
    let parent = null
    while ( item_e )
    {
      parent = item_e.parentElement
      if ( parent && parent.dataset[this.option_o.step_s] ) return parent
      //>
      item_e = parent
    }
    return parent
  }



  current__n =
  (
    item_e
  ) =>
  {
    const step_n = item_e.dataset[this.option_o.step_s]
    const slide_e = this.slide_a.find( slide_e => slide_e.dataset[this.option_o.step_s] === step_n )
    return !slide_e ?
      '0'
      : slide_e.dataset[this.option_o.step_s]
  }



  atStep__v =
  () =>
  {
    if ( this.step_e !== this.step_a[this.atStep_n] )
      {
      this.step_e.classList.remove( this.option_o.stepFocus_s )
      this.step_e = this.step_a[this.atStep_n]
      this.step_e.classList.add( this.option_o.stepFocus_s )
      this.step_e.focus()
    }
  }



  atStep__n =
  () =>
  { return this.atStep_n }



  nearest__v =
  (
    shift_n
  ) =>
  {
    if ( !this.listener_b ) return
    this.target_n = ( this.size_n * Math.round( this.offset_n / this.size_n ) ) +
      ( this.size_n * shift_n )
    if ( this.offset_n !== this.target_n )
    {
      this.amplitude_n = this.target_n - this.offset_n
      this.stamp_n = performance.now()
      requestAnimationFrame( this.frame__v )
    }
  }



  toCurrent__v =
  (
    to_n
  ) =>
  { return this.cycle__v( to_n ) }



  toNearest__v =
  (
    shift_n
  ) =>
  {
    const to_n = this.atStep_n + shift_n
    if ( !this.option_o.clip_b || ( this.option_o.clip_b && to_n >= 0 ) ) this.cycle__v( to_n )
  }



  toSlide__v =
  (
    slide_e
  ) =>
  {
    if ( !slide_e.classList.contains( this.option_o.slideFocus_s ) )
    {
      if ( this.slide_e !== null ) this.slide_e.classList.remove( this.option_o.slideFocus_s )
      this.slide_e = slide_e
      this.atStep_n = this.current__n( slide_e )
      if ( !this.slide_e.classList.contains( this.option_o.slideFocus_s ) )
      {
        this.slide_e.classList.add(this.option_o.slideFocus_s)
      }
    }
    this.atStep__v()
  }



  cycle__v =
  (
    to_n
  ) =>
  {
    let offset_n = ( this.center_n % this.slide_n ) - to_n
    if ( !this.option_o.clip_b )
    {
      if ( offset_n < 0 && ( Math.abs( offset_n + this.slide_n ) < Math.abs( offset_n ) ) )
      {
        offset_n += this.slide_n
      } else if ( offset_n > 0 && ( Math.abs( offset_n - this.slide_n ) < offset_n ) )
      {
        offset_n -= this.slide_n
      }
    }
    return void ( offset_n < 0 ) ?
      this.nearest__v( Math.abs( offset_n ) )
      : this.nearest__v( -offset_n )
  }



  listen__v =
  (
    listener_b=false
  ) =>
  {
    let method_s = `${!listener_b ? 'add' : 'remove'}EventListener`
    //:- Touch Events
    if ( typeof window.ontouchstart !== 'undefined' )
    {
      this.container_e[method_s]( 'touchstart', this.tap__v )
      this.container_e[method_s]( 'touchmove', this.drag__v )
      this.container_e[method_s]( 'touchend', this.release__v )
    }
    //:- Mouse Events
    this.container_e[method_s]( 'click', this.click__v )
    this.container_e[method_s]( 'mousedown', this.tap__v )
    this.container_e[method_s]( 'mousemove', this.drag__v )
    this.container_e[method_s]( 'mouseup', this.release__v )
    this.container_e[method_s]( 'mouseleave', this.release__v )
    //:- Resize Event
    window[method_s]( 'resize', this.resize__v )
    this.listener_b = listener_b === false
  }
  


  click__v =
  (
    click_o
  ) =>
  {
    if ( !this.listener_b ) return
    //>
    const target_e =
      click_o
        .target
        .closest( `${this.option_o.slideTag_s}[data-${this.option_o.step_s}]` )
    if ( !target_e ) return
    //>
    if ( this.dragY_b ) return void click_o.stopPropagation()
    //>
    if ( !this.option_o.wide_b )
    {
      const closest_e = this.closest__o( click_o.target )
      if ( !closest_e ) return
      //>
      const index_n = this.current__n( closest_e )
      const offset_n = ( this.center_n % this.slide_n ) - index_n
      if ( offset_n !== 0 ) click_o.stopPropagation()
      this.cycle__v( index_n )
    }
  }



  tap__v =
  (
    tap_o
  ) =>
  {
    if ( !this.listener_b ) return
    //>
    this.pressed_b = true
    this.dragX_b = false
    this.dragY_b = false
    this.velocity_n = 0
    this.amplitude_n = 0
    this.frame_n = this.offset_n
    this.stamp_n = performance.now()
    this.coords_o = { atX_n: this.position__n( tap_o, 'X' ), atY_n: this.position__n( tap_o, 'Y' ) }
    clearInterval( this.ticker_n )
    this.ticker_n = setInterval( this.track__v, this.tick_n )
  }



  drag__v =
  (
    drag_o
  ) =>
  {
    if ( !this.listener_b ) return
    //>
    if ( drag_o.target.classList.contains( this.slideFocus_s ) ) return
    //>
    if ( this.pressed_b )
    {
      const atX_n = this.position__n( drag_o, 'X' )
      const atY_n = this.position__n( drag_o, 'Y' )
      const deltaX_n = this.coords_o.atX_n - atX_n
      const deltaY_n = Math.abs( this.coords_o.atY_n - atY_n )
      if ( deltaY_n < 30 && !this.dragX_b )
      {
        if ( deltaX_n > 2 || deltaX_n < -2 )
        {
          this.dragY_b = true
          this.coords_o.atX_n = atX_n
          this.scroll__v( this.offset_n + deltaX_n )
        }
      }
      else
      {
        if ( this.dragY_b ) return void drag_o.stopPropagation()
        //>
        this.dragX_b = true
      }
    }
    if ( this.dragY_b ) drag_o.stopPropagation()
  }



  release__v =
  (
    release_o
  ) =>
  {
    if ( !this.pressed_b ) return
    //>
    this.pressed_b = false
    clearInterval( this.ticker_n )
    this.target_n = this.offset_n
    if ( this.velocity_n > 10 || this.velocity_n < -10 )
    {
      this.amplitude_n = 0.9 * this.velocity_n
      this.target_n = this.offset_n + this.amplitude_n
    }
    this.target_n = Math.round( this.target_n / this.size_n ) * this.size_n
    if ( this.option_o.clip_b )
    {
      if ( this.target_n >= this.size_n * ( this.slide_n - 1 ) )
      {
        this.target_n = this.size_n * ( this.slide_n - 1 )
      } else if ( this.target_n < 0 )
      {
        this.target_n = 0
      }
    }
    this.amplitude_n = this.target_n - this.offset_n
    this.stamp_n = performance.now()
    requestAnimationFrame( this.frame__v )
    if ( this.dragY_b ) release_o.stopPropagation()
  }



  resize__v =
  () =>
  {
    if ( !this.listener_b ) return
    //>
    if ( this.option_o.wide_b )
    {
      this.size__v()
      //XX this.offset_n = this.center_n * 2 * this.dimension_o.width_n
      this.offset_n = this.center_n * 2 * this.dimension_o.height_n
      this.target_n = this.offset_n
      return
    }
    this.geometry__v()
    this.scroll__v()
  }



  track__v =
  () =>
  {
    let now_n = performance.now()
    let elapsed_n = now_n - this.stamp_n
    this.stamp_n = now_n
    let delta_n = this.offset_n - this.frame_n
    this.frame_n = this.offset_n
    const speedup_n = 1000 * delta_n / ( 1 + elapsed_n )
    this.velocity_n = 0.8 * speedup_n + 0.2 * this.velocity_n
  }



  translate__v =
  (
    slide_e,
    zindex_n,
    opac_n,
    x1_n,
    z1_n,
    x2_n = null
  ) =>
  {
    let toX_n = x1_n    //: horizontal
    let toY_n = 0       //: horizontal
    //XX let toX_n = 0
    //XX let toY_n = x1_n
    if ( !this.option_o.wide_b )
    {
      const width_n = (this.container_e.clientWidth - this.dimension_o.width_n) * this.option_o.translateWidth_n
      const height_n = (this.container_e.clientHeight - this.dimension_o.height_n) * this.option_o.translateHeight_n
      toX_n += width_n     //: horizontal
      toY_n += height_n    //: horizontal
      //XX toX_n += height_n
      //XX toY_n += width_n
    }
    if ( x2_n !== null ) toX_n += x2_n    //: horizontal
    //XX if ( x2_n !== null ) toY_n += x2_n
    slide_e.style.transform = `translate3d( ${toX_n}px, ${toY_n}px, ${z1_n}px )`    //: horizontal
    //XX slide_e.style.transform = `translate3d( ${toX_n}px, ${toY_n}px, ${z1_n}px )`
    slide_e.style.zIndex = zindex_n
    slide_e.style.opacity = opac_n
  }
  


  scroll__v =
  (
    shift_n=0
  ) =>
  {
    let slide_e
    let opac_n
    let translateZ_n
    let at_n = 0
  
    this.timeout__v()
    //:- Compute Scroll
    this.lastCenter_n = this.center_n
    this.offset_n = (typeof shift_n === 'number') ? shift_n : this.offset_n
    this.center_n = Math.floor( ( this.offset_n + this.size_n * .5 ) / this.size_n )
    const delta_n = this.offset_n - this.center_n * this.size_n
    const directional_n = ( delta_n < 0 ) ? 1 : -1
    const tween_n = -directional_n * delta_n * 2 / this.size_n
    const half_n = this.slide_n >> 1
    //:- Center Item Positioning
    if ( !this.option_o.clip_b || ( this.center_n >= 0 && this.center_n < this.slide_n ) )
    {
      slide_e = this.slide_a[this.clip__n( this.center_n )]
      this.toSlide__v( slide_e )
      this.translate__v(
        slide_e,
        0,
        this.option_o.wide_b ? 1 : 1 - this.option_o.opac_n * tween_n,
        -delta_n >> 1,
        this.option_o.zoom_n * tween_n,
        directional_n * this.option_o.shift_n * tween_n * at_n
        )
    }
    //:- Iterate through all slider items and position them
    for ( at_n = 1; at_n <= half_n; ++at_n )
    {
      //:- Left slides positioning
      if ( this.option_o.wide_b )
      {
        translateZ_n = this.option_o.zoom_n
        opac_n = ( at_n === half_n && delta_n > 0 ) ? 1 - tween_n : 1
      }
      else
      {
        translateZ_n = this.option_o.zoom_n * ( at_n * 2 - tween_n * directional_n )
        opac_n = 1 - this.option_o.opac_n * ( at_n * 2 - tween_n * directional_n )
      }
      //:- Hide clipped slides
      if ( !this.option_o.clip_b || this.center_n - at_n >= 0 )
      {
        slide_e = this.slide_a[this.clip__n( this.center_n - at_n )]
        this.translate__v(
          slide_e, -at_n, opac_n,
          -this.option_o.shift_n + ( ( -this.size_n * at_n - delta_n ) >> 1 ),
          translateZ_n
          )
      }
      //:- Right items positioning
      if ( this.option_o.wide_b )
      {
        translateZ_n = this.option_o.zoom_n
        opac_n = ( at_n === half_n && delta_n < 0 ) ? 1 - tween_n : 1
      }
      else
      {
        translateZ_n = this.option_o.zoom_n * ( at_n * 2 + tween_n * directional_n )
        opac_n = 1 - this.option_o.opac_n * ( at_n * 2 + tween_n * directional_n )
      }
      //:- Hide clipped slides
      if ( !this.option_o.clip_b || this.center_n + at_n < this.slide_n )
      {
        slide_e = this.slide_a[this.clip__n( this.center_n + at_n )]
        this.translate__v(
          slide_e,
          -at_n,
          opac_n,
          this.option_o.shift_n + ( this.size_n * at_n - delta_n ) * .5,
          translateZ_n
          )
      }
    }
    //:- Callback
    if ( this.lastCenter_n !== this.center_n && typeof( this.option_o.cycle_f) === 'function' )
    {
      this.option_o.cycle_f.call( this, this.slide_e, this.dragY_b )
    }
  }



  timeout__v =
  () =>
  {
    this.scroll_b = true
    if ( this.container_e.classList.contains( this.option_o.scroll_s ) ) this.container_e.classList.add( this.option_o.scroll_s )
    if ( this.timeout_n !== 0 ) window.clearTimeout( this.timeout_n )
    this.timeout_n = window.setTimeout(
      () =>
      {
        this.scroll_b = false
        this.container_e.classList.remove( this.option_o.scroll_s )
      },
      this.option_o.transition_n )
  }



  frame__v =
  () =>
  {
    if ( !this.amplitude_n ) return
    //>
    const elapsed_n = performance.now() - this.stamp_n
    const delta_n = this.amplitude_n * Math.exp( -elapsed_n / this.option_o.transition_n )
    if ( delta_n > 2 || delta_n < -2 )
    {
      this.scroll__v( this.target_n - delta_n )
      requestAnimationFrame( this.frame__v )
      return
    }
    this.scroll__v( this.target_n )
  }



  refresh__v =
  () =>
  {
    requestAnimationFrame( this.frame__v )
    this.resize__v()
    this.scroll__v()
  }



  wide__v =
  (
    wide_b        = false,
    slideWidth_n  = 200,
    slideHeight_n = null
  ) =>
  {
    let height_s = slideHeight_n === null ? `${this.dimension_o.height_s}px` : `${slideHeight_n}px`
    let width_s = wide_b ? '100%' : `${slideWidth_n}px`
    this.option_o.wide_b = wide_b
    this.dimension__v( height_s, width_s )
    this.perspective__v()
    this.refresh__v()
  }


  
  detach__v =
  () =>
  { this.listen__v( true ) }
}


