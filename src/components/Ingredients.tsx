import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

export function Ingredients() {
  const inventoryData = [
    {
      name: "쌀",
      current: 25,
      total: 50,
      unit: "kg",
      status: "normal",
      cost: "₩45,000",
    },
    {
      name: "양파",
      current: 8,
      total: 30,
      unit: "kg",
      status: "low",
      cost: "₩12,000",
    },
    {
      name: "감자",
      current: 5,
      total: 25,
      unit: "kg",
      status: "critical",
      cost: "₩8,500",
    },
    {
      name: "돼지고기",
      current: 15,
      total: 20,
      unit: "kg",
      status: "normal",
      cost: "₩180,000",
    },
    {
      name: "닭고기",
      current: 12,
      total: 15,
      unit: "kg",
      status: "normal",
      cost: "₩84,000",
    },
    {
      name: "고등어",
      current: 3,
      total: 10,
      unit: "kg",
      status: "low",
      cost: "₩24,000",
    },
    {
      name: "두부",
      current: 20,
      total: 30,
      unit: "모",
      status: "normal",
      cost: "₩15,000",
    },
    {
      name: "김치",
      current: 40,
      total: 50,
      unit: "kg",
      status: "normal",
      cost: "₩32,000",
    },
  ];

  const orderRequests = [
    {
      id: "ORD-001",
      items: ["양파 20kg", "감자 20kg", "고등어 7kg"],
      status: "pending",
      date: "2025-08-04",
      total: "₩85,000",
      supplier: "신선마트",
    },
    {
      id: "ORD-002",
      items: ["쌀 25kg", "돼지고기 10kg"],
      status: "approved",
      date: "2025-08-03",
      total: "₩120,000",
      supplier: "농협",
    },
    {
      id: "ORD-003",
      items: ["김치 10kg", "두부 15모"],
      status: "delivered",
      date: "2025-08-02",
      total: "₩45,000",
      supplier: "로컬푸드",
    },
  ];

  const monthlyStats = {
    totalSpent: "₩1,250,000",
    totalOrders: 15,
    avgPerOrder: "₩83,333",
    topItems: ["쌀", "돼지고기", "양파", "김치"],
    budgetUsed: 78,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-destructive";
      case "low":
        return "text-warning";
      case "normal":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive/10";
      case "low":
        return "bg-warning/10";
      case "normal":
        return "bg-success/10";
      default:
        return "bg-muted/10";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-warning border-warning">
            승인 대기
          </Badge>
        );
      case "approved":
        return <Badge className="bg-info text-white">승인됨</Badge>;
      case "delivered":
        return <Badge className="bg-success text-white">배송 완료</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "low":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "normal":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            식자재 관리
          </h1>
          <p className="text-muted-foreground">
            재고 현황과 발주를 효율적으로 관리하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            발주 이력
          </Button>
          <Button size="sm" className="gradient-primary text-white border-0">
            <ShoppingCart className="w-4 h-4 mr-2" />
            발주 요청
          </Button>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">
                이번 달
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">총 지출</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.totalSpent}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                예산 사용률 {monthlyStats.budgetUsed}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-success" />
              </div>
              <Badge variant="outline" className="text-xs">
                발주 건수
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">총 발주</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.totalOrders}건
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                지난 달 대비 +2건
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-warning" />
              </div>
              <Badge variant="outline" className="text-xs">
                평균
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">평균 발주액</p>
              <p className="text-2xl font-bold text-foreground">
                {monthlyStats.avgPerOrder}
              </p>
              <p className="text-xs text-muted-foreground mt-1">건당 평균</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-info" />
              </div>
              <Badge variant="outline" className="text-xs">
                주요 품목
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">TOP 식자재</p>
              <div className="flex flex-wrap gap-1">
                {monthlyStats.topItems.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">재고 현황</TabsTrigger>
          <TabsTrigger value="orders">발주 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                현재 재고 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventoryData.map((item, index) => {
                  const percentage = (item.current / item.total) * 100;
                  return (
                    <Card
                      key={index}
                      className={`border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                        item.status === "critical"
                          ? "border-destructive/30"
                          : item.status === "low"
                          ? "border-warning/30"
                          : "border-success/30"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">{item.name}</span>
                          {getStatusIcon(item.status)}
                        </div>

                        <div className="space-y-3">
                          <Progress
                            value={percentage}
                            className={`h-2 ${
                              item.status === "critical"
                                ? "[&>div]:bg-destructive"
                                : item.status === "low"
                                ? "[&>div]:bg-warning"
                                : "[&>div]:bg-success"
                            }`}
                          />

                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              재고량
                            </span>
                            <span
                              className={`font-medium ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.current}/{item.total}
                              {item.unit}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              재고가치
                            </span>
                            <span className="font-medium">{item.cost}</span>
                          </div>

                          <div
                            className={`px-2 py-1 rounded-full text-xs text-center ${getStatusBg(
                              item.status
                            )}`}
                          >
                            <span className={getStatusColor(item.status)}>
                              {item.status === "critical"
                                ? "긴급 발주 필요"
                                : item.status === "low"
                                ? "발주 권장"
                                : "재고 충분"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                발주 요청 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderRequests.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium">{order.id}</span>
                            <p className="text-sm text-muted-foreground">
                              {order.supplier}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {order.total}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.date}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          발주 품목:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <Badge key={index} variant="outline">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {getStatusBadge(order.status)}
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
