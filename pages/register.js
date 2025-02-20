'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password, address, contactNumber }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        address,
        contactNumber,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        address,
        contactNumber,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title='Create Account'>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Create Account</h1>
        {/* Fullname */}
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='w-full'
            id='name'
            autoFocus
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
        </div>
        {/* Email */}
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className='w-full'
            id='email'
          ></input>
          {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
        </div>
        {/* Address */}
        <div className='mb-4'>
          <label htmlFor='email'>Address</label>
          <input
            {...register('address', {
              required: 'Please enter address',
              pattern: {
                message: 'Please enter valid address',
              },
            })}
            className='w-full'
            id='address'
          ></input>
          {errors.address && <div className='text-red-500'>{errors.address.message}</div>}
        </div>
        {/* Contact Number */}
        <div className='mb-4'>
          <label htmlFor='address'>Contact Number</label>
          <input
            type='number'
            {...register('contactNumber', {
              required: 'Please enter contact number',
              pattern: {
                message: 'Please enter valid contact number',
              },
            })}
            className='w-full'
            id='contactNumber'
          ></input>
          {errors.contactNumber && (
            <div className='text-red-500'>{errors.contactNumber.message}</div>
          )}
        </div>
        {/* Password */}
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className='w-full'
            id='password'
            autoFocus
          ></input>
          {errors.password && <div className='text-red-500 '>{errors.password.message}</div>}
        </div>
        {/* Confirm Password */}
        <div className='mb-4'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            className='w-full'
            type='password'
            id='confirmPassword'
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'confirm password is more than 5 chars',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className='text-red-500 '>{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
            <div className='text-red-500 '>Password do not match</div>
          )}
        </div>
        {/* Button Register */}
        <div className='mb-4 '>
          <button className='primary-button'>Register</button>
        </div>
        <div className='mb-4 '>
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
