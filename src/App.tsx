import AffirmationIcon from "./components/AffirmationIcon";
import AffirmationText from "./components/AffirmationText";

function App() {
  return (
    <div className="h-screen bg-ctp-base flex justify-center items-center">
      <div className="max-w-sm md:max-w-md lg:max-w-lg p-6 flex flex-col gap-4 items-center text-center">
      <AffirmationIcon className="text-ctp-text w-20 h-20" />
      <AffirmationText className="text-ctp-text text-2xl font-IndieFlower" />
      </div>
    </div>
  );
}

export default App;
