interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      {children}
    </div>
  )
}