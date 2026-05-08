from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Student(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    DEPARTMENT_CHOICES = [
        ('CSE', 'Computer Science & Engineering'),
        ('ECE', 'Electronics & Communication Engineering'),
        ('IT', 'Information Technology'),
        ('EEE', 'Electrical & Electronics Engineering'),
        ('MECH', 'Mechanical Engineering'),
        ('CIVIL', 'Civil Engineering'),
    ]

    student_id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField(
        validators=[MinValueValidator(15), MaxValueValidator(35)]
    )
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    semester = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(8)]
    )
    gpa = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(10.0)]
    )

    class Meta:
        db_table = 'students'
        managed = False          # Django will not create/alter/drop this table
        ordering = ['student_id']

    def __str__(self):
        return f"{self.student_id} - {self.name} ({self.department})"
