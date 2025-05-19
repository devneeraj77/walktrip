import { Button } from "./ui/button";

import { signIn, signOut } from "@/auth";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button size="sm" variant="default" {...props}>
        Sign In
      </Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button className="w-full p-0" variant="ghost" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
