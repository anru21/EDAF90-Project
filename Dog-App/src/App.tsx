import { useState } from "react";
import type { DogInfo } from "./DogInfo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, Outlet } from "react-router";

function App() {
  const [favorites, setFavorites] = useState<DogInfo[]>([]);

  function addDog(newDog: DogInfo) {
    setFavorites([newDog, ...favorites]);
  }
  function removeDog(dogId: string) {
    setFavorites(favorites.filter((d: DogInfo) => d.id !== dogId));
  }

  return (
    <div className="grid grid-rows-1 gap-4 max-w-5xl">
      <h1 className="text-5xl font-extrabold mb-0 text-center">
        The dog generator
      </h1>
      <div className="w-full flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Hundgenerator</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/FavoritePage">Sparade hundar</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Outlet context={{ favorites, addDog: addDog, removeDog: removeDog }} />
    </div>
  );
}

export default App;
