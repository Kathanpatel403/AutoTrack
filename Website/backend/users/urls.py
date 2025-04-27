from django.urls import path
from users.permissions import ListUsersView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, EchallanDetailView, EchallanListCreateView, InitializeResolutionStatusAPIView, EchallanQueryAPIView, ForgotPasswordEmailView, PendingChallanAPIView, UpdateChallanStatusAPIView, UserProfileView,  UserRegistrationView, UserLoginView, VerifyOTPView, ResetPasswordView, detect_characters, get_vehicle_record, save_vehicle_data

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('list/', ListUsersView.as_view(), name='list-users'),

    # echallan:
    path('echallans/', EchallanListCreateView.as_view(), name='echallan-list-create'),
    path('echallans/<int:pk>/', EchallanDetailView.as_view(), name='echallan-detail'),
 path('pending-challan/', PendingChallanAPIView.as_view(), name='pending-challan'),
    path('update-challan-status/<int:challan_id>/', UpdateChallanStatusAPIView.as_view(), name='update-challan-status'),    # vehicle detection:
    path('detect-characters', detect_characters, name="detect-characters"),

    path('get-vehicle-data', get_vehicle_record, name="detect-characters"),
    path('generate-challan', save_vehicle_data, name='generate-challan'),

    # forgot password functionality:
    path('forgot-password/email', ForgotPasswordEmailView.as_view(), name='send-otp-email'),
    path('forgot-password/verify-opt', VerifyOTPView.as_view(), name='verify-otp'),
    path('forgot-password/reset-password', ResetPasswordView.as_view(), name='reset-password'),

    # echallan qeury:
    path("echallan-queries/", EchallanQueryAPIView.as_view(), name="echallan-queries"),
    path("echallan-queries/<str:ticket_no>/", EchallanQueryAPIView.as_view(), name="echallan-query-detail"),

    path('mass-insert/resolution-status/', InitializeResolutionStatusAPIView.as_view(), name="mass-insert-status"),
    path('users/<int:user_id>/profile/', UserProfileView.as_view(), name='user_profile'),
]