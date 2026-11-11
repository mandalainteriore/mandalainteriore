import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

// Layout delle pagine pubbliche: il pannello di Sanity su /studio resta fuori da questo gruppo,
// così non mostra navbar e loader del sito.
export default function LayoutSito({ children }: LayoutProps<"/">) {
  return (
    <>
      <Loader />
      <Navbar />
      {children}
    </>
  );
}
