import logging

from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import render
from django.template import TemplateDoesNotExist
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static

logger = logging.getLogger(__name__)


def frontend(request):
    try:
        return render(request, 'index.html')
    except (TemplateDoesNotExist, FileNotFoundError):
        logger.warning('frontend_dist/index.html not found, serving backend fallback message')
        return HttpResponse('AI Career Intelligence Backend is Running Successfully!')
    except Exception as e:
        logger.error(f'Frontend view crashed: {e}', exc_info=True)
        return HttpResponse('AI Career Intelligence Backend is Running Successfully!')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/modules/', include('modules.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(
        r'^(?!api(?:/|$)|admin(?:/|$)).*$',
        frontend,
        name='frontend',
    ),
]
