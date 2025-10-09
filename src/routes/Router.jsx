import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/common/Loader";

const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const Profile = lazy(() => import("../page/Settings/Profile"));
const TermsCondition = lazy(() => import("../page/Settings/TermsCondition"));
const PrivacyPolicy = lazy(() => import("../page/Settings/PrivacyPolicy"));
const Notification = lazy(() => import("../page/Notification/Notification"));
const VerificationCode = lazy(() => import("../auth/VerificationCode"));
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));
const SellerManagement = lazy(() => import("../page/sellerManagement/SellerManagement"));
const Subscription = lazy(() => import("../page/subscription/Subscription"));
const UpdateSubscription = lazy(() => import("../page/subscription/UpdateSubscription"));
const PremiumSubscribers = lazy(() => import("../page/PremiumSubscribers/PremiumSubscribers"));
const AdPromotion = lazy(() => import("../page/AdPromotion/AdPromotion"));
const Faq = lazy(() => import("../page/Settings/Faq"));
const Support = lazy(() => import("../page/Support/Support"));
const CategoryManagement = lazy(() => import("../page/CategoryManagement/CategoryManagement"));
const SubCategory = lazy(() => import("../page/SubCategory/SubCategory"));
const Chat = lazy(() => import("../page/Chat/Chat"));
const ResetPassword = lazy(() => import("../auth/ResetPassword"));
const ForgetPassword = lazy(() => import("../auth/ForgetPassword"));
const Users = lazy(() => import("../page/UserManagement/Users"));
const SignIn = lazy(() => import("../auth/SignIn"));

const withSuspense = (Comp) => (
  <Suspense fallback={<Loader />}>
    <Comp />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(DashboardLayout),
    children: [
      {
        path: "/",
        element: withSuspense(Dashboard),
      },
      {
        path: "/dashboard/user-management",
        element: withSuspense(Users),
      },
      {
        path: "/dashboard/seller-management",
        element: withSuspense(SellerManagement),
      },

      {
        path: "/dashboard/subscription",
        element: withSuspense(Subscription),
      },
      {
        path: "/dashboard/update-subscription",
        element: withSuspense(UpdateSubscription),
      },
      {
        path: "/premium-subscribers",
        element: withSuspense(PremiumSubscribers),
      },
      {
        path: "/ads-promotion",
        element: withSuspense(AdPromotion),
      },
      {
        path: "/dashboard/Settings/profile",
        element: withSuspense(Profile),
      },
      {
        path: "/dashboard/Settings/notification",
        element: withSuspense(Notification),
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: withSuspense(TermsCondition),
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: withSuspense(PrivacyPolicy),
      },
      {
        path: "/faq",
        element: withSuspense(Faq),
      },
      {
        path: "/chat",
        element: withSuspense(Chat),
      },
      {
        path: "/support",
        element: withSuspense(Support),
      },
      {
        path: "/category-management",
        element: withSuspense(CategoryManagement),
      },
      {
        path: "/category-management/:id/sub-categories",
        element: withSuspense(SubCategory),
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(SignIn),
  },
  {
    path: "/forget-password",
    element: withSuspense(ForgetPassword),
  },
  {
    path: "/verify-mail",
    element: withSuspense(VerificationCode),
  },
  {
    path: "/reset-password",
    element: withSuspense(ResetPassword),
  }
]);
