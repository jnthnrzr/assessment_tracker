from rest_framework import permissions, viewsets

from .models import Assessment, Choice, Question
from .serializers import (
    AssessmentSerializer, ChoiceSerializer, QuestionSerializer
)


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = AssessmentSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = QuestionSerializer


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ChoiceSerializer
