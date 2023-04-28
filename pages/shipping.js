'use client';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function ShippingScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('contactNumber', shippingAddress.contactNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, contactNumber }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, contactNumber },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          contactNumber,
        },
      }),
    );

    router.push('/payment');
  };

  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1} />
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='text-xl mb-4'>Shipping Address</h1>
        <div className='mb-4'>
          <label htmlFor='fullName'>Full Name</label>
          <input
            className='w-full'
            id='fullName'
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='fullName'>Enter your full address </label>
          <h1>
            <span className='text-xl font-bold'>Note:</span> If your address is not valid your order
            will be cancelled
          </h1>
          <input
            className='w-full'
            id='address'
            autoFocus
            {...register('address', {
              required: 'Please enter full address',
              minLength: {
                value: 8,
                message: 'Address is more than 8 characters ',
              },
            })}
          />
          {errors.address && <div className='text-red-500 '>{errors.address.message}</div>}
        </div>
        <div className='mb-4'>
          <label htmlFor='fullName'>Contact Number</label>
          <input
            type='number'
            className='w-full'
            id='contactNumber'
            autoFocus
            {...register('contactNumber', {
              required: 'Please enter contact number',
              minLength: {
                value: 11,
                message: 'Contact Number has 11 characters ',
              },
            })}
          />
          {errors.contactNumber && (
            <div className='text-red-500 '>{errors.contactNumber.message}</div>
          )}
        </div>
        <div className='mb-4 flex justify-between'>
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
