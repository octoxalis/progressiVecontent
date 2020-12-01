const SPO_o =
{
  selector_o:    //:- Object properties from shortcodes functions - assets files (CSS & JS)
  {
    'data-slot_s="contents' : ['css:slider', 'js:slider', 'css:slot', 'js:slot', 'js:graph_c', 'js:graph', 'css:dialog', ],
    'data-slot_s="skin': ['css:skin', 'js:skin' ],
    'data-slot_s="bookmark': ['css:bookmark', 'js:bookmark' ],
    'data-id="note_': ['css:note', 'js:note'],
    'data-id="code_': ['css:code'],
    //...'data-id="comments' : ['js:comments'],
    //...'data-id="performance' : ['css:performance', 'js:web_vitals', 'js:web_vitals_report', 'js:perf_api'],
  }
,

  
  
  script__s    //:- create a single void script element which will create a link or script from its `data-list` attribute
  (
    node_s,
    list_s
  )
  { return `<script data-node="${node_s}" data-list="${list_s.slice(0, -1)}"></script>` }
,

  
  
  asset__o    //:- create a list of link /script elements from `spot_a` arg
  (
    spot_a
  )
  {
    const asset_o = Object.create( null )
    asset_o.style_s = `slot `    //: slot.css included by default
    asset_o.script_s = ''
    for ( let atSpot_a of spot_a )
    {
      for ( let atSpot_s of atSpot_a )
      {
        const [ type_s, asset_s ] = atSpot_s.split( ':' )
        const prop_s = ( type_s === 'css' ) ? 'style' : 'script'
        asset_o[`${prop_s}_s`] += `${asset_s} `
      }
    }
    asset_o.style_s = SPO_o.script__s( 'Link', asset_o.style_s )  //: see DOM.slotLink__v
    if ( asset_o.script_s ) asset_o.script_s = SPO_o.script__s( 'Script', asset_o.script_s )//: see DOM.slotScript__v
    return asset_o
  }
,



}


/**
 */
module.exports =
{
  spot__s    //:- check if slot content requests css or js assets
  (
    slot_s,
    ...args_
  )
  {
    let spot_s = ''
    const spot_a = new Set()
    for ( let key_s of Object.keys( SPO_o.selector_o ) )
    {
      if ( slot_s.indexOf( key_s ) > -1 )
      {
        spot_a.add( SPO_o.selector_o[key_s] )
        spot_s += `${SPO_o.selector_o[key_s]} `

      }
    }
    const asset_o = SPO_o.asset__o( spot_a )
    return slot_s.replace( `</section>`, `${asset_o.style_s}${asset_o.script_s}</section">` )
  }
,



}
