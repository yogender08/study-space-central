
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar as CalendarIcon, BookOpen } from "lucide-react";

// Mock data for class schedule
const classSchedule = [
  { id: 1, subject: "Mathematics", day: "Monday", time: "09:00 - 10:30", room: "Room 101", teacher: "Dr. Smith" },
  { id: 2, subject: "Science", day: "Monday", time: "11:00 - 12:30", room: "Lab 203", teacher: "Prof. Johnson" },
  { id: 3, subject: "History", day: "Tuesday", time: "09:00 - 10:30", room: "Room 105", teacher: "Dr. Williams" },
  { id: 4, subject: "English", day: "Tuesday", time: "11:00 - 12:30", room: "Room 202", teacher: "Ms. Brown" },
  { id: 5, subject: "Computer Science", day: "Wednesday", time: "13:00 - 14:30", room: "Lab 301", teacher: "Mr. Davis" },
  { id: 6, subject: "Mathematics", day: "Thursday", time: "09:00 - 10:30", room: "Room 101", teacher: "Dr. Smith" },
  { id: 7, subject: "Science", day: "Thursday", time: "11:00 - 12:30", room: "Lab 203", teacher: "Prof. Johnson" },
  { id: 8, subject: "History", day: "Friday", time: "09:00 - 10:30", room: "Room 105", teacher: "Dr. Williams" },
];

// Mock data for exams
const exams = [
  { id: 1, subject: "Mathematics", date: new Date(2025, 3, 20), time: "09:00 - 11:00", room: "Hall A" },
  { id: 2, subject: "Science", date: new Date(2025, 3, 22), time: "13:00 - 15:00", room: "Hall B" },
  { id: 3, subject: "History", date: new Date(2025, 3, 25), time: "09:00 - 11:00", room: "Hall A" },
  { id: 4, subject: "English", date: new Date(2025, 3, 28), time: "13:00 - 15:00", room: "Hall C" },
  { id: 5, subject: "Computer Science", date: new Date(2025, 4, 2), time: "09:00 - 11:00", room: "Lab 301" },
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const StudentSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingExams = exams.filter(
    (exam) => exam.date > new Date()
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Schedule & Exams</CardTitle>
        <CardDescription>View your weekly schedule and upcoming exams</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-4">
            {weekdays.map((day) => (
              <div key={day} className="space-y-2">
                <h3 className="font-semibold">{day}</h3>
                <div className="space-y-2">
                  {classSchedule
                    .filter((cls) => cls.day === day)
                    .map((cls) => (
                      <div
                        key={cls.id}
                        className="flex items-center p-3 bg-muted rounded-md"
                      >
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{cls.subject}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{cls.time}</span>
                            <span className="mx-2">•</span>
                            <span>{cls.room}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{cls.teacher}</Badge>
                      </div>
                    ))}
                  {classSchedule.filter((cls) => cls.day === day).length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No classes scheduled</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Upcoming Exams</h3>
                {upcomingExams.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3 border rounded-md"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{exam.subject}</p>
                          <Badge variant="outline">Exam</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{exam.date.toDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{exam.time}</span>
                          <span className="mx-2">•</span>
                          <span>{exam.room}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No upcoming exams</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentSchedule;
