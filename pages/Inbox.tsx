import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, Menu, Search } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

type Notification = {
  id: number;
  message: string;
  date: string;
  type: "todo" | "reminder" | "system";
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Hi, Akshay! Please keep in mind that you have to clean tomorrow",
    date: "2023-06-16",
    type: "todo",
  },
  {
    id: 2,
    message: "Your premium subscription will renew in 3 days",
    date: "2023-06-17",
    type: "system",
  },
  {
    id: 3,
    message: "Remember to review your weekly goals",
    date: "2023-06-18",
    type: "reminder",
  },
  {
    id: 4,
    message: "New feature available: Tag management",
    date: "2023-06-19",
    type: "system",
  },
  {
    id: 5,
    message: "Don't forget to call mom for her birthday",
    date: "2023-06-20",
    type: "todo",
  },
];

export default function InboxPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // In a real application, you would fetch notifications from an API
    setNotifications(mockNotifications);
  }, []);

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "todo":
        return "text-amber-400";
      case "reminder":
        return "text-blue-400";
      case "system":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar currentPage="inbox" />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar currentPage="inbox" />
        </SheetContent>
      </Sheet>
      <main className="flex-grow p-4 lg:p-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden mr-2 text-slate-400 hover:text-slate-100"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-950 text-slate-100 border-slate-800">
                <DialogHeader>
                  <DialogTitle>Menu</DialogTitle>
                </DialogHeader>
                <Sidebar currentPage="inbox" />
              </DialogContent>
            </Dialog>
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400">
              Inbox
            </h1>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Search notifications"
            />
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-slate-100">
                    <span
                      className={`flex items-center ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      {notification.type.charAt(0).toUpperCase() +
                        notification.type.slice(1)}
                    </span>
                    <span className="text-sm font-normal text-amber-400">
                      {notification.date}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{notification.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
