import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Plus, Search, Trash } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Complete project proposal",
    completed: false,
    date: "2023-06-16",
  },
  {
    id: 2,
    text: "Review team's progress",
    completed: true,
    date: "2023-06-15",
  },
  {
    id: 3,
    text: "Prepare presentation slides",
    completed: false,
    date: "2023-06-17",
  },
  {
    id: 4,
    text: "Schedule client meeting",
    completed: false,
    date: "2023-06-18",
  },
  {
    id: 5,
    text: "Update project timeline",
    completed: true,
    date: "2023-06-14",
  },
];

export default function TodoPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        date: new Date().toISOString().split("T")[0],
      };
      setTodos([newTodoItem, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar currentPage="todo" />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar currentPage="todo" />
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
              To-Do List
            </h1>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Search tasks"
            />
          </div>
        </header>
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-400">Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new task"
                className="flex-grow bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button
                onClick={addTodo}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-2">
            {todos.map((todo) => (
              <Card key={todo.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border-amber-500 text-amber-500 focus:ring-amber-500"
                    />
                    <span
                      className={`text-slate-100 ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">{todo.date}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
