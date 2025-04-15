
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Mock data for student progress
const studentProgressData = [
  {
    name: "Emma Johnson",
    id: "ST001",
    class: "10A",
    progress: [
      { month: "Jan", score: 75 },
      { month: "Feb", score: 70 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 85 },
      { month: "May", score: 90 },
    ],
    subjects: {
      Math: { score: 85, improvementAreas: ["Calculus", "Trigonometry"] },
      Science: { score: 90, improvementAreas: ["Organic Chemistry"] },
      English: { score: 75, improvementAreas: ["Essay Writing", "Comprehension"] },
      History: { score: 80, improvementAreas: ["Modern History"] },
    },
    attendance: 92,
  },
  {
    name: "Jacob Smith",
    id: "ST002",
    class: "10A",
    progress: [
      { month: "Jan", score: 65 },
      { month: "Feb", score: 68 },
      { month: "Mar", score: 72 },
      { month: "Apr", score: 78 },
      { month: "May", score: 82 },
    ],
    subjects: {
      Math: { score: 70, improvementAreas: ["Algebra", "Geometry"] },
      Science: { score: 82, improvementAreas: ["Physics Formulas"] },
      English: { score: 78, improvementAreas: ["Grammar", "Vocabulary"] },
      History: { score: 75, improvementAreas: ["Ancient History", "Research"] },
    },
    attendance: 88,
  },
  {
    name: "Olivia Williams",
    id: "ST003",
    class: "10A",
    progress: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 82 },
      { month: "Mar", score: 88 },
      { month: "Apr", score: 90 },
      { month: "May", score: 92 },
    ],
    subjects: {
      Math: { score: 92, improvementAreas: [] },
      Science: { score: 88, improvementAreas: ["Lab Work"] },
      English: { score: 90, improvementAreas: [] },
      History: { score: 85, improvementAreas: ["Citations"] },
    },
    attendance: 95,
  },
  {
    name: "Ethan Brown",
    id: "ST004",
    class: "10A",
    progress: [
      { month: "Jan", score: 60 },
      { month: "Feb", score: 65 },
      { month: "Mar", score: 70 },
      { month: "Apr", score: 72 },
      { month: "May", score: 75 },
    ],
    subjects: {
      Math: { score: 65, improvementAreas: ["All Areas"] },
      Science: { score: 70, improvementAreas: ["Theory", "Practical"] },
      English: { score: 75, improvementAreas: ["Writing", "Reading"] },
      History: { score: 72, improvementAreas: ["Dates", "Facts"] },
    },
    attendance: 80,
  },
];

const comparativeData = studentProgressData.reduce((acc, student) => {
  student.progress.forEach((item) => {
    const existingEntry = acc.find((entry) => entry.month === item.month);
    if (existingEntry) {
      existingEntry[student.name] = item.score;
    } else {
      const newEntry = { month: item.month };
      newEntry[student.name] = item.score;
      acc.push(newEntry);
    }
  });
  return acc;
}, [] as any[]);

const StudentProgress = () => {
  const [selectedStudent, setSelectedStudent] = useState(studentProgressData[0].id);
  const student = studentProgressData.find((s) => s.id === selectedStudent);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Track and analyze student performance</CardDescription>
          </div>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {studentProgressData.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {student && (
          <Tabs defaultValue="individual">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="comparative">Class Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Current Score</p>
                  <p className="text-3xl font-bold">
                    {student.progress[student.progress.length - 1].score}%
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                  <p className="text-3xl font-bold">{student.attendance}%</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Class</p>
                  <p className="text-3xl font-bold">{student.class}</p>
                </div>
              </div>
              
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={student.progress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#4f46e5" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Subject Performance</h3>
                <div className="space-y-2">
                  {Object.entries(student.subjects).map(([subject, data]) => (
                    <div key={subject} className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{subject}</span>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            data.score >= 90 ? "bg-green-100 text-green-800" :
                            data.score >= 80 ? "bg-blue-100 text-blue-800" :
                            data.score >= 70 ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {data.score}%
                        </span>
                      </div>
                      {data.improvementAreas.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Areas for improvement: </span>
                          {data.improvementAreas.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comparative">
              <div className="h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparativeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {studentProgressData.map((student) => (
                      <Line 
                        key={student.id}
                        type="monotone" 
                        dataKey={student.name} 
                        stroke={
                          student.id === "ST001" ? "#4f46e5" :
                          student.id === "ST002" ? "#0ea5e9" :
                          student.id === "ST003" ? "#f97316" :
                          "#ef4444"
                        } 
                        activeDot={{ r: 8 }} 
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studentProgressData.map((s) => (
                  <div 
                    key={s.id} 
                    className={`p-3 border rounded-md ${s.id === selectedStudent ? "border-primary" : ""}`}
                    onClick={() => setSelectedStudent(s.id)}
                  >
                    <p className="font-medium truncate">{s.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="font-medium">{s.progress[s.progress.length - 1].score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentProgress;
