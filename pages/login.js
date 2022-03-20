import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
//need to do SSR to get all of the providers from [...nextauth] line 34 before this page loads

function login({ providers }) {
  <div>
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
          <div><button>
            test
          </button></div>
        ))}
    </div>
};

export default login

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}