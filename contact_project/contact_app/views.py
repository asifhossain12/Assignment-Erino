from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound
from .models import Contact
from .serializers import ContactSerializers

class ContactPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100 

@api_view(['POST'])
def create_contact(request):
    serializer = ContactSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_contacts(request):
    sort_by = request.query_params.get('sort', None)
    
    if sort_by:
        contacts = Contact.objects.all().order_by(sort_by)
    else:
        contacts = Contact.objects.all()
    
    
    paginator = ContactPagination()
    paginated_contacts = paginator.paginate_queryset(contacts, request)
    
    serializer = ContactSerializers(paginated_contacts, many=True)
    
   
    return paginator.get_paginated_response(serializer.data)

@api_view(['PUT'])
def update_contact(request, id):
    try:
        contact = Contact.objects.get(id=id)
    except Contact.DoesNotExist:
        return Response({'error': 'Contact not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ContactSerializers(contact, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_contact(request, id):
    try:
        contact = Contact.objects.get(id=id)
        contact.delete()
        return Response({'message': 'Contact deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Contact.DoesNotExist:
        return Response({'error': 'Contact not found'}, status=status.HTTP_404_NOT_FOUND)
