from rest_framework import serializers
from .models import Contact

class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def validate_email(self, value):
        # Check if it's a new instance
        if self.instance is None:
            # If it's a new contact, check if email already exists
            if Contact.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:
            # If updating, exclude the current instance by its ID
            if Contact.objects.filter(email=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("This email is already in use.")

        return value
