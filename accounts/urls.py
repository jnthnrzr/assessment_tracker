from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers
from .views import RegisterAPI, LoginAPI, UserAPI, UserAssessmentViewSet

assessment_router = routers.DefaultRouter()
assessment_router.register(prefix='api/userassessments',
                viewset=UserAssessmentViewSet,
                basename='userassessments')

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
  path('', include(assessment_router.urls)),
]
