export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-ds-surface px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-[28px] font-bold text-ds-text-primary">Bye Binge</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
