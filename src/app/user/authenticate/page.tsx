import { Suspense } from 'react';
import Authenticate from './components/Authenticate';

export default function AuthenticatePage() {
  return (
    <Suspense>
      <Authenticate />
    </Suspense>
  );
}
