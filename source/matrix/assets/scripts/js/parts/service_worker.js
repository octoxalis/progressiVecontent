// === SWO_o: service_worker.js ===

var SWO_o =
{
  cache_s: '{{A_o.ID_s}}_{{C_o.KEY_n}}'            //: name of the current cache
  ,
  DOC_JS_s: '{{U_o.url_s}}assets/data/js/docs_data.js'
  ,
  LAB_JS_s: '{{U_o.url_s}}assets/data/js/topics_data.js'
  ,
  IOR_FILE_s: '{{U_o.url_s}}assets/scripts/js/ior_worker.min.js'
  ,
  CACHE_FILE_s: '{{U_o.url_s}}assets/scripts/js/cache_worker.min.js'
  ,

  slots_a:    //: '/path_s/doc_s.html' (!!! keep initial slash)
    [
      '/slots/ior.html',    //!!! DEV ONLY

      //...'/slots/introduction.html',
      //...'/slots/content_graph.html',
      //...'/slots/nodes_assembly.html',
      //...'/slots/slider.html',
    ]
  ,

  url_a:     //: URLs of assets to immediately cache
    [
      '{{U_o.url_s}}assets/scripts/js/index.min.js',
      '{{U_o.url_s}}assets/scripts/js/slot.min.js',

      //--> urlMut_a : '{{U_o.url_s}}slots/ior.html',    //!!! DEV ONLY

      //...'{{U_o.url_s}}slots/introduction.html',
      //...'{{U_o.url_s}}slots/content_graph.html',
      //...'{{U_o.url_s}}slots/nodes_assembly.html',
      //...'{{U_o.url_s}}slots/slider.html',
      //XX'{{U_o.url_s}}offline.html',
    ]
  ,
  

  urlMut_a:     //: URLs of assets to immediately cache
    [
      '{{U_o.url_s}}slots/ior.html',    //!!! DEV ONLY
      //'{{U_o.url_s}}slots/introduction.html',
    ]
  ,
  

  cache_a: null
  ,

  types_a:    //: message main<-> worker types; NB: message methods have capitalized names
    [
      '{{C_o.msg_o.ROUTE_s}}',    //: internal msg
      '{{C_o.msg_o.REGISTER_s}}', //: to main
      '{{C_o.msg_o.LOAD_s}}',     //: from main, after registering
      '{{C_o.msg_o.RESTORE_s}}',  //: from main
      '{{C_o.msg_o.REMOVE_s}}',   //: from main
      '{{C_o.msg_o.CACHE_s}}',    //: from/to main
      '{{C_o.msg_o.REQ_IMG_s}}',  //: from main
    ]
  ,

  IOR_b: false,      //: ImageOnRequest external script loaded boolean


  
  install__v    //:- Iterate thru url_a and put each entry in cache
  (
    install_o
  )
  {
    SWO_o.cache_a =
      new Set
      (
        SWO_o.slots_a
      )
    install_o
      .waitUntil
      (
        void async function ()
        {
          const cache_o =
            await caches
              .open( SWO_o.cache_s )

          await
          SWO_o
            .addAll__v
            (
              cache_o,
              SWO_o.url_a,
              SWO_o.urlMut_a,
            )

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
              new URL( fetch_o.request.url )

              SWO_o
                ['{{C_o.msg_o.ROUTE_s}}__v']( url_o )
              const response_o =
                fetch( url_o )
              const clone_o =
                response_o
                  .then
                  (
                    resp_o =>
                    resp_o
                      .clone()
                  )

              fetch_o
                .waitUntil
                (
                  async function
                  ()
                  {
                    const cache_o =
                      await caches
                        .open( SWO_o.cache_s )

                    await cache_o
                      .put
                      (
                        url_o,
                        await clone_o
                      )
                  }()    //: IIFE
                )

              return (
                await caches
                  .match( url_o )
                )
                ||
                response_o
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
            .open( SWO_o.cache_s )

        return (
          cache_o
          &&
          cache_o
            .match
            (
              new Request( `{{U_o.url_s}}offline.html` )  //: We don't have a cached version, display offline page
            )
          )
      }
    }
  }
,
  

  {{C_o.msg_o.ROUTE_s}}__v
  (
    url_o    //: e.g. 'http://{{U_o.url_s}}?s=/slots/page.html', i.e. search: '?s=/slots/page.html'
  )
  {
    let { pathname, search } = url_o

    if ( search )    //: for internal links (-> '?s=/slots/page.html')
    {
      pathname =
        search
          .slice( '{{C_o.URL_S_s}}'.length - 1 )    //: see supra
    }

    SWO_o
      .cache__v( pathname )
  }
,



{{C_o.msg_o.REGISTER_s}}__v
  ()
  {
    SWO_o
      .send__v( '{{C_o.msg_o.REGISTER_s}}' )    //: to main
  }
,



//#code=01
  {{C_o.msg_o.LOAD_s}}__v    //: receive from main after registering triggered by extern url (link, bookmark, etc.)
  (
    search_s
  )
  {
    SWO_o
      .cache__v    //: simly put on cache: we shall stop at site svg_logo before loading the new slot
      (
        search_s
          .slice( '{{C_o.URL_S_s}}'.length - 1 )    //: trim '?s=' keeping '/'  //:-> '/slots/page.html'
      )
  }
,


  {{C_o.msg_o.RESTORE_s}}__v
  (
    payload_o    //: not used
  )
  {
    const cache_a = 
      Array
        .from( SWO_o.cache_a )      //;console.log( cache_a )
        
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
        '{{C_o.msg_o.RESTORE_s}}',
        restore_a
      )
      
  }
,


  {{C_o.msg_o.REMOVE_s}}__v    //: remove an entry in SWO_o.cache_a
  (
    doc_s     //: as payload_o
  )
  {
    SWO_o
      .cache_a
      .delete
      (
        `/{{C_o.SLOTS_s}}/${doc_s}.html`  //: we don't remove sys slots  !!! '/' before 'slots'
      )
  }
,



  {{C_o.msg_o.CACHE_s}}__v    //: get or set all entries in SWO_o.cache_a
  (
    payload_o    //: { cache_a }
  )
  {
    const { cache_a } = payload_o    //: recipient_s not used

    if ( cache_a )    //: replace items (after sorting/removing)
    {
      SWO_o.cache_a = cache_a
      return
    }
    //>
    //: get cache_a items
    SWO_o
      .send__v    //: to main
      (
        '{{C_o.msg_o.CACHE_s}}',
        {
          cache_a: SWO_o.cache_a
        }
      )
  }
,



  {{C_o.msg_o.REQ_IMG_s}}__v    //: 
  (
    json_s     //: as payload_o
  )
  {
    IOR_o
      .toCache__v( json_s )

    //........................


  }
,



  addAll__v      //: https://github.com/TalAter/cache.adderall
  (
    cache_o,
    immutable_a = [],
    mutable_a = []
  )
  {
    let keep_a = []
  
    return (
      Promise
        .all
        (
          immutable_a    // Go over immutable requests
            .map
            (
              url_s =>
              {
                return (
                  caches
                    .match( url_s )
                    .then
                    (
                      response_o =>
                      {
                        if (response_o)
                        {
                          return (
                            cache_o
                              .put
                              (
                                url_s,
                                response_o
                              )
                          )
                        }
                        keep_a
                          .push( url_s )
  
                        return (
                          Promise
                            .resolve()
                        )
                      }
                    )
                )
              }
            )
        )
        .then  // go over mutable requests, and immutable requests not found in any cache
        (
          () =>
            cache_o
              .addAll
              (
                keep_a
                  .concat( mutable_a )
              )
          )
    )
  }
,



  cache__v
  (
    pathSlot_s
  )
  {
    if
    (
      pathSlot_s
        .indexOf( '/{{C_o.SLOTS_s}}/' )
      ===
      0      //: skip C_o.SYS_s URLs + '/' root URL
    )
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
    return (
      url_s
        .slice
        (
          1,                 //: trim initial '/'
          -'.html'.length    //: trim file extension
        )
    )
  }
,



  client__o
  (
    client_n=0
  )
  {
    return (
      self
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
    )
  }
,


  receive__v    //: from main
  (
    msg_o
  )
  {
    const type_s =
      msg_o
        ?.data
        ?.type_s

    if ( !type_s ) return
    //>
    if
    (
      !SWO_o
        .types_a
        .includes( type_s )
    ) return   //: error
    //>
    SWO_o
      [`${type_s}__v`]( msg_o.data.payload_o )
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
          if ( !client_o ) return    //: error
          //>
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



  init__v
  ()
  {
    [ 
      'install',
      'activate',
      'fetch',
    ]
      .forEach
      (
        event_s =>
        self
          .addEventListener
          (
            event_s,
            event_o =>
              SWO_o[`${event_s}__v`]( event_o )
          )
      )

    self
      .addEventListener
      (
        'message',
        SWO_o.receive__v
      )

    SWO_o
      ['{{C_o.msg_o.REGISTER_s}}__v']()
  }
,

}



self
  .importScripts
  (
    SWO_o.CACHE_FILE_s,
    SWO_o.IOR_FILE_s,
  )

//??-------------------------------------- DO WE NEED THOSE DATA?
//??self
//??  .importScripts
//??  (
//??    SWO_o.DOC_JS_s,
//??    SWO_o.LAB_JS_s
//??  )
//??---------------------------------------------------------------



SWO_o
  .init__v()  // !!! no IIFE
