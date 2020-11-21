// === SER_o: service.js ===

var SER_o =
{
  types_a:
    [
      'REGISTER',
      'LOAD',
      'ROUTE',
      'RESTORE',
      'REMOVE',
      'CACHE',
    ]
,

  requester_o: null    //: for callback
,



  init__v    //:--Service worker registration
  (
    url_s
  )
  {
    //!!! comment out the following line if HTTP dev server supports headers
    //..... if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
    //>
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
          register_o =>    //: resolve
          {
            navigator
              .serviceWorker
              .onmessage =
              msg_o =>
                SER_o
                  .receive__v( msg_o )
            const search_s =
              window
                .location
                .search
            if ( search_s )
            {
              SER_o
                .send__v
                (
                  'LOAD',
                  search_s
                )
            }
          },
          error_o =>
            console.log( `ServiceWorker registration failed [error: ${error_o}]` )    //: reject
        )
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



  REGISTER__v   //: from worker
  (
    worker_b
  )
  {
    window
      .localStorage
      .setItem
        ( 'worker_b', worker_b )
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
      if ( PREF_o.restore_b )
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


  CACHE__v    //: from/to worker
  (
    payload_o,    //: { target_s, cache_a, requester_o }
  )
  {
    const { target_s, cache_a, requester_o } = payload_o
    if ( target_s === 'SWO_o' )    //: send to worker
    {
      SER_o
        .send__v
        (
          'CACHE',
          {
            cache_a: cache_a
          }
        )
      SER_o.requester_o = requester_o
      return
      //>
    }
    //: receive from worker
    SER_o.requester_o
    &&
    SER_o
      .requester_o
      .CACHE__v( cache_a )
      SER_o.requester_o = null    //: reset
  }
,


}


