from rest_framework import permissions, viewsets

from .models import Assessment, Choice, Question, UserAssessment
from .serializers import (AssessmentSerializer, ChoiceSerializer,
                          QuestionSerializer, UserAssessmentSerializer)


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AssessmentSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = QuestionSerializer


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ChoiceSerializer


class UserAssessmentViewSet(viewsets.ModelViewSet):
    queryset = UserAssessment.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserAssessmentSerializer

    def get_queryset(self):
        return self.request.user.assessments.all()
