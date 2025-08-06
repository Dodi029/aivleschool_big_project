import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Calendar,
  Plus,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function MenuPlanning() {
  const [selectedDate, setSelectedDate] = useState(4);
  const [selectedMonth] = useState(8);
  const [newItemInput, setNewItemInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 달력 데이터 (8월 예시)
  const calendarData: {
    [key: number]: { status: string; hasSpecial: boolean };
  } = {
    1: { status: "completed", hasSpecial: false },
    2: { status: "completed", hasSpecial: false },
    3: { status: "completed", hasSpecial: true },
    4: { status: "completed", hasSpecial: false },
    5: { status: "pending", hasSpecial: false },
    6: { status: "empty", hasSpecial: false },
    7: { status: "empty", hasSpecial: false },
    // ... 나머지 날짜들
  };

  // 메뉴 상태 관리
  const [menuItems, setMenuItems] = useState({
    4: {
      breakfast: ["김치찌개", "계란말이", "시금치무침", "김치", "밥"],
      lunch: ["된장찌개", "불고기", "도라지무침", "깍두기", "밥"],
      dinner: ["미역국", "고등어구이", "콩나물무침", "배추김치", "밥"],
      special: null,
    },
  });

  const currentMenu = menuItems[selectedDate as keyof typeof menuItems] || {
    breakfast: [],
    lunch: [],
    dinner: [],
    special: null,
  };

  // 추천 특식 데이터
  const recommendedSpecials = [
    { name: "삼계탕", reason: "여름 보양식", popularity: 95, season: "여름" },
    { name: "냉면", reason: "무더위 해소", popularity: 88, season: "여름" },
    { name: "콩국수", reason: "시원한 별미", popularity: 82, season: "여름" },
    { name: "갈비탕", reason: "인기 메뉴", popularity: 78, season: "사계절" },
  ];

  // AI 추천 메뉴
  const aiRecommendations = {
    breakfast: ["된장국", "김치전", "무생채"],
    lunch: ["육개장", "제육볶음", "고사리나물"],
    dinner: ["순두부찌개", "생선구이", "파래무침"],
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(2025, selectedMonth);
    const firstDay = new Date(2025, selectedMonth - 1, 1).getDay();
    const days = [];

    // 이전 달의 빈 칸들
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  // 메뉴 아이템 업데이트 함수
  const updateMenuItem = (
    mealType: "breakfast" | "lunch" | "dinner",
    index: number,
    value: string
  ) => {
    setMenuItems((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate as keyof typeof prev],
        [mealType]: prev[selectedDate as keyof typeof prev][mealType].map(
          (item, i) => (i === index ? value : item)
        ),
      },
    }));
  };

  // 메뉴 아이템 삭제 함수
  const removeMenuItem = (
    mealType: "breakfast" | "lunch" | "dinner",
    index: number
  ) => {
    setMenuItems((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate as keyof typeof prev],
        [mealType]: prev[selectedDate as keyof typeof prev][mealType].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // 메뉴 아이템 추가 함수
  const addMenuItem = (mealType: "breakfast" | "lunch" | "dinner") => {
    if (newItemInput.trim()) {
      setMenuItems((prev) => ({
        ...prev,
        [selectedDate]: {
          ...prev[selectedDate as keyof typeof prev],
          [mealType]: [
            ...prev[selectedDate as keyof typeof prev][mealType],
            newItemInput.trim(),
          ],
        },
      }));
      setNewItemInput("");
      setSelectedCategory("");
    }
  };

  // AI 추천 메뉴 추가 함수
  const addAIRecommendation = (
    mealType: "breakfast" | "lunch" | "dinner",
    item: string
  ) => {
    setMenuItems((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate as keyof typeof prev],
        [mealType]: [
          ...prev[selectedDate as keyof typeof prev][mealType],
          item,
        ],
      },
    }));
  };

  // 메뉴 입력 컴포넌트
  const MenuInputSection = ({
    mealType,
    mealTypeKor,
  }: {
    mealType: "breakfast" | "lunch" | "dinner";
    mealTypeKor: string;
  }) => (
    <TabsContent value={mealType} className="space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentMenu[mealType].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) =>
                  updateMenuItem(mealType, index, e.target.value)
                }
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeMenuItem(mealType, index)}
              >
                삭제
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="메뉴 카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soup">국물요리</SelectItem>
              <SelectItem value="main">메인요리</SelectItem>
              <SelectItem value="side">반찬</SelectItem>
              <SelectItem value="rice">밥/면류</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="직접 입력"
            className="flex-1"
            value={newItemInput}
            onChange={(e) => setNewItemInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addMenuItem(mealType);
              }
            }}
          />
          <Button variant="outline" onClick={() => addMenuItem(mealType)}>
            추가
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Sparkles className="w-4 h-4 mr-2" />
            AI 추천 메뉴
          </Button>
        </div>

        {/* AI 추천 메뉴 표시 */}
        <div className="p-4 bg-info/10 rounded-lg">
          <h4 className="text-sm font-medium mb-2 text-info">
            AI 추천 {mealTypeKor} 메뉴
          </h4>
          <div className="flex flex-wrap gap-2">
            {aiRecommendations[mealType].map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-info/20"
                onClick={() => addAIRecommendation(mealType, item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );

  return (
    <div className="space-y-6 container-main">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>식단표 관리</h1>
          <p className="text-muted-foreground">
            월간 식단을 계획하고 승인 상태를 관리하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            승인 상태 확인
            <Badge className="ml-2 bg-warning">3</Badge>
          </Button>
          <Button className="gradient-primary text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            신규 식단표 생성
          </Button>
        </div>
      </div>

      {/* 좌우 2단 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[600px]">
        {/* 좌측 - 월간 달력 */}
        <div className="lg:col-span-2">
          <Card className="elevation-1 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  2025년 {selectedMonth}월 식단 달력
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* 달력 헤더 */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 달력 본체 */}
              <div className="grid grid-cols-7 gap-1">
                {getCalendarDays().map((day, index) => (
                  <div
                    key={index}
                    className={`
                      p-2 min-h-[60px] border rounded-lg cursor-pointer transition-all
                      ${!day ? "opacity-30" : "hover:bg-accent/50"}
                      ${
                        day === selectedDate
                          ? "bg-primary/20 border-primary"
                          : "border-border"
                      }
                    `}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{day}</span>
                          {calendarData[day] &&
                            getStatusIcon(calendarData[day].status)}
                        </div>
                        {calendarData[day]?.hasSpecial && (
                          <Star className="w-3 h-3 text-warning" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 범례 */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span>작성 완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span>승인 대기</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  <span>특식 포함</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 우측 - 세부 식단 영역 */}
        <div className="lg:col-span-3">
          <Card className="elevation-1 h-full">
            <CardHeader>
              <CardTitle>8월 {selectedDate}일 식단 상세</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="breakfast" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="breakfast">조식</TabsTrigger>
                  <TabsTrigger value="lunch">중식</TabsTrigger>
                  <TabsTrigger value="dinner">석식</TabsTrigger>
                </TabsList>

                <MenuInputSection mealType="breakfast" mealTypeKor="조식" />
                <MenuInputSection mealType="lunch" mealTypeKor="중식" />
                <MenuInputSection mealType="dinner" mealTypeKor="석식" />
              </Tabs>

              {/* 특식 제안 섹션 */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">특식 제안</h4>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    특식 추가
                  </Button>
                </div>

                {/* 추천 특식 슬라이더 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedSpecials.map((special, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{special.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {special.season}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {special.reason}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          예상 만족도
                        </span>
                        <span className="text-sm font-medium text-secondary">
                          {special.popularity}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 저장 버튼 */}
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1">
                  임시 저장
                </Button>
                <Button className="flex-1 gradient-primary text-white border-0">
                  승인 요청
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 하단 탭 */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="current">이번 달 식단표</TabsTrigger>
          <TabsTrigger value="history">과거 식단표 이력</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card className="elevation-1">
            <CardHeader>
              <CardTitle>8월 식단 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-secondary">28</div>
                  <div className="text-sm text-muted-foreground">작성 완료</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">3</div>
                  <div className="text-sm text-muted-foreground">승인 대기</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">특식 포함</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-info">90%</div>
                  <div className="text-sm text-muted-foreground">진행률</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="elevation-1">
            <CardHeader>
              <CardTitle>과거 식단표 이력</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 검색 및 필터 */}
                <div className="flex gap-2">
                  <Input
                    placeholder="식단명 또는 날짜 검색"
                    className="flex-1"
                  />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="월 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7월</SelectItem>
                      <SelectItem value="6">6월</SelectItem>
                      <SelectItem value="5">5월</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">검색</Button>
                </div>

                {/* 이력 리스트 */}
                <div className="space-y-2">
                  {[
                    { month: "7월", completed: 31, satisfaction: 4.2 },
                    { month: "6월", completed: 30, satisfaction: 4.0 },
                    { month: "5월", completed: 31, satisfaction: 4.1 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg flex items-center justify-between hover:bg-accent/50 cursor-pointer"
                    >
                      <div>
                        <span className="font-medium">
                          2025년 {item.month} 식단표
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {item.completed}일 작성 완료
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-secondary">
                          ★ {item.satisfaction}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          평균 만족도
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
