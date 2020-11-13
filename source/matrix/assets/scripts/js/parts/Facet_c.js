//===Facet.js ===

class Facet
{
  //:- label_s
  //:- label_a
  //:- id_n
  //:- 
  //:- dimension_o
  //:- color_o

  constructor
  (
    label_s='',
    //... dimension_o=    //:-vmin unit
    //... {
    //...   width_n:  0,
    //...   height_n: 0,
    //...   scale_n:  1    //:- proportional to  in/out edges count
    //... },
    //... color_o=    //:- custom var
    //... {
    //...   front_s:  '--front_color',
    //...   back_s:   '--back_color',
    //...   border_s: '--border_color',
    //... },
  )
  {
    //--this.label_s = label_s
    this.label_a = []
    //?? this.label_a = new Set()
    this.label_a.push( label_s )
    //?? this.label_a.add( label_s )
    //... this.dimension_o = dimension_o
    //... this.color_o = color_o
  }



  id__v    //: Set `Facet` ID when creating a Node
  (
    id_n    //:- Graph.node_a index
  )
  { this.id_n = id_n }



  id__n    //: Get `Facet` ID
  ()
  { return this.id_n }


  label__s    //: Get `Facet` label
  ()
  //--{ return this.label_s }
  { return this.label_a[0] }



  label__v    //: Add label to `Facet` label_a
  (
    label_s
  )
  {
    //?? this.label_a.add( label_s )
    if ( !this.label_a.find( at_s => at_s === label_s ) ) this.label_a.push( label_s )
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


