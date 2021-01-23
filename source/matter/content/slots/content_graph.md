---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/content_graph.html',
  tags: [ 'notag' ],

  doc_n: 1,    //: CONCEPT_s
  title_s: 'content graph',
  topics_a: [ 'web site architecture', 'fondamentals', 'navigation', 'page composition' ],
  words_a: [ 'graph', 'dynamic page', 'fast loading' ],
}
---
:content as a graph:
__{{ A_o.NAME_s }}__ ~°site°~ represents all its ~°content°~ as a ~°graph°~ where every ~°content component°~ is ~°displayed°~ as a ~°colored circle°~.
Every ~°circle°~ give access to the ~°distinctive words°~ and ~°expressions°~ related to this ~°content unit°~.
Any ~°item°~ of this ~°list°~ triggers the ~°associated content component°~, which is ~°integrated°~ in the ~°current page composition°~.


__{{ A_o.NAME_s }}__ contents graph is the core of the site, representing all its ~°content components°~.
Technically, it is an ~°oriented graph°~ with ~°labelled edges°~
{% _note_txt  %}
for clarity, the edges are not represented
{% end_note_txt %}
in which each ~°component°~ is drawn as a ~°circle°~
{% _note_txt  %}
it's a graph _node_
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


~°Acting on°~ that circle pops up the full ~°list°~ of topics related to that ~°content component°~, in a ~°dialog box°~ located under the graph.
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


Acting once on any topic of the list will load the content component associated with the node.
{% _note_txt  %}
any topic in the list can be activated to load the component
{% end_note_txt %}
.

Acting on the node a second time, or on the ~°close box icon°~, will close the list, without ~°loading°~ the related ~°component°~.
