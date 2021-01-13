const FIL_o = require('fs-extra')

const EXT_o = Object.create( null )

const LABELS_a =
  [
    'binary number',
    'bits',
    'computer architectures',
    'digital electronics',
    'binary search algorithm',
    'search algorithm',
    'computing',
    'values',
    'bit',
    'basic unit of information',
    'binary',
    'telecommunications',
    'argument',
    'data sets',
    'procedure',
    'decryption',
    'encryption',
    'cryptography',
    'cipher',
    'partitioned data sets',
    'subroutines',
    'pre-written code',
    'software development',
    'computer programs',
    'values',
    'non-volatile resources',
    'objects',
    'classes',
    'type',
    'prototype-based programming',
    'object-oriented programming',
    'constructor',
    'instantiating',
    'code library',
  ]



EXT_o.index_s = ''



EXT_o.randInt__n =  //:- In range inclusive Integer number generator
(
  low_n,    //:- Integer
  high_n    //:- Integer
) =>
  Math.floor( Math.random() * ( Math.floor( high_n ) - low_n + 1 ) ) + low_n



EXT_o.randLabel__a =    //: simulate labels in front-matter
() =>
{
  const lineLabel_a = new Set()
  let times_n = EXT_o.randInt__n( 3, 7 )
  for ( let at_n = 0; at_n < times_n; ++at_n )
  {
    lineLabel_a.add( LABELS_a[EXT_o.randInt__n( 1, LABELS_a.length - 1 )] )
  }
  //;console.log( lineLabel_a )
  return Array.from( lineLabel_a )
}



EXT_o.toMarkdown__s =
(
  val_s,
  slot_s,
  rank_n
) =>
{
  let labels_s = ''
  const labels_a = EXT_o.randLabel__a()
  labels_a.forEach( at_s => labels_s += `'${at_s}',` )
  labels_s = `[${labels_s.slice( 0, -1 )}]`    //;console.log( labels_s )  //: trim last ,
  const title_s = slot_s.replace( /_/g, ' ')
  const text_s =
    val_s
      .replace( /<a href=[\s\S]*?>/g, '~°' )
      .replace( /<\/a>/g, '°~' )
      .replace( /<span[\s\S]*?>/g, '' )
      .replace( /<\/span>/g, '' )
  let buffer_s =
`---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/${slot_s}.html',
  rank_n: ${rank_n},
  tags: [ 'notag' ],
  title_s: '${slot_s.replace( /_/g, ' ')}',
  labels_a: ${labels_s},
}
---
## ${title_s}

${text_s}
`
  return buffer_s
}



EXT_o.toBuffer__s =
(
  buffer_s
) =>
{
  return buffer_s
    .replace( /---js[\s\S]*?---/g, '' )
    .replace( /\s{1,2}?#{1,6}\s{1,2}?([\s\S]*?)\n/g, '~°$1°~' )  //: tag document title
    .replace( /\n/g, ' ' )
}



EXT_o.extract__v =
(
  val_s,    //: slot content
  key_s     //: slot_s = slot_n
) =>
{
  const [ slot_s, slot_n ] = key_s.split( '=' )    //;console.log( `${slot_s} - ${slot_n}` )
  const buffer_s = EXT_o.toMarkdown__s( val_s, slot_s, slot_n )
  FIL_o.writeFile( `matter/content/${C_o.SLOTS_s}/${slot_s}.md`, buffer_s, error_o=>{/*console.log( error_o )*/})
  EXT_o.index_s += `${EXT_o.toBuffer__s( buffer_s )}\n`
}



EXT_o.toIndex__v =
() =>
{
  let label_a = []    //: simulate labels for each content (line)
  for ( let atlabel_a of [...EXT_o.index_s.matchAll( /<i>([a-zA-Z]{6,8}[\s\S]*?)<\/i>/g )] )
  {
    if ( !atlabel_a[1].includes( ',') ) 
    {
      label_a.push( atlabel_a[1].replace( /\s/g, '_' ) )
      ;console.log( atlabel_a[1] )
    }
  }
  let text_s = ''
  let json_a = []
  for ( let atline_a of [...EXT_o.index_s.matchAll( /([\s\S]*?)\n/g )] )    //: line delimiter
  {
    let doc_n = 0    //: documents json_a
    let doc_s = ''   //: document String
    let words_a = []   //: document words Array
    for ( let mark_a of [...atline_a[1].matchAll( /~°([\s\S]*?)°~/g )] )    //: word delimiter
    {
      let word_s = `${mark_a[1].replace( / /g, '_' )} `  //: wich one is more accurate?
      //--const word_s = text_s += `${mark_a[1]} `       //: wich one is more accurate?
      text_s += word_s
      word_s = word_s.trim()    //:--=> will have to .replace( /_/g, ' ' ) LATER
      if ( doc_n++ ) words_a.push( word_s )
      else doc_s = word_s
    }
    text_s += '\n'
    json_a.push( [ doc_s, words_a, EXT_o.randLabel__a() ] )
  }
  FIL_o.writeFile( `make/index/input/docs.txt`, text_s, error_o=>{/*console.log( error_o )*/})
  FIL_o.writeFile( `make/index/input/docs.json`, JSON.stringify( json_a ), error_o=>{/*console.log( error_o )*/})
}



void function
()
{
  const file_s = 'make/index/input/docs.html'
  const glossary_a = new Map()
  const wiki_s = FIL_o.readFileSync( file_s, { encoding:'utf-8', flag:'r' } )
  const def_re = /<dt class="glossary" id="([\s\S]*?)"[\s\S]*?<dd class="glossary">([\s\S]*?)<\/dd>/g
  let at_n = 0    //: negative indices reserved for sys docs
  for ( match_a of [...wiki_s.matchAll( def_re )] )
  {
    const slot_s = `${match_a[1]}=${at_n++}`    //;console.log( slot_s )
    glossary_a
      .set
      (
        slot_s,
        match_a[2]
      )
    
  }
  glossary_a.forEach( EXT_o.extract__v )
  EXT_o.toIndex__v()
  //->
  ;console.log( `Number of docs: ${glossary_a.size}` )
} ()
