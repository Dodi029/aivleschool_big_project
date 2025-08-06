import { useState, useRef } from "react";

// 숫자 카운팅 애니메이션 훅
export function useCountUp(
  end: number,
  duration: number = 1000,
  start: number = 0
) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = () => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = start;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return { count, animate, isAnimating };
}

// 3D 버튼 상태 훅
export function use3DButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
    },
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    className: `btn-3d ${isHovered ? "shadow-3d-hover" : "shadow-3d"} ${
      isPressed ? "shadow-3d-pressed" : ""
    }`,
  };

  return { buttonProps, isPressed, isHovered };
}

// 로딩 상태와 체크마크 애니메이션 훅
export function useLoadingToCheck() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const startLoading = () => setStatus("loading");
  const setSuccess = () => setStatus("success");
  const setError = () => setStatus("error");
  const reset = () => setStatus("idle");

  return { status, startLoading, setSuccess, setError, reset };
}

// 확장/축소 애니메이션 훅
export function useExpandable(initialState: boolean = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const expand = () => {
    if (!isExpanded) toggle();
  };

  const collapse = () => {
    if (isExpanded) toggle();
  };

  return {
    isExpanded,
    isAnimating,
    toggle,
    expand,
    collapse,
    contentRef,
    containerProps: {
      ref: contentRef,
      className: `expandable ${isExpanded ? "expanded" : ""}`,
    },
  };
}

// 삭제 애니메이션 훅
export function useDeleteAnimation() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const startDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleted(true);
    }, 500);
  };

  const reset = () => {
    setIsDeleting(false);
    setIsDeleted(false);
  };

  return {
    isDeleting,
    isDeleted,
    startDelete,
    reset,
    className: isDeleting ? "animate-scaleOut" : "",
  };
}

// 툴팁 훅
export function useTooltip(content: string) {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipProps = {
    "data-tooltip": content,
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
    className: "tooltip",
  };

  return { tooltipProps, isVisible };
}

// 슬라이드 인/아웃 애니메이션 훅
export function useSlideAnimation(
  direction: "up" | "down" | "left" | "right" = "down"
) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const slideIn = () => {
    setIsVisible(true);
    setAnimationClass(
      `animate-slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`
    );
  };

  const slideOut = () => {
    setAnimationClass("animate-fadeOut");
    setTimeout(() => {
      setIsVisible(false);
      setAnimationClass("");
    }, 300);
  };

  const toggle = () => {
    if (isVisible) {
      slideOut();
    } else {
      slideIn();
    }
  };

  return {
    isVisible,
    slideIn,
    slideOut,
    toggle,
    animationClass,
  };
}
