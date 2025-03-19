import Navbar from "@/components/Student-Navbar";


export default function StudentLayout({ children }) {
 
  return (
    <>
        <Navbar/>
      {children}
     
    </>
  );
}
