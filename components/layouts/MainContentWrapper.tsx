


export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full p-4">
            {children}
        </div>
    )
}