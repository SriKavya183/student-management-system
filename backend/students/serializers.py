from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_student_id(self, value):
        value = value.strip().upper()
        if not value:
            raise serializers.ValidationError("Student ID cannot be empty.")
        return value

    def validate_age(self, value):
        if not (15 <= value <= 35):
            raise serializers.ValidationError("Age must be between 15 and 35.")
        return value

    def validate_semester(self, value):
        if not (1 <= value <= 8):
            raise serializers.ValidationError("Semester must be between 1 and 8.")
        return value

    def validate_gpa(self, value):
        if not (0.0 <= value <= 10.0):
            raise serializers.ValidationError("GPA must be between 0.0 and 10.0.")
        return round(value, 2)
