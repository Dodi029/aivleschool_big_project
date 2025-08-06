import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Users,
  Calendar,
  UserCheck,
  UserX,
  Coffee,
  ChefHat,
  Utensils,
} from "lucide-react";

export function StaffManagement() {
  const [selectedDate, setSelectedDate] = useState("2025-08-04");

  // 오늘 투입 인력 데이터
  const todayStaff = [
    {
      name: "김철수",
      role: "조리장",
      status: "present",
      shift: "08:00-17:00",
      roleColor: "bg-secondary",
    },
    {
      name: "이영희",
      role: "조리사",
      status: "present",
      shift: "09:00-18:00",
      roleColor: "bg-primary",
    },
    {
      name: "박민수",
      role: "조리보조",
      status: "present",
      shift: "10:00-19:00",
      roleColor: "bg-info",
    },
    {
      name: "최지은",
      role: "배식",
      status: "present",
      shift: "11:00-20:00",
      roleColor: "bg-warning",
    },
    {
      name: "정대한",
      role: "위생",
      status: "vacation",
      shift: "10:00-19:00",
      roleColor: "bg-success",
    },
    {
      name: "한미경",
      role: "배식",
      status: "present",
      shift: "11:00-20:00",
      roleColor: "bg-warning",
    },
    {
      name: "조현우",
      role: "외부행사",
      status: "external",
      shift: "전일",
      roleColor: "bg-purple-500",
    },
  ];

  // 주간 스케줄 데이터
  const weeklySchedule = {
    staff: [
      "김철수",
      "이영희",
      "박민수",
      "최지은",
      "정대한",
      "한미경",
      "조현우",
    ],
    days: [
      "월(8/4)",
      "화(8/5)",
      "수(8/6)",
      "목(8/7)",
      "금(8/8)",
      "토(8/9)",
      "일(8/10)",
    ],
    schedule: {
      김철수: ["조리", "조리", "조리", "조리", "조리", "휴무", "휴무"],
      이영희: ["조리", "조리", "조리", "조리", "조리", "조리", "휴무"],
      박민수: [
        "조리보조",
        "조리보조",
        "휴가",
        "조리보조",
        "조리보조",
        "조리보조",
        "조리보조",
      ],
      최지은: ["배식", "배식", "배식", "배식", "배식", "휴무", "휴무"],
      정대한: ["휴가", "위생", "위생", "위생", "위생", "위생", "위생"],
      한미경: ["배식", "배식", "배식", "배식", "배식", "배식", "휴무"],
      조현우: [
        "외부행사",
        "외부행사",
        "외부행사",
        "외부행사",
        "외부행사",
        "휴무",
        "휴무",
      ],
    },
  };

  const roleColors = {
    조리: "bg-secondary text-secondary-foreground",
    조리보조: "bg-info text-info-foreground",
    배식: "bg-warning text-warning-foreground",
    위생: "bg-success text-success-foreground",
    외부행사: "bg-purple-500 text-white",
    휴무: "bg-muted text-muted-foreground",
    휴가: "bg-error text-error-foreground",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-secondary text-white">출근</Badge>;
      case "vacation":
        return <Badge className="bg-error text-white">휴가</Badge>;
      case "external":
        return <Badge className="bg-purple-500 text-white">외부행사</Badge>;
      default:
        return <Badge variant="outline">결근</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <UserCheck className="w-4 h-4 text-secondary" />;
      case "vacation":
        return <UserX className="w-4 h-4 text-error" />;
      case "external":
        return <Coffee className="w-4 h-4 text-purple-500" />;
      default:
        return <UserX className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getInitials = (name: string) => {
    return name.slice(-2);
  };

  // 통계 데이터
  const staffStats = {
    total: 7,
    present: 5,
    vacation: 1,
    external: 1,
    attendanceRate: 71,
  };

  // 안전하게 스케줄 데이터 가져오기
  const getStaffSchedule = (staffName: string) => {
    return (
      weeklySchedule.schedule[
        staffName as keyof typeof weeklySchedule.schedule
      ] || [
        "미배정",
        "미배정",
        "미배정",
        "미배정",
        "미배정",
        "미배정",
        "미배정",
      ]
    );
  };

  return (
    <div className="space-y-6 container-main">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>인사관리</h1>
          <p className="text-muted-foreground">
            직원 스케줄과 근무 현황을 관리하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-08-04">8월 4일 (월)</SelectItem>
              <SelectItem value="2025-08-05">8월 5일 (화)</SelectItem>
              <SelectItem value="2025-08-06">8월 6일 (수)</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary text-white border-0">
            <Calendar className="w-4 h-4 mr-2" />
            스케줄 편집
          </Button>
        </div>
      </div>

      {/* 상단 요약 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 인력</p>
                <p className="text-2xl font-bold">{staffStats.total}명</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">출근</p>
                <p className="text-2xl font-bold text-secondary">
                  {staffStats.present}명
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">휴가/외부</p>
                <p className="text-2xl font-bold text-warning">
                  {staffStats.vacation + staffStats.external}명
                </p>
              </div>
              <UserX className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">출근율</p>
                <p className="text-2xl font-bold text-info">
                  {staffStats.attendanceRate}%
                </p>
              </div>
              <div className="text-info">{staffStats.attendanceRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 오늘 투입 인력 리스트 */}
      <Card className="elevation-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            오늘 투입 인력 현황 ({selectedDate})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayStaff.map((staff, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={staff.roleColor}>
                      {getInitials(staff.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{staff.name}</span>
                      {getStatusIcon(staff.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {staff.role}
                      </Badge>
                      {getStatusBadge(staff.status)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {staff.shift}
                </div>
              </Card>
            ))}
          </div>

          {/* 역할별 구분 */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-4">역할별 인력 현황</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  role: "조리장",
                  count: 1,
                  icon: ChefHat,
                  color: "text-secondary",
                },
                {
                  role: "조리사",
                  count: 1,
                  icon: ChefHat,
                  color: "text-primary",
                },
                {
                  role: "조리보조",
                  count: 1,
                  icon: Utensils,
                  color: "text-info",
                },
                { role: "배식", count: 2, icon: Users, color: "text-warning" },
                { role: "위생", count: 0, icon: Users, color: "text-success" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-3 rounded-lg bg-accent/30"
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <div className="font-bold text-lg">{item.count}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.role}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 구성 */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="weekly">주간 보기</TabsTrigger>
          <TabsTrigger value="daily">일별 상세</TabsTrigger>
          <TabsTrigger value="individual">개인별 일정</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card className="elevation-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                주간 근무 스케줄 표
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 text-left border-b border-border font-medium">
                        직원명
                      </th>
                      {weeklySchedule.days.map((day, index) => (
                        <th
                          key={index}
                          className="p-3 text-center border-b border-border font-medium min-w-24"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeklySchedule.staff.map((staff, staffIndex) => (
                      <tr
                        key={staffIndex}
                        className="hover:bg-accent/30 transition-colors"
                      >
                        <td className="p-3 border-b border-border font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {getInitials(staff)}
                              </AvatarFallback>
                            </Avatar>
                            {staff}
                          </div>
                        </td>
                        {getStaffSchedule(staff).map((role, dayIndex) => (
                          <td
                            key={dayIndex}
                            className="p-3 border-b border-border text-center"
                          >
                            <Badge
                              className={`text-xs ${
                                roleColors[role as keyof typeof roleColors] ||
                                "bg-muted text-muted-foreground"
                              }`}
                            >
                              {role}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 범례 */}
              <div className="mt-4 flex flex-wrap gap-3">
                {Object.entries(roleColors).map(([role, className]) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${className}`}></div>
                    <span className="text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card className="elevation-1">
            <CardHeader>
              <CardTitle>일별 상세 근무 현황</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">
                    오전 시간대 (08:00-12:00)
                  </h4>
                  <div className="space-y-2">
                    {todayStaff
                      .filter((s) => s.status === "present")
                      .slice(0, 3)
                      .map((staff, index) => (
                        <div
                          key={index}
                          className="p-3 bg-secondary/10 rounded-lg"
                        >
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {staff.role}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    오후 시간대 (12:00-17:00)
                  </h4>
                  <div className="space-y-2">
                    {todayStaff
                      .filter((s) => s.status === "present")
                      .slice(1, 4)
                      .map((staff, index) => (
                        <div
                          key={index}
                          className="p-3 bg-primary/10 rounded-lg"
                        >
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {staff.role}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    저녁 시간대 (17:00-20:00)
                  </h4>
                  <div className="space-y-2">
                    {todayStaff
                      .filter((s) => s.status === "present")
                      .slice(2, 4)
                      .map((staff, index) => (
                        <div key={index} className="p-3 bg-info/10 rounded-lg">
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {staff.role}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual">
          <Card className="elevation-1">
            <CardHeader>
              <CardTitle>개인별 근무 일정</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {todayStaff.map((staff, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className={staff.roleColor}>
                            {getInitials(staff.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {staff.role}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(staff.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-sm">
                      {weeklySchedule.days.map((day, dayIndex) => {
                        const staffSchedule = getStaffSchedule(staff.name);
                        const role = staffSchedule[dayIndex] || "미배정";
                        return (
                          <div
                            key={dayIndex}
                            className="text-center p-2 rounded bg-accent/20"
                          >
                            <div className="font-medium text-xs mb-1">
                              {day.split("(")[0]}
                            </div>
                            <Badge
                              className={`text-xs ${
                                roleColors[role as keyof typeof roleColors] ||
                                "bg-muted text-muted-foreground"
                              }`}
                            >
                              {role}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
