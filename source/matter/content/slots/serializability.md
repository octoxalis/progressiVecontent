---js
{
  layout: 'parts/slot/slot.njk',
  permalink: 'slots/serializability.html',
  rank_n: 243,
  tags: [ 'notag' ],
  title_s: 'serializability',
  labels_a: ['cryptography','computer architectures','partitioned data sets','cipher','non-volatile resources'],
}
---
## serializability

In ~°concurrency control°~ of ~°databases°~, ~°transaction processing°~ (transaction management), and various ~°transactional°~ applications (e.g., ~°transactional memory°~ and ~°software transactional memory°~), both centralized and ~°distributed°~, a transaction ~°schedule°~ is <b>serializable</b> if its outcome (e.g., the resulting database state) is equal to the outcome of its transactions executed serially, i.e. without overlapping in time. Transactions are normally executed concurrently (they overlap), since this is the most efficient way. Serializability is the major correctness criterion for concurrent transactions' executions<sup class="noprint Inline-Template Template-Fact" style="white-space:nowrap;">&#91;<i>~°citation needed°~</i>&#93;</sup>. It is considered the highest level of ~°isolation°~ between ~°transactions°~, and plays an essential role in ~°concurrency control°~. As such it is supported in all general purpose database systems. <i>~°Strong strict two-phase locking°~</i> (SS2PL) is a popular serializability mechanism utilized in most of the database systems (in various variants) since their early days in the 1970s.

