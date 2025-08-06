import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  useCountUp,
  use3DButton,
  useLoadingToCheck,
  useExpandable,
  useTooltip,
} from "../../components/hooks/useAnimations";
import { CheckCircle, Loader2 } from "lucide-react";

// 3D 카드 컴포넌트
interface Card3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  clickable?: boolean;
}

export function Card3D({
  children,
  className = "",
  onClick,
  hoverable = true,
  clickable = false,
}: Card3DProps) {
  return (
    <motion.div
      className={`card-3d shadow-3d-card ${
        hoverable ? "hover:shadow-3d-card-hover" : ""
      } ${clickable ? "interactive-card cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -4 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// 3D 버튼 컴포넌트
interface Button3DProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button3D({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
}: Button3DProps) {
  const { buttonProps } = use3DButton();

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "btn-3d-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border-2 border-primary text-primary bg-transparent",
  };

  return (
    <motion.button
      {...buttonProps}
      className={`
        rounded-lg font-semibold transition-all duration-200 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 1 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );
}

// 숫자 카운팅 컴포넌트
interface CountUpNumberProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function CountUpNumber({
  value,
  duration = 1000,
  className = "",
  suffix = "",
  prefix = "",
  decimals = 0,
}: CountUpNumberProps) {
  const { count, animate } = useCountUp(value, duration);

  React.useEffect(() => {
    animate();
  }, [value]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <motion.span
      className={`number-emphasis animate-countUp ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
}

// 로딩 to 체크마크 버튼
interface LoadingButtonProps {
  children: ReactNode;
  onSubmit: () => Promise<boolean>;
  className?: string;
  variant?: "primary" | "secondary";
}

export function LoadingButton({
  children,
  onSubmit,
  className = "",
  variant = "primary",
}: LoadingButtonProps) {
  const { status, startLoading, setSuccess, setError, reset } =
    useLoadingToCheck();

  const handleClick = async () => {
    startLoading();
    try {
      const success = await onSubmit();
      if (success) {
        setSuccess();
        setTimeout(reset, 2000);
      } else {
        setError();
        setTimeout(reset, 2000);
      }
    } catch (error) {
      setError();
      setTimeout(reset, 2000);
    }
  };

  const getContent = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-4 h-4 animate-loading" />;
      case "success":
        return (
          <CheckCircle className="w-4 h-4 animate-checkmark text-success" />
        );
      case "error":
        return <span className="text-error">오류</span>;
      default:
        return children;
    }
  };

  return (
    <Button3D
      variant={variant}
      onClick={handleClick}
      disabled={status === "loading"}
      className={className}
    >
      {getContent()}
    </Button3D>
  );
}

// 확장 가능한 카드
interface ExpandableCardProps {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  headerClassName?: string;
}

export function ExpandableCard({
  title,
  children,
  defaultExpanded = false,
  className = "",
  headerClassName = "",
}: ExpandableCardProps) {
  const { isExpanded, toggle, containerProps } = useExpandable(defaultExpanded);

  return (
    <Card3D className={className} clickable>
      <div
        className={`flex items-center justify-between cursor-pointer ${headerClassName}`}
        onClick={toggle}
      >
        <div>{title}</div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground"
        >
          ▼
        </motion.div>
      </div>
      <div {...containerProps}>
        <motion.div
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : -10,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-4"
        >
          {children}
        </motion.div>
      </div>
    </Card3D>
  );
}

// 애니메이션 아이콘
interface AnimatedIconProps {
  children: ReactNode;
  animation?: "bounce" | "rotate" | "pulse";
  trigger?: "hover" | "always";
  className?: string;
}

export function AnimatedIcon({
  children,
  animation = "bounce",
  trigger = "hover",
  className = "",
}: AnimatedIconProps) {
  const animationClasses = {
    bounce: trigger === "hover" ? "icon-hover" : "animate-bounce",
    rotate: trigger === "hover" ? "icon-rotate" : "animate-rotate",
    pulse: "animate-pulse",
  };

  return (
    <div className={`inline-block ${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  );
}

// 툴팁 컴포넌트
interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const { tooltipProps } = useTooltip(content);

  return <div {...tooltipProps}>{children}</div>;
}

// 상태 표시기
interface StatusIndicatorProps {
  status: "active" | "warning" | "error";
  children: ReactNode;
  className?: string;
}

export function StatusIndicator({
  status,
  children,
  className = "",
}: StatusIndicatorProps) {
  return (
    <div className={`status-indicator status-${status} ${className}`}>
      {children}
    </div>
  );
}

// 삭제 가능한 아이템
interface DeletableItemProps {
  children: ReactNode;
  onDelete: () => void;
  className?: string;
}

export function DeletableItem({
  children,
  onDelete,
  className = "",
}: DeletableItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  return (
    <motion.div
      className={className}
      animate={
        isDeleting ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div onClick={handleDelete}>{children}</div>
    </motion.div>
  );
}
