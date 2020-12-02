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
    section_e
      .remove()
    //.... remove slide
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



}


