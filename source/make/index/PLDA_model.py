import tomotopy as lib
import json as json

# input
docs_json = 'make/index/input/docs_topics_words.json'
docs_txt  = 'make/index/input/docs_words.txt'
# output
docs_words_json = 'make/index/output/docs_words.json'



with open( docs_json ) as docs_file:
  docs_a = json.load( docs_file )

model = lib.PLDAModel( latent_topics=5, topics_per_label=4 )
at_n = 0
for line in open( docs_txt ):
    model.add_doc( line.strip().split(), docs_a[at_n][3] )  #: supervised topics
    at_n += 1

for i in range( 0, 100, 10 ):
    model.train( 50 )

docs_l = []
for k in range( len( model.docs ) ):
    labels_l = model.docs[k].labels    # ndarray: ('condition', array([0.00113381], dtype=float32)) !!! NOT JSON serializable
    lab_l = []
    for l in range( len(labels_l) ):
        lab_l.append( [ labels_l[l][0], labels_l[l][1][0].item() ] )    # ['condition', 0.00113381 ]
    docs_l.append( [ docs_a[k][0], docs_a[k][1], lab_l, model.docs[k].get_topics( top_n=4 ) ] )  #?? do we need TOPICS
print( json.dumps( docs_l ), file=open( docs_words_json, 'w' ) )

#model.summary( topic_word_top_n=8 )
