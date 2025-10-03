import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AlertInfoSite() {
  return (
    <Alert className="mt-5">
      <AlertTitle className="hidden"></AlertTitle>
      <AlertDescription>
        <p>
          Este site foi criado para fins de testes e desenvolvimento. Os dados
          gerados são válidos em formato,{' '}
          <span className="font-bold">não representam informações reais</span>.
          O uso e a responsabilidade sobre como esses dados são aplicados são
          exclusivamente do usuário.
        </p>
      </AlertDescription>
    </Alert>
  );
}
