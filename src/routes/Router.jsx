import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import Login from "../Auth/Login";
import ForgetPassword from "../Auth/ForgetPass";
import VerificationCode from "../auth/VerificationCode";
import DashboardLayout from "../layout/DashboardLayout";
import SellerManagement from "../page/sellerManagement/SellerManagement";
import UserManagement from "../page/userManagement/UserManagement";
import Subscription from "../page/subscription/Subscription";
import UpdateSubscription from "../page/subscription/UpdateSubscription";
import PremiumSubscribers from "../page/PremiumSubscribers/PremiumSubscribers";
import AdPromotion from "../page/AdPromotion/AdPromotion";
import Faq from "../page/Settings/Faq";
import Support from "../page/Support/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/user-management",
        element: <UserManagement />,
      },
      {
        path: "/dashboard/seller-management",
        element: <SellerManagement />,
      },

      {
        path: "/dashboard/subscription",
        element: <Subscription />,
      },
      {
        path: "/dashboard/update-subscription",
        element: <UpdateSubscription />,
      },
      {
        path: "/premium-subscribers",
        element: <PremiumSubscribers />,
      },
      {
        path: "/ads-promotion",
        element: <AdPromotion />,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification />,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition />,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-mail",
    element: <VerificationCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
]);
