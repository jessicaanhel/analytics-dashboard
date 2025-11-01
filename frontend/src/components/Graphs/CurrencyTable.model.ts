interface CurrencyTableProps {
  data: Record<string,
  Record<string, {
      buy: number | string;
      sell: number | string
      }>>;
}
