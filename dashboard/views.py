from django.db.models import Max
from rest_framework import permissions, viewsets

from .models import Assessment, Choice, Question, UserAssessment
from .serializers import (AssessmentSerializer, BestScoreSerializer,
                          ChoiceSerializer, QuestionSerializer,
                          UserAssessmentSerializer)


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AssessmentSerializer

    def get_queryset(self):
        queryset = (Assessment.objects.all())
        return queryset


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


class BestScoreViewSet(viewsets.ModelViewSet):
    queryset = UserAssessment.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BestScoreSerializer

    def get_queryset(self):
        id = self.request.user.id
        queryset = (UserAssessment.objects.filter(user=id)
                    .values('assessment')
                    .annotate(score=Max('score'))
                    )
        return queryset
