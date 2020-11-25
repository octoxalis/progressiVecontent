const FIL_o = require('fs-extra')

const GRA_o = require('./Graph')    //: GRA_o redeclared in: matrix/assets/scripts/js/parts/graph.js



const DOCS_o =
{
  OUTPUT_DIR_s:  'matrix/assets/static/data/json/',
  //??? DOCS_JSON_s:   'docs_labels',
  //??? LABELS_JSON_s: 'labels_docs',
  GRAPH_JSON_s: 'graph',
  //?? DOCS_MD:     'matter/content/sys/docs.md',
  DOCS_JS_s:    'matrix/assets/static/data/js/docs_data.js',
  LABELS_JS_s:  'matrix/assets/static/data/js/labels_data.js',
  DOCS_NJK_s:   'matrix/parts/slot/data/docs.njk',
  LABELS_NJK_s: 'matrix/parts/slot/data/labels.njk',
  GRAPH_SVG_s:  'matrix/parts/slot/graph/graph.svg',
  AT_DOC_n:     0,    //: [doc_n]
  AT_LAB_n:     1,    //: [label_s]
  AT_TOP_n:     2,    //: [topic_s]
  
  
  
  docs__a
  (
    docs_a    //: parsed 'docs_labels_topics.json'
  )
  {
    const labelsdocs_a = new Map()
    const docslabels_a = new Array( docs_a.length )
    let atdoc_n = 0
    for ( doc_a of docs_a )
    {
      docslabels_a[atdoc_n] = [ doc_a[DOCS_o.AT_DOC_n] ]
      for ( lab_a of doc_a[DOCS_o.AT_LAB_n] )
      {
        const key_s = lab_a[0]
        docslabels_a[atdoc_n].push( key_s )    //: docs[labels]
        if ( !labelsdocs_a.has( key_s ) ) labelsdocs_a.set( key_s, new Set() )    //: labels[docs]
        const set_a = labelsdocs_a.get( key_s )
        set_a.add( atdoc_n )
        labelsdocs_a.set( key_s, set_a )
      }
      ++atdoc_n
    }
    DOCS_o.graph__v( labelsdocs_a )
    return [ docslabels_a, labelsdocs_a ]
  }
,



  docs__v
  (
    docs_a    //: [ docslabels_a, labelsdocs_a ]
  )
  {
    const [ docslabels_a, labelsdocs_a ] = docs_a

    //----
    const docLabHtml__v =
    (
      step_n,
      doc_a
      ) =>
    {
      let labs_s = ''
      for ( let at_s of doc_a.slice( 1 ) ) labs_s += `${at_s} `
      return `\n<li data-slot_n="${step_n}" data-slot_s="${doc_a[0]}" data--="${labs_s.trimEnd()}"></li>`
    }


    //----
    const docLabJs__v =
    (
      step_n,
      doc_a
      ) =>
    {
      let labs_s = '['
      for ( let at_s of doc_a.slice( 1 ) ) labs_s += `'${at_s}',`
      labs_s = labs_s.slice( 0, -1 )     //: trim last ,
      return `DOC_o['${doc_a[0]}']=${labs_s}];`
    }


    //----
    const labDocHtml__v =
    (
      step_n,
      key_s,
      docs_a
      ) =>
    {
      let docs_s = ''
      for ( let doc_n of docs_a ) docs_s += `${doc_n} `
      return `\n<li data-slot_n="${step_n}" data-slot_s="${key_s}" data--="${docs_s.trimEnd()}"></li>`
    }

    
    //----
    const labDocJs__v =
    (
      step_n,
      key_s,
      docs_a
      ) =>
    {
      let docs_s = '['
      //XXfor ( let at_s of doc_a.slice( 1 ) ) labs_s += `'${at_s}',`
      for ( let doc_n of docs_a ) docs_s += `${doc_n},`
      docs_s = docs_s.slice( 0, -1 )     //: trim last ,
      return `LAB_o['${key_s}']=${docs_s}];`
    }


    //----
    let step_n = 0
    let doc_lab_html_s = ''
    let doc_lab_js_s = ''
    docslabels_a.forEach(
      (
        doc_a,
        step_n
      ) =>
      {
        doc_lab_html_s += docLabHtml__v( step_n, doc_a )
        doc_lab_js_s   += docLabJs__v( step_n, doc_a )
      } )
    doc_lab_js_s = `var DOC_o=[];${doc_lab_js_s}`
    
    step_n = 0
    let lab_doc_html_s = ''
    let lab_doc_js_s = ''
    labelsdocs_a.forEach(
      (
        value_s,
        key_s
      ) =>
      {
        const docs_a = Array.from( labelsdocs_a.get( key_s ) )
        lab_doc_html_s += labDocHtml__v( step_n, key_s, docs_a )
        lab_doc_js_s   += labDocJs__v( step_n, key_s, docs_a )
        step_n++
      } )
      lab_doc_js_s = `var LAB_o=[];${lab_doc_js_s}`
    
    FIL_o.
      writeFile( DOCS_o.DOCS_NJK_s, doc_lab_html_s, error_o=>{/*console.log( error_o )*/} )
    FIL_o.
      writeFile( DOCS_o.DOCS_JS_s, doc_lab_js_s, error_o=>{/*console.log( error_o )*/} )
    FIL_o.
      writeFile( DOCS_o.LABELS_NJK_s, lab_doc_html_s, error_o=>{/*console.log( error_o )*/} )
    FIL_o.
      writeFile( DOCS_o.LABELS_JS_s, lab_doc_js_s, error_o=>{/*console.log( error_o )*/} )
    //............................................
    DOCS_o.svg__v( docslabels_a )
    //............................................
  }
,


  graph__v
  (
    labelsdocs_a
  )
  {
    const graph_c = new GRA_o.Graph( new GRA_o.Facet( 'labels_docs' ) )
    labelsdocs_a.forEach(
      (
        key_s,
        label_s
      ) =>
      {
        const docs_a = Array.from( labelsdocs_a.get( label_s ) )
        for ( doc_n of docs_a )
          {
            let node_o = graph_c.nodeLabel__o( doc_n )
            if ( !node_o )
            {
              const node_n = graph_c.node__n( new GRA_o.Facet( doc_n ) )
              node_o = graph_c.nodeId__o( node_n )
            }
            const node_n = node_o.id__n()
            for ( idoc_n of docs_a )  //: link to every other nodes in the Set (complete graph)
            {
              if ( idoc_n !== doc_n )
              {
                let inode_o = graph_c.nodeLabel__o( idoc_n )
                if ( !inode_o )
                {
                  const id_n = graph_c.node__n( new GRA_o.Facet( idoc_n ) )
                  inode_o = graph_c.nodeId__o( id_n )
                }
                let link_c = inode_o.link__c( node_n )
                if ( !link_c ) graph_c.link__v( inode_o.id__n(), node_n, new GRA_o.Facet( label_s ) )
                else link_c.label__v( label_s )
              }
            }
          }
      } )
    FIL_o
      .writeFile( `${DOCS_o.OUTPUT_DIR_s}${DOCS_o.GRAPH_JSON_s}.json`,
      JSON.stringify( graph_c ),
      error_o=>{/*console.log( error_o )*/})
  }
,


svg__v
(
  docslabels_a
)
{
  const [ wide_n, dim_n, height_n, column_n ] =
    DOCS_o
      .geometry__v
      (
        docslabels_a.length
      )
      ;console.log( `[ ${wide_n}, ${dim_n}, ${height_n}, ${column_n} ]` )
  let svg_s = ''
  //--let atX_n = 0
  //--let atY_n = 0
  let atX_n = dim_n * .5
  let atY_n = dim_n * .5
  const GAP_n = 2
  docslabels_a
    .forEach
    (
      (
        doc_a,    //!!! not used
        step_n
      ) =>
      {
        //--svg_s += `<rect id="node_${step_n}" x="${atX_n}" y="${atY_n}" width="${dim_n}" height="${dim_n}" rx="4"></rect>`
        svg_s += `<circle id="node_${step_n}" cx="${atX_n}" cy="${atY_n}" r="${dim_n * .5}"></circle>`
        atX_n += dim_n + GAP_n
        if ( atX_n >= wide_n )
        {
          //--atX_n = 0
          atX_n = dim_n * .5
          atY_n += dim_n + GAP_n
        }
      }
    )
  svg_s = `<svg xmlns="http://www.w3.org/2000/svg" id="graph_svg" class="" viewBox="0 0 ${wide_n} ${height_n}">${svg_s}</svg>`
  FIL_o.
    writeFile
    (
      DOCS_o.GRAPH_SVG_s,
      svg_s,
      error_o=>{/*console.log( error_o )*/}
    )
}

,

  geometry__v
  (
    capacity_n
  )
  {
    const DIM_n = 24
    const MINDIM_n = 16
    const MAXDIM_n = 32
    const GAP_n = 2
    let  width_n = 800
    const column_n =
      Math
        .ceil
        (
          Math
            .sqrt( capacity_n )
        )
    const gap_n =
        GAP_n
        *
        ( column_n - 1 )    //: accumulated gap
    const minWidth_n =
      ( DIM_n * column_n )
      +
      gap_n
    let dim_n =
      ( minWidth_n > width_n ) ?
        MINDIM_n :
          Math
            .ceil
            (
              ( width_n - gap_n )
              /
              column_n
            )
    if ( dim_n > MAXDIM_n ) dim_n = MAXDIM_n
    const wide_n =
      ( dim_n * column_n )
      +
      gap_n
    let row_n =
      Math
        .floor
        (
          capacity_n
          /
          column_n
        )
    if ( row_n * column_n < capacity_n ) row_n += 1
    const height_n =
      ( dim_n * row_n )
      +
      ( 
        GAP_n
        *
        ( row_n - 1 )
      )
    return [ wide_n, dim_n, height_n, column_n ]
  }
,
  
}



module.exports =
{
  parse__v
  (
    docs_s    //: 'docs_labels_topics.json'
  )
  { DOCS_o.docs__v( DOCS_o.docs__a( JSON.parse( FIL_o.readFileSync( docs_s, 'utf8', 'r' ) ) ) ) }
,



}
