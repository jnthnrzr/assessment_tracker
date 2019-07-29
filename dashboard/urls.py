from rest_framework import routers

from .views import AssessmentViewSet, ChoiceViewSet, QuestionViewSet

router = routers.DefaultRouter()
router.register(prefix='api/assessments', viewset=AssessmentViewSet,
                basename='assessments',)
router.register(prefix='api/questions', viewset=QuestionViewSet,
                basename='questions',)
router.register(prefix='api/choices', viewset=ChoiceViewSet,
                basename='choices',)
urlpatterns = router.urls
