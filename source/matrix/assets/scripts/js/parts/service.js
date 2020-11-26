// === SER_o: service.js ===

var SER_o =
{
  types_a:
    [
      //-- 'ROUTE',  //: not used
      'REGISTER',
      'LOAD',
      'RESTORE',
      'REMOVE',
      'CACHE',
    ]
,

  sender_o: null    //: for callback
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
          () =>    //: resolve //!!! parameter not used
          {
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
    navigator
      .serviceWorker
      .onmessage =
      msg_o =>
        SER_o
          .receive__v( msg_o )
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
  if ( !msg_o.data ) return //: error
  //>
  const type_s =
    msg_o.data.type_s
  if ( !SER_o.types_a.includes( type_s ) ) return  //: error
  //>
  SER_o
    [`${type_s}__v`]
    (
      msg_o.data.payload_o
    )
  }
,



  REGISTER__v   //: from worker
  ()
  {
    window
      .localStorage
      .setItem
        ( 'worker_b', true )  //: Service Worker is active now
  }
,



  RESTORE__v   //: from worker
  (
    restore_a    //:-- SWO_o.restore_a []
  )
  {
    console
      .time( 'SER_o.RESTORE__v' )
    //!!!!!!!!!!!!!!!!!!!!!!
    if ( !PREF_o.restore_b ) return
    //>
    let slot_n = 0
    for ( let path_a of restore_a )
    {
      const [ path_s, slot_s ] = path_a
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
      ++slot_n
    }
    //!!!!!!!!!!!!!!!!!!!!!!
    console
      .timeEnd( 'SER_o.RESTORE__v' )
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
    payload_o,    //: { cache_a, sender_o, recipient_s }
  )
  {
    const { cache_a, sender_o, recipient_s } = payload_o
    if ( recipient_s === 'SWO_o' )    //: send to worker
    {
      SER_o
        .send__v
        (
          'CACHE',
          {
            cache_a: cache_a
          }
        )
      SER_o.sender_o = sender_o
      return
      //>
    }
    //: receive from worker
    if ( !SER_o.sender_o ) return void console.log( 'Service Worker cache not delivered!' )
    SER_o
      .sender_o
      .CACHE__v( cache_a )    //: consume cache_a
    SER_o.sender_o = null    //: ...then reset
  }
,


}


