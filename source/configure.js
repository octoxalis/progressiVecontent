/*
 * Site globals for installation
 */

 const URL_o =
 {
  URL_s:   'https://progressivecontent.netlify.app/',  //: CDN deployer
  LOCAL_s: 'http://127.0.0.1:8080/',          //: local address and port for development
  //--LOCAL_s: 'http://192.168.1.36:8080/',       //: local address and port for development
  URL_S_s: '?s=/',                            //: url search prefix, e.g. '{{U_o.url_s}}{{A_o.URL_S_s}}{{A_o.SLOTS_s}}/slot_s.html'

  SYS_s:   'sys',                             //: system slots dir
  SLOTS_s: 'slots',                           //: Eleventy tag for SLOTS_s collection
  DOCS_s:  'contents',                        //: content slot
  SKIN_s:  'skin',                            //: skin slot
  BOOKMARK_s: 'bookmark',                     //: bookmark slot
  }



module.exports =
{
  AUTHOR_s:     'octoxalis',             //: github name
  EMAIL_s:      'octoxalis@gmail.com',   //: github e-mail
  ID_s:         'progressiVecontent',    //: github repository
  KEY_n:         1,                      //: service worker key
  NAME_s:       'progressiVecontent',    //: site name
  LANGUAGE_s:   'en',                    //: site language

  URL_s:         URL_o.URL_s,
  LOCAL_s:       URL_o.LOCAL_s,
  SYS_s:         URL_o.SYS_s,
  SLOTS_s:       URL_o.SLOTS_s,
  DOCS_s:        URL_o.DOCS_s,
  SKIN_s:        URL_o.SKIN_s,
  BOOKMARK_s:    URL_o.BOOKMARK_s,
  URL_S_s:       URL_o.URL_S_s,
  
  description_o:                        //: descriptions for SEO
  {
    DESCRIPT_s: 'Innovative website architecture for partitioned content',
    GLOBAL_s:   'website architecture,static site generator,partitioned,modular,content',
  },


  csp_o:
  {
    HEAD_o:  //!!! DON'T change order
    {
      DEFAULT_SRC:     '',
      BASE_URI:        '',
      FONT_SRC:        '',
      CONNECT_SRC:     '',
      PREFETCH_SRC:    '',  //: requires 'enable-experimental-web-platform-features' flag
      IMG_SRC:         '',
      FRAME_SRC:       '',
      FRAME_ANCESTORS: '',
      FORM_ACTION:     '',
      MANIFEST_SRC:    '',
      SCRIPT_SRC_ELEM: '',
      SCRIPT_SRC:      '',
      OBJECT_SRC:      '',
      STYLE_SRC:       `'unsafe-inline'`,  //: for browser not accepting sha-256 (Firefox-78!)
    },
  },

  tag_o:
  {
    TAG_s:    'TAG',         //: undefined tag identifier
    ATAG_s:   '~',           //: tag ante char
    PTAG_s:   '°',           //: tag post char
    REGEXP_s: 'a-zA-Z0-9_',  //: tags allowed chars
    MARK_s:   'mark',        //: HTML tag element
    DATA_s:   'data-tag',    //: HTML tag element attribute
  },

  INLINE_s:   'inline_style',
  
  HUE_SET_n: 1,         //: allow visitor color palette setting
  
  HUE_P_n:  220,        //: theme PRIMARY color in range [0...359]
  HUE_S_n: -10,         //: theme SECONDARY color offset from primary color
  HUE_H_n:  20,         //: theme HIGHLIGHT color offset from primary color
  HUE_D_n: -20,         //: theme DECORATIVE color offset from primary color
  HUE_L_n:  10,         //: theme LINK color offset from primary color

  SAT_UNIT_n:     11,   //: saturation unit -> [ 6 17 28 39 50 61 72 83 96 ]
  SAT_BASE_n:     50,
  LUM_MODE_n:     1,    //: luminosity mode: 1 (light) || -1 (dark)
  LUM_BASE_n:     50,
  LUM_CONTRAST_n: 45,   //: luminosity contrast in range [30...49] (30 is less contrast than 49)
                        //: see https://www.w3.org/TR/WCAG20/ §1.4.1 compliance

  HUE_ROTATE_n: 0,      //: hue deviation for hover effect


  BODY_WIDTH_n:  80,     //: percentage of document width
  BODY_MARGIN_n: 10,     //: (100 - 80) * .5
  LINE_WIDTH_n:  52,     //: in ch unit


  //.........................................................
  BORDER_1: '.2em',

  BOX_SHADOW:
    `0 1px 1px var(--c_shadow_ne), 
     0 2px 2px var(--c_shadow_ne), 
     0 4px 4px var(--c_shadow_ne)`,

  BOX_OVERLAY: '12px 12px 32px 100vmax var(--c_shadow_lo)',

/*
  INVERT_FILTER:
    `invert(100%)
     hue-rotate(${C_o.HUE_ROTATE_n}deg) ??????????????????
     brightness(8);`,
     */

  SATURATE_FILTER: 'saturate(3) brightness(2);',  //??????????????


  FULL_WIDTH:  '100vw',
  HALF_WIDTH:  '50vw',
  FULL_HEIGHT: '100vh',

  INITIAL_Z: 2,
  SLIDER_Z:  1,  //??????????

  base_u:     8,
  base_min:   1.7,
  screen_min: 400,
  screen_max: 1600,


  PAD_1:  .25 * 1 + 'rem',
  PAD_2:  .25 * 2 + 'rem',
  PAD_4:  .25 * 4 + 'rem',
  PAD_6:  .25 * 6 + 'rem',
  PAD_8:  .25 * 8 + 'rem',
  PAD_12: .25 * 12 + 'rem',  //?????????????????
  PAD_16: .25 * 16 + 'rem',  //?????????????????


  INITIAL_TURN: -.025 + 'turn',


  BOX_OVERLAY: `12px 12px 32px 100vmax var(--c_shadow_lo)`,

  LOGO_HEIGHT: 'clamp( 12vh, 16vh, 20vh )',

  SLIDER_HEIGHT: 5 + 'em',
  BUTTON_HEIGHT: 5 + 'em',
  IMG_UNFOLD:    5 + 'em',

  FONT_BODY: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Helvetica Neue, 'Fira Sans', sans-serif`,
  FONT_MONO: `system-ui, -apple-system, BlinkMacSystemFont, 'Courier New', Courier, 'Ubuntu Mono', 'Liberation Mono', monospace`,

}

