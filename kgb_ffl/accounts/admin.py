from .models import User
from django.contrib import admin

# Register your models here.


class UserInline(admin.ModelAdmin):
    model = User
    readonly_fields = ('user_id',)

    def user_id(self, obj):
        return obj.id


admin.site.unregister(User)
admin.site.register(User, UserInline)
