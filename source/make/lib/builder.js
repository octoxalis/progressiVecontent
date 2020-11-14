const FIL_o = require('fs-extra')
const GIT_o = require( './git.js' )
const HEAD_o = require( './header.js' )
const CSP_o = require( './csp.js' )
const WORD_o = require( './words.js' )
const TOP_o = require( './topics.js' )

const TEM_o =
{
  file_a:   null,
  docs_a:   new Map(),
  count_n:   0,
  current_n: 0,
  
  
  
  buildStart__v
  (
    data_o
  )
  {
    console.log( `${TEM_o.count_n} Markdown files to process` )
  }
,

  
  
  buildEnd__v
  (
    end_s,
    data_o
  )
  {
    //!!! TEMPORARY TOP_o
    //!!! TEMPORARY   .write__v()
    console.log( '!!!! TOPICS TEMPORARY DISABLED' )
    HEAD_o
      .write__v( `${CSP_o.directive__s()}\n${HEAD_o.directive__s()}\n` )
    GIT_o
      .write__v()
  }
,

  
  
  templateStart__s
  (
    input_s,
    data_o
  )
  {
    if ( data_o.issue_n === -1 )
    {
      GIT_o
        .create__n( data_o.permalink )
        .then( issue_n =>  GIT_o.add__v( data_o.permalink, issue_n ) )
    }
    //:--??????????????????
    let slash_n = data_o.permalink.lastIndexOf( '/')
    const id_s = data_o.permalink.slice( slash_n + 1, '.html'.length * -1 )
    const path_s = ( slash_n < 0 ) ? '' : data_o.permalink.slice( 0, slash_n )
    TEM_o.docs_a.set( id_s, { path_s: path_s } )
    let start_s = input_s
    //... what else?
    return start_s
  }
,
  
  
  templateEnd__s
  (
    input_s,
    data_o
  )
  {
    HEAD_o
      .add__v( data_o )
    CSP_o
      .add__s( input_s )
    return WORD_o
      .tag__s( input_s )
  }
,

  
  
  headEnd__s
  (
    input_s,
    data_o
  )
  {
    let end_s = input_s
    //... what else?
    return end_s
  }
,

  
  
  bodyEnd__s
  (
    input_s,
    data_o
  )
  {
    let body_s = input_s
    //?? body_s = SLOTS_o.reload__s( body_s )
    return body_s
  }
,



}




module.exports =
{
  start__s
  (
    input_s,
    data_o
  )
  {
    if ( TEM_o.current_n === 0 && TEM_o.file_a ) TEM_o.buildStart__v( data_o )
    let start_s = TEM_o.templateStart__s( input_s, data_o )
    return start_s
  }
,



  end__s
  (
    input_s,
    data_o
  )
  {
    ++TEM_o.current_n    //;console.log( `${TEM_o.current_n} / ${TEM_o.count_n}`)
    let end_s = TEM_o.templateEnd__s( input_s, data_o )
    if ( TEM_o.file_a && TEM_o.current_n === TEM_o.count_n - 1 ) TEM_o.buildEnd__v( end_s, data_o )
    FIL_o.writeFile( `make/index/output/docs_paths.json`, JSON.stringify([...TEM_o.docs_a]), error_o=>{/*console.log( error_o )*/})
    return end_s
  }
,



  head__s
  (
    input_s,
    data_o
  )
  { return TEM_o.headEnd__s( input_s, data_o ) }
,



  body__s
  (
    input_s,
    data_o
  )
  { return TEM_o.bodyEnd__s( input_s, data_o ) }
,



}



/**
 * List Markdown files to process
 * Keep 2 levels depth only for content slots
 */
//==============
void function ()
//==============
{
  const MD_DIR_s = './matter/content/'    //: all Mardown files
  const DEPTH_n  = 2
  TEM_o
    .file_a = require( 'klaw-sync' )( MD_DIR_s, { nodir: true, depthLimit: DEPTH_n } )
  if ( TEM_o.file_a )
  {
    TEM_o
      .count_n = TEM_o.file_a.length
    //; console.table(TEM_o.file_a)
  }
} ()
