const FS_o = require('fs-extra')

const F_o = require( '../data/F_o.js' )
const GRA_o = require('./Graph')    //: GRA_o redeclared in: matrix/assets/scripts/js/parts/graph.js



const DOCS_o =
{
  OUTPUT_DIR_s: 'matrix/assets/static/data/json/',
  DOCS_JS_s:    'matrix/assets/static/data/js/docs_data.js',
  LABELS_JS_s:  'matrix/assets/static/data/js/topics_data.js',
  DOCS_NJK_s:   'matrix/parts/slot/data/docs.njk',
  LABELS_NJK_s: 'matrix/parts/slot/data/topics.njk',
  GRAPH_SVG_s:  'matrix/parts/slot/graph/graph.svg',
  GRAPH_JSON_s: 'graph',
  AT_DOC_n:     0,    //: doc_n in docs_a
  AT_SLOT_n:    1,    //: doc_s
  AT_LAB_n:     2,    //: [topic_s]
  AT_WORD_n:    3,    //: [word_s]

  
  
  docs__a
  (
    docs_a    //: [ [doc_n, doc_s, [topics_a] ], [words_a], ... ]
  )
  {
    const topicsDocs_a = new Map()
    const docsLabels_a = new Array( docs_a.length )
    let atdoc_n = 0
    for ( doc_a of docs_a )
    {
      docsLabels_a[atdoc_n] = [ doc_a[DOCS_o.AT_DOC_n], doc_a[DOCS_o.AT_SLOT_n] ]
      for ( topic_s of doc_a[DOCS_o.AT_LAB_n] )
      {
        docsLabels_a[atdoc_n].push( topic_s )    //: docs[topics]
        if ( !topicsDocs_a.has( topic_s ) ) topicsDocs_a.set( topic_s, new Set() )    //: topics[docs]
        const set_a = topicsDocs_a.get( topic_s )
        set_a.add( atdoc_n )
        topicsDocs_a.set( topic_s, set_a )
      }
      ++atdoc_n
    }
    DOCS_o.graph__v( topicsDocs_a )
    return [ docsLabels_a, topicsDocs_a ]
  }
,



  docs__v
  (
    docs_a    //: [ docsLabels_a, topicsDocs_a ]
  )
  {
    //----
    const docLabelsHtml__v =
    (
      doc_a,    //: [ [doc_n, doc_s, [topics_a] ], [words_a], ... ]
      step_n    //: not used
      ) =>
    {
      let doc_s = ''
      for ( let at_s of doc_a.slice( DOCS_o.AT_LAB_n ) ) doc_s += `${at_s} `
      return `\n<li data-doc_n="${doc_a[DOCS_o.AT_DOC_n]}" data-doc_s="${doc_a[DOCS_o.AT_SLOT_n]}" data--="${doc_s.trimEnd()}"></li>`
    }


    //----
    const docWordsJs__v =
    (
      doc_a,    //: [ [doc_n, doc_s, [topics_a] ], [words_a], ... ]
      step_n
      ) =>
    {
      let doc_s = '['
      for ( let at_s of doc_a.slice( DOCS_o.AT_LAB_n ) ) doc_s += `'${at_s}',`
      doc_s = doc_s.slice( 0, -1 )     //: trim last ','
      return `DOC_o['${doc_a[DOCS_o.AT_SLOT_n]}']=${doc_s}];`
    }


    //----
    const labDocHtml__v =
    (
      docs_a,
      step_n,
      key_s
      ) =>
    {
      let docs_s = ''
      for ( let atdoc_n of docs_a ) docs_s += `${atdoc_n} `
      return `\n<li data-doc_n="${step_n}" data-doc_s="${key_s}" data--="${docs_s.trimEnd()}"></li>`
    }

    
    //----
    const labDocJs__v =
    (
      docs_a,
      step_n,
      key_s
      ) =>
    {
      let docs_s = '['
      for ( let atdoc_n of docs_a ) docs_s += `${atdoc_n},`
      docs_s = docs_s.slice( 0, -1 )     //: trim last ,
      return `LAB_o['${key_s}']=${docs_s}];`
    }


    //--------
    const [ docsLabels_a, topicsDocs_a ] = docs_a
    let step_n = 0
    let doc_word_html_s = ''
    let doc_word_js_s = ''
    docsLabels_a.forEach(
      (
        doc_a,
        step_n
      ) =>
      {
        doc_word_html_s += docLabelsHtml__v( doc_a, step_n )
        doc_word_js_s   += docWordsJs__v( doc_a, step_n )
      } )
    doc_word_js_s = `var DOC_o=[];${doc_word_js_s}`
    //----
    step_n = 0
    let lab_doc_html_s = ''
    let lab_doc_js_s = ''
    topicsDocs_a.forEach(
      (
        value_s,
        key_s
      ) =>
      {
        const docs_a = Array.from( topicsDocs_a.get( key_s ) )
        lab_doc_html_s += labDocHtml__v( docs_a, step_n, key_s )
        lab_doc_js_s   += labDocJs__v( docs_a, step_n, key_s )
        step_n++
      } )
      lab_doc_js_s = `var LAB_o=[];${lab_doc_js_s}`
    
    FS_o.
      writeFile( DOCS_o.DOCS_NJK_s, doc_word_html_s, error_o => F_o.writeFile__v( error_o) )
    FS_o.
      writeFile( DOCS_o.DOCS_JS_s, doc_word_js_s, error_o=>F_o.writeFile__v( error_o) )
    FS_o.
      writeFile( DOCS_o.LABELS_NJK_s, lab_doc_html_s, error_o=>F_o.writeFile__v( error_o) )
    FS_o.
      writeFile( DOCS_o.LABELS_JS_s, lab_doc_js_s, error_o=>F_o.writeFile__v( error_o) )
    DOCS_o.svg__v( docsLabels_a )
  }
,


  graph__v
  (
    topicsDocs_a
  )
  {
    const graph_c = new GRA_o.Graph( new GRA_o.Facet( 'topics_docs' ) )
    topicsDocs_a.forEach(
      (
        key_s,
        topic_s
      ) =>
      {
        const docs_a = Array.from( topicsDocs_a.get( topic_s ) )
        for ( atdoc_n of docs_a )
          {
            let node_o = graph_c.nodeLabel__o( atdoc_n )
            if ( !node_o )
            {
              const node_n = graph_c.node__n( new GRA_o.Facet( atdoc_n ) )
              node_o = graph_c.nodeId__o( node_n )
            }
            const node_n = node_o.id__n()
            for ( idoc_n of docs_a )  //: link to every other nodes in the Set (complete graph)
            {
              if ( idoc_n !== atdoc_n )
              {
                let inode_o = graph_c.nodeLabel__o( idoc_n )
                if ( !inode_o )
                {
                  const id_n = graph_c.node__n( new GRA_o.Facet( idoc_n ) )
                  inode_o = graph_c.nodeId__o( id_n )
                }
                let link_c = inode_o.link__c( node_n )
                if ( !link_c ) graph_c.link__v( inode_o.id__n(), node_n, new GRA_o.Facet( topic_s ) )
                else link_c.label__v( topic_s )
              }
            }
          }
      } )
    FS_o
      .writeFile( `${DOCS_o.OUTPUT_DIR_s}${DOCS_o.GRAPH_JSON_s}.json`,
      JSON.stringify( graph_c ),
      error_o => F_o.writeFile__v( error_o) )
  }
,


svg__v
(
  docsLabels_a
)
{
  const [ wide_n, dim_n, height_n, column_n ] =
    DOCS_o
      .geometry__v
      (
        docsLabels_a.length
      )
  //;console.log( `[ ${wide_n}, ${dim_n}, ${height_n}, ${column_n} ]` )
  let svg_s = ''
  //--let atX_n = 0    // rect version
  //--let atY_n = 0    // rect version
  let atX_n = dim_n * .5
  let atY_n = dim_n * .5
  const GAP_n = 2
  docsLabels_a
    .forEach
    (
      (
        doc_a
      ) =>
      {
        //--svg_s += `<rect id="node_${{doc_a[0]}" x="${atX_n}" y="${atY_n}" width="${dim_n}" height="${dim_n}" rx="4"></rect>`    // rect version
        svg_s += `<circle id="node_${doc_a[0]}" cx="${atX_n}" cy="${atY_n}" r="${dim_n * .3}"></circle>`
        atX_n += dim_n + GAP_n
        if ( atX_n >= wide_n )
        {
          //--atX_n = 0    // rect version
          atX_n = dim_n * .5
          atY_n += dim_n + GAP_n
        }
      }
    )
  svg_s = `<svg xmlns="http://www.w3.org/2000/svg" id="graph_svg" class="" viewBox="0 0 ${wide_n} ${height_n}">${svg_s}</svg>`
  FS_o.
    writeFile
    (
      DOCS_o.GRAPH_SVG_s,
      svg_s,
      error_o => F_o.writeFile__v( error_o)
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
    docs_s    //: 'docs_topics_words.json'
  )
  {
    DOCS_o.docs__v( DOCS_o.docs__a( JSON.parse( FS_o.readFileSync( docs_s, 'utf8', 'r' ) ) ) )
  }
,



}
