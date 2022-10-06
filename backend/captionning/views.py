from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from keras.models import load_model
from pickle import load
from api.serializer import PhotoSerializer
from captionning.predict import extract_features, generate_desc
from api.models import Photo
import os

class IcgApiView(APIView):

	def post(self, request):
		name = request.POST.get('name')
		name_no_ext = os.path.splitext(name)
		max_length = 34
		tokenizer = load(open('media/tokenizer.pkl', 'rb'))
		model = load_model('media/models-VGG16/model_14.h5', compile=False)
		features = extract_features("media/images/" + name)
		desc = generate_desc(model, tokenizer, features, max_length)
		Photo.objects.filter(name=name_no_ext[0]).update(description=desc, is_wip=False)
		photoId = Photo.objects.filter(name=name_no_ext[0])
		serializer = PhotoSerializer(photoId, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
