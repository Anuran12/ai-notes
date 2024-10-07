import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Lock,
  Menu,
  Plus,
  Search,
  Star,
  Tag,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPrivate: boolean;
  inNotebook: boolean;
};

const recentNotes: Note[] = [
  {
    id: 1,
    title: "Project Brainstorming",
    content:
      "Ideas for the new app: 1. User authentication 2. Real-time collaboration 3. Offline mode",
    date: "2023-06-15",
    tags: ["work", "ideas"],
    isPrivate: false,
    inNotebook: true,
  },
  {
    id: 2,
    title: "Meeting Notes: Team Sync",
    content:
      "Discussed project timeline, assigned tasks, and set next meeting for Friday.",
    date: "2023-06-14",
    tags: ["work", "meeting"],
    isPrivate: true,
    inNotebook: false,
  },
  {
    id: 3,
    title: "Personal Goals",
    content:
      "1. Read 2 books per month 2. Exercise 3 times a week 3. Learn a new language",
    date: "2023-06-13",
    tags: ["personal", "goals"],
    isPrivate: true,
    inNotebook: false,
  },
  {
    id: 4,
    title: "Recipe: Chocolate Chip Cookies",
    content:
      "Ingredients: flour, sugar, butter, chocolate chips. Mix dry ingredients...",
    date: "2023-06-12",
    tags: ["personal", "recipe"],
    isPrivate: false,
    inNotebook: true,
  },
  {
    id: 5,
    title: "Book Notes: The Pragmatic Programmer",
    content:
      "Key takeaways: 1. Care about your craft 2. Think about your work 3. Provide options, don't make lame excuses",
    date: "2023-06-11",
    tags: ["learning", "book"],
    isPrivate: false,
    inNotebook: true,
  },
];

export default function RecentNotesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar currentPage="recent" />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar currentPage="recent" />
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
                <Sidebar currentPage="recent" />
              </DialogContent>
            </Dialog>
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400">
              Recent Notes
            </h1>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Search notes"
            />
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentNotes.map((note) => (
              <Card
                key={note.id}
                className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-slate-100">
                    <span>{note.title}</span>
                    <span className="text-sm font-normal text-amber-400">
                      {note.date}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-2 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700 text-amber-400 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-slate-400 flex justify-between">
                  <span>{note.content.length} characters</span>
                  <div className="flex space-x-2">
                    {note.isPrivate && (
                      <Lock className="h-4 w-4 text-amber-400" />
                    )}
                    {note.inNotebook && (
                      <BookOpen className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
