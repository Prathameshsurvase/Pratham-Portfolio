import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Move, ExternalLink, X, Film, Sparkles, Palette } from 'lucide-react';
import { CANVAS_PORTFOLIO_ITEMS } from '../data/canvasMedia';

/* =========================================================================
   Constants & Configuration (Matched with Framer infinite-canvas engine)
   ========================================================================= */
const CHUNK_SIZE = 110;
const RENDER_DISTANCE = 2; // Renders 5x5x5 chunks around camera
const CHUNK_FADE_MARGIN = 1;
const DEPTH_FADE_START = 140;
const DEPTH_FADE_END = 260;
const INVIS_THRESHOLD = 0.01;
const INITIAL_CAMERA_Z = 50;
const KEYBOARD_SPEED = 0.18;
const VELOCITY_LERP = 0.16;
const VELOCITY_DECAY = 0.9;
const MAX_VELOCITY = 3.2;
const ITEMS_PER_CHUNK = 5;

// Precompute 3D chunk offsets (-2 to 2 in dx, dy, dz)
const CHUNK_OFFSETS = [];
for (let dx = -RENDER_DISTANCE; dx <= RENDER_DISTANCE; dx++) {
  for (let dy = -RENDER_DISTANCE; dy <= RENDER_DISTANCE; dy++) {
    for (let dz = -RENDER_DISTANCE; dz <= RENDER_DISTANCE; dz++) {
      CHUNK_OFFSETS.push({ dx, dy, dz });
    }
  }
}

// Pseudo-random and hash utilities from original engine
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}


export default function InfiniteCanvasSection() {
  const mountRef = useRef(null);
  const containerRef = useRef(null);

  // Controller State (velocity, position, drift, and mouse)
  const stateRef = useRef({
    velocity: { x: 0, y: 0, z: 0 },
    targetVel: { x: 0, y: 0, z: 0 },
    basePos: { x: 0, y: 0, z: INITIAL_CAMERA_Z },
    drift: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    scrollAccum: 0,
    isDragging: false,
    lastTouches: [],
    lastTouchDist: 0,
    isHovered: false
  });

  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const animFrameRef = useRef(null);

  const activeMeshesMapRef = useRef(new Map());
  const textureCacheRef = useRef(new Map());
  const textureCallbacksRef = useRef(new Map());
  const textureLoaderRef = useRef(null);
  const defaultGeometryRef = useRef(null);
  const activeKeysRef = useRef({});
  const videoTexturesRef = useRef(new Set());
  const hiddenVideoMountRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showControlsHint, setShowControlsHint] = useState(true);

  // Raycaster for Hover & Click detection
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRayCoordsRef = useRef(new THREE.Vector2(-999, -999));
  const hoveredMeshRef = useRef(null);

  // Robust Texture Loader with Cache and Callback dispatch
  const loadTexture = useCallback((url, onLoad) => {
    const safeUrl = encodeURI(url);
    let cached = textureCacheRef.current.get(safeUrl);
    if (cached) {
      if (onLoad) {
        if (cached.image && cached.image.complete && cached.image.naturalWidth > 0) {
          onLoad(cached);
        } else {
          let cbs = textureCallbacksRef.current.get(safeUrl);
          if (!cbs) {
            cbs = new Set();
            textureCallbacksRef.current.set(safeUrl, cbs);
          }
          cbs.add(onLoad);
        }
      }
      return cached;
    }

    if (!textureLoaderRef.current) {
      textureLoaderRef.current = new THREE.TextureLoader();
      textureLoaderRef.current.setCrossOrigin('anonymous');
    }

    const callbacks = new Set();
    if (onLoad) callbacks.add(onLoad);
    textureCallbacksRef.current.set(safeUrl, callbacks);

    const texture = textureLoaderRef.current.load(
      safeUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        const cbs = textureCallbacksRef.current.get(safeUrl);
        if (cbs) {
          cbs.forEach((cb) => {
            try { cb(tex); } catch (e) { /* ignore callback error */ }
          });
          textureCallbacksRef.current.delete(safeUrl);
        }
      },
      undefined,
      (err) => {
        console.warn('Failed to load image texture:', safeUrl, err);
      }
    );

    textureCacheRef.current.set(safeUrl, texture);
    return texture;
  }, []);

  // Multi-media texture loader (supports both Image and Video textures including converted MP4s)
  const loadMediaTexture = useCallback((media, onLoad) => {
    const isVideo = media.type === 'video' || /\.(mp4|webm|mov|m4v)$/i.test(media.url || '');
    // Gracefully resolve .MOV to .mp4 for native browser playback
    const targetUrl = (media.url || '').replace(/\.mov$/i, '.mp4');
    const safeUrl = encodeURI(targetUrl);
    
    if (isVideo) {
      if (textureCacheRef.current.has(safeUrl)) {
        const cached = textureCacheRef.current.get(safeUrl);
        if (onLoad) onLoad(cached);
        return cached;
      }

      const video = document.createElement('video');
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('webkit-playsinline', '');
      video.preload = 'auto';
      video.src = safeUrl;

      // Attach video to hidden DOM mount so Chromium renders decoding pipeline at full speed
      if (hiddenVideoMountRef.current) {
        hiddenVideoMountRef.current.appendChild(video);
      }

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.generateMipmaps = false;

      videoTexturesRef.current.add(videoTexture);
      textureCacheRef.current.set(safeUrl, videoTexture);

      const playVideo = () => {
        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {
            // Browser autoplay policy: retried on pointer movement
          });
        }
      };

      video.addEventListener('canplay', () => {
        playVideo();
        videoTexture.needsUpdate = true;
      });

      video.addEventListener('loadeddata', () => {
        playVideo();
        videoTexture.needsUpdate = true;
        if (onLoad) onLoad(videoTexture);
      });

      video.addEventListener('timeupdate', () => {
        videoTexture.needsUpdate = true;
      });

      playVideo();

      if (onLoad) {
        onLoad(videoTexture);
      }

      return videoTexture;
    }

    // Default image texture loading
    return loadTexture(media.url, onLoad);
  }, [loadTexture]);

  // Generate planes for chunk matching Framer's exact generator
  const generateChunkPlanes = useCallback((cx, cy, cz) => {
    const planes = [];
    const seed = hashString(`${cx},${cy},${cz}`);

    const videoItems = CANVAS_PORTFOLIO_ITEMS.filter((m) => m.type === 'video');

    for (let i = 0; i < ITEMS_PER_CHUNK; i++) {
      const s = seed + i * 1000;
      const r = (n) => seededRandom(s + n);
      const size = 14 + r(4) * 8; // Size 14 to 22

      // Prominently place real video shoots directly around camera on start!
      let media;
      let px, py, pz;

      if (cx === 0 && cy === 0 && cz === 0 && i === 0 && videoItems.length > 0) {
        media = videoItems[0]; // First video: directly in front, left
        px = -14;
        py = 2;
        pz = 15;
      } else if (cx === 0 && cy === 0 && cz === 0 && i === 1 && videoItems.length > 1) {
        media = videoItems[1]; // Second video: directly in front, right
        px = 16;
        py = -1;
        pz = 10;
      } else if (cx === 0 && cy === 0 && cz === 0 && i === 2 && videoItems.length > 2) {
        media = videoItems[2]; // Third video: centered slightly above
        px = 0;
        py = 14;
        pz = 22;
      } else if (cx === 0 && cy === 0 && cz === -1 && i === 0 && videoItems.length > 3) {
        media = videoItems[3]; // Fourth video: along zoom flight path
        px = -18;
        py = -8;
        pz = -30;
      } else if (cx === 0 && cy === 0 && cz === -1 && i === 1 && videoItems.length > 4) {
        media = videoItems[4]; // Fifth video: along zoom flight path
        px = 18;
        py = 10;
        pz = -45;
      } else {
        const mediaIndex = Math.floor(r(5) * 1000000);
        media = CANVAS_PORTFOLIO_ITEMS[mediaIndex % CANVAS_PORTFOLIO_ITEMS.length];
        px = (cx + (r(0) - 0.5)) * CHUNK_SIZE;
        py = (cy + (r(1) - 0.5)) * CHUNK_SIZE;
        pz = (cz + (r(2) - 0.5)) * CHUNK_SIZE;
      }

      planes.push({
        id: `${cx}-${cy}-${cz}-${i}`,
        position: new THREE.Vector3(px, py, pz),
        size,
        media,
        chunkCx: cx,
        chunkCy: cy,
        chunkCz: cz,
      });
    }

    return planes;
  }, []);

  // Main Three.js Setup and Animation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene - Pure White (#ffffff)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xffffff);

    // Linear Fog (fogNear: 120, fogFar: 320)
    scene.fog = new THREE.Fog(0xffffff, 120, 320);

    // 2. Camera (fov: 60, near: 1, far: 500)
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500);
    camera.position.set(0, 0, INITIAL_CAMERA_Z);
    cameraRef.current = camera;

    // 3. Renderer (High performance, crisp DPR)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    defaultGeometryRef.current = new THREE.PlaneGeometry(1, 1);

    // Render loop state
    let isIntersecting = true;

    // 4. Animation Loop with Active Cursor Parallax Drift
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isIntersecting) return;

      const s = stateRef.current;

      // 1. Keyboard Navigation
      const keys = activeKeysRef.current;
      const forward = keys['w'] || keys['W'] || keys['ArrowUp'];
      const backward = keys['s'] || keys['S'] || keys['ArrowDown'];
      const left = keys['a'] || keys['A'] || keys['ArrowLeft'];
      const right = keys['d'] || keys['D'] || keys['ArrowRight'];
      const down = keys['q'] || keys['Q'];
      const up = keys['e'] || keys['E'];

      if (forward) s.targetVel.z -= KEYBOARD_SPEED;
      if (backward) s.targetVel.z += KEYBOARD_SPEED;
      if (left) s.targetVel.x -= KEYBOARD_SPEED;
      if (right) s.targetVel.x += KEYBOARD_SPEED;
      if (down) s.targetVel.y -= KEYBOARD_SPEED;
      if (up) s.targetVel.y += KEYBOARD_SPEED;

      // 2. CURSOR FOLLOWING DRIFT & PARALLAX
      // Never disable drift! Mouse movement drives smooth floating camera parallax!
      const isZooming = Math.abs(s.velocity.z) > 0.05;
      const zoomFactor = THREE.MathUtils.clamp(s.basePos.z / 50, 0.4, 2.0);
      // Prominent drift amount (12-14 units) so the 3D depth shift is visibly striking!
      const driftAmount = 14.0 * zoomFactor;
      const driftLerp = isZooming ? 0.2 : 0.12;

      if (!s.isDragging) {
        // Smoothly interpolate drift towards mouse position
        s.drift.x = THREE.MathUtils.lerp(s.drift.x, s.mouse.x * driftAmount, driftLerp);
        s.drift.y = THREE.MathUtils.lerp(s.drift.y, s.mouse.y * driftAmount, driftLerp);
      }

      // Scroll accumulation to Z velocity
      s.targetVel.z += s.scrollAccum;
      s.scrollAccum *= 0.8;

      // Clamp velocities
      s.targetVel.x = THREE.MathUtils.clamp(s.targetVel.x, -MAX_VELOCITY, MAX_VELOCITY);
      s.targetVel.y = THREE.MathUtils.clamp(s.targetVel.y, -MAX_VELOCITY, MAX_VELOCITY);
      s.targetVel.z = THREE.MathUtils.clamp(s.targetVel.z, -MAX_VELOCITY, MAX_VELOCITY);

      // Velocity Lerp
      s.velocity.x = THREE.MathUtils.lerp(s.velocity.x, s.targetVel.x, VELOCITY_LERP);
      s.velocity.y = THREE.MathUtils.lerp(s.velocity.y, s.targetVel.y, VELOCITY_LERP);
      s.velocity.z = THREE.MathUtils.lerp(s.velocity.z, s.targetVel.z, VELOCITY_LERP);

      // Base position integration
      s.basePos.x += s.velocity.x;
      s.basePos.y += s.velocity.y;
      s.basePos.z += s.velocity.z;

      // Camera position with Cursor Drift
      camera.position.set(s.basePos.x + s.drift.x, s.basePos.y + s.drift.y, s.basePos.z);
      // Subtle 3D rotational tilt aligned with cursor movement
      camera.rotation.y = -s.drift.x * 0.0035;
      camera.rotation.x = s.drift.y * 0.0035;

      // Velocity Decay
      s.targetVel.x *= VELOCITY_DECAY;
      s.targetVel.y *= VELOCITY_DECAY;
      s.targetVel.z *= VELOCITY_DECAY;

      // 3. Chunk Grid Calculation
      const cx = Math.floor(s.basePos.x / CHUNK_SIZE);
      const cy = Math.floor(s.basePos.y / CHUNK_SIZE);
      const cz = Math.floor(s.basePos.z / CHUNK_SIZE);

      const activeChunkKeys = new Set();
      const currentMeshMap = activeMeshesMapRef.current;

      for (let i = 0; i < CHUNK_OFFSETS.length; i++) {
        const o = CHUNK_OFFSETS[i];
        const ucx = cx + o.dx;
        const ucy = cy + o.dy;
        const ucz = cz + o.dz;
        const key = `${ucx},${ucy},${ucz}`;
        activeChunkKeys.add(key);

        if (!currentMeshMap.has(key)) {
          const planes = generateChunkPlanes(ucx, ucy, ucz);
          const chunkMeshes = [];

          for (let p = 0; p < planes.length; p++) {
            const planeData = planes[p];
            const material = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
              depthWrite: false,
              side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(defaultGeometryRef.current, material);
            mesh.position.copy(planeData.position);
            mesh.scale.set(planeData.size, planeData.size, 1);
            mesh.visible = false;
            mesh.userData = {
              chunkCx: ucx,
              chunkCy: ucy,
              chunkCz: ucz,
              baseSize: planeData.size,
              opacity: 0,
              ready: false,
              media: planeData.media,
            };

            // Load texture with automatic aspect ratio sizing (supports image and video textures)
            loadMediaTexture(planeData.media, (tex) => {
              material.map = tex;
              material.needsUpdate = true;
              const img = tex.image;
              const updateAspect = () => {
                if (!img) return;
                const width = img.videoWidth || img.naturalWidth || img.width;
                const height = img.videoHeight || img.naturalHeight || img.height;
                if (width && height) {
                  const aspect = width / height;
                  mesh.scale.set(planeData.size * aspect, planeData.size, 1);
                }
              };

              if (img && img.tagName === 'VIDEO') {
                if (img.readyState >= 1) {
                  updateAspect();
                } else {
                  img.addEventListener('loadedmetadata', updateAspect, { once: true });
                  img.addEventListener('canplay', updateAspect, { once: true });
                }
                mesh.userData.ready = true;
              } else {
                updateAspect();
                mesh.userData.ready = true;
              }
            });

            scene.add(mesh);
            chunkMeshes.push(mesh);
          }

          currentMeshMap.set(key, chunkMeshes);
        }
      }

      // Remove out-of-range chunks
      for (const [k, meshes] of currentMeshMap.entries()) {
        if (!activeChunkKeys.has(k)) {
          for (let m = 0; m < meshes.length; m++) {
            const mesh = meshes[m];
            scene.remove(mesh);
            if (mesh.material) mesh.material.dispose();
          }
          currentMeshMap.delete(k);
        }
      }

      // 4. Exact Depth Fade & Opacity calculation
      for (const meshes of currentMeshMap.values()) {
        for (let m = 0; m < meshes.length; m++) {
          const mesh = meshes[m];
          const { chunkCx, chunkCy, chunkCz, ready } = mesh.userData;
          const material = mesh.material;

          const dist = Math.max(
            Math.abs(chunkCx - cx),
            Math.abs(chunkCy - cy),
            Math.abs(chunkCz - cz)
          );
          const absDepth = Math.abs(mesh.position.z - s.basePos.z);

          if (absDepth > DEPTH_FADE_END + 50) {
            mesh.userData.opacity = 0;
            material.opacity = 0;
            material.depthWrite = false;
            mesh.visible = false;
            continue;
          }

          const gridFade = dist <= RENDER_DISTANCE 
            ? 1 
            : Math.max(0, 1 - (dist - RENDER_DISTANCE) / Math.max(CHUNK_FADE_MARGIN, 0.0001));

          const depthFade = absDepth <= DEPTH_FADE_START
            ? 1
            : Math.max(0, 1 - (absDepth - DEPTH_FADE_START) / Math.max(DEPTH_FADE_END - DEPTH_FADE_START, 0.0001));

          const target = Math.min(gridFade, depthFade * depthFade);

          mesh.userData.opacity = target < INVIS_THRESHOLD && mesh.userData.opacity < INVIS_THRESHOLD
            ? 0
            : THREE.MathUtils.lerp(mesh.userData.opacity, target, 0.18);

          const isFullyOpaque = mesh.userData.opacity > 0.99;
          material.opacity = isFullyOpaque ? 1 : mesh.userData.opacity;
          material.depthWrite = isFullyOpaque;
          mesh.visible = mesh.userData.opacity > INVIS_THRESHOLD && ready;
        }
      }

      // 5. Raycasting for interactive click/hover
      if (mouseRayCoordsRef.current.x !== -999) {
        raycasterRef.current.setFromCamera(mouseRayCoordsRef.current, camera);
        const visibleMeshes = [];
        for (const meshes of currentMeshMap.values()) {
          for (let m = 0; m < meshes.length; m++) {
            if (meshes[m].visible && meshes[m].material.opacity > 0.25) {
              visibleMeshes.push(meshes[m]);
            }
          }
        }

        const intersects = raycasterRef.current.intersectObjects(visibleMeshes);
        if (intersects.length > 0) {
          hoveredMeshRef.current = intersects[0].object;
          if (container) container.style.cursor = 'pointer';
        } else {
          hoveredMeshRef.current = null;
          if (container) container.style.cursor = s.isDragging ? 'grabbing' : 'grab';
        }
      }

      // Ensure all active video textures play and update smoothly
      videoTexturesRef.current.forEach(vt => {
        if (vt.image) {
          if (vt.image.paused) {
            vt.image.play().catch(() => {});
          }
          if (vt.image.readyState >= 2) {
            vt.needsUpdate = true;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Ensure all video textures autoplay or resume on first user interaction or pointer move
    const triggerVideoPlay = () => {
      videoTexturesRef.current.forEach(vt => {
        if (vt.image && typeof vt.image.play === 'function') {
          vt.image.play().catch(() => {});
        }
      });
    };
    window.addEventListener('pointerdown', triggerVideoPlay, { passive: true });
    window.addEventListener('pointermove', triggerVideoPlay, { once: true, passive: true });
    window.addEventListener('keydown', triggerVideoPlay, { passive: true });
    window.addEventListener('wheel', triggerVideoPlay, { passive: true });
    window.addEventListener('touchstart', triggerVideoPlay, { passive: true });

    // Pause rendering when scrolled out of view to preserve resources
    const intersectionObserver = new IntersectionObserver((entries) => {
      isIntersecting = entries.some(e => e.isIntersecting);
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', triggerVideoPlay);
      window.removeEventListener('pointermove', triggerVideoPlay);
      window.removeEventListener('keydown', triggerVideoPlay);
      window.removeEventListener('wheel', triggerVideoPlay);
      window.removeEventListener('touchstart', triggerVideoPlay);
      intersectionObserver.disconnect();

      const curMeshes = activeMeshesMapRef.current;
      for (const meshes of curMeshes.values()) {
        for (let m = 0; m < meshes.length; m++) {
          scene.remove(meshes[m]);
          if (meshes[m].material) meshes[m].material.dispose();
        }
      }
      curMeshes.clear();

      if (defaultGeometryRef.current) defaultGeometryRef.current.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [generateChunkPlanes, loadMediaTexture]);

  /* =========================================================================
     Pointer & Mouse Event Listeners with Window Binding
     ========================================================================= */

  useEffect(() => {
    const s = stateRef.current;
    const container = mountRef.current;
    if (!container) return;

    const handlePointerDown = (e) => {
      s.isDragging = true;
      s.lastMouse = { x: e.clientX, y: e.clientY };
      setShowControlsHint(false);
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      s.isDragging = false;
      if (container) container.style.cursor = hoveredMeshRef.current ? 'pointer' : 'grab';
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();

      // Check if cursor is over or near canvas
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Smooth normalized coordinate (-1.2 to 1.2) for cursor following parallax
      s.mouse.x = Math.max(-1.5, Math.min(1.5, x));
      s.mouse.y = Math.max(-1.5, Math.min(1.5, y));

      // Raycaster coordinate
      mouseRayCoordsRef.current.x = x;
      mouseRayCoordsRef.current.y = y;

      // Drag Pan Velocity Integration
      if (s.isDragging) {
        s.targetVel.x -= (e.clientX - s.lastMouse.x) * 0.025;
        s.targetVel.y += (e.clientY - s.lastMouse.y) * 0.025;
        s.lastMouse = { x: e.clientX, y: e.clientY };
        setShowControlsHint(false);
      }
    };

    const handleWheel = (e) => {
      // Zoom depth with mouse wheel when over the canvas
      setShowControlsHint(false);
      s.scrollAccum += e.deltaY * 0.005;
    };

    const handleTouchStart = (e) => {
      s.lastTouches = Array.from(e.touches);
      if (e.touches.length >= 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        s.lastTouchDist = Math.hypot(dx, dy);
      }
      setShowControlsHint(false);
    };

    const handleTouchMove = (e) => {
      const touches = Array.from(e.touches);
      if (touches.length === 1 && s.lastTouches.length >= 1) {
        const touch = touches[0];
        const last = s.lastTouches[0];
        if (touch && last) {
          s.targetVel.x -= (touch.clientX - last.clientX) * 0.02;
          s.targetVel.y += (touch.clientY - last.clientY) * 0.02;
        }
      } else if (touches.length === 2 && s.lastTouchDist > 0) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        s.scrollAccum += (s.lastTouchDist - dist) * 0.006;
        s.lastTouchDist = dist;
      }
      s.lastTouches = touches;
    };

    const handleTouchEnd = (e) => {
      s.lastTouches = Array.from(e.touches);
    };

    // Attach down/wheel to the canvas container
    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Attach move/up to window for smooth drag continuation across the entire screen
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, []);

  // Synchronize overall page scroll into 3D camera depth travel while pinned
  useEffect(() => {
    let lastY = window.scrollY;

    const handlePageScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;

      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      // When the section is active/pinned on screen, translate scroll delta into 3D forward travel
      if (rect.top <= 20 && rect.bottom >= viewportH - 20) {
        stateRef.current.scrollAccum += delta * 0.005;
      }
    };

    window.addEventListener('scroll', handlePageScroll, { passive: true });

    let lenisUnsub = null;
    const attachLenis = () => {
      if (window.__lenis && !lenisUnsub) {
        window.__lenis.on('scroll', handlePageScroll);
        lenisUnsub = () => {
          if (window.__lenis) {
            window.__lenis.off('scroll', handlePageScroll);
          }
        };
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      const pollLenis = setInterval(() => {
        if (attachLenis()) {
          clearInterval(pollLenis);
        }
      }, 100);
      setTimeout(() => clearInterval(pollLenis), 3000);
    }

    return () => {
      window.removeEventListener('scroll', handlePageScroll);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      activeKeysRef.current[e.key] = true;

      if (['w', 'W', 's', 'S', 'a', 'A', 'd', 'D', 'q', 'Q', 'e', 'E', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setShowControlsHint(false);
      }
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    const handleKeyUp = (e) => {
      activeKeysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Click on image
  const handleClick = () => {
    if (hoveredMeshRef.current && hoveredMeshRef.current.userData.media) {
      setSelectedImage(hoveredMeshRef.current.userData.media);
    }
  };

  // Recenter to initial camera position
  const handleRecenter = () => {
    const s = stateRef.current;
    s.velocity = { x: 0, y: 0, z: 0 };
    s.targetVel = { x: 0, y: 0, z: 0 };
    s.basePos = { x: 0, y: 0, z: INITIAL_CAMERA_Z };
    s.drift = { x: 0, y: 0 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, INITIAL_CAMERA_Z);
      cameraRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <section 
      id="artwork" 
      data-section="artwork"
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[320vh] md:h-[360vh] bg-white select-none"
    >
      <div id="infinite-canvas" className="absolute top-0 left-0 pointer-events-none" />
      {/* Fullscreen Sticky Viewport: Keeps 3D canvas pinned while scrolling through the journey */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fullscreen Edge-to-Edge Canvas Viewport */}
        <div 
          ref={mountRef}
          className="w-full h-full cursor-grab"
          onClick={handleClick}
        />

        {/* Center Title & Categories: "MY ARTWORK" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none text-center px-4">
          <div className="relative inline-flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-normal tracking-[0.14em] uppercase text-black">
              MY <span className="text-[#0048DE]">ARTWORK</span>
            </h2>
            <img 
              src="/Images/doodle-artwork.png" 
              alt="Artwork toast meme doodle" 
              className="absolute left-full top-1/2 -translate-y-[52%] ml-2 sm:ml-2.5 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain pointer-events-auto select-none cursor-pointer hover:scale-115 hover:rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shrink-0"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }}
              title="Cheers to Art 🍷"
            />
          </div>
          <div className="mt-2 flex items-center justify-center flex-wrap gap-x-2.5 gap-y-1 text-[11px] sm:text-xs tracking-[0.1em] uppercase text-slate-600 font-medium">
            <span>Graphic Design</span>
            <span className="text-[#0048DE] font-bold">•</span>
            <span>AI Generated Images</span>
            <span className="text-[#0048DE] font-bold">•</span>
            <span>Videography</span>
          </div>
        </div>

      {/* Minimal Top-Right Recenter Button */}
      <div className="absolute top-6 right-6 z-20 pointer-events-auto">
        <button
          onClick={handleRecenter}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-slate-700 hover:text-slate-900 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer hover:shadow-md"
          title="Recenter Camera"
        >
          <RotateCcw size={13} />
          <span>Recenter</span>
        </button>
      </div>

      {/* Floating Instructions Toast (Fades on interaction) */}
      {showControlsHint && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500 animate-bounce">
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_28px_rgba(0,0,0,0.08)] text-slate-600 text-xs font-medium">
            <Move size={14} className="text-slate-900" />
            <span>
              <strong className="text-slate-900 font-semibold">Move cursor</strong> for parallax drift • <strong className="text-slate-900 font-semibold">Drag</strong> to pan • <strong className="text-slate-900 font-semibold">Scroll / W/S</strong> to zoom
            </span>
          </div>
        </div>
      )}

      {/* Selected Media Detail Card */}
      {selectedImage && (
        <div className="absolute bottom-8 left-6 right-6 sm:left-auto sm:right-8 sm:w-96 z-30 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-slate-800">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {selectedImage.type === 'video' || /\.(mp4|webm|mov|m4v)$/i.test(selectedImage.url || '') ? (
              <div className="space-y-3">
                <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 relative shadow-inner">
                  <video 
                    key={selectedImage.id}
                    src={(selectedImage.url || '').replace(/\.mov$/i, '.mp4')} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    controls 
                    playsInline 
                  />
                </div>
                <div className="pr-6">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Film size={12} className="text-violet-600" />
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-violet-600">
                      🎬 Video Reel • HD Motion Study
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {selectedImage.description || 'Cinematic video shoot and live dynamic motion study.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-1.5 mb-1">
                    {selectedImage.category === 'UI/UX Design' && <Palette size={11} className="text-blue-600" />}
                    {selectedImage.category === 'Graphic Design' && <Palette size={11} className="text-amber-600" />}
                    {(selectedImage.category === 'Illustration' || selectedImage.category === 'AI Art') && <Sparkles size={11} className="text-emerald-600" />}
                    {selectedImage.category === 'Branding' && <Sparkles size={11} className="text-indigo-600" />}
                    {selectedImage.category === 'Experimental Art' && <Sparkles size={11} className="text-rose-600" />}
                    <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                      selectedImage.category === 'UI/UX Design' ? 'text-blue-600' :
                      selectedImage.category === 'Graphic Design' ? 'text-amber-600' :
                      selectedImage.category === 'Branding' ? 'text-indigo-600' :
                      selectedImage.category === 'Experimental Art' ? 'text-rose-600' :
                      'text-emerald-600'
                    }`}>
                      {selectedImage.category || 'Portfolio Work'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {selectedImage.description || 'Creative visual design & portfolio asset.'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {selectedImage.type === 'video' ? '🎬 Interactive Video' : 'High-Res Asset'}
              </span>
              <div className="flex items-center gap-3">
                {selectedImage.rawUrl && (
                  <a
                    href={selectedImage.rawUrl}
                    download
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[11px]"
                  >
                    <span>Original MOV</span>
                  </a>
                )}
                <a
                  href={(selectedImage.url || '').replace(/\.mov$/i, '.mp4')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-900 hover:text-blue-600 font-semibold"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Hidden DOM mount for active video textures to ensure top priority decoding */}
      <div 
        ref={hiddenVideoMountRef} 
        style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }} 
        aria-hidden="true" 
      />
    </section>
  );
}
