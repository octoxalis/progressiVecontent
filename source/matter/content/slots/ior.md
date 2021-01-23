---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/ior.html',
  tags: [ 'notag' ],

  doc_n: 511,    //: CONCEPT_s
  title_s: 'About image on request',
  topics_a: [ 'web site architecture', 'fondamentals' ],
  words_a: [ 'image-on-request', 'content-on-request' ],
}
---
:image on request:
__{{ A_o.NAME_s }}__ is fully ~°compatible°~ with ~°IIIF°~.


{% _ior_path '1585_coster-₀_₀-1625_youngwoman/full/max/0/jpg' %}
Adam de Coster [1586-1643]
Young women holding a distaff before a lit candle
134 x 94.9 cm
Sothebys, New York &#12290; 2017-01-25: N09601-23
{% end_ior_path %}


{% _ior_spot '1585_coster-₀_₀-1625_youngwoman' %}
color full  == quality:color
gray medium == size:512,/quality:gray
gray small  == size:64,/quality:gray
{% end_ior_spot %}


{% _ior_path '1585_coster-₀_₀-1625_sangerolamo/full/max/0/jpg' %}
Adam de Coster [1586-1643]
San Gerolamo
134 x 94.9 cm
Private collection, Paris, France
{% end_ior_path %}


{% _ior_spot '1585_coster-₀_₀-1625_sangerolamo' %}
color full  == quality:color
gray medium == size:512,/quality:gray
gray small  == size:64,/quality:gray
{% end_ior_spot %}
