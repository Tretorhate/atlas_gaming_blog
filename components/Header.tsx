// /* eslint-disable @next/next/no-html-link-for-pages */
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { GamepadIcon as GameController } from "lucide-react";
// import { UserMenu } from "./UserMenu";

// export function Header() {
//   return (
//     <header className="border-b">
//       <div className="container mx-auto py-4 flex justify-between items-center">
//         <Link href="/" className="flex items-center space-x-2">
//           <GameController className="h-6 w-6" />
//           <span className="text-2xl font-bold">Atlas Gaming Blog</span>
//         </Link>
//         <NavigationMenu>
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <NavigationMenuLink href="/" className="px-4 py-2">
//                 Home
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuLink href="/posts" className="px-4 py-2">
//                 Posts
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger>More</NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                   <li className="row-span-3">
//                     <NavigationMenuLink asChild>
//                       <a
//                         className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                         href="/"
//                       >
//                         <GameController className="h-6 w-6" />
//                         <div className="mb-2 mt-4 text-lg font-medium">
//                           Atlas Gaming Blog
//                         </div>
//                         <p className="text-sm leading-tight text-muted-foreground">
//                           Explore the latest in gaming news, reviews, and
//                           community discussions.
//                         </p>
//                       </a>
//                     </NavigationMenuLink>
//                   </li>
//                   <li>
//                     <NavigationMenuLink href="/podcasts">
//                       Podcasts
//                     </NavigationMenuLink>
//                   </li>
//                   <li>
//                     <NavigationMenuLink href="/books">Books</NavigationMenuLink>
//                   </li>
//                   <li>
//                     <NavigationMenuLink href="/archives">
//                       Archives
//                     </NavigationMenuLink>
//                   </li>
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//             <UserMenu />
//           </NavigationMenuList>
//         </NavigationMenu>
//       </div>
//     </header>
//   );
// }

/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { GamepadIcon as GameController } from "lucide-react";
import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <GameController className="h-6 w-6" />
          <span className="text-2xl font-bold">Atlas Gaming Blog</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="px-4 py-2 text-foreground hover:text-primary"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/posts"
                className="px-4 py-2 text-foreground hover:text-primary"
              >
                Posts
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-foreground">
                More
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <GameController className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Atlas Gaming Blog
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore the latest in gaming news, reviews, and
                          community discussions.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/podcasts"
                      className="text-foreground hover:text-primary"
                    >
                      Podcasts
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/books"
                      className="text-foreground hover:text-primary"
                    >
                      Books
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/archives"
                      className="text-foreground hover:text-primary"
                    >
                      Archives
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <UserMenu />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
