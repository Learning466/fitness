import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SignOutButton from "@/components/auth/signout-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";
import Image from "next/image";
import { ModeToggle } from "@/components/layout/modeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
const AuthLayoutStyles = {
  MAIN_DIV:
    "w-full h-screen flex flex-col md:flex-row justify-center items-center",
  IMAGE_DIV: "relative w-full h-full flex-col bg-muted p-10 text-white",
  IMAGE: "object-cover h-full w-full absolute top-0 inset-0",
  LOGO_DIV: "absolute inset-0",
  ICON_DIV: "relative z-20 flex items-center gap-3 text-xl font-medium",
  ICON: "h-6 w-6 mr-2",
  FORM_DIV: "w-full h-full lg:p-8",
  CHILDREN_DIV: "mx-auto flex w-full h-full flex-col justify-center space-y-2",
  TERM_P:
    "w-full px-8 text-center text-sm text-muted-foreground flex gap-1 flex-wrap item-center justify-center",
  TERM_LINK: "underline underline-offset-4 hover:text-primary",
  PRIVACY_LINK: "underline underline-offset-4 hover:text-primary",
};

export default async function Profile() {
  const session = await auth();
  const userData = await db.user.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });
  return (
    <TooltipProvider>
      <div className="flex items-start justify-start w-full h-full">
        <div className="rounded-lg shadow-lg w-full">
          <div className="h-40   z-0"></div>
          <Image
            alt="User avatar"
            className="rounded-full z-10 -mt-12 border-4   mx-auto"
            height="100"
            src={userData?.image!}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="text-center mt-2">
            <h2 className="text-lg font-semibold">{userData?.name}</h2>
            <p className="text-gray-500">{userData?.email}</p>
          </div>
          <div className="flex p-4  w-full my-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Dark Mode</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <ModeToggle />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Logout</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <SignOutButton />
                  </TableCell>
                </TableRow>
                <Separator className="w-full" />
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
