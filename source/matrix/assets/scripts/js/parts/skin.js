// === SKIN_o: skin.js ===
var SKIN_o =
{


  hue__v
  (
    click_o
  )
  {
    if ( +'{{C_o.HUE_SET_n}}' )
    {
      const picker_e =
        document
          .querySelector
          ( `#hue_picker` )
      const atX_n =
        click_o
          .clientX
        -
        picker_e
          .getBoundingClientRect()
          .left
      const width_n =
      picker_e
          .offsetWidth
      const hue_n =
        ~~(
            ( atX_n / width_n )
            *
            360
          )
      IND_o
        .colorMode__v
          (
            'hue_base',
            hue_n
          )
      document
        .querySelector
        (
          `#hue_current`
        )
        .dataset
        ['skin'] =
          window
            .localStorage
            .getItem
              ( 'hue_base' )
        }
  }
,



  lum__v
  (
    click_o
  )
  {
    if ( +'{{C_o.HUE_SET_n}}' )
    {
      const picker_e =
        document
          .querySelector
          ( `#lum_picker` )
      const atX_n =
        click_o
          .clientX
        -
        picker_e
          .getBoundingClientRect()
          .left
      const width_n =
      picker_e
          .offsetWidth
      const mode_n =
        (
          atX_n > ( width_n * 0.5 )
        ) ?
        1
        :
        -1
      IND_o
        .colorMode__v
          (
            'lum_mode',
            mode_n
          )
      document
        .querySelector
        (
          `#lum_current`
        )
          .dataset
            ['skin'] =
              window
                .localStorage
                .getItem
                  ( 'lum_mode' ) === '-1' ?    //: toString
                  'dark'
                  :
                  'light'
    }
  }
,


}



void function ()
{
  document
    .querySelector
    (
      `#hue_picker`
    )
    .addEventListener
    (
      'click',
      SKIN_o.hue__v
    )
  document
    .querySelector
    (
      `#hue_current`
    )
    .dataset
    ['skin'] =
      window
        .localStorage
        .getItem
          ( 'hue_base' )
document
    .querySelector
    (
      `#lum_picker`
    )
    .addEventListener
    (
      'click',
      SKIN_o.lum__v
    )
  document
    .querySelector
    (
      `#lum_current`
    )
    .dataset
    ['skin'] =
      window
        .localStorage
        .getItem
          ( 'lum_mode' ) === '-1' ?    //: toString
          'dark'
          :
          'light'
} ()


