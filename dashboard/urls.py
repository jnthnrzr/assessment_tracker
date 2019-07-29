from rest_framework import routers

from .views import (AssessmentViewSet, ChoiceViewSet, QuestionViewSet,
                    UserAssessmentViewSet)

router = routers.DefaultRouter()
router.register(prefix='api/assessments', viewset=AssessmentViewSet,
                basename='assessments',)
router.register(prefix='api/questions', viewset=QuestionViewSet,
                basename='questions',)
router.register(prefix='api/choices', viewset=ChoiceViewSet,
                basename='choices',)
router.register(prefix='api/userassessments', viewset=UserAssessmentViewSet,
                basename='userassessments')
urlpatterns = router.urls
