import { IconBellRinging } from "@tabler/icons-react";
import { X, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Types
interface Notification {
  id: number;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: number) => void;
  onMarkAllAsRead?: () => void;
  onDeleteNotification?: (id: number) => void;
  onClearAll?: () => void;
  onViewAll?: () => void;
}

// Mock notifications data - can be moved to a separate file
const defaultNotifications: Notification[] = [
  {
    id: 1,
    type: "success",
    title: "Deployment Successful",
    message: "Your application has been deployed successfully to production.",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "High CPU Usage",
    message: "Server instance i-1234567890abcdef0 is experiencing high CPU usage (85%).",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "Maintenance window scheduled for tonight at 2:00 AM UTC.",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "error",
    title: "Database Connection Failed",
    message: "Unable to connect to database cluster. Please check your connection.",
    timestamp: "3 hours ago",
    read: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Info className="w-4 h-4 text-purple-500" />;
  }
};

export const NotificationDropdown = ({
  notifications = defaultNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
}: NotificationDropdownProps) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = localNotifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    } else {
      // Fallback to local state management
      setLocalNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    } else {
      // Fallback to local state management
      setLocalNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    }
  };

  const handleDeleteNotification = (id: number) => {
    if (onDeleteNotification) {
      onDeleteNotification(id);
    } else {
      // Fallback to local state management
      setLocalNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      // Fallback to local state management
      setLocalNotifications([]);
    }
  };



  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <IconBellRinging className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-green-600 hover:text-green-800"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto scrollbar-hide">

            {localNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <IconBellRinging className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-purple-50' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {notification.timestamp}
                        </span>
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

         
        </div>
      )}
    </div>
  );
};

export type { Notification };
export { defaultNotifications };