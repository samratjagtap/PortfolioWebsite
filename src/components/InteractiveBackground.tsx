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
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);

      // Create core nodes (larger, more stable)
      for (let i = 0; i < Math.floor(nodeCount * 0.3); i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 4 + 3,
          connections: [],
          energy: Math.random() * 0.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          type: 'core' as const
        });
      }

      // Create satellite nodes (medium, moderate movement)
      for (let i = 0; i < Math.floor(nodeCount * 0.5); i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 2,
          connections: [],
          energy: Math.random() * 0.3 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          type: 'satellite' as const
        });
      }

      // Create data nodes (small, fast moving)
      for (let i = 0; i < Math.floor(nodeCount * 0.2); i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 1 + 1,
          connections: [],
          energy: Math.random() * 0.8 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          type: 'data' as const
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
      // Get theme colors
      const coreColor = themeConfig.nodeColors.core;
      const satelliteColor = themeConfig.nodeColors.satellite;
      const dataColor = themeConfig.nodeColors.data;

      // Clear with theme-appropriate fade
      const fadeOpacity = themeConfig.name === 'Light' ? '0.1' : '0.05';
      const bgColor = themeConfig.name === 'Light' ? '248, 250, 252' : '15, 23, 42';
      ctx.fillStyle = `rgba(${bgColor}, ${fadeOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const time = timestamp * 0.001;

      // Update nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrapping with smooth transition
        if (node.x < -50) node.x = canvas.width + 50;
        if (node.x > canvas.width + 50) node.x = -50;
        if (node.y < -50) node.y = canvas.height + 50;
        if (node.y > canvas.height + 50) node.y = -50;

        // Mouse interaction - create energy waves
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          const angle = Math.atan2(dy, dx);
          
          // Repulsion effect
          node.vx -= Math.cos(angle) * force * 0.02;
          node.vy -= Math.sin(angle) * force * 0.02;
          
          // Energy boost
          node.energy = Math.min(1, node.energy + force * 0.01);
        }

        // Apply friction
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Update energy decay
        node.energy = Math.max(0.1, node.energy - 0.002);

        // Update pulse phase
        node.pulsePhase += 0.05;
      });

      // Find connections and draw network
      nodes.forEach((node, i) => {
        node.connections = [];
        
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let maxDistance = 120;
            if (node.type === 'core' && otherNode.type === 'core') maxDistance = 180;
            if (node.type === 'data' || otherNode.type === 'data') maxDistance = 80;

            if (distance < maxDistance) {
              node.connections.push(j);
              
              // Draw connection
              const opacity = (1 - distance / maxDistance) * node.energy * otherNode.energy;
              const connectionStrength = Math.sin(time + node.pulsePhase) * 0.3 + 0.7;
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              
              // Theme-appropriate connection colors
              let color = `rgba(${satelliteColor}, ${opacity * connectionStrength * 0.4})`;
              if (node.type === 'core' && otherNode.type === 'core') {
                color = `rgba(${coreColor}, ${opacity * connectionStrength * 0.6})`;
              } else if (node.type === 'data' || otherNode.type === 'data') {
                color = `rgba(${dataColor}, ${opacity * connectionStrength * 0.3})`;
              }
              
              ctx.strokeStyle = color;
              ctx.lineWidth = Math.max(0.5, opacity * 2);
              ctx.stroke();

              // Data flow animation
              if (Math.random() < 0.01 && opacity > 0.3) {
                const flowX = node.x + (otherNode.x - node.x) * (Math.sin(time * 2) * 0.5 + 0.5);
                const flowY = node.y + (otherNode.y - node.y) * (Math.sin(time * 2) * 0.5 + 0.5);
                
                ctx.beginPath();
                ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`;
                ctx.fill();
              }
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const size = node.size * pulse * node.energy;
        
        // Node glow with theme colors
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3);
        
        let nodeColor = satelliteColor;
        if (node.type === 'core') nodeColor = coreColor;
        else if (node.type === 'data') nodeColor = dataColor;
        
        gradient.addColorStop(0, `rgba(${nodeColor}, ${node.energy * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${nodeColor}, ${node.energy * 0.3})`);
        gradient.addColorStop(1, `rgba(${nodeColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${node.energy})`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x - size * 0.3, node.y - size * 0.3, size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.energy * 0.3})`;
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
    switch (themeConfig.name) {
      case 'Light':
        return 'linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%)';
      case 'Fire':
        return 'radial-gradient(ellipse at center, #1a1a1a 0%, #2d1b1b 50%, #000000 100%)';
      case 'Funky':
        return 'radial-gradient(ellipse at center, #2d1b69 0%, #1a0d3d 50%, #0f0624 100%)';
      default:
        return 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)';
    }
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