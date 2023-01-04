import { useAuth } from '../../hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { validatePassword } from '../../utils/validators/helpers';
import Image from 'next/image';
import Link from 'next/link';

export default function SingUp() {
  const router = useRouter();
  const { user, signIn, loading } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [realName, setRealName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const formData = {
    username,
    email,
    password,
    bio,
    realName,
    birthDate,
  };

  useEffect(() => {
    if (user?.username) router.push('/');
  }, [user, router]);

  const validateFormData = (form: typeof formData, passwordConfirmation: string): boolean => {
    const { username, email, password, bio, realName, birthDate } = form;

    if (!username || !email || !password || !birthDate) return false;

    if (!validatePassword(password)) return false;

    if (password !== passwordConfirmation) return false;

    return true;
  };

  const buttonDisabled = !validateFormData(formData, passwordConfirmation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-center bg-cover bg-opacity-30 bg-drums-bg">
      <div className="absolute w-full h-full bg-black opacity-70 " />
      <div className="z-10 w-full max-w-sm mx-auto rounded-xl ">
        <form className="px-10 py-4 bg-white rounded-xl dark:bg-neutral-900" onSubmit={handleSubmit}>
          <h1 className="mb-5 text-lg font-bold text-black dark:text-white">Criar conta</h1>
          <Input
            label="Nome de usuário*"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="seu nome de usuário"
            maxLength={16}
            minLength={3}
            required
          />
          <Input
            label="Endereço de e-mail*"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu e-mail principal"
            maxLength={100}
            minLength={3}
            required
          />
          <Input
            label="Senha*"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="uma senha segura"
            maxLength={100}
            minLength={8}
            required
          />
          <Input
            label="Confirme sua senha*"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="confirme sua senha"
            maxLength={100}
            minLength={8}
            required
          />

          <Input
            label="Data de nascimento*"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="sua data de nascimento"
            maxLength={10}
            minLength={10}
            required
          />
          <Input
            label="Nome completo"
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            placeholder="seu nome completo"
            maxLength={100}
            minLength={3}
            required={false}
          />
          <Input
            label="Bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="uma breve descrição sobre você"
            maxLength={100}
            minLength={3}
            required={false}
          />
          <div className="flex items-center justify-between">
            <button
              disabled={loading || buttonDisabled}
              className="px-4 py-2 mx-auto font-bold text-white duration-300 bg-purple-500 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 hover:scale-110"
              type="submit">
              Sign In
            </button>
          </div>
        </form>

        <p className="mb-5 text-base text-center ">
          Já possui uma conta?{' '}
          <Link className="text-purple-500 hover:text-purple-700 dark:hover:text-purple-400" href="/signin">
            Entrar agora
          </Link>
        </p>
      </div>
    </div>
  );
}

const Input = ({ label, type, value, onChange, placeholder, maxLength, minLength, required }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-neutral-800"
        id={label}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
