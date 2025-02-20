'use client';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';
import { BsXCircle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Remove item
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  // Update quantity
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Layout title='Shopping Cart'>
      <h1 className='mb-4 text-xl'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  <th className='p-5 text-right'>Quantity</th>
                  <th className='p-5 text-right'>Price</th>
                  <th className='p-5'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className='border-b'>
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <p className='h-16 rounded-lg overflow-hidden relative '>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{
                              objectFit: 'contain',
                              objectPosition: 'left',
                            }}
                            className='rounded shadow'
                          />
                        </p>
                      </Link>
                    </td>
                    <td className='p-5 text-right'>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-5 text-right'>{item.price}</td>
                    <td className='p-5 text-center'>
                      <button onClick={() => removeItemHandler(item)}>
                        <BsXCircle className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card p-5'>
            <ul>
              <li>
                <div className='pb-3 mb-4'>
                  Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} ) :₱
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className='primary-button w-full'
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
