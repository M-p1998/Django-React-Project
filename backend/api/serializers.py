
from rest_framework import serializers
from api.models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # fields = ["student_id", "firstName", "lastName", "projectName", "created_at"]
        fields = '__all__'
