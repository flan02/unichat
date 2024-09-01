import { Icons } from '@/components/reutilizable/Icons'
import Skeleton from '@/components/reutilizable/Skeleton'
import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'


type Props = {}

const SignUpPage = (props: Props) => {
  return (
    <section className='h-screen grid place-content-center'>
      <div className="mx-auto">
        <Icons.unichatLogo width={150} height={150} />
      </div>
      <br />
      <ClerkLoading>
        <Skeleton className='w-[400px] h-[593px]' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp initialValues={{ emailAddress: "", phoneNumber: "" }} appearance={{
          variables: { colorPrimary: "#f9a8d4", colorInputText: "#f9a8d4", colorInputBackground: "" }
        }} />
      </ClerkLoaded>
    </section>
  )
}

export default SignUpPage