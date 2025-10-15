import type { DogInfo } from "./DogInfo"
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import ReactStars from "react-stars";
import { useOutletContext } from "react-router";


type PropsType = { favorites: DogInfo[], removeDog: (id: string) => void }
function FavoritePage(){

    const { favorites, removeDog } = useOutletContext<PropsType>();

    return (
        <>
        <Card className="w-full p3">
            {cardHead}
            <CardContent>
                {favorites.map((dog: DogInfo) => (
                    <DogCard
                        key={dog.id}
                        dog={dog}
                        onRemove={() => removeDog(dog.id)}
                    />
                ))
                }                
            </CardContent>
        </Card>
        </>
    );
}

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

function DogCard({
    dog,
    onRemove,
}: { dog: DogInfo; onRemove: () => void }) {
    const breedLabel = getBreedFromUrl(dog.url);
    return (
        <Card>
            <img
              src={dog.url}
              alt={dog.title}
              className="object-cover mb-1"
            />

            <CardHeader>
                <CardTitle>
                    {dog.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-gray-600 mb-2">Ras: {breedLabel}</div>
                <ReactStars //finns nog en bättre
                    count={5} 
                    size={30}
                    value={dog.rating}
                    className=""
                />
                {dog.description}
                <div className="mt-3">
                  <Button variant="destructive" onClick={onRemove}>Ta bort</Button>
                </div>
            </CardContent>
        </Card>

    )
}



const cardHead = (
  <CardHeader>
    <CardTitle>Hundfavoriter</CardTitle>
    <CardDescription>Här listas alla dina Hundfavoriter.</CardDescription>
  </CardHeader>
);
export default FavoritePage;
