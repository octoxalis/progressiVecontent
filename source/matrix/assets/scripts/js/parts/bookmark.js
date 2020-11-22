// === BOOK_o: bookmark.js ===
var BOOK_o =
{


  init__v
  ()
  {
    BOOK_o
      .cache__v()
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
      .dragDrop()
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
            item_s
              .slice
              (
                '/{{A_o.SLOTS_s}}/'.length,  //: trim 'slots/'
                -('.html'.length)              //: trim '.html'
              )
          list_s += `<li draggable="true">${li_s}</li>`
        }
      )
    document
      .querySelector( '#bookmark_list' )
      .innerHTML = list_s
  }
,




  save__v
  ()
  {
    const list_a = new Set()
    document
      .querySelectorAll( '#bookmark_list > li' )
      .forEach
      (
        li_e =>
        {
          list_a
            .add( `/{{A_o.SLOTS_s}}/${li_e.textContent}.html` )
        }
      )
    console.log( list_a )
    return
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


//-----------------------------------------------------------
  dragDrop
  ()
  {
    let source_e = null
  
  
    function start
    (
      event_o
    ) 
    {
      this
        .classList
        .add( 'semi_opac' )
      source_e = this
      event_o
        .dataTransfer
        .effectAllowed = 'move'
      event_o
        .dataTransfer
        .setData
        (
          'text/html',
          this.innerHTML
        )
      //?? event_o
      //??   .dataTransfer
      //??   ?.items[0]
      //??   ?.classList
      //??   ?.add( 'on_dragged' )
      //?? console.log( event_o.dataTransfer.items[0] )
    }
  
  
  
    function over
    (
      event_o
    )
    {
      event_o
        .preventDefault()
      event_o
        .dataTransfer
        .dropEffect = 'move'
      return false
    }
  
  
  
    function enter
    (
      event_o
    )

    {
      this
        .classList
        .add( 'drag_over' )
    }
  
  
  
    function leave
    (
      event_o
    )
    {
      this
        .classList
        .remove( 'drag_over' )
    }
  
  
  
    function drop
    (
      event_o
    )
    {
      event_o
        .stopPropagation()
      if ( source_e !== this ) 
      {
        source_e
          .innerHTML =
            this.innerHTML
        this
          .innerHTML =
            event_o
              .dataTransfer
              .getData( 'text/html' )
      }
      return false
    }
  
  
  
    function end
    (
    event_o
    )
    {
      this
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
    }
  //::::::::::::::::::::::::
  const list_e =
    document
     .querySelectorAll( '#bookmark_list > li' )
for
    ( const item_e of list_e )
    {
      [
        'start',
        'enter',
        'over', 
        'leave',
        'end',  
        'drop',     
      ]
      .forEach
      (
        method_s =>
        {
          const prefix_s =
            method_s === 'drop' ?
            ''
            :
            'drag'
          item_e
            .addEventListener
            (
              `${prefix_s}${method_s}`,
              eval( method_s ),
              false
            )
        }
      )
    }



  }
,
  //-----------------------------------------------------------


  listen__v
  ()
  {
    document
      .querySelector( '#bookmark_save' )
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
    document
      .querySelector( '#bookmark_refresh' )
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
  }
,

}

BOOK_o
  .init__v()    //: no IIFE

