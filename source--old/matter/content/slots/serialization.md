---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/serialization.html',
  rank_n: 244,
  tags: [ 'notag' ],
  title_s: 'serialization',
  labels_a: ['binary','objects','digital electronics','pre-written code','argument'],
}
---
:serialization:
Is the process of translating ~°data structures°~ or ~°object°~ state into a format that can be stored (for example, in a ~°file°~ or memory ~°buffer°~) or transmitted (for example, across a ~°network°~ connection link) and reconstructed later (possibly in a different computer environment). When the resulting series of bits is reread according to the serialization format, it can be used to create a semantically identical clone of the original object. For many complex objects, such as those that make extensive use of ~°references°~, this process is not straightforward. Serialization of object-oriented ~°objects°~ does not include any of their associated ~°methods°~ with which they were previously linked.

This process of serializing an object is also called ~°marshalling°~ an object in some situations.<a rel="nofollow" class="external autonumber" href="http://www.ruby-doc.org/core/classes/Marshal.html">[2]°~<a rel="nofollow" class="external autonumber" href="http://caml.inria.fr/pub/docs/manual-ocaml/libref/Marshal.html">[3]°~ The opposite operation, extracting a data structure from a series of bytes, is <b>deserialization</b>, (also called <b>unserialization</b> or <b>~°unmarshalling°~</b>).
