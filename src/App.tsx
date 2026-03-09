import AffirmationIcon from "./components/AffirmationIcon";
import AffirmationText from "./components/AffirmationText";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-ctp-base flex flex-col justify-center items-center">
      <div className="h-screen w-screen max-w-sm md:max-w-md lg:max-w-lg p-6 flex flex-col gap-4 justify-center items-center text-center">
      <AffirmationIcon className="text-ctp-text w-20 h-20" />
      <AffirmationText className="text-ctp-text text-2xl font-IndieFlower" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
