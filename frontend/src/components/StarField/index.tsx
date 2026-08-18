import { useEffect, useRef } from 'react';
import styles from './StarField.module.css';

interface StarFieldProps {
  variant?: 'hero' | 'background';
}

const StarField = ({ variant = 'background' }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      if (variant === 'background') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    setCanvasSize();

    const colors = [
      'rgba(167, 139, 250, ', // purple (primary)
      'rgba(192, 132, 252, ', // secondary purple
      'rgba(217, 70, 239, ',  // accent pink
      'rgba(244, 114, 182, ', // lighter pink
    ];

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
      vx?: number;
      vy?: number;
    }> = [];

    if (variant === 'hero') {
      // Hero variant: 3D parallax with depth
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    } else {
      // Background variant: 2D moving stars
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: 0,
          radius: Math.random() * 2,
          opacity: Math.random(),
          pulseSpeed: Math.random() * 0.02 + 0.01,
          color: 'rgba(167, 139, 250, ',
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    }

    // Shooting stars (hero only)
    const shootingStars: Array<{
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
      active: boolean;
    }> = [];

    const createShootingStar = () => {
      if (variant === 'hero' && Math.random() < 0.02 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          len: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          opacity: 1,
          active: true,
        });
      }
    };

    let animationId: number;
    const animate = () => {
      // Use clearRect for both variants to ensure proper fading
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (variant === 'hero') {
        // Draw background color
        ctx.fillStyle = 'rgba(15, 10, 30, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Animate stars
      stars.forEach((star) => {
        if (variant === 'hero') {
          // 3D parallax effect
          star.z -= 0.5;
          if (star.z <= 0) {
            star.z = 1000;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
          }

          const scale = 1000 / star.z;
          const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
          const y = (star.y - canvas.height / 2) * scale + canvas.height / 2;
          const size = star.radius * scale;

          // Pulse effect
          star.opacity += star.pulseSpeed;
          if (star.opacity > 1 || star.opacity < 0.3) {
            star.pulseSpeed *= -1;
          }

          // Draw with glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
          gradient.addColorStop(0, `${star.color}${star.opacity})`);
          gradient.addColorStop(0.5, `${star.color}${star.opacity * 0.5})`);
          gradient.addColorStop(1, `${star.color}0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 2D moving stars
          star.x += star.vx!;
          star.y += star.vy!;

          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          star.opacity += star.pulseSpeed;
          if (star.opacity > 1 || star.opacity < 0.3) {
            star.pulseSpeed *= -1;
          }

          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 2);
          gradient.addColorStop(0, `rgba(167, 139, 250, ${star.opacity})`);
          gradient.addColorStop(0.5, `rgba(217, 70, 239, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Animate shooting stars (hero only)
      createShootingStar();
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        star.x += star.speed;
        star.y += star.speed * 0.5;
        // Make shooting star trails fade out faster
        star.opacity -= 0.035;

        if (star.opacity <= 0) {
          shootingStars.splice(index, 1);
          return;
        }

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.len, star.y - star.len * 0.5
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(167, 139, 250, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.len, star.y - star.len * 0.5);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={variant === 'hero' ? styles.canvasHero : styles.canvas}
    />
  );
};

export default StarField;
