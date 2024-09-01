import { Icons } from '@/components/reutilizable/Icons'
import Skeleton from '@/components/reutilizable/Skeleton'
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'


type Props = {}

const SignInPage = (props: Props) => {

  return (
    <section className='h-screen grid place-content-center'>
      <div className="mx-auto">
        <Icons.unichatLogo width={150} height={150} />
      </div>
      <br />
      <ClerkLoading>
        <Skeleton className='w-[400px] h-[465px]' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn appearance={{ variables: { colorPrimary: "#f9a8d4" } }} />
      </ClerkLoaded>



    </section>


  )
}

export default SignInPage