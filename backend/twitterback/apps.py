from django.apps import AppConfig


class TwitterbackConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'twitterback'
    
    def ready(self):
        import twitterback.signals