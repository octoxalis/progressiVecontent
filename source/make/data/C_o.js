/*
 * COMPONENTS constants for templates
 */

module.exports =
{
  //=== HEAD ===
  description_o:                        //: descriptions for SEO
  {
    DESCRIPT_s: 'parceled content architecture for instant loading website',
    GLOBAL_s:   'website architecture,static site generator,parceled,modular,content',
  },
  INLINE_s:   'inline_style',



  //=== HEADERS ===
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


  
  //=== DIR ===
  SYS_s:        'sys',        //: system slots dir
  SLOTS_s:      'slots',      //: Eleventy tag for SLOTS_s collection
  DOCS_s:       'contents',   //: content slot_s
  DOCS_n:       -1,           //: content slot_n
  SKIN_s:       'skin',       //: skin slot_s
  SKIN_n:       -2,           //: skin slot_n
  BOOKMARK_s:   'bookmark',   //: bookmark slot_s
  BOOKMARK_n:   -3,           //: bookmark slot_n

  SHARE_DIR_s:   'sys/',
  MEDIA_PATH_s:  'assets/media/',
  JSON_PATH_s:   'assets/data/json/',
  
  URL_S_s:    '?s=/',       //: url search prefix, e.g. '{{U_o.url_s}}{{C_o.URL_S_s}}{{C_o.SLOTS_s}}/sl

  KEY_n:      1,            //: service worker key
  


  //=== TAG MARKUP ===
  tag_o:
  {
    TAG_s:    'TAG',         //: undefined tag identifier
    ATAG_s:   '~',           //: tag ante char
    PTAG_s:   '°',           //: tag post char
    REGEX_s:  'a-zA-Z0-9_',  //: tag allowed chars
    DATA_s:   'data-tag',    //: HTML tag element attribute
  }
,



  //=== JS ===
  msg_o:    //: owrker message types
  {
    ROUTE_s:    'ROUTE',
    REGISTER_s: 'REGISTER',
    LOAD_s:     'LOAD',
    RESTORE_s:  'RESTORE',
    REMOVE_s:   'REMOVE',
    CACHE_s:    'CACHE',
}
,



  //=== HTML ===
  SECTION_BTN_TAG_s:  'b',
  CLOSE_ICON_TAG_s:   'em',
  NOTE_TAG_s:         'ins',
  NOTE_CONTENT_TAG_s: 'i',
  IMG_UNFOLD_TAG_s:   'i',
  NOTE_LINK_TAG_s:    'em',
  MARK_DATA_TAG_s:    'b',



  //=== CSS constants to avoid calc() ===  
  HUE_SET_n: 1,         //: allow visitor color palette setting
  
  HUE_P_n:  190,        //: theme PRIMARY color in range [0...359]
  HUE_S_n: -10,         //: theme SECONDARY color offset from primary color
  HUE_H_n:  20,         //: theme HIGHLIGHT color offset from primary color
  HUE_D_n: -20,         //: theme DECORATIVE color offset from primary color
  HUE_L_n:  10,         //: theme LINK color offset from primary color

  HUE_ROTATE_n: 0,      //: hue deviation for hover effect

  SAT_UNIT_n:     11,   //: saturation unit -> [ 6 17 28 39 50 61 72 83 96 ]
  SAT_BASE_n:     50,
  LUM_MODE_n:     1,    //: luminosity mode: 1 (light) || -1 (dark)
  LUM_BASE_n:     50,
  LUM_CONTRAST_n: 45,   //: luminosity contrast in range [30...49] (30 is less contrast than 49)
                        //: see https://www.w3.org/TR/WCAG20/ §1.4.1 compliance


  BODY_WIDTH_n:  80,     //: percentage of document width
  BODY_MARGIN_n: 10,     //: (100 - 80) * .5
  LINE_WIDTH_n:  52,     //: in ch unit

  BASE_U_n:     20,      //: font base unit
  BASE_MIN_n:   1.5,
  SCREEN_MIN_n: 400,
  SCREEN_MAX_n: 1600,


  //=== CSS ===
  BORDER_1: '.2em',

  BOX_SHADOW: `0 1px 1px var(--c_shadow_ne), 0 2px 2px var(--c_shadow_ne), 0 4px 4px var(--c_shadow_ne)`,

  BOX_OVERLAY: '12px 12px 32px 100vmax var(--c_shadow_lo)',

  SAT_FX_s:   'saturate(2) brightness(2)',
  BG_FX_s:    'var(--c_highlight_hi)',

  FULL_WIDTH:  '100vw',
  HALF_WIDTH:  '50vw',
  FULL_HEIGHT: '100vh',

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

  STD_HEIGHT:    5,
  BUTTON_HEIGHT: 5 + 'em',
  SLIDER_HEIGHT: 5 + 'em',
  IMG_UNFOLD:    5 + 'em',

  FONT_BODY: `'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif`,
  FONT_MONO: `'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace`,

}
