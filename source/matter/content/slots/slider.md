---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/slider.html',
  tags: [ 'notag' ],

  doc_n: 3,
  slot_s: 'slider',
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
