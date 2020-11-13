require( 'dotenv' ).config( { path: '../.env' } )
const FETCH_o = require( 'node-fetch' )
const FIL_o    = require( 'fs' )
const A_o     = require( '../../matter/assets/scripts/js/lib/A_o.js' )
const U_o     = require( '../../matter/assets/scripts/js/lib/U_o.js' )

const GIT_API_s    = 'https://api.github.com/'
const GIT_ISSUES_s = `${GIT_API_s}repos/${A_o.AUTHOR_s}/${A_o.ID_s}/issues`
const GIT_LABEL_s  = 'comment'
const WRITE_TIMEOUT_n = 1000


GIT_o =
{

  issue_a: new Map(),
  body_o:    //: Template for create__n
  {
    labels: [ `${GIT_LABEL_s}` ],
    assignees: [ `${A_o.AUTHOR_s}` ],
  }
,



}


module.exports =
{
  add__v
  (
    permalink_s,
    issue_n
  )
  { return GIT_o.issue_a.set( permalink_s, issue_n ) }
,



  create__n:
  async (
    permalink_s
  ) =>
  {
    const page_s = permalink_s.slice( permalink_s.lastIndexOf( '/') + 1, '.html'.length * -1 )
    const body_o = Object.assign( GIT_o.body_o,
      {
        title: `#${page_s}`,
        body: `### Your thoughts about the [${page_s}](${U_o.url_s}${permalink_s}) page are welcome!`
      } )
    const fetch_o =
    {
      method: 'POST',
      body: JSON.stringify( body_o ),
      headers: 
      {
        'Content-Type': 'application/json',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    //> TEMPORARY ========================================
    if ( U_o.url_s === U_o.DEV_s ) return void console.log( 'SKIP issue creation' )
    //> END TEMPORARY ========================================

    const issue_o = await FETCH_o( GIT_ISSUES_s, fetch_o )
    const json_o = await issue_o.json()
    const msg_s =
`
-------------
Issue created
-------------
  page: '${page_s}'
  number: ${json_o.number}`
    console.log( msg_s )
    return json_o.number
  }
,



  write__v
  ()
  {
    GIT_o.issue_a.length && setTimeout( () => console.table( GIT_o.issue_a ), WRITE_TIMEOUT_n )
  }
,



}