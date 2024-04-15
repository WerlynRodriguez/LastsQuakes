import type { CSSProperties } from "react";

/**
 * Add a gutter to the style of an element
 * Can be used to add a gap between elements in a virtual grid
 */
export function GutterStyle(style: CSSProperties, Gap: number): CSSProperties {
    return {
        ...style,
        left: Number(style.left) + Gap,
        top: Number(style.top) + Gap,
        width: Number(style.width) - Gap,
        height: Number(style.height) - Gap,
    };
}