import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export function HomePage() {
  const [imageUrl, setImageUrl] = useState(
    "https://dog.ceo/api/breeds/image/random"
  );
  const [dogText, setDogText] = useState("");
  const [dogRating, setDogRating] = useState(0);
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);

  useEffect(() => {
    fetchImage();
  }, []);

  function fetchImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.message));

    setDogRating(0);
  }

  function handlePictureSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErroneousFields = validateForm();

    setErroneousFields(newErroneousFields);
  }

  function validateForm() {
    return [dogText.trim() === "" && "note"].filter(Boolean) as string[];
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDogText(e.target.value);
  }

  function ratingChanged(newRating: number) {
    setDogRating(newRating);
  }

  const cardHead = (
    <CardHeader>
      <CardTitle>Spara hund</CardTitle>
      <CardDescription>
        Lägg till en anteckning och ge ett betyg
      </CardDescription>
    </CardHeader>
  );

  return (
    <>
      <div className="items-center justify-center text-gray-800 p-6">
        <h1 className="text-6xl font-extrabold mb-8">The dog generator</h1>
        <img src={imageUrl} alt="Random Dog" />
        <Button onClick={fetchImage}>Generera en ny hund</Button>

        <br></br>
        <Card>
          {cardHead}
          <form onSubmit={handlePictureSubmit}>
            <Label htmlFor="note" className="text-base font-semibold">
              <Input
                aria-invalid={erroneousFields.includes("note")}
                id="note"
                onChange={(e) => handleTextareaChange(e)}
                value={dogText}
              ></Input>
              Anteckning<span aria-hidden="true">*</span>
            </Label>

            <Label className="text-base font-semibold">
              Betyg<span aria-hidden="true">*</span>
            </Label>
            <ReactStars
              count={5}
              size={30}
              onChange={ratingChanged}
              value={dogRating}
            />

            <Button type="submit" className="cursor-pointer">
              Lägg till bild
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export function DogNote() {
  return (
    <>
      <div>hej</div>
    </>
  );
}
