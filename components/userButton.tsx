import { SignIn, SignOut } from "./auth-components";

import { auth } from "@/auth";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div className="flex items-center gap-2">
      {/* <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span> */}
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{session.user.name}</p>
        <p className="text-muted-foreground text-xs leading-none">
          {session.user.email}
        </p>
      </div>
      <SignOut />
    </div>
  );
}
