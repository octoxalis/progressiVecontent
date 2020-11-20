// === Node.js ===

class Node
{
  //:- facet_c
  //:- link_a

  constructor
  (
    facet_c    //:- Facet
  )
  {
    this.link_a = []    //:- [Link]
    this.facet_c = facet_c
  }



  facet__c    //: Get `Node` `Facet`
  ()
  { return this.facet_c }



  label__s    //: Get `Node` `Facet` label
  ()
  { return this.facet_c.label__s() }



  id__n    //: Get `Node` `Facet` ID
  ()
  { return this.facet_c.id__n() }



  link__v    //: Add a `Link` between this `Node` and a target `Node`
  (
    link_c    //:- Link
  )
  { this.link_a.push( link_c ) }



  link__c    //: Find a `Link` between this `Node` and a target `Node`
  (
    toId_n       //:- Number
  )
  {
    return this.link_a.find(
      link_c =>
      {
        return ( ( link_c.from__n() === this.facet_c.id__n() )
        &&
        ( link_c.to__n() === toId_n ) )
      } )
  }


  //??????????????????????????????
  foreach__v    //: Walk thru link_a & execute a callback
  (
    callback_f
  )
  {
    this.link_a.forEach( at_n => callback_f( at_n ) )
  }



  static json__c
  (
    json_o    //: a JSON generic Object
  )
  {
    json_o.__proto__ = this.prototype
    return json_o
  }

}


