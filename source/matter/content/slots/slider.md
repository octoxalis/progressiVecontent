---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/slider.html',
  tags: [ 'notag' ],

  doc_n: 512,    //: UI_s
  doc_s: 'slider',
  title_s: 'ProgressiVecontent slider',
  topics_a: [ 'user interface', 'user experience' ],
  words_a: [ 'slide list', 'scroll forward', 'scroll backward' ],
}
---
:slider:
A ~°slider°~ is a usefull ~°user interface°~ ~°component°~ displaying a ~°list of items°~
{% _note_txt  %}
or only a part of, when the list is too long to fit on the main dimension
{% end_note_txt %}
in one of the two screen dimensions: vertical or horizontal
{% _note_txt %}
the page and topics sliders used here are horizontal
{% end_note_txt %}
.

Selecting any of the displayed slides brings it in the front, i.e. focused in the center of the screen
{% _note_txt %}
the associated ~°zoom effect°~ makes the selected ~°front slide°~ appear <q>in front</q> and outlined
{% end_note_txt %}
. The front slide always triggers a subsequent action when it is acted on
{% _note_txt %}
for instance by a ~°mouse click°~ or a ~°finger tap°~
{% end_note_txt %}
.

Sliders have, at their foot, a ~°spot indicator°~ to visually locate the ~°slide position°~ in the full list.
Acting on these indicators spots the respective slide on the front. Slides can also be directly scrolled forward or backward
{% _note_txt %}
for instance left or right
{% end_note_txt %}
.


## Page slider

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


## Topics slider

{{ A_o.NAME_s }} ~°topics slider°~ is an inline ~°horizontal slider°~ located inside and at the top of the ~°contents component°~, under the ~°page slider°~.
It displays the full ~°list of topics°~ defined for the site.
~°Acting on°~ the slider ~°front slide°~ refreshes the ~°components graph°~, ~°highlighting°~ all the nodes/circles related to the front topic
{% _note_txt  %}
but it __doesn't scroll the page__ as does the page slider
{% end_note_txt %}
.
