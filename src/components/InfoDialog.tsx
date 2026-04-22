import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const INFO_TEXTS = ["Affirmationen sind positive Selbstaussagen, die als psychologisches Werkzeug dienen, um das Unterbewusstsein umzuprogrammieren, Selbstvertrauen zu stärken und negative Gedankenmuster zu durchbrechen.", "Sie werden meist als bejahende „Ich bin“-Sätze formuliert (z.B. „Ich bin mutig“), die täglich laut oder in Gedanken wiederholt werden, um Wohlbefinden und Lebensfreude zu steigern. ", "Diese Website bietet die Möglichkeit täglich eine neue Affirmation zu sehen. (Solange der Vorrat reicht!)", "Diese werden nicht jeden Tag perfekt auf dich zugeschnitten sein und das ist okay. \nWenn du auch nur eine Affirmation findest, die dir gut tut, ist mein Ziel erfüllt.", "Viel Spaß beim Entdecken!"]

function InfoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon-lg"} variant={"secondary"} aria-label="Informationen anzeigen">
                    <Info />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Infos
                    </DialogTitle>
                    <DialogDescription>
                        Was sind Informationen? Und was macht diese App?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 no-scrollbar max-h-[50vh] overflow-y-auto ">
                    {INFO_TEXTS.map((text, idx) => <p key={idx} className="whitespace-pre-wrap">{text}</p>)}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InfoDialog;