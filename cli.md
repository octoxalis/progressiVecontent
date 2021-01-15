### Extract from documents

- ```source $ node make/lib/extract.js```
  *
    ```
    Site URL: http://127.0.0.1:8080/
    -----------------
    Last rank_n: 7
    -----------------
    13 Markdown files processed
    ```



### Build site

- ```source $ npx @11ty/eleventy --config=make.js```
  * 
  ```
  Init 11ty in current dir: /home/daniel/Public/progressiVecontent/source
  Site URL: http://127.0.0.1:8080/
  Site URL: http://127.0.0.1:8080/
  ilite: 1.744ms
  ilite: 5.664ms
  13 Markdown files to process
  Benchmark (Configuration): "minify_html" Nunjucks Filter took 134ms (10.7%, called 14×, 9.6ms each)
  Copied 12 files / Wrote 34 files in 1.06 seconds (31.2ms each, v0.11.1)
  -- Python child process exited with code 0
  -- Writing ../site/_headers: null
  [ 100, 32, 100, 3 ]
  ```