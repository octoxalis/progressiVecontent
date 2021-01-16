---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/page_slider.html',
  tags: [ 'notag' ],

  doc_n: 4,
  doc_s: 'page_slider',
  title_s: 'ProgressiVecontent page slider',
  topics_a: [ 'user interface', 'user experience' ],
  words_a: [ 'slide list' ],
}
---
:page slider:
{{ A_o.NAME_s }} ~°page slider°~ is a sticky ~°horizontal slider°~ located at the very top of the ~°page°~.
It lists the ~°content components°~ that have been loaded
{% _note_txt  %}
~°tools components°~ are excluded: ~°skin°~, ~°bookmark°~ component, etc.
{% end_note_txt %}
, the first one beeing the _~°content graph°~_, which is automacally loaded when ~°first visiting°~ the site.

Page slider ~°indicators°~ have a ~°width°~ in proportion with the number of loaded components: wider for a small number of components than for a high number.

~°Acting on°~ the ~°front slide°~ or any indicator ~°scrolls°~ the page
{% _note_txt  %}
either ~°upwards°~ or ~°downwards°~
{% end_note_txt %}
and brings the respective content component in sight.
When acting on an indicator, if its associated ~°slide°~ is already the front slide, the ~°slide list°~ is ~°retracted°~ to ~°free up°~ its place for the benefit of the ~°content area°~, unveiling the {{ A_o.NAME_s }} ~°logo°~.
