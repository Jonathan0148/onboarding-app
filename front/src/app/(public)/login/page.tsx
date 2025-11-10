import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Iniciar sesión
      </h1>
      <LoginForm />
    </div>
  );
}
