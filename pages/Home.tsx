"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Lock,
  Menu,
  Plus,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Sidebar = () => (
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
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-400 hover:text-slate-100"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <nav className="space-y-4 flex-grow">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-900"
        >
          <Link href="/RecentNotes" className="flex w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Recent Notes
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-900"
        >
          <Check className="mr-2 h-4 w-4" />
          To-Do List
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-900"
        >
          <Star className="mr-2 h-4 w-4" />
          Favorites
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-900"
        >
          <Lock className="mr-2 h-4 w-4" />
          Private Notes
        </Button>
      </nav>
      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
        <Plus className="mr-2 h-4 w-4" />
        Create New Note
      </Button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
      <main className="flex-grow p-4 lg:p-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2 text-slate-400 hover:text-slate-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400">
              AI Notes
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Recent Notes</CardTitle>
                <CardDescription className="text-slate-400">
                  Your latest creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Project Ideas", "Meeting Notes", "Shopping List"].map(
                    (note, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-300">{note}</span>
                        <ChevronRight className="h-4 w-4 text-amber-400" />
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-amber-400 hover:text-amber-300"
                >
                  View all notes
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Quick To-Dos</CardTitle>
                <CardDescription className="text-slate-400">
                  Stay on top of your tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Finish report", "Call client", "Gym session"].map(
                    (todo, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-amber-500 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-slate-300">{todo}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-amber-400 hover:text-amber-300"
                >
                  Manage to-dos
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">
                  Feature Highlight
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Discover AI Notes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300">Rich Text Editing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300">
                      End-to-End Encryption
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300">Smart Tagging</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-amber-400 hover:text-amber-300"
                >
                  Learn more
                </Button>
              </CardFooter>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
