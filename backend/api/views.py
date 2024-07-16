from django.shortcuts import render
from .serializers import StudentSerializer
from api.models import Student
from rest_framework import generics

class StudentListCreate(generics.ListCreateAPIView):
    
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
#     def get_queryset(self):
#         student = self.request.student
#         return super().get_queryset()
    
#     def perform_create(self,serializer):
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             print(serializer.errors)

# class StudentDelete(generics.DestroyAPIView):
#     serializer_class = StudentSerializer
    
#     def get_queryset(self):
#         student = self.request.student
#         return super().get_queryset()

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    

    
