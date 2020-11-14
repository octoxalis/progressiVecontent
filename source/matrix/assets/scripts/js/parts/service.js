//=== SER_o: service.js ===

var SER_o =
{
  types_a:
    [
      'RESTORE',
      'REMOVE',
      'ROUTE',
      'INITIAL',
    ]
,

  init__v    //:--Service worker registration
  (
    url_s
  )
  {
    //!!! comment out the following line if HTTP dev server supports headers
    //..... if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
    //>
    const REGISTRATION_s = 'ServiceWorker registration'
    //-- const SUCCESS_s = 'successful'
    const FAILURE_s = 'failed'
    navigator  //--  navigator.serviceWorker.register( url_s } )  //: WITHOUT Service-Worker-Allowed HTTP header 
      .serviceWorker
      .register
        (
          url_s,
          {
            scope: '{{ U_o.SERVICE_SCOPE_s }}'
          }
        )
      .then
        (
          null,    //-- .then( registration => console.log(  `${REGISTRATION_s} ${SUCCESS_s} [scope: ${registration.scope}]` ),
          error_o => console.log( `${REGISTRATION_s} ${FAILURE_s} [error: ${error_o}]` )
        )
    navigator
      .serviceWorker
      .onmessage = msg_o => SER_o.receive__v( msg_o )
  }
,
  
  
  send__v    //:-- Post message
  (
    type_s,
    payload_o=null
  )
  {
    navigator
      ?.serviceWorker
      ?.controller
      ?.postMessage
      (
        {
          type_s: type_s,
          payload_o: payload_o
        }
      )
  }
,




receive__v    //:-- Listen to messages
(
  msg_o
)
{
  if ( !msg_o.data ) return console.log( 'An unidentified message has been sent by the Service Worker' )   //: error
  //>
  const type_s = msg_o.data.type_s
  if ( !SER_o.types_a.includes( type_s ) ) return console.log( 'An unknown message type has been sent by Service Worker' )
  //>
  SER_o
    [`${type_s}__v`]
    (
      msg_o.data.payload_o
    )
}
,



  RESTORE__v   //: from worker
  (
    restore_a    //:-- SWO_o.restore_a []
  )
  {
    console.time( 'SER_o.RESTORE__v' )
    //!!!!!!!!!!!!!!!!!!!!!!
    let slot_n = 0
    for ( let path_a of restore_a )
    {
      const [ path_s, slot_s ] = path_a
      if ( SET_o.restore_b )
      {
        IND_o
        .load__v
          (
            path_s,
            slot_s,
            slot_n,
            section_e =>    //: callback_f
            {
              SLI_o
                .slider_c
                .add__v
                (
                  section_e,
                  slot_n,
                  [
                    `data-section=${slot_n}`, 
                    `data-slot_s=${section_e.dataset.slot_s}`
                  ],
                )
            },
          )
      }
      ++slot_n
    }
    //!!!!!!!!!!!!!!!!!!!!!!
    console.timeEnd( 'SER_o.RESTORE__v' )
  }
,



  REMOVE__v    //: to worker
  (
    slot_s
  )
  {
    SER_o
      .send__v
      (
        'REMOVE',
        slot_s
      )
  }
,



  INITIAL__v   //: from worker
  (
    initial_b
  )
  {
    window
      .localStorage
      .setItem
        ( 'initial_b', initial_b )
  }
  ,

}


