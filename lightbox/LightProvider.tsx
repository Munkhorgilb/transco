import { useNonReactiveCallback } from "@/hooks/useNonReactiveCallback";
import React from "react";

interface Lightbox {
  name: string;
}

interface ImagesLightboxItem {
  url: string;
}

export class ImagesLightbox implements Lightbox {
  name = "images";
  constructor(public images: ImagesLightboxItem[], public index: number) {}
  setIndex(index: number) {
    this.index = index;
  }
}

const LightboxContext = React.createContext<{
  activeLightbox: Lightbox | null;
}>({
  activeLightbox: null,
});

const LightboxControlContext = React.createContext<{
  openLightbox: (lightbox: Lightbox) => void;
  closeLightbox: () => boolean;
}>({
  openLightbox: () => {},
  closeLightbox: () => false,
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [activeLightbox, setActiveLightbox] = React.useState<Lightbox | null>(
    null
  );

  const openLightbox = useNonReactiveCallback((lightbox: Lightbox) => {
    setActiveLightbox(lightbox);
  });

  const closeLightbox = useNonReactiveCallback(() => {
    let wasActive = !!activeLightbox;
    setActiveLightbox(null);
    return wasActive;
  });

  const state = React.useMemo(
    () => ({
      activeLightbox,
    }),
    [activeLightbox]
  );

  const methods = React.useMemo(
    () => ({
      openLightbox,
      closeLightbox,
    }),
    [openLightbox, closeLightbox]
  );

  return (
    <LightboxContext.Provider value={state}>
      <LightboxControlContext.Provider value={methods}>
        {children}
      </LightboxControlContext.Provider>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  return React.useContext(LightboxContext);
}

export function useLightboxControls() {
  return React.useContext(LightboxControlContext);
}
