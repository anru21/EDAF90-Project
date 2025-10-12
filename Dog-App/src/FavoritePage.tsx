import type { DogInfo } from "./DogInfo"
import { Button } from "./components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import ReactStars from "react-stars";
import { useOutletContext } from "react-router";


type PropsType = { favorites: DogInfo[] }
function FavoritePage(){

    const { favorites } = useOutletContext<PropsType>();

    return (
        <>
        <Card className="w-full p3">
            {cardHead}
            <CardContent>
                {favorites.map((dog) => (
                    <DogCard
                        key = {dog.id}
                        id = {dog.id}
                        url={dog.url}
                        title={dog.title}
                        description={dog.description}
                        rating={dog.rating}
                    />
                ))
                }                
            </CardContent>
        </Card>
        </>
    );
}

function DogCard({
    id,
    url, 
    title,
    description,
    rating,
}: DogInfo) {
    return (
        <Card>
            <img
              src={url}
              alt={title}
              className="object-cover mb-1"
            />

            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ReactStars //finns nog en bättre
                    count={5} 
                    size={30}
                    value={rating}
                    className=""
                />
                {description}
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
