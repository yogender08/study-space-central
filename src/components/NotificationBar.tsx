
import { Bell, X } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Notification {
  id: number;
  message: string;
  type: "info" | "warning" | "success";
}

const demoNotifications: Notification[] = [
  { id: 1, message: "New message from administrator", type: "info" },
  { id: 2, message: "Upcoming test next week", type: "warning" },
  { id: 3, message: "Grade updated in Mathematics", type: "success" },
];

export function NotificationBar() {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 z-50 bg-white rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-1">
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <Alert
                key={notification.id}
                className="relative pr-8 hover:bg-muted/50 transition-colors"
              >
                <AlertDescription>{notification.message}</AlertDescription>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </Alert>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
