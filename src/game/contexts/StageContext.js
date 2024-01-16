import { createContext, useContext } from "react";

// Scale context and access hook
const ScaleCtx = createContext(Math.min(
  window.innerWidth / 1300,
  window.innerHeight / 800,
));

export const useScaleState = () => {
  const scale = useContext(ScaleCtx);

  if (!scale) {
    throw new Error("scale isn't defined");
  }

  return scale;
};

// Canva's for game stage dimensions' context and access hook
export const StageDimensionsCtx = createContext(null);

export const useStageDimensions = () => {
  const stageDimensions = useContext(StageDimensionsCtx);

  if (!stageDimensions) {
    throw new Error("useStageDimensions must be used within an StageDimensionsCtx provider");
  } else {
    if (!stageDimensions.width) {
      throw new Error("stage dimensions width is not defined");
    }
    if (!stageDimensions.height) {
      throw new Error("stage dimensions height is not defined");
    }
  }

  return stageDimensions;
};
