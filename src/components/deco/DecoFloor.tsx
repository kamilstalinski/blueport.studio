/* The floor the page stands on. */
export function DecoFloor() {
  return (
    <svg className="deco-floor" preserveAspectRatio="none" shapeRendering="crispEdges">
      <defs>
        <pattern id="kafel-brick" width="48" height="24" patternUnits="userSpaceOnUse">
          <path fill="currentColor" d="M1 1h46v10h-46zM-23 13h46v10h-46zM25 13h46v10h-46z" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kafel-brick)" />
    </svg>
  );
}
