export interface RateInterface {
  buy: string;
  sell: string;
};

export interface BankRatesProps  {
  [currency: string]: RateInterface;
};

export interface RatesResponseProps {
  [bank: string]: BankRatesProps;
};