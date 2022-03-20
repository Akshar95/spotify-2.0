import { getProviders, signIn } from "next-auth/react";
//need to do SSR to get all of the providers from [...nextauth] line 34 before this page loads

function Login() {
  return (
    <div>
      <h1>This is the login page</h1>
    </div>
  );
};

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

