const NBSP = " ";

export function formatPrice(amount: number): string {
  return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}
