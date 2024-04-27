import { SignUp } from "~/blocks/sign-up"

export default function SignUpPage() {
  return (
    <div className="w-full h-screen grid lg:grid-cols-2 justify-center content-center">
      <div>
        <SignUp />
      </div>
      <div className="lg:w-1/2 lg:h-screen lg:bg-sign-up-pattern lg:bg-cover lg:bg-bottom lg:fixed lg:top-0 lg:left-1/2 lg:right-0" />
    </div>
  )
}