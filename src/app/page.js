import Formulario from "app/components/formulario/Formulario";
import SnackbarProvider from 'app/components/snackbar';


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SnackbarProvider>
        <Formulario />
      </SnackbarProvider>
    </main>
  );
}
