// === SLOT_o: slot.js ===
var SLOT_o =
{

  remove__v
  (
    section_e
  )
  {
    SER_o.
      REMOVE__v
      (
        section_e.dataset.slot_s
      )
      section_e.remove()
  }
,


  display__e    //: pseudo-dialog box to display lists
  (
    section_s
  )
  {
    return (
      LIB_o
        .id__o
        (
          'display',
          LIB_o
            .nodeId__o( section_s )
        )
      )
  }
,



}


