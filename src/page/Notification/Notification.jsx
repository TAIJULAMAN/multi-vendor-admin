import { RxCross2 } from "react-icons/rx";
import { useGetAllNotificationQuery, useUpdateNotificationMutation } from "../../Redux/api/notification/notificationApi";
import formatDate from "../../utils/formatDate";

const Notification = () => {
  const { data: NotificationData } = useGetAllNotificationQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  return (
    <div className="py-4 max-h-[90vh] overflow-y-auto scrollbar-none">
      {NotificationData?.data?.length > 0 ? (
        NotificationData?.data?.map((notification) => (
          <div
            key={notification?._id || notification?.id}
            className={`relative p-3 border rounded-lg mb-3 ${notification?.isRead ? "bg-white" : "bg-amber-50"}`}
          >
            <button
              onClick={() => updateNotification(notification?._id || notification?.id)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
              aria-label="Dismiss notification"
            >
              <RxCross2 className="w-4 h-4 text-gray-400" />
            </button>
            <div className="flex gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {notification?.title}
                </h3>
                <p className="text-sm text-gray-700">{notification?.body}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-10">No notifications.</p>
      )}
    </div>
  );
};

export default Notification;
