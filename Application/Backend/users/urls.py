from django.urls import path
from users.permissions import ListUsersView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, DailyViolationDensityView, EchallanDetailView, EchallanListCreateView, EchallanCreateInOfflineView, ForgotPasswordEmailView, MonthlyViolationsView, UserRegistrationView, UserLoginView, VerifyOTPView, ResetPasswordView, ViolationTypeCountView, WeeklyViolationsView, detect_characters, get_recent_violations, get_today_stats, get_vehicle_record, get_weekly_trend, save_vehicle_data

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('list/', ListUsersView.as_view(), name='list-users'),

    # echallan:
    path('echallans/', EchallanListCreateView.as_view(),
         name='echallan-list-create'),
    path('echallans/<int:pk>/', EchallanDetailView.as_view(), name='echallan-detail'),
    path('echallans/offline', EchallanCreateInOfflineView.as_view(),
         name='create-echallan-mobile-offline-view'),

    # dashboard apis:
    path('violation-counts/', ViolationTypeCountView.as_view(),
         name='violation-counts'),
    path('weekly-violations/', WeeklyViolationsView.as_view(),
         name='weekly-violations'),
    path('monthly-violations/', MonthlyViolationsView.as_view(),
         name='monthly-violations'),
    path('daily-violation-density/', DailyViolationDensityView.as_view(),
         name='daily-violation-density'),
    path('today-stats/', get_today_stats, name='today_stats'),
    path('weekly-trend/', get_weekly_trend, name='weekly_trend'),
    path('recent-violations/', get_recent_violations, name='recent_violations'),

    # vehicle detection:
    path('detect-characters', detect_characters, name="detect-characters"),

    path('get-vehicle-data', get_vehicle_record, name="detect-characters"),
    path('generate-challan', save_vehicle_data, name='generate-challan'),

    # forgot password functionality:
    path('forgot-password/email',
         ForgotPasswordEmailView.as_view(), name='send-otp-email'),
    path('forgot-password/verify-opt',
         VerifyOTPView.as_view(), name='verify-otp'),
    path('forgot-password/reset-password',
         ResetPasswordView.as_view(), name='reset-password'),
]
