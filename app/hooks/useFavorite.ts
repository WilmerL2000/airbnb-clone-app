import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();

    const loginModal = useLoginModal();


    /* `const hasFavorited` is a boolean value that indicates whether the current user has favorited a
    specific listing. It is calculated using the `useMemo` hook, which memoizes the result of the
    function passed as the first argument. The function checks if the `currentUser` object has a
    `favoriteIds` array and if the `listingId` is included in that array. The `useMemo` hook also
    takes an array of dependencies as the second argument, which includes `currentUser` and
    `listingId`. This ensures that the function is only re-executed if either of these dependencies
    change. */
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    /* `toggleFavorite` is a function that is created using the `useCallback` hook. It takes a
    `React.MouseEvent<HTMLDivElement>` event as its argument. */
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        /* `e.stopPropagation();` is a method that stops the propagation of the current event in the
        capturing and bubbling phases. In this specific case, it prevents the click event from
        propagating to the parent elements of the clicked element, which could trigger unintended
        behavior or interfere with other event listeners. */
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            let message;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
                message = 'Removed from favorites'
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
                message = 'Saved to favorites'
            }

            await request();
            router.refresh();
            toast.success(message);
        } catch (error) {
            toast.error('Something went wrong.');
        }
    },
        [
            currentUser,
            hasFavorited,
            listingId,
            loginModal,
            router
        ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;