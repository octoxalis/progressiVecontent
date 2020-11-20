//=== SWO_o: service_worker.js ===

var SWO_o =
{
  cache_s: '{{A_o.ID_s}}_{{A_o.KEY_n}}'            //: name of the current cache
  ,
  DOC_JS_s: '{{U_o.url_s}}/assets/data/js/docs_data.js'
  ,
  LAB_JS_s: '{{U_o.url_s}}/assets/data/js/labels_data.js'
  ,

  url_a:     //: URLs of assets to immediately cache
    [
      //?? '{{U_o.url_s}}',
      //?? '{{U_o.url_s}}index.html',
      //XX'{{U_o.url_s}}offline.html',
      //?? '{{U_o.url_s}}assets/scripts/js/index.min.js',
      //.....DEFER.... '{{U_o.url_s}}assets/scripts/js/instant_page.min.js',
      //?? '{{U_o.url_s}}favicon.ico',
    ]
  ,

  cache_a: new Set()    //: 'path_s/slot_s.html' (!!! keep initial slash)
  ,

  nocache_a:  //: no cache for root url & sys slots (begin with /)
    [
      '/',    //: U_o.url_s
      '/index.html',
      `/{{A_o.SYS_s}}/{{A_o.DOCS_s}}.html`,
      //....
    ]
  ,

  types_a:
    [
      'REGISTER',
      'LOAD',
      'ROUTE',
      'RESTORE',
      'REMOVE',
    ]
  ,

    pathname_s: ''
  ,


  
  
  install__v    //:- Iterate thru url_a and add cache each entry
  (
    install_o
  )
  {
    install_o
      .waitUntil
      (
        void async function ()
        {
          const cache_o =
            await caches
              .open( SWO_o.cache_s )
          await cache_o
            .addAll( SWO_o.url_a  )
          self
            .skipWaiting()
        } ()
      )
  }
,
  
  
  
  activate__v    //:- Remove inapplicable caches entries
  (
    activate_o
  )
  {
    activate_o.waitUntil(
      void async function ()
      {
        const entry_a =
          await caches
            .keys()
        const remove_a =
          await entry_a
            .filter
            (
              entry_s => entry_s !== SWO_o.cache_s
            )
        await Promise
          .all
          (
            remove_a
              .map
              (
                remove_s => caches.delete( remove_s )
              )
          )
        self
          .clients
          .claim()
      } ()
    )
  }
,
  
//#code=01

  //:- https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading
  
  fetch__v    //:- Fetch offline-1st
  (
    fetch_o
  )
  {
    const mode_s =
      fetch_o
        ?.request
        ?.mode
    if (mode_s  === 'navigate' )
    {
      try
      {
        fetch_o
          .respondWith
          (
            async function()
            {
              const url_o =
                SWO_o
                  .ROUTE__v
                  (
                    new URL( fetch_o.request.url )
                  )
              const response_o =
                fetch( url_o )
              const clone_o =
                response_o
                  .then( resp_o => resp_o.clone() )
              fetch_o
                .waitUntil
                (
                  async function()
                  {
                    const cache_o =
                      await caches
                        .open
                        (
                          SWO_o.cache_s
                        )
                    await cache_o
                      .put
                      (
                        url_o,
                        await clone_o
                      )
                  }()    //: IIFE
                )
                return ( await caches.match( url_o ) ) || response_o
            } ()
          )
      }
      catch
      (
        error_o
      )
      {
        const cache_o =
          caches
            .open
            (
              SWO_o.cache_s
            )
        return cache_o
          &&
          cache_o
            .match
            (
              new Request( `{{U_o.url_s}}offline.html` )  //: We don't have a cached version, display offline page
            )
      }
    }
  }
,
  

  REGISTER__v
  ()
  {
    SWO_o
      .send__v    //: to main
      (
        'REGISTER',
        true
      )
  }
,



  LOAD__v    //: receive from main after registering triggered by extern url (link, bookmark, etc.)
  (
    search_s
  )
  {
    SWO_o
      .cache__v    //: simly put on cache: we shall stop at site entrance before loading the new slot
      (
        search_s
          .slice( '{{A_o.URL_S_s}}'.length - 1 )    //: trim '?s=' keeping '/'  //:-> '/slots/page.html'
      )
  }
,


  ROUTE__v   //: from self
  (
    url_o    //: e.g. 'http://{{U_o.url_s}}#/slots/page.html', i.e. hash: '#/slots/page.html'
  )
  {
    let pathSlot_s =
      url_o
        .pathname
    let search_s =
      url_o
        .search
    if ( search_s )    //: for internal links (-> '?s=/slots/page.html')
    {
      pathSlot_s =
      search_s
          .slice( '{{A_o.URL_S_s}}'.length - 1 )    //: see supra
    }
    //........................................
    SWO_o
      .cache__v
      (
        pathSlot_s
      )
    return url_o
  }
,
//#code=01




  RESTORE__v   //: to main
  (
    payload_o    //: not used
  )
  {
    const cache_a =  Array.from( SWO_o.cache_a )
    if ( !cache_a.length ) return
    //>
    const restore_a = []
    for ( let url_s of cache_a )
    {
      const pathSlot_s =
        SWO_o
            .pathSlot__s
            (
              url_s
            )
      restore_a
        .push
        (
          pathSlot_s
            .split( '/' )
        )
    }
    SWO_o
      .send__v    //: to main
      (
        'RESTORE',
        restore_a
      )
      
  }
,


  REMOVE__v    //: from main: remove an entry in SWO_o.cache_a
  (
    slot_s     //: as payload_o
  )
  {
    SWO_o
      .cache_a
      .delete
      (
        `/{{A_o.SLOTS_s}}/${slot_s}.html`  //!!! do not remove sys slots; '/' before 'slots'
      )
  }
,



  cache__v
  (
    pathSlot_s
  )
  {
    if ( pathSlot_s && !SWO_o.nocache_a.includes( pathSlot_s ) )
    {
      SWO_o
        .cache_a
        .add( pathSlot_s )
    }
  }
,



  pathSlot__s
  (
    url_s
  )
  {
    return url_s
      .slice
      (
        1,                 //: trim initial '/'
        -'.html'.length    //: trim file extension
      )
  }
,



  client__o
  (
    client_n=0
  )
  {
    return self
      .clients
      .matchAll
        (
          {
            includeUncontrolled: true,
            type: 'window',
          }
        )
      .then
        (
          client_a => 
          {
            return ( client_a && client_a.length ) ?
              client_a[client_n]
              :
              void console.log( 'No Service Worker client found' )
          }
        )
  }
,


  receive__v    //: from main
  (
    msg_o
  )
  {
    if ( !msg_o.data ) return console.log( 'An unidentified message has been sent by the Main Thread' )
    //>   //: error
    const type_s = msg_o.data.type_s
    if ( !SWO_o.types_a.includes( type_s ) ) return console.log( 'An unknown message type has been sent by the Main Thread' )
    //>   //: error
      SWO_o
        [`${type_s}__v`]
        (
          msg_o.data.payload_o
        )
  }
,



  send__v    //: to main
  (
    type_s,
    payload_o
  )
  {
    SWO_o
    .client__o()
    .then
    (
      client_o =>
      {
        if ( !client_o ) return//>
        client_o
          .postMessage
          (
            {
              type_s: type_s,
              payload_o: payload_o
            }
          )
      }
    )
  }
,



  import__v
  ()
  {
    self
      .importScripts
      (
        SWO_o.DOC_JS_s,
        SWO_o.LAB_JS_s
      )
  }
,



  init__v
  ()
  {
    [ 'install',
      'activate',
      'fetch',
    ]
      .forEach
      (
        action_s =>
        self
          .addEventListener
          (
            action_s,
            action_o =>
            SWO_o[`${action_s}__v`]
            (
              action_o
            )
          )
      )
    self
      .addEventListener
      (
        'message',
        SWO_o.receive__v
      )
    SWO_o
      .REGISTER__v()
    //... SWO_o
    //...   .import__v()
  }
,

}



SWO_o
  .init__v()  // !!! no IIFE


