module.exports =
{
  reload__s
  (
    body_s
  )
  {
    const button_s =
`<button data-id="slots_reload" aria-label="reload previously opened slots" tabindex="0" class="vanished">
<svg class="svg_icon"><use href="#refresh" class="use_icon"></use></svg>
</button>`

    const target_s = '</h1>'  //: button is inside h1 tag
    const split_n = body_s.indexOf( target_s, body_s.indexOf( '<article>' ) )
    return `${body_s.slice( 0, split_n )}${button_s}${body_s.slice( split_n )}`
  }
,



}
