// === CAC_o: cache_worker.js ===

var CAC_o =
{
  //XXcache_b: true,      //!!!'caches' in window,



  //XXcache__b:
  //XX() => (
  //XX  CAC_o.cache_b
  //XX  ||
  //XX  void console
  //XX      .log( 'Cache API not supported!' )
  //XX  )
  //XX,


  cache__o    //: return cache Object
  (
    id_s
  )
  {
    return (
      //XX!CAC_o.cache__b()
      //XX?
      //XX  null
      //XX:
        caches
          .open( id_s )
          .then
          (
            cache_o =>
            {
              return cache_o
            }
          )
    )
  }
  ,



  set__v      //: add all
  (
    id_s,
    request_a,
  )
  {
    caches
      .open( id_s )
      .then
      (
        cache_o =>
        {
          cache_o
            .addAll( request_a )
            .then
            (
              () =>
              {
                //;console.log( `${request_a} in cache` )      //:all requests were cached
                return
              }
            )
        }
      )
  }
  ,



  get__o      //: retrieve an url in the cache
  (
    id_s,
    url_s
  )
  {
    caches
      .open( id_s )
      .then
      (
        cache_o =>
        {
          cache_o
            .match
            (
              url_s
            )
            .then
            (
              response_o =>
              {
                //;console.log( `${response_o} from cache` )
                return response_o      //response_o is the Response Object
              }
            )
        }
      )
  }
  ,



  delete__v      //: delete an url in the cache
  (
    id_s,
    url_s
  )
  {
    caches
      .open( id_s )
      .then
      (
        cache_o =>
        {
          cache_o
            .delete( url_s )
          //;console.log( `${url_s} deleted from cache` )
          }
      )
  }
  ,

}
