import Modal from "./Modal"

const INFO_TEXT_1 =
  "Affirmationen sind positive Selbstaussagen, die als psychologisches Werkzeug dienen, um das Unterbewusstsein umzuprogrammieren, Selbstvertrauen zu stärken und negative Gedankenmuster zu durchbrechen. \nSie werden meist als bejahende „Ich bin“-Sätze formuliert (z.B. „Ich bin mutig“), die täglich laut oder in Gedanken wiederholt werden, um Wohlbefinden und Lebensfreude zu steigern. ";
const INFO_TEXT_2 =
  "Diese Website bietet die Möglichkeit täglich eine neue Affirmation zu sehen. (Solange der Vorrat reicht!) \nDiese werden nicht jeden Tag perfekt auf dich zugeschnitten sein und das ist okay. \nWenn du auch nur eine Affirmation findest, die dir gut tut, ist mein Ziel erfüllt. \nViel Spaß beim Entdecken!";

function InfoModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <p className="whitespace-pre-wrap">{INFO_TEXT_1}</p>
      <p className="my-2 text-center">·</p>
      <p className="whitespace-pre-wrap">{INFO_TEXT_2}</p>
    </Modal>
  )
}

export default InfoModal