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
function FavoritePage() {
  //className="grid grid-cols-2 gap-4"
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
  return (
    <Card className="mb-4 max-w-sm w-full overflow-hidden rounded-2xl shadow-md">
      <CardContent className="pt-0">
        <div className="flex justify-center">
          <img src={dog.url} alt={dog.title} className="object-cover mb-1" />
        </div>
        <h3 className="text-lg pt-1 font-semibold text-gray-900 capitalize">
          {dog.title}
        </h3>
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
