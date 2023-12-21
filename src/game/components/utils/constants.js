/**
 * All the positions of the objects placed in the playing
 * area must be multiple of the grid unit.
 * This is meant to make dragging easier
 * Especially to make easier to drag the piece to the
 * solution point
 */
export const scale = window.innerWidth / 1300;
export const GRID_UNIT = Math.round(scale * 5);
