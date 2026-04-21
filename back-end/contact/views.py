from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from .serializers import ContactSerializer
from .models import Contact

# Create your views here.
@api_view(['POST'])
def contact_view(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        # Send Email
        send_mail(
            subject=f"New Message from {contact.name}",
            message=f"""
            Name: {contact.name}
            Email: {contact.email}

            Message:
            {contact.message}
            """,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        return Response({"message: Success!"})
    return Response(serializer.errors)

@api_view(['GET'])
def contact_list(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)