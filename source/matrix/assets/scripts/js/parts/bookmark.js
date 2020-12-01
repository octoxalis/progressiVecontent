// === BOOK_o: bookmark.js ===
var BOOK_o =
{
  init__v
  ()
  {
    BOOK_o
      .cache__v()
    BOOK_o
      .history__v()
    BOOK_o
      .listen__v()
  }
,




cache__v
()
{
  SER_o
    .CACHE__v
    (
      {
        sender_o: BOOK_o,
        recipient_s: 'SWO_o'
      }
    )
}
,




CACHE__v    //: from service <- worker
  (
    cache_a
  )
  {
    BOOK_o
      .list__v
      (
        Array.from( cache_a )
      )
    BOOK_o
      .dragDrop
      (
        document
          .querySelectorAll( '#bookmark_content_list > li' )
      )
  }
,



list__v    //: display cache_a items
  (
    cache_a    //: Array
  )
  {
    let list_s = ''
    cache_a
      .forEach
      (
        item_s =>
        {
          const li_s =
            BOOK_o
              .slot__s( item_s )
          list_s += `<li draggable="true">${li_s}</li>`
        }
      )
    document
      .querySelector( '#bookmark_content_list' )
      .innerHTML = list_s
  }
,




history__v    //: display history_a items
  ()
  {
    const history_a =
    JSON
      .parse
      (
        window
          .localStorage
          .getItem( 'bookmark_content_list' )
      )
    if ( history_a )
    {
      let list_s = ''
      history_a
        .forEach
        (
          (
            item_o,
            at_n
          ) =>
            list_s += `<li data-at_n="${at_n}">${item_o.name_s} [ ${item_o.date_s} ]</li>`
        )
      document
        .querySelector( '#bookmark_history_list' )
        .innerHTML = list_s
    }
  }
,




  save__v
  ()
  {
    const list_a = new Set()
    document
      .querySelectorAll( '#bookmark_content_list > li' )
      .forEach
      (
        li_e =>
        {
          list_a
            .add( `/{{C_o.SLOTS_s}}/${li_e.textContent}.html` )
        }
      )
    //;console.log( list_a )
    SER_o
      .CACHE__v
      (
        {
          recipient_s: 'SWO_o',
          cache_a: list_a
        }
      )
    BOOK_o
      .add__v
      (
        Array
          .from( list_a )
      )
    BOOK_o
      .history__v()
  }
,



  add__v
  (
    list_a
  )
  {
    const name_s =
      document
        .querySelector( '#bookmark_name' )
        .value
        .replace
        (
          /[^a-zA-Z0-9-_]/g,
          '-'
        )
    //;console.log( name_s )
    let json_s =
      window
        .localStorage
        .getItem( 'bookmark_content_list' )
    const json_a =
      JSON
        .parse( json_s )
      ||
      new Array()    //: init
    const date_o =
      new Date()
    json_a
      .push
      (
        {
          name_s: name_s,
          list_a: list_a,
          date_s: `${date_o.getFullYear()}-${date_o.getMonth() + 1}-${date_o.getDate()}`
        }
      )
    window
      .localStorage
      .setItem
        (
          'bookmark_content_list',
          JSON.stringify( json_a )
        )
}
,



  remove__v
  (
    name_s,
  )
  {
  
  }
,



  display__v
  (
    item_o    //: history list item
  )
  {
    if ( !item_o ) return
    //>
    let json_s =
      window
        .localStorage
        .getItem( 'bookmark_content_list' )
    const json_a =
      JSON
        .parse( json_s )
    const at_n =
     +item_o    //: Number
       .dataset
       .at_n
    BOOK_o
      .bookmarkOpen__v( json_a[at_n] )
  }
,



bookmarkOpen__v    //:- diplay bookmark data
(
  history_o
)
{
  const display_e =
    SLOT_o
      .display__e( 'section_bookmark' )
  LIB_o
    .id__o
    (
      'title',
      display_e
    )
    .innerHTML =
      `${history_o.name_s} [ ${history_o.date_s} ]`
  let list_s = ''
    history_o
      .list_a
      .forEach
      (
        slot_s =>
        {
          const li_s =
            BOOK_o
              .slot__s( slot_s )
          list_s += `<li data-slot_s="${slot_s}">${li_s}`
        }
      )
  LIB_o
    .id__o
    (
      'list',
      display_e
    )
    .innerHTML =
      list_s
  display_e  
    .classList
    .toggle( 'retract' )
}
,



  bookmarkClose__v
  ()
  {
    SLOT_o
      .display__e( 'section_bookmark' )
      .classList
      .toggle( 'retract' )
  }
,



  bookmarkLink__v
  ()
  {
    const list_a = new Set()
    SLOT_o
      .display__e( 'section_bookmark' )
      .querySelectorAll( '[data-id="list"] > li' )
      .forEach
      (
        li_e =>
        {
          list_a
            .add( `${li_e.dataset.slot_s}` )
        }
      )
    //;console.log( list_a )
    SER_o
      .CACHE__v
      (
        {
          recipient_s: 'SWO_o',
          cache_a: list_a
        }
      )
  }
,



  dragDrop
  (
    list_e,
    callback_f=null
  )
  {
    let source_e

    const handler_o =
    {
      'dragstart':
        event_o =>
        {
          event_o.target
            .classList
            .add( 'semi_opac' )
          source_e = event_o.target
          event_o
            .dataTransfer
            .effectAllowed = 'move'
          event_o
            .dataTransfer
            .setData
            (
              'text/html',
              event_o.target.innerHTML
            )
          //?? event_o
          //??   .dataTransfer
          //??   ?.items[0]
          //??   ?.classList
          //??   ?.add( 'on_dragged' )
          //?? console.log( event_o.dataTransfer.items[0] )
        },



      'dragenter':
        event_o =>
        {
          event_o.target
            .classList
            .add( 'drag_over' )
        },


        
      'dragover':
        event_o =>
        {
          event_o
            .preventDefault()
          event_o
            .dataTransfer
            .dropEffect = 'move'
          return false
        },


        
      'dragleave':
        event_o =>
        {
          event_o.target
            .classList
            .remove( 'drag_over' )
        },


        
      'dragend':
        event_o =>
        {
          event_o.target
            .classList
            .add( 'full_opac' )
          list_e
            .forEach
            (
              item =>
              {
                item
                  .classList
                  .remove( 'drag_over' )
              }
          )
        },


        
      'drop':
        event_o =>
        {
          event_o
            .stopPropagation()
          if
          ( 
            source_e
            !==
            event_o.target
          ) 
          {
            if ( callback_f )
            {
              callback_f
              (
                source_e,
                event_o.target
              )
              return false
            }
            source_e.innerHTML =
              event_o.target.innerHTML
            event_o.target.innerHTML =
              event_o
                .dataTransfer
                .getData( 'text/html' )
          }
          return false
        },


        
    }
  


    for ( const item_e of list_e )
    {
      for ( method_s of Object.keys( handler_o ) )
      {
        item_e
          .addEventListener
          (
            method_s,
            handler_o[method_s],
            false
          )
      }
    }
  }
,

  slot__s
  (
    path_s
  )
  {
    return (
      path_s
        .slice
        (
          '/{{C_o.SLOTS_s}}/'.length,  //: trim 'slots/'
          -('.html'.length)              //: trim '.html'
        )
    )
  }
,


  listen__v
  ()
  {
    LIB_o
      .nodeId__o( 'bookmark_save' )
      .addEventListener
      (
        'click',
        click_o =>
        {
          click_o
            .preventDefault()    //!!! do not submit form
          BOOK_o
            .save__v()
        }
      )
    LIB_o
      .nodeId__o( 'bookmark_refresh' )
      .addEventListener
      (
        'click',
        click_o =>
        {
          click_o
            .preventDefault()    //!!! do not submit form
          BOOK_o
            .cache__v()
        }
      )
    LIB_o
      .nodeId__o( 'bookmark_history_list' )
      .addEventListener
      (
        'click',
        click_o =>
        {
          BOOK_o
            .display__v
            (
              click_o
                .target
                .closest( 'LI' )
            )

        }
      )
    const section_e =
      SLOT_o
        .display__e( 'section_bookmark' )
    section_e
      .addEventListener
      (
        'click',
        //XX BOOK_o.bookmarkClose__v
        BOOK_o.bookmarkLink__v
      )
    LIB_o
      .id__o
      (
        'close',
        section_e
      )
      .addEventListener
      (
        'click',
        //XX BOOK_o.bookmarkLink__v
        BOOK_o.bookmarkClose__v
      )
  }
,

}

BOOK_o
  .init__v()    //: no IIFE

