import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Menu, UserCircle } from "lucide-react";
import TeacherSalary from "@/components/TeacherSalary";
import StudentProgress from "@/components/StudentProgress";
import MessageCenter from "@/components/MessageCenter";
import { NotificationBar } from "@/components/NotificationBar";

const TeacherDashboard = () => {
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
                <span className="font-medium">Dr. Rebecca Wilson</span>
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
                <p className="font-medium">Dr. Rebecca Wilson</p>
                <p className="text-sm text-muted-foreground">Mathematics Department</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Wilson! Here's an overview of your information.</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium mb-2">Total Students</h3>
                <p className="text-3xl font-bold">124</p>
                <p className="text-sm text-muted-foreground mt-2">Across 5 classes</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium mb-2">Average Performance</h3>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground mt-2">+3% from last month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium mb-2">Upcoming Classes</h3>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-muted-foreground mt-2">Today</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <StudentProgress />
              <TeacherSalary />
            </div>
          </TabsContent>
          
          <TabsContent value="students">
            <StudentProgress />
          </TabsContent>
          
          <TabsContent value="salary">
            <TeacherSalary />
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

export default TeacherDashboard;
