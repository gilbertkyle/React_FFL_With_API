from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')


def view_404(request, *args, **kwargs):
    return "<h1>Gay</h1>"
