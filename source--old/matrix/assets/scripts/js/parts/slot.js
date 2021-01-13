// === SLOT_o: slot.js ===
var SLOT_o =
{

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


  remove__v
  (
    section_e
  )
  {
    const slot_n =
      +section_e
        .dataset
        .slot_n    //: Number cast
    SER_o
      ['{{C_o.msg_o.REMOVE_s}}__v']
      ( section_e.dataset.slot_s )
    section_e
      .remove()
    if ( slot_n > +'{{C_o.DOCS_n}}' )    //: skip C_o.SYS_s slots
    {
      SLI_o
        .remove__v( slot_n )
    }
  }
,


}


