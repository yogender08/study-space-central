
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const attendanceData = [
  { subject: "Mathematics", total: 25, present: 23, percentage: 92 },
  { subject: "Science", total: 24, present: 20, percentage: 83 },
  { subject: "History", total: 22, present: 22, percentage: 100 },
  { subject: "English", total: 25, present: 21, percentage: 84 },
  { subject: "Computer Science", total: 20, present: 18, percentage: 90 },
];

const StudentAttendance = () => {
  const overallAttendance = Math.round(
    attendanceData.reduce((sum, subject) => sum + subject.percentage, 0) / attendanceData.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Your attendance for this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Attendance</span>
              <span className="text-sm font-medium">{overallAttendance}%</span>
            </div>
            <Progress value={overallAttendance} />
          </div>

          <div className="space-y-4">
            {attendanceData.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{subject.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {subject.present} / {subject.total} classes
                  </p>
                </div>
                <Badge variant={subject.percentage >= 85 ? "default" : subject.percentage >= 75 ? "secondary" : "destructive"}>
                  {subject.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentAttendance;
