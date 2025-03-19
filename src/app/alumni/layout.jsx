import Navbar from "@/components/Alumni-Navbar";


export default function AlumniLayout({ children }) {
 
  return (
    <>
        <Navbar/>
      {children}
     
    </>
  );
}
