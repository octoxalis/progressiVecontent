const DOCS_o = require( './docs.js' )



const TOP_o =
{
  script_s: `make/index/PLDA_model.py`,   //: Partially topic LDA
  docs_topics_json_s: 'make/index/input/docs_topics_words.json',
  
  
  
  parse__v
  ()
  { DOCS_o.parse__v( TOP_o.docs_topics_json_s ) }
,



}



module.exports =
{
  write__v
  ()
  {
    //return  //:!!!!!!!!!!!  TEMPORARY !!!!!!!!!!!!!!!!
    const  { spawn } =
      require( 'child_process' )
    const topic_o = spawn( 'python3', [TOP_o.script_s] )
    topic_o
      .stdout.on('data', data => console.log(`STDOUT:\n${data}`) )    //: child process exit code
    topic_o
      .stderr.on('data', data => console.error(`STDERR:\n${data}`) )
    topic_o
      .on('close', code_n => console.log(`-- Python child process exited with code ${code_n}`) )
    //----
    setTimeout( TOP_o.parse__v, 2000 )
  }
,



}