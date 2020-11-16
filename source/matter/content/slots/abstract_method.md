---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/abstract_method.html',
  rank_n: 1,
  tags: [ 'notag' ],
  title_s: 'abstract method',
  labels_a: ['object-oriented programming','prototype-based programming','subroutines','binary','digital electronics'],
}
---
:abstract method:
One with only a ~°signature°~ and no ~°implementation body°~. It is often used to specify that a subclass must provide an implementation of the method. Abstract methods are used to specify ~°interfaces°~ in some computer languages.


{% set _code_01 %}
{% code "matrix/assets/scripts/js/parts/service_worker.js#01" %}
{% endset %}

{% _code_block %}
    title_s: '{{A_o.ID_s}}matrix/assets/scripts/js/parts/service_worker.js',
    lang_s: 'javascript',
[//]:#(_code_block)
{{ _code_01 }}
{% end_code_block %}
