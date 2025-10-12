import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Alert, AlertTitle } from "./components/ui/alert";
import { AlarmCheckIcon } from "lucide-react";
import type { DogInfo } from "./DogInfo";
import { useOutletContext } from "react-router";


type PropType = {
  addDog: (newDog: DogInfo) => void;
}
export function HomePage() {
  const { addDog } = useOutletContext<PropType>();
  const [imageUrl, setImageUrl] = useState(
    "https://dog.ceo/api/breeds/image/random"
  );
  const [dogTitle, setDogTitle] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogRating, setDogRating] = useState(0);
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);

  useEffect(() => {
    fetchImage();
  }, []);

  function fetchImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.message));

    resetStates();
  }

  function resetStates() {
    setDogTitle("");
    setDogDescription("");
    setDogRating(0);
    setErroneousFields([]);
  }

  function handlePictureSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErroneousFields = validateForm();

    setErroneousFields(newErroneousFields);

    //send dog
    if (newErroneousFields.length === 0) {
      const newDog: DogInfo = {
      id: crypto.randomUUID(), //random id
      url: imageUrl,          
      title: dogTitle,
      description: dogDescription,
      rating: dogRating,
      }

      addDog(newDog);

      //clear 
      resetStates();
    };
  }

  function validateForm() {
    return [
      dogTitle.trim() === "" && "titel",
      dogDescription.trim() === "" && "beskrivning",
      dogRating === 0 && "betyg",
    ].filter(Boolean) as string[];
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDogTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDogDescription(e.target.value);
  }

  function ratingChanged(newRating: number) {
    setDogRating(newRating);
  }

  const cardHead = (
    <CardHeader>
      <CardTitle>Spara hund</CardTitle>
      <CardDescription>
        Lägg till en titel, beskrivning och ge ett betyg
      </CardDescription>
    </CardHeader>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100 p-8">
      <h1 className="text-6xl font-extrabold mb-8 text-center">
        The dog generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-start">
        {/* Left side: image and button */}
        <div className="flex flex-col justify-between text-gray-800 p-6 bg-white rounded-xl shadow-md h-fit">
          <div className="flex-1 flex items-center justify-center max-h-[50vh] overflow-hidden">
            <img
              src={imageUrl}
              alt="Random Dog"
              className="object-cover mb-1"
            />
          </div>
          <Button
            onClick={fetchImage}
            className="bg-black hover:bg-gray-800 text-white mt-6 "
          >
            Generera en ny hund
          </Button>
        </div>

        {/* Right side: form card */}
        <Card className="flex flex-col p-6 rounded-xl shadow-md h-fit">
          {cardHead}
          <form
            onSubmit={handlePictureSubmit}
            className="flex flex-col justify-between flex-1"
          >
            <div>
              <label htmlFor="titel" className="block text-base font-semibold">
                Titel<span aria-hidden="true">*</span>
              </label>
              <Input
                aria-invalid={erroneousFields.includes("titel") && !dogTitle}
                id="titel"
                onChange={(e) => handleTitleChange(e)}
                value={dogTitle}
                placeholder="Bildens titel"
                className="mb-2"
              />
              {erroneousFields.includes("titel") && !dogTitle && (
                <Alert variant="destructive">
                  <AlarmCheckIcon />
                  <AlertTitle>Ge bilden en titel.</AlertTitle>
                </Alert>
              )}

              <label
                htmlFor="beskrivning"
                className="block text-base font-semibold"
              >
                Beskrivning<span aria-hidden="true">*</span>
              </label>
              <textarea
                aria-invalid={
                  erroneousFields.includes("beskrivning") && !dogDescription
                }
                id="beskrivning"
                onChange={(e) => handleDescriptionChange(e)}
                value={dogDescription}
                rows={10}
                cols={50}
                placeholder="Beskriv hunden"
                className="
                w-full resize-none rounded-md border border-input bg-background p-3 text-sm text-foreground 
                shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-300
                "
              ></textarea>
              {erroneousFields.includes("beskrivning") && !dogDescription && (
                <Alert variant="destructive">
                  <AlarmCheckIcon />
                  <AlertTitle>Ge bilden en beskrivning.</AlertTitle>
                </Alert>
              )}

              <div className=" items-center gap-3 mt-1">
                <label className="text-base font-semibold">
                  Stjärnor<span aria-hidden="true">*</span>
                </label>
                <ReactStars
                  count={5}
                  size={30}
                  onChange={ratingChanged}
                  value={dogRating}
                  className=""
                />
                {erroneousFields.includes("betyg") && dogRating === 0 && (
                  <Alert variant="destructive">
                    <AlarmCheckIcon />
                    <AlertTitle>Välj antal stjärnor.</AlertTitle>
                  </Alert>
                )}
              </div>
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  className="cursor-pointer self-end mt-20 w-full"
                >
                  Lägg till bild
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

//export default HomePage;

export function DogNote() {
  return (
    <>
      <div>hej</div>
    </>
  );
}
