import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SimpleLineChart } from "./charts/SimpleChart";
import {
  MessageSquare,
  TrendingDown,
  Star,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Utensils,
  BarChart3,
  MessageCircle,
  Heart,
} from "lucide-react";

export function Feedback() {
  // 메뉴별 잔반량 추이 데이터
  const leftoverTrendData = [
    { name: "7/29", value: 12.5 },
    { name: "7/30", value: 9.8 },
    { name: "7/31", value: 14.2 },
    { name: "8/1", value: 7.1 },
    { name: "8/2", value: 10.3 },
    { name: "8/3", value: 6.4 },
    { name: "8/4", value: 8.2 },
  ];

  // 만족도 상위 메뉴
  const topSatisfactionMenus = [
    { name: "김치찌개", score: 4.8, leftover: 2.1, participation: 98 },
    { name: "불고기", score: 4.7, leftover: 1.8, participation: 95 },
    { name: "된장찌개", score: 4.5, leftover: 2.5, participation: 92 },
    { name: "갈비탕", score: 4.4, leftover: 1.9, participation: 89 },
    { name: "비빔밥", score: 4.3, leftover: 2.8, participation: 87 },
  ];

  // 만족도 하위 메뉴
  const bottomSatisfactionMenus = [
    { name: "브로콜리무침", score: 2.1, leftover: 8.5, participation: 45 },
    { name: "양배추샐러드", score: 2.3, leftover: 7.2, participation: 52 },
    { name: "시금치나물", score: 2.8, leftover: 6.1, participation: 58 },
    { name: "콩나물무침", score: 3.1, leftover: 4.8, participation: 65 },
    { name: "오이무침", score: 3.2, leftover: 4.2, participation: 68 },
  ];

  // 사용자 코멘트 데이터
  const userComments = [
    {
      id: 1,
      menu: "김치찌개",
      comment: "국물이 진하고 맛있어요! 계속 이 맛 유지해주세요.",
      sentiment: "positive",
      date: "8/4",
      time: "12:30",
    },
    {
      id: 2,
      menu: "브로콜리무침",
      comment: "너무 짜고 식감이 좋지 않습니다. 개선이 필요해요.",
      sentiment: "negative",
      date: "8/4",
      time: "12:45",
    },
    {
      id: 3,
      menu: "불고기",
      comment: "고기가 부드럽고 양념이 적당해요. 만족합니다.",
      sentiment: "positive",
      date: "8/3",
      time: "13:15",
    },
    {
      id: 4,
      menu: "양배추샐러드",
      comment: "드레싱이 너무 달고 채소가 신선하지 않네요.",
      sentiment: "negative",
      date: "8/3",
      time: "12:20",
    },
  ];

  // 특식 요청 리스트
  const specialRequests = [
    {
      id: 1,
      menu: "삼계탕",
      requester: "익명",
      date: "8/4",
      reason: "여름철 보양식으로 요청",
      votes: 23,
      status: "pending",
    },
    {
      id: 2,
      menu: "냉면",
      requester: "익명",
      date: "8/3",
      reason: "무더위 해소용",
      votes: 18,
      status: "approved",
    },
    {
      id: 3,
      menu: "피자",
      requester: "익명",
      date: "8/2",
      reason: "색다른 메뉴 도전",
      votes: 15,
      status: "rejected",
    },
    {
      id: 4,
      menu: "짜장면",
      requester: "익명",
      date: "8/1",
      reason: "직원들이 좋아하는 메뉴",
      votes: 12,
      status: "pending",
    },
  ];

  // 불만 피드백 데이터
  const complaints = [
    {
      id: 1,
      type: "맛",
      menu: "브로콜리무침",
      content: "너무 짜고 식감이 좋지 않음. 조리법 개선 필요.",
      date: "8/4",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      type: "온도",
      menu: "된장찌개",
      content: "미지근하게 나와서 맛이 떨어짐.",
      date: "8/3",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      type: "양",
      menu: "밥",
      content: "양이 부족해서 배가 고픔.",
      date: "8/2",
      status: "resolved",
      priority: "low",
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-secondary" />;
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-error" />;
      default:
        return <MessageCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-secondary/10 border-secondary/30";
      case "negative":
        return "bg-error/10 border-error/30";
      default:
        return "bg-muted/10 border-muted/30";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-warning border-warning">
            검토중
          </Badge>
        );
      case "approved":
        return <Badge className="bg-secondary text-white">승인됨</Badge>;
      case "rejected":
        return <Badge className="bg-error text-white">거절됨</Badge>;
      case "in-progress":
        return <Badge className="bg-info text-white">처리중</Badge>;
      case "resolved":
        return <Badge className="bg-success text-white">해결됨</Badge>;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-error";
      case "medium":
        return "border-l-warning";
      case "low":
        return "border-l-info";
      default:
        return "border-l-muted";
    }
  };

  return (
    <div className="space-y-6 container-main">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>피드백 분석</h1>
          <p className="text-muted-foreground">
            고객 의견과 만족도를 분석하고 개선점을 찾아보세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            리포트 내보내기
          </Button>
          <Button className="gradient-primary text-white border-0">
            <MessageSquare className="w-4 h-4 mr-2" />
            피드백 관리
          </Button>
        </div>
      </div>

      {/* 상단 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">평균 만족도</p>
                <p className="text-2xl font-bold">4.2/5</p>
              </div>
              <Star className="h-8 w-8 text-warning fill-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">일평균 잔반량</p>
                <p className="text-2xl font-bold text-warning">8.2kg</p>
              </div>
              <TrendingDown className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 피드백</p>
                <p className="text-2xl font-bold">47건</p>
              </div>
              <MessageSquare className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">미해결 불만</p>
                <p className="text-2xl font-bold text-error">3건</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상단 그래프 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 잔반량 추이 그래프 */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-warning" />
              메뉴별 잔반량 추이
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <SimpleLineChart
              data={leftoverTrendData}
              color="#FFB74D"
              height={200}
            />
            <div className="mt-4 text-center">
              <div className="text-lg font-bold text-warning">-15% ↓</div>
              <div className="text-sm text-muted-foreground">
                지난주 대비 감소
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 만족도 상위 메뉴 */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              만족도 상위 메뉴
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topSatisfactionMenus.slice(0, 5).map((menu, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-sm">{menu.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-secondary font-bold text-sm">
                      ★{menu.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {menu.leftover}kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 만족도 하위 메뉴 */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-error" />
              개선 필요 메뉴
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {bottomSatisfactionMenus.slice(0, 5).map((menu, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-error/5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-error text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-sm">{menu.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-error font-bold text-sm">
                      ★{menu.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {menu.leftover}kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 하단 사용자 피드백 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 코멘트 요약 */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-info" />
              최근 코멘트 요약
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {userComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg border-l-4 ${getSentimentBg(
                    comment.sentiment
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {comment.menu}
                      </Badge>
                      {getSentimentIcon(comment.sentiment)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {comment.date} {comment.time}
                    </div>
                  </div>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              모든 코멘트 보기
            </Button>
          </CardContent>
        </Card>

        {/* 특식 요청 리스트 */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              특식 요청 리스트
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {specialRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{request.menu}</span>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-error" />
                      <span className="text-sm font-medium">
                        {request.votes}표
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {request.reason}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{request.requester}</span>
                    <span>{request.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              모든 요청 보기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 불만 피드백 알림 */}
      <Card className="elevation-2 border-error/50">
        <CardHeader className="bg-error/5">
          <CardTitle className="flex items-center gap-2 text-error">
            <AlertTriangle className="w-5 h-5" />
            불만 피드백 알림
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`p-4 border-l-4 rounded-lg bg-white ${getPriorityColor(
                  complaint.priority
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {complaint.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {complaint.menu}
                    </Badge>
                    {getStatusBadge(complaint.status)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {complaint.date}
                  </span>
                </div>
                <p className="text-sm mb-3">{complaint.content}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    상세 보기
                  </Button>
                  <Button size="sm" className="bg-error text-white border-0">
                    처리하기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
