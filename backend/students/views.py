from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['student_id', 'name', 'department', 'gender']
    ordering_fields = ['student_id', 'name', 'age', 'gpa', 'semester']

    @action(detail=False, methods=['get'])
    def stats(self, request):
        students = Student.objects.all()
        total = students.count()

        if total == 0:
            return Response({
                'total': 0,
                'departments': 0,
                'average_gpa': 0.0,
                'male_count': 0,
                'female_count': 0,
            })

        departments = students.values('department').distinct().count()
        gpas = list(students.values_list('gpa', flat=True))
        average_gpa = round(sum(gpas) / len(gpas), 2)
        male_count = students.filter(gender='Male').count()
        female_count = students.filter(gender='Female').count()

        return Response({
            'total': total,
            'departments': departments,
            'average_gpa': average_gpa,
            'male_count': male_count,
            'female_count': female_count,
        })
