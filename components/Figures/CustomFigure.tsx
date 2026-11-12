/* eslint-disable no-unused-vars -- the base rule misreads parameter names in type signatures */
import React, { useEffect, useRef } from 'react';

/**
 * Hosts a custom Hairline figure — one drawn with the hairline-create skill,
 * not one of the package's built-ins. The engine (`/hairline/kernel.js`) and
 * the figure (`/hairline/<name>.js`) are static files loaded on demand; this
 * component does for them what `@lucasmarkes/hairline` does for its own
 * figures: makes the svg, mounts, and tears down.
 */

interface FigureHandle {
  set: (value: number) => void;
  destroy: () => void;
}

interface FigureDef {
  name: string;
  means: string;
  range: [number, number, number];
  tour: ([number, number] | null)[] | null;
  mount: (
    host: {
      stage: HTMLElement;
      svg: SVGElement;
      read: { textContent: string };
    },
    value: number
  ) => FigureHandle;
}

interface Kernel {
  inject: (root: Document) => void;
  mk: (
    tag: string,
    attrs: Record<string, string>,
    parent: Element
  ) => SVGElement;
  tour: (
    stage: HTMLElement,
    stops: FigureDef['tour'],
    onStop: () => void
  ) => { stop: () => void };
  LAP: FigureDef['tour'];
}

declare global {
  interface Window {
    HL?: Kernel;
    hairline?: (figure: FigureDef) => void;
  }
}

function loadScript(src: string, type?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    if (type) script.type = type;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

// A figure file runs once per page load and declares itself by calling the
// global `hairline()`, so both loads are cached for remounts.
let kernel: Promise<void> | undefined;
const figures = new Map<string, Promise<FigureDef>>();

function loadFigure(name: string): Promise<FigureDef> {
  let figure = figures.get(name);
  if (!figure) {
    kernel = kernel ?? loadScript('/hairline/kernel.js');
    figure = kernel.then(
      () =>
        new Promise<FigureDef>((resolve, reject) => {
          window.hairline = resolve;
          loadScript(`/hairline/${name}.js`, 'module').catch(reject);
        })
    );
    figures.set(name, figure);
  }
  return figure;
}

interface CustomFigureProps {
  /** File name under `public/hairline/`, without the extension. */
  name: string;
  /** Walk the figure's tour unprompted until a pointer arrives. */
  play?: boolean;
  /** The figure's caption each time it changes, e.g. "gate 3" or "rest". */
  onRead?: (text: string) => void;
  className?: string;
}

const CustomFigure: React.FC<CustomFigureProps> = ({
  name,
  play = false,
  onRead,
  className = '',
}) => {
  const host = useRef<HTMLDivElement>(null);
  const onReadRef = useRef(onRead);
  onReadRef.current = onRead;

  useEffect(() => {
    const stage = host.current;
    let cancelled = false;
    let teardown = () => {};

    loadFigure(name)
      .then((figure) => {
        const { HL } = window;
        if (cancelled || !stage || !HL) return;

        HL.inject(document);
        stage.setAttribute('data-hairline', figure.name);
        const svg = HL.mk(
          'svg',
          { viewBox: '0 0 400 320', 'aria-hidden': 'true' },
          stage
        );
        const read = {
          set textContent(value: string) {
            onReadRef.current?.(String(value ?? ''));
          },
        } as { textContent: string };

        const handle = figure.mount({ stage, svg, read }, figure.range[1]);
        const tour = play
          ? HL.tour(stage, figure.tour ?? HL.LAP, () => {})
          : null;

        teardown = () => {
          tour?.stop();
          handle.destroy();
          svg.remove();
          stage.removeAttribute('data-hairline');
        };
      })
      // The figure is an illustration: if it fails to load, the box stays
      // empty and the page reads the same without it.
      .catch(() => {});

    return () => {
      cancelled = true;
      teardown();
    };
  }, [name, play]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`aspect-[5/4] ${className}`}
    />
  );
};

export default CustomFigure;
