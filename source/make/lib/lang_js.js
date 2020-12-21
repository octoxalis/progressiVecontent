const JS_o =
  new Object( null )



//=== OPERATOR ===//
JS_o
  .operator_a =
    [
      '\\+{1,2}',
      '\\-{1,2}',
      '\\*={0,1}',
      '\\/={0,1}',
      '<={0,1}',
      '>={0,1}',
      '&{1,2}',
      '\\|{1,2}',
      //-- '\\^',
      '={1,3}',
      '!={0,2}',
      '~={0,1}',
      '%={0,1}',
      '=>',
    
      '\\[',      //: GROUP
      '\\]',
      '\\{',
      '\\}',
    
      ';',        //: PUNCTUATION
      ',',
      '\\.\{3\}',
      '\\?{1,2}',
      ':',
    
    ]




//=== RESERVED ===//
JS_o
  .reserved_a =
    [
      //--'abstract',
      //--'arguments',
      //--'debugger',
      //--'delete',
      //--'eval',
      'export',
      //--'extends',
      //--'final',
      'function',
      //--'implements',
      'import',
      //--'interface',
      'new',
      //--'package',
      //--'private',
      //--'protected',
      //--'public',
      //--'super',
      //--'synchronized',
      'this',
      //--'throw',
      //--'throws',
      //--'transient',
      'void',
      //--'volatile',
    ]



//=== LOOP ===//
JS_o
  .loop_a =
    [
      'continue',
      'do',
      'for',
      'forEach',
      'in',
      'of',
      'while',
    ]



//=== CONTROL ===//
JS_o
  .control_a =
    [
      'async',
      'await',
      'break',
      'case',
      'catch',
      'default',
      'else',
      //--'finally',
      //--'goto',
      'if',
      'return',
      'switch',
      'try',
      'with',
      'yield'
    ]



//=== TYPE ===//
JS_o
  .type_a =
    [
      //'byte',
      'char',
      'class',
      'double',
      'enum',
      'false',
      'float',
      'instanceof',
      'int',
      'long',
      //--'native',
      'null',
      //'short',
      'static',
      'true',
      'typeof',
    
      "Array",
      "Boolean",
      "Date",
      "Infinity",
      "NaN",
      "Number",
      "Object",
      "String",
      "undefined",
    ]



//=== DECLARATION ===//
JS_o
  .declare_a =
    [
      'const',
      'let',
      'var',
    ]



//=== PROPERTY ===//
JS_o
  .property_a =
    [
      //--"hasOwnProperty",
      //--"isFinite",
      //--"isNaN",
      //--"isPrototypeOf",
      "length",
      "Math",
      //--"name",
      //--"prototype",
      //--"toString",
      //--"valueOf"
    ]



JS_o
  .lang_o =    //: language API
  {
    regex_o:
      {
        //=== aside ===
        line_re:  /((?:^|\s)\/\/(.+?)$)/gms,   //: //Comment
        block_re: /(\/\*.*?\*\/)/gms,          //: /*Comment*/
        reg_re:   /(\/.+\/[gimsu]+)/g,         //: RegExp
        lit_re:   /(`[^\u0060]*`)/gms,         //: `template String`
        apos_re:  /('[^\u0027]*')/g,           //: 'String'
        quot_re:  /("[^\u0022]*")/g,           //: "String"
        //=== step ===
        res_a:   JS_o.reserved_a,
        loop_a:  JS_o.loop_a,
        cont_a:  JS_o.control_a,
        type_a:  JS_o.type_a,
        dec_a:   JS_o.declare_a,
        prop_a:  JS_o.property_a,
        group_a: JS_o.group_a,
        punct_a: JS_o.punctuation_a,
        op_a:    JS_o.operator_a,
      
        num_re:  /\b([-+]?[0-9]*\.?[0-9]+)\b/g,        //: Number
        //: user defined
        temp_re: /(\{\{[^\}]+?\}\})/gms,               //: NJK template variable
        uv_re:   /\b(\w+_{1,2}[abcefnorsUvY]e?)\b/g,   //: user variable (e.g. 'name_s')
        log_re:  /(console\s*\.[^(]+)/gms,             //: console
        //=== post ===
      }
    ,


    aside_a:    //!!! KEEP ORDER
      [
        'line',
        'block',
        'reg',
        'lit',    //--> callback
        'apos',
        'quot',
      ]
    ,


    ante_a:    //!!! KEEP ORDER
      [
        'op',
        'res_b',    //: see I_o.BOUND_s
        'loop_b',
        'cont_b',
        'type_b',
        'dec_b',
        'prop_b',
        'temp',
        'log',
        'num',
      ]
    ,



    post_a:    //!!! KEEP ORDER
      []
    ,


    hiline_a:
      []                //: 1-indexed (line index)
    ,



    // === CALLBACK ===
    lit__s:
    (
      code_s
    ) =>
    {
      let lit_s = ''
      code_s
        .split
        (
          /(\$\{[^\}]+\})/gms
        )
        .forEach
        (
          split_s =>
          {
            lit_s +=
              split_s
                .charAt( 0 ) === '\u0024'
                  ?
                    `<${I_o.TAG_s} class="i_temp">${split_s}</${I_o.TAG_s}>`
                  :
                    split_s
          }
        )
        return lit_s
    }
    ,

  }



  module.exports = JS_o
