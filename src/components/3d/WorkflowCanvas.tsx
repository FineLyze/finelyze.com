"use client";

import { useEffect, useRef } from "react";

const NODES = [
  { label: "Supply Chain", sub: "Purchase Order", color: 0x06b6d4 },
  { label: "Accounting", sub: "Journal Entry", color: 0x3b82f6 },
  { label: "Taxes", sub: "Calculation", color: 0x8b5cf6 },
  { label: "FP&A", sub: "Board Report", color: 0x10b981 },
];

export default function WorkflowCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const container = mountRef.current;
    let animationId = 0;
    let renderer: import("three").WebGLRenderer | null = null;

    import("three").then((THREE) => {
      const W = container.clientWidth;
      const H = container.clientHeight;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x080d18);
      scene.fog = new THREE.FogExp2(0x080d18, 0.035);

      // Camera
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(0, 1.8, 9);
      camera.lookAt(0, 0, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const blueLight = new THREE.PointLight(0x3b82f6, 3, 20);
      blueLight.position.set(0, 5, 5);
      scene.add(blueLight);

      // Node positions — slight arc
      const nodePositions = [
        new THREE.Vector3(-4.2, -0.3, 0),
        new THREE.Vector3(-1.4, 0.3, 0),
        new THREE.Vector3(1.4, 0.3, 0),
        new THREE.Vector3(4.2, -0.3, 0),
      ];

      // Nodes
      const nodeMeshes: import("three").Mesh[] = [];
      nodePositions.forEach((pos, i) => {
        const geo = new THREE.BoxGeometry(1.5, 0.65, 0.12);
        const mat = new THREE.MeshStandardMaterial({
          color: NODES[i].color,
          emissive: NODES[i].color,
          emissiveIntensity: 0.3,
          metalness: 0.6,
          roughness: 0.3,
          transparent: true,
          opacity: 0.9,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        scene.add(mesh);
        nodeMeshes.push(mesh);

        // Glowing outline via slightly larger wireframe box
        const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.56, 0.71, 0.14));
        const edgeMat = new THREE.LineBasicMaterial({
          color: NODES[i].color,
          transparent: true,
          opacity: 0.5,
        });
        scene.add(new THREE.LineSegments(edgeGeo, edgeMat).translateX(pos.x).translateY(pos.y));
      });

      // Connection tubes
      const curvePoints = [
        nodePositions[0],
        new THREE.Vector3(-2.8, 0.6, 0),
        nodePositions[1],
        new THREE.Vector3(0, 0.8, 0),
        nodePositions[2],
        new THREE.Vector3(2.8, 0.6, 0),
        nodePositions[3],
      ];
      const curve = new THREE.CatmullRomCurve3(curvePoints);

      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.25,
      });
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.018, 6, false), tubeMat));

      // Transaction particle
      const particleGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const particleMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1.2,
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      scene.add(particle);

      // Trailing glow (slightly larger, dimmer sphere)
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.15,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), glowMat);
      scene.add(glow);

      // HTML labels
      const labelEls: HTMLDivElement[] = [];
      nodePositions.forEach((_, i) => {
        const div = document.createElement("div");
        div.style.cssText =
          "position:absolute;pointer-events:none;text-align:center;transform:translate(-50%,-50%);transition:opacity 0.3s;";
        div.innerHTML = `
          <div style="font-size:11px;font-weight:700;color:white;letter-spacing:0.02em;line-height:1.3;">${NODES[i].label}</div>
          <div style="font-size:9px;color:rgba(148,163,184,0.8);margin-top:2px;">${NODES[i].sub}</div>
        `;
        container.style.position = "relative";
        container.appendChild(div);
        labelEls.push(div);
      });

      const startTime = Date.now();
      let disposed = false;

      function animate() {
        if (disposed) return;
        animationId = requestAnimationFrame(animate);

        const elapsed = (Date.now() - startTime) / 1000;
        const t = (elapsed % 5) / 5; // 5-second loop

        // Particle travel
        const pt = curve.getPoint(t);
        particle.position.copy(pt);
        glow.position.copy(pt);

        // Brighten nearest node when particle passes
        nodeMeshes.forEach((mesh, i) => {
          const d = mesh.position.distanceTo(pt);
          const mat = mesh.material as import("three").MeshStandardMaterial;
          mat.emissiveIntensity = d < 0.8 ? 0.7 : 0.3;

          // Subtle pulse
          const pulse = 1 + Math.sin(elapsed * 1.5 + i * 1.2) * 0.015;
          mesh.scale.setScalar(pulse);
        });

        // Very slow camera drift
        camera.position.x = Math.sin(elapsed * 0.06) * 0.4;
        camera.position.y = 1.8 + Math.sin(elapsed * 0.04) * 0.15;
        camera.lookAt(0, 0, 0);

        // Update labels
        const cW = container.clientWidth;
        const cH = container.clientHeight;
        nodePositions.forEach((pos, i) => {
          const projected = pos.clone().project(camera);
          const x = ((projected.x + 1) / 2) * cW;
          const y = ((-projected.y + 1) / 2) * cH;
          // Position label above the node
          labelEls[i].style.left = x + "px";
          labelEls[i].style.top = y - 48 + "px";
        });

        renderer!.render(scene, camera);
      }

      animate();

      // Resize
      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Cleanup
      return () => {
        disposed = true;
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        labelEls.forEach((el) => el.remove());
        renderer?.dispose();
        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        scene.clear();
      };
    }).then((cleanup) => {
      if (cleanup) {
        // Store cleanup function for unmount
        (container as HTMLDivElement & { __cleanup?: () => void }).__cleanup = cleanup as unknown as () => void;
      }
    });

    return () => {
      cancelAnimationFrame(animationId);
      const el = container as HTMLDivElement & { __cleanup?: () => void };
      el.__cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
