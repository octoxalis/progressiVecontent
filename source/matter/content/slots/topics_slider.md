---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/topics_slider.html',
  tags: [ 'notag' ],

  doc_n: 5,
  slot_s: 'topics_slider',
  title_s: 'ProgressiVecontent topics slider',
  topics_a: [ 'user interface', 'user experience' ],
  words_a: [ 'slide list' ],
}
---
:topics slider:
{{ A_o.NAME_s }} ~°topics slider°~ is an inline ~°horizontal slider°~ located inside and at the top of the ~°contents component°~, under the ~°page slider°~.
It displays the full ~°list of topics°~ defined for the site.
~°Acting on°~ the slider ~°front slide°~ refreshes the ~°components graph°~, ~°highlighting°~ all the nodes/circles related to the front topic
{% _note_txt  %}
but it **doesn't scroll the page** as does the page slider
{% end_note_txt %}
.
