import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Menu, MessageSquare, UserCircle } from "lucide-react";
import StudentAttendance from "@/components/StudentAttendance";
import StudentGrades from "@/components/StudentGrades";
import StudentSchedule from "@/components/StudentSchedule";
import MessageCenter from "@/components/MessageCenter";
import { NotificationBar } from "@/components/NotificationBar";

const StudentDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="text-xl font-bold text-primary">
                EduPortal
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBar />
              <div className="hidden md:flex items-center space-x-2">
                <UserCircle className="h-6 w-6" />
                <span className="font-medium">Ethan Johnson</span>
              </div>
              <Link to="/login">
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 p-2">
              <UserCircle className="h-6 w-6" />
              <div>
                <p className="font-medium">Ethan Johnson</p>
                <p className="text-sm text-muted-foreground">Class 10A</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Ethan! Here's an overview of your academic status.</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <StudentAttendance />
              <StudentGrades />
            </div>
            <StudentSchedule />
          </TabsContent>
          
          <TabsContent value="attendance">
            <StudentAttendance />
          </TabsContent>
          
          <TabsContent value="grades">
            <StudentGrades />
          </TabsContent>
          
          <TabsContent value="schedule">
            <StudentSchedule />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessageCenter />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EduPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
