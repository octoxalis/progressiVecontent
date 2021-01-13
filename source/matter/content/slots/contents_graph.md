---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/contents_graph.html',
  tags: [ 'notag' ],

  rank_n: 6,
  slot_s: 'contents_graph',
  title_s: 'ProgressiVecontent contents graph',
  topics_a: [ 'user interface', 'user experience' ],
  words_a: [ 'contents graph' ],
}
---
:contents graph:
__{{ A_o.NAME_s }}__ contents graph is the core of the site, representing all its ~°content components°~.
Technically, it is an ~°oriented graph°~ with ~°labelled edges°~
{% _note_txt  %}
for clarity, the edges are not represented
{% end_note_txt %}
in which each ~°component°~ is represented by a ~°circle°~
{% _note_txt  %}
actually, it's a graph node
{% end_note_txt %}
.
_Contents graph_, the ~°root content component°~ including this ~°graph°~, is the ~°upper left circle°~, filled by a different ~°highlighted color°~.

The ~°nodes°~ related to the ~°front slide°~ ~°topic°~ are displayed in a ~°different color°~ tone
{% _note_txt  %}
~°darker°~ in ~°light mode°~, ~°lighter°~ in ~°dark mode°~
{% end_note_txt %}
to indicate their relation with that topic
{% _note_txt  %}
which means that their content is <q>~°supervised°~</q> by that specific topic
{% end_note_txt %}
.


~°Acting on°~ that circle displays a subsequent full ~°list°~ of the topics related to that ~°content component°~, in a ~°dialog box°~ located under the graph.
{% _note_txt  %}
if the lower part of the graph protrudes from the bottom edge of the screen, ~°scrolling downwards°~ will unveil it
{% end_note_txt %}
.
The currently ~°selected node/circle°~ is outlined even if the related content component has not been loaded.
the first initial content component, which is the _contents graph_, is always loaded
{% _note_txt  %}
it can't be removed from the page, otherwise no further content would be accessible
{% end_note_txt %}
.


The subsequent dialog box under the _contents graph_ lists the ~°topics correlated°~ to the selected content component
{% _note_txt  %}
this allows to ~°branch off°~ the path followed from that component
{% end_note_txt %}
.
Acting on any topic of the list will load the content component associated with the node/circle.
{% _note_txt  %}
any topic in the list can be activated to load the component
{% end_note_txt %}
.
Acting on the node/circle a second time, or on the ~°close box icon°~, will not trigger the related ~°component loading°~.
