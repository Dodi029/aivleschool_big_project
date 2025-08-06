import { useState } from "react";
import { motion } from "framer-motion";

import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { SimpleBarChart, SimpleLineChart } from "./charts/SimpleChart";
import {
  Card3D,
  CountUpNumber,
  AnimatedIcon,
  Tooltip,
  ExpandableCard,
} from "./ui/interactive";
import {
  Users,
  Trash2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Star,
  ChefHat,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from "lucide-react";

export function Dashboard() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 오늘의 식단 데이터
  const todayMenus = {
    breakfast: ["김치찌개", "계란말이", "시금치무침", "김치", "밥"],
    lunch: ["된장찌개", "불고기", "도라지무침", "깍두기", "밥"],
    dinner: ["미역국", "고등어구이", "콩나물무침", "배추김치", "밥"],
  };

  // 핵심 지표 데이터
  const keyMetrics = [
    {
      title: "식수 인원",
      subtitle: "오늘 식사 인원",
      value: 300,
      unit: "명",
      change: 12,
      changeType: "increase" as const,
      icon: Users,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      allergies: ["견과류", "달걀"],
    },
    {
      title: "잔반량",
      subtitle: "전일 대비",
      value: 9.4,
      unit: "kg",
      change: 1.2,
      changeType: "increase" as const,
      icon: Trash2,
      iconColor: "text-error",
      bgColor: "bg-error/10",
    },
    {
      title: "일일 매출",
      subtitle: "오늘 총 매출",
      value: 2340000,
      unit: "원",
      change: 3.2,
      changeType: "increase" as const,
      icon: DollarSign,
      iconColor: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  // 만족도 TOP 5 메뉴
  const topMenus = [
    { name: "김치찌개", rating: 4.8, satisfaction: 95, allergies: ["해산물"] },
    { name: "불고기", rating: 4.7, satisfaction: 92, allergies: ["견과류"] },
    { name: "된장찌개", rating: 4.5, satisfaction: 88, allergies: [] },
    { name: "갈비탕", rating: 4.4, satisfaction: 85, allergies: ["견과류"] },
    { name: "비빔밥", rating: 4.3, satisfaction: 82, allergies: ["달걀"] },
  ];

  // 개선 필요 TOP 5 메뉴
  const improvementMenus = [
    { name: "브로콜리무침", rating: 2.1, satisfaction: 35, allergies: [] },
    {
      name: "양배추샐러드",
      rating: 2.3,
      satisfaction: 42,
      allergies: ["견과류"],
    },
    { name: "시금치나물", rating: 2.8, satisfaction: 48, allergies: [] },
    { name: "콩나물무침", rating: 3.1, satisfaction: 55, allergies: [] },
    { name: "오이무침", rating: 3.2, satisfaction: 58, allergies: [] },
  ];

  // To-Do 리스트
  const todoItems = [
    { id: 1, task: "내일 식단표 미작성", completed: false, priority: "high" },
    { id: 2, task: "재고 입력 미완료", completed: false, priority: "high" },
    {
      id: 3,
      task: "식자재 발주 승인 대기",
      completed: false,
      priority: "medium",
    },
    { id: 4, task: "직원 스케줄 업데이트", completed: true, priority: "low" },
    { id: 5, task: "만족도 리포트 작성", completed: false, priority: "medium" },
  ];

  // 차트 데이터
  const participationData = [
    { name: "7/29", value: 88 },
    { name: "7/30", value: 91 },
    { name: "7/31", value: 85 },
    { name: "8/1", value: 93 },
    { name: "8/2", value: 89 },
    { name: "8/3", value: 95 },
    { name: "8/4", value: 92 },
    { name: "8/5", value: 87 },
    { name: "8/6", value: 94 },
    { name: "8/7", value: 90 },
    { name: "8/8", value: 96 },
    { name: "8/9", value: 88 },
    { name: "8/10", value: 91 },
    { name: "8/11", value: 93 },
  ];

  const leftoverData = [
    { name: "8/5", value: 12.5 },
    { name: "8/6", value: 9.8 },
    { name: "8/7", value: 11.2 },
    { name: "8/8", value: 8.1 },
    { name: "8/9", value: 10.3 },
    { name: "8/10", value: 7.4 },
    { name: "8/11", value: 9.4 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-error text-white";
      case "medium":
        return "bg-warning text-white";
      case "low":
        return "bg-success text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "높음";
      case "medium":
        return "보통";
      case "low":
        return "낮음";
      default:
        return "보통";
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8 container-main">
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-3d"
            whileHover={{ scale: 1.05 }}
          >
            <AnimatedIcon animation="bounce" trigger="hover">
              <ChefHat className="w-8 h-8 text-primary" />
            </AnimatedIcon>
          </motion.div>
          <div>
            <h1 className="mb-2">급식 운영 대시보드</h1>
            <p className="text-muted-foreground">2025년 8월 12일 월요일</p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="btn-3d-primary shadow-3d text-foreground border-0 hover:shadow-3d-hover active:shadow-3d-pressed">
            <AnimatedIcon animation="rotate" trigger="hover">
              <RefreshCw className="w-4 h-4 mr-2" />
            </AnimatedIcon>
            실시간 업데이트
          </Button>
        </motion.div>
      </motion.div>

      {/* 오늘의 식단표 */}
      <ExpandableCard
        title={
          <div className="flex items-center gap-3">
            <AnimatedIcon animation="bounce" trigger="hover">
              <ChefHat className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <div>
              <h2 className="text-xl font-bold">오늘의 식단표</h2>
              <p className="text-muted-foreground text-sm">
                조식, 중식, 석식 메뉴
              </p>
            </div>
          </div>
        }
        defaultExpanded={true}
        className="shadow-3d-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 조식 */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary shadow-3d"></div>
              <h3 className="font-semibold">조식 (07:00-09:00)</h3>
            </div>
            <div className="space-y-2">
              {todayMenus.breakfast.map((menu, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-primary/5 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <Tooltip content={`${menu} - 알레르기 정보 없음`}>
                    <span className="cursor-help">{menu}</span>
                  </Tooltip>
                  {index === 0 && (
                    <Tooltip content="해산물 알레르기 주의">
                      <AlertCircle className="w-3 h-3 text-warning ml-1" />
                    </Tooltip>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 중식 */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent shadow-3d"></div>
              <h3 className="font-semibold">중식 (11:30-13:30)</h3>
            </div>
            <div className="space-y-2">
              {todayMenus.lunch.map((menu, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-accent/5 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <Tooltip content={`${menu} - 알레르기 정보 없음`}>
                    <span className="cursor-help">{menu}</span>
                  </Tooltip>
                  {index === 1 && (
                    <Tooltip content="견과류 알레르기 주의">
                      <AlertCircle className="w-3 h-3 text-warning ml-1" />
                    </Tooltip>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 석식 */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary shadow-3d"></div>
              <h3 className="font-semibold">석식 (17:30-19:30)</h3>
            </div>
            <div className="space-y-2">
              {todayMenus.dinner.map((menu, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-secondary/5 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <Tooltip content={`${menu} - 알레르기 정보 없음`}>
                    <span className="cursor-help">{menu}</span>
                  </Tooltip>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ExpandableCard>

      {/* 핵심 지표 카드들 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card3D key={index} hoverable clickable>
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-16 h-16 rounded-full ${metric.bgColor} flex items-center justify-center shadow-3d`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <AnimatedIcon animation="bounce" trigger="hover">
                    <Icon className={`w-8 h-8 ${metric.iconColor}`} />
                  </AnimatedIcon>
                </motion.div>
                {metric.change && (
                  <motion.div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium shadow-3d ${
                      metric.changeType === "increase"
                        ? "bg-error/10 text-error"
                        : "bg-success/10 text-success"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {metric.changeType === "increase" ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {metric.change}
                    {metric.unit === "원" ? "%" : metric.unit}
                  </motion.div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {metric.subtitle}
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                  <CountUpNumber
                    value={metric.value}
                    className={`number-emphasis-xl ${metric.iconColor}`}
                    suffix={metric.unit === "원" ? "" : metric.unit}
                    prefix={metric.unit === "원" ? "" : ""}
                  />
                  {metric.unit === "원" && (
                    <span className="text-lg font-medium text-muted-foreground">
                      원
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold">{metric.title}</h4>
                {metric.allergies && metric.allergies.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {metric.allergies.map((allergy, i) => (
                      <Tooltip key={i} content={`${allergy} 알레르기 주의`}>
                        <Badge
                          variant="outline"
                          className="text-xs bg-warning/10 text-warning border-warning/30"
                        >
                          {allergy}
                        </Badge>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </div>
            </Card3D>
          );
        })}
      </motion.div>

      {/* 만족도 메뉴 섹션 */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* 만족도 TOP 5 */}
        <ExpandableCard
          title={
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-3d"
                whileHover={{ scale: 1.1 }}
              >
                <Star className="w-6 h-6 text-primary fill-primary" />
              </motion.div>
              <div>
                <h3 className="font-bold">만족도 TOP 5 메뉴</h3>
                <p className="text-sm text-muted-foreground">
                  평점 및 만족도 %
                </p>
              </div>
            </div>
          }
          className="shadow-3d-card"
        >
          <div className="space-y-4">
            {topMenus.map((menu, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-primary/5 border border-primary/20 shadow-3d hover:shadow-3d-hover transition-all cursor-pointer"
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => toggleSection(`top-${index}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-3d"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="font-medium">{menu.name}</span>
                    {menu.allergies.length > 0 && (
                      <Tooltip
                        content={`알레르기: ${menu.allergies.join(", ")}`}
                      >
                        <AlertCircle className="w-4 h-4 text-warning" />
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="font-bold text-primary flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Star className="w-4 h-4 fill-primary" />
                      {menu.rating}
                    </motion.div>
                    <Badge variant="outline" className="text-xs bg-primary/10">
                      {menu.satisfaction}%
                    </Badge>
                  </div>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ originX: 0 }}
                >
                  <Progress
                    value={menu.satisfaction}
                    className="h-3 bg-primary/20 [&>div]:bg-primary shadow-3d"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ExpandableCard>

        {/* 개선 필요 TOP 5 */}
        <ExpandableCard
          title={
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center shadow-3d"
                whileHover={{ scale: 1.1 }}
              >
                <TrendingDown className="w-6 h-6 text-error" />
              </motion.div>
              <div>
                <h3 className="font-bold">개선 필요 TOP 5 메뉴</h3>
                <p className="text-sm text-muted-foreground">
                  평점 및 만족도 %
                </p>
              </div>
            </div>
          }
          className="shadow-3d-card"
        >
          <div className="space-y-4">
            {improvementMenus.map((menu, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-error/5 border border-error/20 shadow-3d hover:shadow-3d-hover transition-all cursor-pointer"
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => toggleSection(`improvement-${index}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center text-sm font-bold shadow-3d"
                      whileHover={{ scale: 1.1, rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="font-medium">{menu.name}</span>
                    {menu.allergies.length > 0 && (
                      <Tooltip
                        content={`알레르기: ${menu.allergies.join(", ")}`}
                      >
                        <AlertCircle className="w-4 h-4 text-warning" />
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="font-bold text-error flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Star className="w-4 h-4" />
                      {menu.rating}
                    </motion.div>
                    <Badge variant="outline" className="text-xs bg-error/10">
                      {menu.satisfaction}%
                    </Badge>
                  </div>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ originX: 0 }}
                >
                  <Progress
                    value={menu.satisfaction}
                    className="h-3 bg-error/20 [&>div]:bg-error shadow-3d"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ExpandableCard>
      </motion.div>

      {/* 차트 및 To-Do 섹션 */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* 식단 참여율 추이 */}
        <Card3D hoverable className="shadow-3d-card">
          <div className="flex items-center gap-3 mb-4">
            <AnimatedIcon animation="bounce" trigger="hover">
              <TrendingUp className="w-6 h-6 text-info" />
            </AnimatedIcon>
            <div>
              <h3 className="font-bold">식단 참여율 추이</h3>
              <p className="text-sm text-muted-foreground">최근 2주</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <SimpleLineChart
              data={participationData}
              color="#4FC3F7"
              height={180}
            />
          </motion.div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">평균 참여율</span>
            <CountUpNumber
              value={91}
              className="font-bold text-info"
              suffix="%"
            />
          </div>
        </Card3D>

        {/* 잔반량 변화 */}
        <Card3D hoverable className="shadow-3d-card">
          <div className="flex items-center gap-3 mb-4">
            <AnimatedIcon animation="bounce" trigger="hover">
              <Trash2 className="w-6 h-6 text-warning" />
            </AnimatedIcon>
            <div>
              <h3 className="font-bold">잔반량 변화</h3>
              <p className="text-sm text-muted-foreground">최근 1주</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <SimpleBarChart data={leftoverData} color="#F4C542" height={180} />
          </motion.div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">평균 잔반량</span>
            <CountUpNumber
              value={9.8}
              className="font-bold text-warning"
              suffix="kg"
              decimals={1}
            />
          </div>
        </Card3D>

        {/* To-Do 리스트 */}
        <ExpandableCard
          title={
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-3d"
                whileHover={{ scale: 1.1 }}
              >
                <CheckCircle className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-bold">To-Do 리스트</h3>
                <p className="text-sm text-muted-foreground">체크리스트</p>
              </div>
            </div>
          }
          defaultExpanded={true}
          className="shadow-3d-card"
        >
          <div className="space-y-3">
            {todoItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all shadow-3d hover:shadow-3d-hover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Checkbox
                      checked={item.completed}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </motion.div>
                  <span
                    className={`text-sm ${
                      item.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {item.task}
                  </span>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge
                    className={`text-xs shadow-3d ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {getPriorityText(item.priority)}
                  </Badge>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="w-full shadow-3d hover:shadow-3d-hover hover:bg-primary/10 hover:border-primary/30"
            >
              전체 To-Do 관리
            </Button>
          </motion.div>
        </ExpandableCard>
      </motion.div>
    </div>
  );
}
