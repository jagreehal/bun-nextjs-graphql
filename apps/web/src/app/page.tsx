import { Suspense } from 'react';
import {
  ClientComponent,
  ServerComponent,
  DynamicServerComponent,
  ServerHydration,
} from './_components';

const Loading = () => <p>loading...</p>;

export default function Home() {
  return (
    <main>
      <section>
        <Suspense fallback={<Loading />}>
          <ServerComponent />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <DynamicServerComponent />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <ServerHydration />
        </Suspense>
        <ClientComponent />
      </section>
    </main>
  );
}
