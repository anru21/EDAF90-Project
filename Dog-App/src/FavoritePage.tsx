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

function DogCard({
    dog,
    onRemove,
}: { dog: DogInfo; onRemove: () => void }) {
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
