import tomotopy as lib
import json as json


docs_json = 'make/index/input/docs.json'
docs_txt  = 'make/index/input/docs.txt'
docs_labels_topics_json = 'make/index/output/docs_labels_topics.json'

#labels_docs_json = 'matrix/assets/static/data/json/labels_docs.json'
#docs_labels_json = 'make/index/output/docs_labels.json'



with open( docs_json ) as docs_file:
  docs_a = json.load( docs_file )

model = lib.PLDAModel( latent_topics=5, topics_per_label=4 )
at_n = 0
for line in open( docs_txt ):
    model.add_doc( line.strip().split(), docs_a[at_n][2] )  #: supervised labels
    at_n += 1

for i in range( 0, 100, 10 ):
    model.train( 50 )

docs_l = []
for k in range( len( model.docs ) ):
    labels_l = model.docs[k].labels    # ndarray: ('condition', array([0.00113381], dtype=float32)) !!! NOT JSON serializable
    lab_l = []
    for l in range( len(labels_l) ):
        lab_l.append( [ labels_l[l][0], labels_l[l][1][0].item() ] )    # ['condition', 0.00113381 ]
    docs_l.append( [ docs_a[k][0], lab_l, model.docs[k].get_topics( top_n=4 ) ] )  #?? do we need TOPICS
    #docs_l.append( [ docs_a[k][0], lab_l ] )    #!!! without TOPICS
print( json.dumps( docs_l ), file=open( docs_labels_topics_json, 'w' ) )
#print( json.dumps( docs_l ), file=open( docs_labels_json, 'w' ) )




# LABELS
# labels_l = []
# for k in range( len( model.topic_label_dict ) ):
#     labels_l.append( model.topic_label_dict[k] )
# print( json.dumps( labels_l ), file=open( labels_docs_json, 'w' ) )

#  TOPICS
# topics_l = []
# for k in range(len( model.topic_label_dict ) + model.latent_topics ):
#     topics_l.append( model.get_topic_words(k, top_n=10) )
# print( json.dumps( topics_l ), file=open( topics_json, 'w' ) )


#model.summary( topic_word_top_n=8 )
