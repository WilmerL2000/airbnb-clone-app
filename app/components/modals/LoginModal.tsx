'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import useLoginModal from '../../hooks/useLoginModal';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * This function handles form submission for user registration and sends a POST request to the server
   * using axios.
   * @param data - The data parameter is an object that contains the form data submitted by the user. It
   * is of type FieldValues, which is a generic type that represents the values of all fields in a form.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    /* `signIn('credentials', { ...data, redirect: false });` is a function call that triggers the
    NextAuth.js authentication flow with the 'credentials' provider. It passes the form data
    submitted by the user as an object with the spread operator `{ ...data }` and sets the
    `redirect` option to `false`. This means that the authentication flow will not redirect the user
    to a different page after successful authentication. Instead, it will return the authentication
    result to the client-side code, which can then handle the result and update the UI accordingly. */
    signIn('credentials', { ...data, redirect: false }).then((cb) => {
      setIsLoading(false);
      if (cb?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (cb?.error) {
        toast.error(cb.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          You do not have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Sign up
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
