import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Star, Tag, Home, Inbox } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  currentPage: "recent" | "todo" | "tags" | "Inbox" | "inbox" | "";
};

export function Sidebar({ currentPage }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 border-2 border-amber-500">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-slate-100">Akshay Vs</h2>
            <p className="text-xs text-amber-400">Premium User</p>
          </div>
        </div>
      </div>
      <nav className="space-y-4 flex-grow">
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === ""
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/RecentNotes">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "recent"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Clock className="mr-2 h-4 w-4" />
            Recent Notes
          </Button>
        </Link>
        <Link href="/TodoList">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "todo"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Star className="mr-2 h-4 w-4" />
            To-Do List
          </Button>
        </Link>
        <Link href="/Tags">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "tags"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Tag className="mr-2 h-4 w-4" />
            Tags
          </Button>
        </Link>
        <Link href="/Inbox">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "Inbox"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Inbox className="mr-2 h-4 w-4" />
            Inbox
          </Button>
        </Link>
      </nav>
      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
        <Plus className="mr-2 h-4 w-4" />
        Create New Note
      </Button>
    </div>
  );
}
