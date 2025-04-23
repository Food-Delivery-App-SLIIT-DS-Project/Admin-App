'use client'
import { DarkThemeToggle, Navbar, NavbarToggle } from "flowbite-react";


export function NavBarComponent() {

  return (
    <Navbar fluid rounded>
      <div className="flex items-center justify-end w-full h-4">
        <DarkThemeToggle  />
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
