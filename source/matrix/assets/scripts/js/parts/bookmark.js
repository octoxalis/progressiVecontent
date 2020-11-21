// === BOOK_o: bookmark.js ===
var BOOK_o =
{


  init__v
  ()
  {
    const cache_a =
      SER_o
        .CACHE__v
        (
          {
            target_s: 'SWO_o',
            requester_o: BOOK_o
          }
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
          target_s: 'SWO_o',
          cache_a: list_a
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
  }
,



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
  }
,

}



void function ()
{
  BOOK_o
    .init__v()
  BOOK_o
    .listen__v()
} ()


