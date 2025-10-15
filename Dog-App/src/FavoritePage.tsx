import type { DogInfo } from "./DogInfo";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import ReactStars from "react-stars";
import { useOutletContext } from "react-router";

type PropsType = { favorites: DogInfo[]; removeDog: (id: string) => void };

function getBreedFromUrl(imageUrl: string): string {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/");
    const breedsIdx = parts.indexOf("breeds");
    if (breedsIdx >= 0 && parts.length > breedsIdx + 1) {
      const folder = parts[breedsIdx + 1]; 
      const words = folder.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1));
      return words.join(" ");
    }
  } catch (_) {
    
  }
  return "Okänd";
}

function FavoritePage() {
  const { favorites, removeDog } = useOutletContext<PropsType>();

  return (
    <>
      <Card className="w-full bg-neutral-100 p-8">
        {cardHead}
        <CardContent>
          <div>
            {favorites.length > 0 ? (
              favorites.map((dog: DogInfo) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onRemove={() => removeDog(dog.id)}
                />
              ))
            ) : (
              <span className="text-orange-400">
                Du har inte lagt till några hundar.
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function DogCard({ dog, onRemove }: { dog: DogInfo; onRemove: () => void }) {
  const breedLabel = getBreedFromUrl(dog.url);
  return (
    <Card className="mb-4 max-w-sm w-full overflow-hidden rounded-2xl shadow-md">
      <CardContent className="pt-0">
        <div className="flex justify-center">
          <img src={dog.url} alt={dog.title} className="object-cover mb-1" />
        </div>
        <h3 className="text-lg pt-1 font-semibold text-gray-900 capitalize">
          {dog.title}
        </h3>
        <div className="text-sm text-gray-600 mb-2">Ras: {breedLabel}</div>
        <div className="flex items-center gap-2">
          <ReactStars //finns nog en bättre
            count={5}
            size={30}
            value={dog.rating}
            className=""
            edit={false}
          />
          <span className="text-gray-700 text-base font-medium">
            {dog.rating.toFixed(1)}
          </span>
        </div>
        <div className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm text-gray-700 h-20 overflow-hidden">
          {dog.description}
        </div>

        <div className="flex justify-end mt-3">
          <Button variant="destructive" onClick={onRemove}>
            Ta bort
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const cardHead = (
  <CardHeader>
    <CardTitle>Hundfavoriter</CardTitle>
    <CardDescription>Här listas dina sparade hundar.</CardDescription>
  </CardHeader>
);
export default FavoritePage;
