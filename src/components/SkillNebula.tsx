import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

interface TagItem {
  text: string;
  cls: string;
}

function fibonacciSphere(n: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

export default function SkillNebula({
  tags,
  onTagClick,
}: {
  tags: TagItem[];
  onTagClick: (text: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickRef = useRef(onTagClick);
  onClickRef.current = onTagClick;
  const [rebuild, setRebuild] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;
    if (W < 60 || H < 60) return;
    let lastW = W;

    // Sphere radius scales with container width (ref: 2.7 at 700px)
    const SPHERE_R = (W / 700) * 2.7;

    /* ---- Scene ---- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 50);
    camera.position.set(0, 0, 9);

    /* ---- CSS2D ---- */
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(W, H);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    /* ---- Sphere group ---- */
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    /* ---- Labels ---- */
    const fibPoints = fibonacciSphere(tags.length);
    const labelEls: HTMLSpanElement[] = [];

    tags.forEach((tag, i) => {
      const el = document.createElement('span');
      el.className = 'sphere-label';
      el.textContent = tag.text;
      el.style.cssText = `
        color:#E1E0CC;
        font-size:16px;
        font-weight:400;
        letter-spacing:0.01em;
        text-shadow:0 0 10px rgba(180,190,255,0.4);
        white-space:nowrap;
        cursor:pointer;
        pointer-events:auto;
      `;
      el.addEventListener('mouseenter', () => { el.style.color = '#fff'; });
      el.addEventListener('mouseleave', () => { el.style.color = '#E1E0CC'; });

      const label = new CSS2DObject(el);
      const p = fibPoints[i];
      label.position.set(p.x * SPHERE_R, p.y * SPHERE_R, p.z * SPHERE_R);
      sphereGroup.add(label);
      labelEls.push(el);
    });

    /* ---- Physics ---- */
    let velX = 0;
    let velY = 0;
    const FRICTION = 0.945;
    const SENSITIVITY = 0.004;
    const MIN_VEL = 0.0003;
    let pointerDown = false;
    let dragDistance = 0;
    let lastX = 0;
    let lastY = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      pointerDown = true;
      isDragging = false;
      dragDistance = 0;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      if (dragDistance > 4) isDragging = true;
      if (isDragging) {
        sphereGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * SENSITIVITY);
        sphereGroup.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * SENSITIVITY);
        velX = dx * SENSITIVITY;
        velY = dy * SENSITIVITY;
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      pointerDown = false;
      if (!isDragging) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const labelEl = target?.closest?.('.sphere-label') as HTMLElement | null;
        const word = labelEl?.textContent;
        if (word) onClickRef.current(word);
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    /* ---- Animation ---- */
    let animId = 0;
    const clock = new THREE.Clock();
    const cameraPos = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);

      if (!pointerDown) {
        if (Math.abs(velX) > MIN_VEL || Math.abs(velY) > MIN_VEL) {
          sphereGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), velX);
          sphereGroup.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), velY);
          velX *= FRICTION;
          velY *= FRICTION;
        } else {
          velX = 0;
          velY = 0;
          sphereGroup.rotation.y += 0.15 * dt;
        }
      }

      // Smooth opacity: back 0.4 → front 1.0
      camera.getWorldPosition(cameraPos);
      const children = sphereGroup.children;
      for (let i = 0; i < children.length; i++) {
        const obj = children[i] as CSS2DObject;
        const wp = new THREE.Vector3();
        obj.getWorldPosition(wp);
        const toCam = cameraPos.clone().sub(wp).normalize();
        const normal = wp.clone().normalize();
        const dot = toCam.dot(normal);
        obj.element.style.opacity = String(0.1 + (dot + 1) * 0.45);
      }

      labelRenderer.render(scene, camera);
    };
    animate();

    /* ---- Resize ---- */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      labelRenderer.setSize(w, h);

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newW = container.clientWidth;
        if (Math.abs(newW - lastW) > 80) {
          setRebuild(r => r + 1);
        }
      }, 400);
    };
    window.addEventListener('resize', onResize);

    /* ---- Cleanup ---- */
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeChild(labelRenderer.domElement);
      scene.clear();
    };
  }, [tags, rebuild]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        height: 'clamp(420px,58vh,560px)',
        margin: '0 auto',
        cursor: 'grab',
      }}
    />
  );
}
