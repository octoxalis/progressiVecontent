// === NOTE_o: note.js ==

var NOTE_o =
{
  text__v
  (
    click_o
  )
  {
    const note_e =
      click_o
        .target
        .closest('INS')
    if ( note_e )
    {
      NOTE_o
        .image__v( note_e )    //: try for img
      note_e
        .querySelector( '[data-id="note_content"]' )
        .classList.toggle( 'note_open' )
    }
  }
,



  image__v
  (
    note_e
  )
  {
    const unfold_e =    //: button thumbnail img
      LIB_o
        .data__o( 'isrc', note_e )
    if ( !unfold_e || !unfold_e.dataset.isrc ) return   //: not a note_img or already loaded
    //>
    const size_s =
      unfold_e
        .dataset
        .isize
    if ( size_s )
    {
      const [ width_s, height_s ] =
        size_s.split( ' ' )
      if ( !width_s ) return
      //>
      const widthUnit_s =
        ( `${parseInt( width_s )}`.length === width_s.length )
        ?
          'px'
        :
          ''
      let style_s =
        `width:${width_s}${widthUnit_s};`
      if ( height_s )
      {
        const heightUnit_s =
          ( `${parseInt( height_s )}`.length === height_s.length )
          ?
            'px'
          :
            ''
        style_s +=
          ` height:${height_s}${heightUnit_s};`
      }
      if ( style_s )
      {
        unfold_e.style = style_s
      }
    }
    const src_s = 
      unfold_e
        .dataset
        .isrc
    unfold_e.src = src_s
    unfold_e
      .removeAttribute( 'data-isrc' )  //: prevent further loading
    const img_e =
      note_e
        .querySelector( '[data-id="note_content"] > img' )
    const isrc_s =
      img_e
        .dataset.isrc
    if ( isrc_s ) img_e.src = isrc_s
  }
,



  unfold__v
  (
    src_e
  )
  {
    const content_e =
      src_e
        .nextElementSibling
    if ( !content_e ) return
    //>
    let unfold_e =
      LIB_o
        .id__o( 'img_unfold', src_e )
    if ( unfold_e ) return    //: already there
    //>
    unfold_e =
      document
        .createElement( '{{ C_o.IMG_UNFOLD_TAG_s }}' )
    unfold_e.dataset.id = 'img_unfold'
    for ( child_e of content_e.children )
    {
      if ( !child_e.classList.contains( 'note_link_a' ) )  //: exclude
      {
        const clone_e =
          child_e
            .cloneNode( true )
        unfold_e
          .appendChild( clone_e )
        if ( child_e.tagName === 'IMG' )
        {
          clone_e.src =
            child_e
              .dataset
              .isrc
            ||
            child_e
              .dataset
              .isrc  //: if main image already unfolded

          clone_e
            .removeAttribute( 'data-isrc' )
        }
      }
    }
    src_e
      .appendChild( unfold_e )
  }
,



  act_o:
  {
    color__v:
    (
      button_e,
      gray_s='gray',
      color_s='color'
    ) =>
    {
      const note_e =
        button_e
          .closest( '.note_open' )
      if ( !note_e ) return
      //>
      const img_e =
        note_e
          .querySelector( 'img' )
      let src_s =
        img_e
          .src
      if ( !src_s.includes( gray_s ) ) return    //: no color image available
      //>
      src_s =
        src_s
          .replace( gray_s, color_s )
      img_e.src = src_s
      button_e
        .classList
        .add( 'unseen' )    //: one shot button
      button_e.onclick =
        () => false         //: disable keyboard click
      const unfold_e =      //: replace b/w unfolded img with colored
        LIB_o
          .id__o
          (
            'img_unfold',
            note_e.parentNode
          )
      if ( !unfold_e ) return  //: not yet unfolded
      //>
      unfold_e
        .querySelector( 'img' )
        .src = src_s
      note_e
        .classList
        .remove( 'note_open' )  //: just to reopen it after return
    }
  }
,



  renew__v
  (
    //~~section_e=document
    doc_n
  )
  {
    const section_e =
      document
        .querySelector( `section[data-doc_n="${doc_n}"]` )

    section_e
      .addEventListener
      (
        'click',
        NOTE_o.text__v
      )
      
    //................................................
    const button_a =    //: slot image unfold button
      section_e
        .querySelectorAll( 'button[aria-label="unfold image"]' )

    for ( const button_e of button_a )
    {
      button_e
        .addEventListener
        (
          'mouseover',
          () =>
            NOTE_o
              .unfold__v( button_e )
        )
    }

    const link_a =        //: slot image link button
      section_e
        .querySelectorAll( 'a[class="note_link"]' )

    for ( const link_e of link_a )
    {
      link_e
        .addEventListener
        (
          'click',
          () =>
            NOTE_o
              .act_o[`${link_e.dataset.method}`]
              (
                link_e,
                `${link_e.dataset.param}`
              )
        )
      link_e
        .addEventListener
          (
            'keydown',
            () =>
              link_e
                .click()
          )
    }
    //................................................

    //======================
    ;console.log( 'note.js' )
  }

}
