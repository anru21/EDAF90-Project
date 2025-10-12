import { useState } from "react";
import type { DogInfo } from "./DogInfo";
import FavoritePage from "./FavoritePage";
import { HomePage } from "./HomePage";
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

  function addDog(newDog: DogInfo){
    setFavorites([...favorites, newDog]);
  }

  return (
    <div className="grid grid-rows-1 gap-4 max-w-5xl">
      
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">HomePage</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/FavoritePage">FavoritePage</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
      <Outlet context={{ favorites, addDog: addDog }} />
    </div>
  );
}

export default App;
