import AdminLayout from './AdminLayout';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
    // <div className='w-full h-screen overflow-hidden box-border bg-linear-to-br from-pink-100 via-purple-100 to-pink-100 flex gap-3'>
    //   {/* sidebar */}
    //   <aside className='w-[25%] h-full overflow-x-auto p-6 flex flex-col gap-3 items-center bg-linear-to-t from-[#0F172A] to-[#0B1120]'>
    //     <div className='p-5 border-b border-[#1a3158] w-full flex items-center gap-3'>
    //       <div className='w-9 h-9 rounded bg-linear-to-tr from-[#da7c36] to-[#d15100] flex items-center justify-center shadow-lg'>
    //         <Zap
    //           size={16}
    //           color='#fff'
    //         />
    //       </div>
    //       {/* {!collapsed && (
    //         <div style={{ flex: 1, overflow: "hidden" }}>
    //           <div
    //             style={{
    //               fontFamily: "'Syne', sans-serif",
    //               fontWeight: 800,
    //               fontSize: 16,
    //               color: "#e8f0fe",
    //               letterSpacing: "-0.3px",
    //             }}
    //           >
    //             AloSkill
    //           </div>
    //           <div
    //             style={{
    //               fontSize: 10,
    //               color: "#3d5a80",
    //               fontFamily: "'DM Mono', monospace",
    //               textTransform: "uppercase",
    //               letterSpacing: "1.5px",
    //             }}
    //           >
    //             Admin Panel
    //           </div>
    //         </div>
    //       )} */}
    //       <button
    //         // onClick={() => setCollapsed(!collapsed)}
    //         className='bg-none border-none cursor-pointer shrink-0 p-2 flex'
    //       >
    //         <Menu
    //           size={16}
    //           color='#3d5a80'
    //         />
    //       </button>
    //     </div>
    //   </aside>
    //   {/* Main content */}
    //   <main></main>
    //   {children}
    // </div>
  );
};

export default AdminDashboardLayout;
