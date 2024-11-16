from rest_framework import serializers
from .models import Contact

class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def validate_email(self, value):
       
        if self.instance is None:
           
            if Contact.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:
          
            if Contact.objects.filter(email=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("This email is already in use.")

        return value
