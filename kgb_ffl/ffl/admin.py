from django.contrib import admin
from accounts.models import User
from ffl.models import League, LeagueYear, Pick, Player


# Register your models here.

class AdminInline(admin.TabularInline):
    model = League.admins.through


class LeagueAdmin(admin.ModelAdmin):
    inlines = [
        AdminInline,
    ]


admin.site.register(User)
admin.site.register(League, LeagueAdmin)
admin.site.register(LeagueYear)
admin.site.register(Pick)
admin.site.register(Player)
