// === SLOT_o: slot.js ===
var SLOT_o =
{

  remove__v
  (
    section_e
  )
  {
    SER_o.
      {{C_o.msg_o.REMOVE_s}}__v
      (
        section_e.dataset.slot_s
      )
    const slot_n =
      SLOT_o
        .section__n( section_e )
    section_e
      .remove()
    if ( slot_n <= 0 ) return
    //>
    location
      .reload()    //: simplest method, otherwise must remove Slider slide+step
    //......................... remove slide alternative
    //?? SLI_o
    //??   .remove__v( slot_n )
    //.......................................

}
,


  dialog__o    //: inline dialog box to display lists
  (
    section_s
  )
  {
    return (
      LIB_o
        .id__o
        (
          'dialog_block',
          LIB_o
            .nodeId__o( section_s )
        )
      )
  }
,


  section__n
  (
    section_e
  )
  {
    const slot_n =
      section_e
        .dataset
        .slot_n
    const section_a =
      Array
        .from
        (
          document
            .querySelectorAll( 'section' )
        )
    const section_n =
      section_a
        .findIndex
        (
          at_e =>
            at_e.dataset.slot_n === slot_n
        )
    return section_n
  }
,


}


