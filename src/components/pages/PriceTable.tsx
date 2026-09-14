import { PixelIcon } from "@/components/brand/PixelIcon";
import { PACKAGES, PRICE_TABLE_HEADS, PRICE_TABLE_ROWS, type PriceCell } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";

function Cell({ value }: { value: PriceCell }) {
  if (typeof value === "string") return <td>{value}</td>;
  return (
    <td className={value ? "yes" : "no"}>
      <span role="img" aria-label={value ? "Tak" : "Nie"}>
        <PixelIcon name={value ? "check" : "minus"} />
      </span>
    </td>
  );
}

/** Cennik comparison: prices and delivery from PACKAGES, the rest from PRICE_TABLE_ROWS. */
export function PriceTable() {
  const packages = PRICE_TABLE_HEADS.map((head) => PACKAGES[head.packageId]);

  return (
    <div className="tablewrap" tabIndex={0} role="region" aria-label="Tabela porównawcza pakietów">
      <table className="ptable">
        <thead>
          <tr>
            <th scope="col">Zakres</th>
            {PRICE_TABLE_HEADS.map((head) => (
              <th key={head.packageId} scope="col">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="rowname">
              Cena bazowa<span>Kwota netto, stała po akceptacji zakresu.</span>
            </th>
            {packages.map((pkg) => (
              <td key={pkg.id} className="amt">{`${formatPrice(pkg.basePrice)} zł`}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="rowname">
              Czas realizacji<span>Liczony od akceptacji projektu wizualnego.</span>
            </th>
            {packages.map((pkg) => (
              <td key={pkg.id}>{pkg.deliveryLabel}</td>
            ))}
          </tr>
          {PRICE_TABLE_ROWS.map((row) => (
            <tr key={row.name}>
              <th scope="row" className="rowname">
                {row.name}
                {row.note && <span>{row.note}</span>}
              </th>
              {row.cells.map((value, index) => (
                <Cell key={PRICE_TABLE_HEADS[index].packageId} value={value} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
