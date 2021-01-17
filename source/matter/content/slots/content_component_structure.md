---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/content_component_structure.html',
  tags: [ 'notag' ],

  doc_n: 1024,    //: IMPLEMENT_s
  doc_s: 'content_component_structure',
  title_s: 'content component structure',
  topics_a: [ 'web site architecture', 'fondamentals', 'content composition' ],
  words_a: [ 'graph', 'dynamic page' ],
}
---
:content component structure:

A content component is the building block of __{{ A_o.NAME_s }}__. It's totally autonomous and can easily be read outside the site environment, even if will not be styled according to the cascading style sheet it follows when it is integrated.


In __{{ A_o.NAME_s }}__ ~°development environment°~, it is written in ~°Markdown°~ format, but any other format yielding an ~°HTML5°~ file and providing the mandatory data fields would be acceptable.
For instance, the original Markdown file of the _Introduction_ content component follows.


{% set _code_01 %}
{% code "matter/content/slots/introduction.md#" %}
{% endset %}

{% _code_block %}
    title_s: 'source/matter/content/slots/introduction.md',
    lang_s: 'njk',
[//]:#(_code_block)
{{ _code_01 }}
{% end_code_block %}


And the following corresponding HTML file is automatically generated.

{% set _code_02 %}
{% code "../site/slots/introduction.html#" %}
{% endset %}

{% _code_block %}
    title_s: 'site/slots/introduction.html',
    lang_s: 'html',
[//]:#(_code_block)
{{ _code_02 }}
{% end_code_block %}


This HTML file is minified!