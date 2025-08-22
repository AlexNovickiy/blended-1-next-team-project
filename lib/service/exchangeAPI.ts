import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

console.log(apiKey);

export interface ExchangeCredentials {
  amount: string;
  from: string;
  to: string;
}

export interface ExchangeQuery {
  amount: string;
  from: string;
  to: string;
}

export interface ExchangeResponse {
  query: ExchangeQuery;
  info: ExchangeInfo;
  result: number;
}

export interface ExchangeInfo {
  rate: number;
}

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

export const exchangeCurrency = async (
  credentials: ExchangeCredentials
): Promise<{ from: string; to: string; amount: string; rate: number; result: number }> => {
  const {
    data: { query, info, result },
  }: { data: ExchangeResponse } = await instance.get('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency: string): Promise<[string, number][]> => {
  const { data }: { data: { rates: Record<string, number> } } = await instance.get(
    `/latest?symbols&base=${baseCurrency}`
  );

  return Object.entries(data.rates);
};
