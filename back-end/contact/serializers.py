from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    model = Contact
    fields = '__all__'
