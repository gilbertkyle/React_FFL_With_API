from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Custom permission that only allows an admin of the league to
    change picks
    """
    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user in obj.admins