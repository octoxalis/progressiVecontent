// === Link.js ===

class Link
{
  //:- from_n
  //:- to_n
  //:- facet_c
  //:- id_n

  constructor
    (
      from_n=null,    //:- Node.Facet.id_n
      to_n=null,      //:- Node.Facet.id_n
      facet_c=null    //:- Facet_c
    )
  {
    this.from_n  = from_n
    this.to_n    = to_n
    this.facet_c = facet_c
  }



  from__n    //: Get origin `Node` index
  ()
  { return this.from_n }



  to__n    //: Get target `Node` index
  ()
  { return this.to_n }



  facet__c    //: Get `Facet`
  ()
  { return this.facet_c }



  link__a    //: Get `Link` origin and target
  ()
  { return [ this.from_n, this.to_n ] }



  link__b    //: Check if already linked
  (
    from_n,
    to_n
  )
  { return this.from_n === from_n && this.to_n === to_n }



  label__v    //: Add label to `Facet`
  (
    label_s
  )
  {
    this.facet_c.label__v( label_s )
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


