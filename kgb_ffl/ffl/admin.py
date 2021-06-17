from os import read
from django.contrib import admin
from .models import User
from .models import League, LeagueYear, Pick, Player, Invitation


# Register your models here.

class AdminInline(admin.TabularInline):
    model = League.admins.through


class LeagueAdmin(admin.ModelAdmin):
    inlines = [
        AdminInline,
    ]
    readonly_fields = ('league_id',)

    def league_id(self, obj):
        return obj.id


admin.site.register(User)
admin.site.register(League, LeagueAdmin)
admin.site.register(LeagueYear)
admin.site.register(Pick)
admin.site.register(Player)
admin.site.register(Invitation)
