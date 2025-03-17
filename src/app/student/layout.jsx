import Navbar from "@/components/Navbar";


export default function StudentLayout({ children }) {
 
  return (
    <>
        <Navbar/>
      {children}
     
    </>
  );
}
