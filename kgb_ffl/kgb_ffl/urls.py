"""kgb_ffl URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import handler404
from django.urls import path, include
from rest_framework import routers
from ffl.api import CreateLeagueAPI
from ffl import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'leagues', views.LeagueViewSet)
router.register(r'players', views.PlayerViewSet)
router.register(r'defenses', views.DefenseViewSet)


urlpatterns = [
    path('', include('frontend.urls')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('ffl.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/password_reset',
         include('django_rest_passwordreset.urls', namespace='password_reset')),

]
