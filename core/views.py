from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def home(request):
    return render(request, 'core/home.html')


@login_required
def dashboard(request):
    if request.user.is_staff or request.user.is_superuser:
        return render(request, 'core/dashboard_admin.html')

    return render(request, 'core/dashboard_user.html')