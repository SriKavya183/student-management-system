from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'name', 'age', 'gender', 'department', 'semester', 'gpa']
    list_filter = ['department', 'gender', 'semester']
    search_fields = ['student_id', 'name', 'department']
    ordering = ['student_id']
