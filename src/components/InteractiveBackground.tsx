import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    connections: number[];
    energy: number;
    pulsePhase: number;
    type: 'core' | 'satellite' | 'data';
  }>>([]);

  const { themeConfig } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };

    const initializeNodes = () => {
      const nodes = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / 40000);

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          connections: [],
          energy: 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          type: 'core' as const
        });
      }

      nodesRef.current = nodes;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (timestamp: number) => {
      const coreColor = themeConfig.nodeColor;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const time = timestamp * 0.001;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = canvas.width + 20;
        if (node.x > canvas.width + 20) node.x = -20;
        if (node.y < -20) node.y = canvas.height + 20;
        if (node.y > canvas.height + 20) node.y = -20;

        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          const force = (250 - distance) / 250;
          const angle = Math.atan2(dy, dx);

          node.vx -= Math.cos(angle) * force * 0.5;
          node.vy -= Math.sin(angle) * force * 0.5;

          node.energy = Math.min(1, 0.3 + force * 0.7);
        } else {
          node.energy = Math.max(0.2, node.energy - 0.01);
        }

        node.vx *= 0.98;
        node.vy *= 0.98;
        node.pulsePhase += 0.03;
      });

      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 150;

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * Math.max(node.energy, otherNode.energy) * 0.3;

              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.strokeStyle = `rgba(${coreColor}, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      nodes.forEach((node) => {
        const size = node.size * (Math.sin(node.pulsePhase) * 0.2 + 0.8);

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4);
        gradient.addColorStop(0, `rgba(${coreColor}, ${node.energy * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${coreColor}, ${node.energy * 0.2})`);
        gradient.addColorStop(1, `rgba(${coreColor}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreColor}, ${node.energy})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [themeConfig]);

  // Dynamic background gradient based on theme
  const getBackgroundStyle = () => {
    return themeConfig.mode === 'light' ? '#ffffff' : '#020617';
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: getBackgroundStyle()
      }}
    />
  );
};