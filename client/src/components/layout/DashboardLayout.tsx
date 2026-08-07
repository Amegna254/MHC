<div className="flex bg-slate-950 min-h-screen">
    <Sidebar />

    <div className="flex-1">
        <Topbar />

        <main className="p-6">
            {children}
        </main>
    </div>
</div>