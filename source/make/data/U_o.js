// === = U_o.js === //

const CONF_o = require( '../../configure.js' )



const U_o =
{
  //~~  dev_b: true,   //: development/production switch
 dev_b: false,  //!!!! REMEMBER TO ADJUST SERVICE_PATH_s & SERVICE_SCOPE_s
  url_s: null,

  DEV_s: CONF_o.LOCAL_s,
  PRO_s: CONF_o.URL_s,

  GIT_s: `https://github.com/${CONF_o.AUTHOR_s}/${CONF_o.ID_s}/`,
  GIT_SRC_s: `https://github.com/${CONF_o.AUTHOR_s}/${CONF_o.ID_s}/blob/master/`,
  GIT_ISSUES_s: `https://github.com/${CONF_o.AUTHOR_s}/${CONF_o.ID_s}/issues/`,
  //xx TWI_s: `https://twitter.com/${CONF_o.ID_s}/`,
  //XX RSS_s: `${CONF_o.URL_s}feed.xml`,
  SERVICE_PATH_s: 'service_worker.min.js',    //: WITHOUT Service-Worker-Allowed HTTP header 

  //-- SERVICE_PATH_s: 'assets/scripts/js/service_worker.min.js',    //: NEEDS Service-Worker-Allowed HTTP header
  //-- SERVICE_SCOPE_s: '../../../',  //: assets/scripts/js/
  SERVICE_SCOPE_s: '/',                 //: site root

  HOME_s:    `[Home page]: ${CONF_o.URL_s}`,
  NETLIFY_s: `https://www.netlify.com`,
  NODE_s :   `[Node.js]: https://nodejs.org`,
}



void function ()
{
  U_o.url_s = U_o[U_o.dev_b === true ? 'DEV_s' : 'PRO_s']
  console.log( `Site URL: ${U_o.url_s}` )
} ()

module.exports = U_o
