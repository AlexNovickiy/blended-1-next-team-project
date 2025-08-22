'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const isError = useCurrencyStore((state) => state.isError);
  const exchangeInfo = useCurrencyStore((state) => state.exchangeInfo);
  console.log(typeof exchangeInfo?.amount);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          {isLoading && <Loader />}
          <ExchangeForm />
          {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
          <Heading info title="What currencies do you want to exchange?🙂" />

          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
