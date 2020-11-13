//=== Graph.js ===

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


