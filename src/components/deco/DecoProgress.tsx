/* A loading bar filled block by block as the process scrolls past. */
export function DecoProgress() {
  return (
    <div className="px-deco px-deco--progress" aria-hidden="true">
      <div className="deco-progress">
        <i />
      </div>
    </div>
  );
}
