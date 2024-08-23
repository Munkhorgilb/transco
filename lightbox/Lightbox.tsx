/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { observer } from "mobx-react-lite";
import ImageView from "./ImageViewing";
import {
  ImagesLightbox,
  useLightbox,
  useLightboxControls,
} from "./LightProvider";

export const Lightbox = observer(function Lightbox() {
  const { activeLightbox } = useLightbox();
  const { closeLightbox } = useLightboxControls();

  const onClose = React.useCallback(() => {
    closeLightbox();
  }, [closeLightbox]);

  if (!activeLightbox) {
    return null;
  }

  const opts = activeLightbox as ImagesLightbox;
  return (
    <ImageView
      images={opts.images.map((img) => ({ ...img }))}
      initialImageIndex={opts.index}
      visible
      onRequestClose={onClose}
    />
  );
});
