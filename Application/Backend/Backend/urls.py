from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def empty_response(request):
    return HttpResponse()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    # path('inspector/device', empty_response),
    # path('message', empty_response),
    # path('symbolicate', empty_response),
    # path('assets', empty_response),
]
