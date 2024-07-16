from django.shortcuts import render
from .serializers import StudentSerializer
from api.models import Student
from rest_framework import generics

class StudentListCreate(generics.ListCreateAPIView):
    
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    

    
