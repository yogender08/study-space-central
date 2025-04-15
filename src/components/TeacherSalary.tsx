
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for salary information
const monthlySalary = [
  { month: "Jan", salary: 4200 },
  { month: "Feb", salary: 4200 },
  { month: "Mar", salary: 4500 },
  { month: "Apr", salary: 4500 },
  { month: "May", salary: 4500 },
  { month: "Jun", salary: 4800 },
  { month: "Jul", salary: 4800 },
  { month: "Aug", salary: 4800 },
  { month: "Sep", salary: 4800 },
  { month: "Oct", salary: 4800 },
  { month: "Nov", salary: 4800 },
  { month: "Dec", salary: 5000 },
];

const salaryBreakdown = [
  { category: "Base Salary", amount: 4000 },
  { category: "Performance Bonus", amount: 500 },
  { category: "Overtime", amount: 200 },
  { category: "Allowances", amount: 300 },
];

const TeacherSalary = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const currentSalary = monthlySalary.find((item) => item.month === currentMonth)?.salary || 0;
  
  // Calculate total from breakdown
  const totalSalary = salaryBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Information</CardTitle>
        <CardDescription>Your salary details and history</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Current Month Salary</p>
                <p className="text-3xl font-bold">${currentSalary}</p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Year-to-Date</p>
                <p className="text-3xl font-bold">
                  ${monthlySalary.reduce((sum, item) => sum + item.salary, 0)}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Salary Breakdown</h3>
              <div className="space-y-2">
                {salaryBreakdown.map((item) => (
                  <div key={item.category} className="flex justify-between items-center p-2 border-b">
                    <span>{item.category}</span>
                    <span className="font-medium">${item.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-2 font-semibold">
                  <span>Total</span>
                  <span>${totalSalary}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Salary"]} />
                  <Bar dataKey="salary" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Payment History</h3>
              <div className="space-y-2">
                {monthlySalary.slice().reverse().map((item, index) => (
                  <div key={item.month} className="flex justify-between items-center p-2 border-b">
                    <span>{item.month} 2025</span>
                    <div className="flex items-center">
                      <span className="font-medium">${item.salary}</span>
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeacherSalary;
