"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundAnimation } from "@/components/background-animation";


export default function SignupFormDemo() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
          router.push("/admin", undefined);
        }
      }, [status]);

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (!email || !password) return toast.error("Nemôžeš sa prihlásiť bez emailu a hesla");
        setButtonDisabled(true);
        const response = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,

        });

        if (!response) {
            toast.error("Nastala neznáma chyba!");
        } else if (response.ok) {
            router.push("/admin", undefined);
            toast.success("Gratulujeme! Dostal si sa k nám do Administrácie!");
        } else {
            toast.error("Nemáš dostatočné práva na prístup do tejto sekcie");
        }
        setButtonDisabled(false);
    }

    return (
        <>
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Poďme sa prihlásiť!
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Ale najskôr sa uisti, či si naozaj jeden z vyvolených Editorov na to, aby si sa mohol prihlásiť.
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <Input className="mb-4" id="email" aria-label="Emailová adresa" placeholder="info@batcore.eu" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input className="mb-4" id="password" aria-label="Heslo" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <Button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        disabled={buttonDisabled}
                        type="submit"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Prihlásiť sa &rarr;
                        <BottomGradient />
                    </Button>
                </form>
            </div>
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};