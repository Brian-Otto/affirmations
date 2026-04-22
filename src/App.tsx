import { Toaster } from "react-hot-toast";
import AffirmationIcon from "./components/AffirmationIcon";
import AffirmationText from "./components/AffirmationText";
import Footer from "./components/Footer";
import SWToast from "./components/SWToast";

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster position="top-center" />
      <main className="h-screen w-screen max-w-sm md:max-w-md lg:max-w-lg p-6 flex flex-col gap-4 justify-center items-center text-center">
        <SWToast />
        <AffirmationIcon className="w-20 h-20" />
        <AffirmationText className="text-2xl font-IndieFlower" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
