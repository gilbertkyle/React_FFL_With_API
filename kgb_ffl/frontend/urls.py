from django.urls import path
from django.conf.urls import handler404
from . import views

handler404 = views.view_404

urlpatterns = [
    path('', views.index)
]
