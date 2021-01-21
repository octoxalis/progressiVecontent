---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/introduction.html',
  tags: [ 'notag' ],

  doc_n: 0,    //: CONCEPT_s
  doc_s: 'introduction',
  title_s: 'About progressiVecontent',
  topics_a: [ 'web site architecture', 'fondamentals' ],
  words_a: [ 'content-on-request', 'machine learning', 'lazy loading', 'speed loading' ],
}
---
:introduction:
__{{ A_o.NAME_s }}__ is an unusual site. As its name imply, its ~°architecture°~ is based on the ~°concept°~ of ~°progressive-content°~, where content drives both ~°flow control°~ and ~°user interface°~.
This innovative architecture takes advantage of the ~°most recent°~ ~°artificial intelligence°~ ~°software developments°~
{% _note_txt  %}
 ~°machine learning°~ ~°natural language processing°~ ~°algorithms°~ are used for ~°content analysis°~
{% end_note_txt %} .


The second unusual aspect of __{{ A_o.NAME_s }}__ is that its content is __~°dynamic°~__.
Unlike a usual ~°web page°~ where whole content is loaded at once,
here, each visitor composes a ~°personal page°~ by successively ~°loading°~ ~°content modules°~ ~°related°~ to the research theme.
At any time, he can ~°add°~, ~°reorder°~, or even ~°delete°~, ~°modules°~ that correspond to this theme,
so as to build a ~°customized page°~ he can later refer to with a ~°bookmark°~, while retaining the possibility to develop it further, as he sees fit.


These _à la carte_ functionalities have major incidence on ~°speed°~ and ~°efficiency°~.
Instead of waiting a few seconds to have a ~°full page load°~, ~°parceled content°~ needs only a fraction of second, broken up in a few occurences, temporally spaced.
Fast <q>~°lazy loading°~</q> rules the ~°flow°~ because content is served only when needed, in easily grasped ~°cognitive segments°~: <q>~°content-on-request°~</q>.


This site fully explores this concept and deploys an experimental ~°implementation°~, built only using the fondamental ~°Web technologies°~:
~°HTML5°~, ~°JavaScript°~ and ~°CSS°~{% _note_txt  %}
~°no framework°~ inside! {{ A_o.NAME_s }} __is__ the _framework_
{% end_note_txt %}
, unveiling usefull ~°code bits°~ as __~°imarq°~__ ~°IIIF compatible images-on-request°~, __~°smartReg°~__ ~°templated RegExp°~ or __~°ilite°~__ ~°interactive code highlighting°~.


{% _ior_path '1585_coster-₀_₀-1625_youngwoman/full/max/0/jpg' %}
Adam de Coster [1586-1643]
Young women holding a distaff before a lit candle
{% end_ior_path %}


{% _ior_spot '1585_coster-₀_₀-1625_youngwoman' %}
color full  == quality:color
gray medium == size:400,/quality:gray
gray small  == size:100,/quality:gray
{% end_ior_spot %}
