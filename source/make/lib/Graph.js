//--Graph.js

class Graph
{
  //:- facet_c :Facet
  //:- node_a  :Array
  //:- link_a  :Array

  constructor
  (
    facet_c=null
  )
  {
    this.node_a = []
    //?? this.link_a = []
    this.facet_c = facet_c
  }



  node__n    //: create a `Node`
  (
    facet_c    //:- Facet
  )
  {
    const id_n = this.node_a.length
    facet_c.id__v( id_n )
    this.node_a[id_n] = new Node( facet_c )
    return id_n
  }



  link__v    //: Create a `Link` between two previously created `Node`
  (
    from_n,     //:- Node.Facet.id_n
    to_n,       //:- Node.Facet.id_n
    facet_c=null    //:- Facet
  )
  {
    const link_c = new Link( from_n, to_n, facet_c )
    this.node_a[from_n].link__v( link_c )
    //?? this.link_a.push( link_c )
  }



  linkLabel__v    //: Create two `Node` with labels + a `Link` between them
  (
    from_s,     //:- String
    to_s,       //:- String
  )
  {
    this.link__v
      ( 
        this.node__n( new Facet( { label: from_s } ) ),
        this.node__n( new Facet( { label: to_s } ) )
      )
  }



  link__a    //:  Create two `Node` with `Facet` + a `Link` between them; returns `Node` indices
  (
    from_c,    //:- Facet
    to_c       //:- Facet
  )
  {
    const from_n = this.node__n( from_c )
    const to_n = this.node__n( to_c )
    this.link__v( from_n, to_n )
    return [ from_n, to_n ]
  }



  linked__a    //: List `Node` connected to a start `Node`
  (
    from_n,            //:- Node.Facet.id_n
    callback_f=null    //:- Function
  )
  {
    const linked_a = new Set()
    const dive__a =    //:- depth first
      at_n =>
      {
        linked_a.add( at_n )
        callback_f && callback_f( at_n )
        for ( let link_c of this.node_a[at_n].link_a )
        {
          const id_n = link_c.to__n()
          if ( !linked_a.has( id_n ) ) dive__a( id_n )
        }
      }
    dive__a( from_n )
    return linked_a
  }



  aggregated__a    //: List all connected `Node` of the Graph
  ()
  {
    const aggregated_a = new Map()    //:- [[linked_a],...]
    const linked_a = new Set()        //:- Node.Facet.id_n 
    this.node_a.forEach
      (
        node_c =>
        {
          const id_n = node_c.id__n()
          if ( !linked_a.has( id_n )  ) aggregated_a.set
            (
              id_n,
              this.linked__a( id_n, at_n => linked_a.add( at_n ) )
            )
        }
      )
    return aggregated_a
  }


  nodeId__o
  (
    id_n
  )
  { return this.node_a.find( node_o => node_o.id__n() === id_n ) }



  nodeLabel__o
  (
    label_s
  )
  { return this.node_a.find( node_o => node_o.label__s() === label_s ) }




  static json__c
  (
    json_o    //: a JSON generic Object
  )
  {
    json_o.__proto__ = this.prototype
    return json_o
  }
}


//--Node.js

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

//--Link.js

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

//--Facet.js

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



module.exports =
{
  Graph: Graph,
  Node:  Node,
  Link:  Link,
  Facet: Facet
}
