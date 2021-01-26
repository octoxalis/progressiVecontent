async function avif__b
()
{
  if ( !this.createImageBitmap ) return false    //: can't use the test
  //>
  const data_s =
    'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA='
  
  const blob_o = await
    fetch( data_s )
      .then
      (
        response_o =>
          response_o.blob()
      )
  return (
    createImageBitmap( blob_o )
      .then
      (
        () => true,    //: resolve
        () => false    //: reject
      )
  )
}
