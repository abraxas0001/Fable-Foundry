// Performance monitoring and optimization utilities

// Performance metrics tracking
export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url?: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Core Web Vitals observer
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: entry.name,
              value: (entry as any).value || ((entry as any).processingStart - entry.startTime) || 0,
              timestamp: Date.now(),
              url: window.location.pathname,
            });
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        this.observers.push(observer);
      } catch (error) {
        console.warn('Performance observer not supported:', error);
      }
    }
  }

  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log critical performance issues
    if (metric.name === 'largest-contentful-paint' && metric.value > 2500) {
      console.warn(`Poor LCP detected: ${metric.value}ms on ${metric.url}`);
    }
    
    if (metric.name === 'first-input' && metric.value > 100) {
      console.warn(`Poor FID detected: ${metric.value}ms on ${metric.url}`);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getCoreWebVitals() {
    const lcp = this.metrics.find(m => m.name === 'largest-contentful-paint');
    const fid = this.metrics.find(m => m.name === 'first-input');
    const cls = this.metrics.filter(m => m.name === 'layout-shift')
      .reduce((sum, entry) => sum + entry.value, 0);

    return { lcp, fid, cls };
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Image optimization utilities
export function getOptimizedImageUrl(
  url: string, 
  width: number, 
  height?: number, 
  quality: number = 80
): string {
  // For Sanity images
  if (url.includes('cdn.sanity.io')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('auto', 'format');
    
    return `${url}?${params.toString()}`;
  }
  
  // For other CDNs, return original URL
  return url;
}

// Lazy loading utilities
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Bundle size optimization
export function dynamicImport<T>(
  importFn: () => Promise<T>,
  fallback?: T
): Promise<T> {
  return importFn().catch((error) => {
    console.error('Dynamic import failed:', error);
    if (fallback) {
      return fallback;
    }
    throw error;
  });
}

// Memory usage monitoring
export function getMemoryUsage(): any | null {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as any).memory;
  }
  return null;
}

// Network quality detection
export function getNetworkQuality(): string {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection.effectiveType || 'unknown';
  }
  return 'unknown';
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
}

// Prefetch next page resources
export function prefetchPage(href: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}