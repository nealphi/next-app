"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import ErrorMessage from './components/ErrorMessage';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues" },
  ];
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap="3">
          <Link href={"/"}>
            <AiFillBug color="black" />{" "}
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  {link.lable}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src={session.user!.image!} fallback="?" radius="full" className="cursor-pointer"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
               <Text size='2'> {session.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
      </Flex> 
      </Container>
    </nav>
  );
};

export default NavBar;
