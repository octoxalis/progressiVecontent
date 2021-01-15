const FIL_o = require( 'fs-extra' )
const REX_o = require( './regex.js' )
const C_o   = require( '../data/C_o.js' )
const F_o   = require( '../data/F_o.js' )

const DOCS_TOPICS_s = `${C_o.INDEX_DIR_s}input/docs_topics_words.json`
const DOCS_WORDS_s  = `${C_o.INDEX_DIR_s}input/docs_words.txt`

const FILE_DELIM_s = '\n'
const WORDS_DELIM_s = ' '
const WORDS_CONCAT_s = '_'

const EXT_o = Object.create( null )


//!!! double slash for template String
EXT_o.ARRAY_s =
  `       //: JS Array declaration
  \\s*?   //: optional space, non-greedy
  (       //: open capture group
  \\[     //: opening Array bracket
  \\s*?   //: optional space, non-greedy
  [       //: open char range
  ^\\]    //: everything except close Array bracket
  ]       //: close char range
  +?      //: 1 or more chars in that range, non-greedy
  \\s*?   //: optional space, non-greedy
  \\]     //: closing Array bracket
  )       //: close capture group
  `
EXT_o.LINE_s =
  `
  (       //: open capture group
  [       //: open char range
  \\s\\S  //: anything
  ]       //: close char range
  *?      //: non-greedy...
  )       //: close capture group
  \\n     //: ... up to a new line
  `
EXT_o.TITLE_s =
  `
  ^       //: start of line
  :       //: title delimiter
  (       //: open capture group
  [       //: open char range
  ^:      //: word and space chars
  ]       //: close char range
  +?      //: non-greedy...
  )       //: close capture group
  :       //: title delimiter
  `
EXT_o.DOC_n =
  `
  \\s*?   //: optional space, non-greedy
  (       //: open capture group
  -?      //: optional minus
  [       //: open char range
  \\d     //: digit
  ]       //: close char range
  +?      //: non-greedy...
  )       //: close capture group
  \\s*?   //: optional space, non-greedy
  ,       //: object properties separator
  `
EXT_o.DOC_s =
  `
  \\s*?   //: optional space, non-greedy
  (?:'|") //: string delimiter
  (       //: open capture group
  [       //: open char range
  \\w     //: word char
  ]       //: close char range
  +?      //: non-greedy...
  )       //: close capture group
  (?:'|") //: string delimiter
  `

EXT_o.TAG_s =
  `
  ~°           //: opening word delimiter
  (            //: open capture group
  [            //: open capture group
  \\s\\S       //: anything
  ]            //: close capture group
  *?           //: non-greedy
  )            //: close capture group
  °~           //: closing word delimiter
  `


EXT_o.concat__s =
(
  array_s    //: front matter Array (topics or words)
) =>
{
  const array_a =
    eval( array_s )
  return (
    array_a
      .map
      (
        item_s =>
          item_s
            .replaceAll
            (
              WORDS_DELIM_s,
              WORDS_CONCAT_s
            )
      )
      .join( WORDS_DELIM_s )
  )
}



EXT_o.docs__o =
(
  source_s    //: front matter + markdown (*.md file)
) =>
{
  const docs_o =
    {
      doc_n: 0,
      doc_s: '',
      topics_s: '',
      words_s: ''
    }
  const gRE_o =
    REX_o
      .new__re( 'g' )    //: global regex
  const smRE_o =
    REX_o
    .new__re( 'sm' )    //: multiline regex

  //: doc_n
  const docN_re =
    smRE_o
      `
      doc_n:     //: JS front matter Array
      ${EXT_o.DOC_n}
      `
  const docN_a =
    source_s
      .match( docN_re )
  if ( docN_a )
  {
    docs_o.doc_n =
      +docN_a[1]    //: Number cast
  }

  //: doc_s
  const docS_re =
    smRE_o
      `
      doc_s:     //: JS front matter Array
      ${EXT_o.DOC_s}
      `
  const docS_a =
    source_s
      .match( docS_re )
  if ( docS_a )
  {
    docs_o.doc_s =
      docS_a[1]
  }

  //: topics
  const topics_re =
    smRE_o
    `
    topics_a:     //: JS front matter Array
    ${EXT_o.ARRAY_s}
    `
  let topics_a =
    source_s
      .match( topics_re )
  if ( topics_a )
  {
    docs_o.topics_s =
      EXT_o
        .concat__s( topics_a[1] )
  }

  //: words
  let words_s = ''
  const words_re =
    smRE_o
    `
    words_a:     //: JS front matter Array
    ${EXT_o.ARRAY_s}
    `
  let words_a =
    source_s
      .match( words_re )
  if ( words_a )    //: skip content without words (sys slots)
  {
    words_s +=
      EXT_o
        .concat__s( words_a[1] )
    for
    (
      const word_a
      of
      source_s
        .matchAll
        (
          gRE_o
          `
          ${EXT_o.TAG_s}
          `
        )
    )
    {
      words_s +=
        WORDS_DELIM_s
        +
        word_a
            [1]
            .replace    //:--=> will have to .replace( /WORDS_CONCAT_s/g, WORDS_DELIM_s ) LATER
            (
              gRE_o
              `\s+?`,    //: multi space, non-greedy
              WORDS_CONCAT_s
            )
    }
    docs_o.words_s =
      words_s
  }
  return docs_o
}



EXT_o.toIndex__v =
(
  index_a
) =>
{
  index_a
    .sort
    (
      (
        item_o,
        other_o
      ) =>
      {
        return (
          item_o.doc_n
          -
          other_o.doc_n
        )
      }
    )
  let text_s = ''
  let json_a = []
  let index_n = 0
  let doc_a =
    new Set()
  for
  (
    const atdoc_o
    of
    index_a
  )
  {
    if     //: exclude index, 404, sys slots, etc.
    (
      atdoc_o
        .doc_n 
      >=
      0
    )
    {
      if
      (
        atdoc_o
          .doc_n
        >
        index_n
      )
      {
        index_n =
          atdoc_o
            .doc_n
      }
      if
      (
        doc_a
          .has
          (
            atdoc_o
              .doc_n
          )
      )
      {
        console.log( `ERROR: duplicate doc_n: ${atdoc_o.doc_n}`)
      }
      doc_a
        .add
        (
          atdoc_o
            .doc_n
        )
      
      json_a
        .push
        (
          [
            atdoc_o
              .doc_n,
            atdoc_o
              .doc_s,
            atdoc_o
              .topics_s
              .split( WORDS_DELIM_s ),
            atdoc_o
              .words_s
              .split( WORDS_DELIM_s )
          ]
        )

      text_s +=
        `${atdoc_o.doc_s}${WORDS_DELIM_s}${atdoc_o.words_s}${FILE_DELIM_s}`
    }
  }
  FIL_o.writeFile( DOCS_TOPICS_s, JSON.stringify( json_a ), error_o => F_o.writeFile__v( error_o) )
  FIL_o.writeFile( DOCS_WORDS_s, text_s, error_o => F_o.writeFile__v( error_o) )
  console.log( `-----------------\nLast doc_n: ${index_n}\n-----------------`)
}



void function
()
{
  EXT_o.file_a =        //: prepare
    require( 'klaw-sync' )
    (
      C_o.CONTENT_PATH_s,    //: all Mardown files,
      {
        nodir: true,
        depthLimit: 2
      }
    )
  if ( EXT_o.file_a )
  {
    EXT_o.count_n =
      EXT_o
        .file_a
        .length            //;console.table(EXT_o.file_a)
    let index_a = []
    EXT_o
      .file_a
      .forEach
      (
        file_o =>
        {
          const source_s =
            FIL_o
              .readFileSync
              (
                file_o.path,
                {
                  encoding:'utf-8',
                  flag:'r'
                }
              )
          index_a
            .push
            (
              EXT_o
                .docs__o( source_s )    //: build document
            )
        }
      )
    EXT_o
      .toIndex__v( index_a )
  }
  //->
  ;console.log( `${EXT_o.count_n} Markdown files processed` )
} ()
