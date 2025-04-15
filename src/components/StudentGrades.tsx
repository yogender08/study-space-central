
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const gradesData = [
  { subject: "Mathematics", midterm: 85, final: 90, assignment: 88, overall: "A-" },
  { subject: "Science", midterm: 78, final: 82, assignment: 90, overall: "B+" },
  { subject: "History", midterm: 92, final: 95, assignment: 94, overall: "A" },
  { subject: "English", midterm: 88, final: 86, assignment: 92, overall: "A-" },
  { subject: "Computer Science", midterm: 94, final: 96, assignment: 98, overall: "A+" },
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "bg-green-100 text-green-800";
  if (grade.startsWith("B")) return "bg-blue-100 text-blue-800";
  if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800";
  if (grade.startsWith("D")) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
};

const StudentGrades = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Performance</CardTitle>
        <CardDescription>Your grades for this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Midterm</TableHead>
              <TableHead className="text-right">Final</TableHead>
              <TableHead className="text-right">Assignment</TableHead>
              <TableHead className="text-right">Overall</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradesData.map((grade) => (
              <TableRow key={grade.subject}>
                <TableCell className="font-medium">{grade.subject}</TableCell>
                <TableCell className="text-right">{grade.midterm}</TableCell>
                <TableCell className="text-right">{grade.final}</TableCell>
                <TableCell className="text-right">{grade.assignment}</TableCell>
                <TableCell className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(grade.overall)}`}>
                    {grade.overall}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentGrades;
