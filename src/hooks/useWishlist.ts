"use client";

import { courseService } from "@/services/course.service";
import { useCallback, useState } from "react";

interface UseWishlistResult {
  wishlistItems: Set<string | number>;
  isInWishlist: (courseId: string | number) => boolean;
  addToWishlist: (courseId: string | number) => Promise<void>;
  removeFromWishlist: (courseId: string | number) => Promise<void>;
  toggleWishlist: (courseId: string | number) => Promise<void>;
}

/**
 * Custom hook for managing wishlist
 */
export function useWishlist(): UseWishlistResult {
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());

  const isInWishlist = useCallback(
    (courseId: string | number) => wishlistItems.has(courseId),
    [wishlistItems]
  );

  const addToWishlist = useCallback(async (courseId: string | number) => {
    try {
      await courseService.addToWishlist(courseId);
      setWishlistItems(prev => new Set(prev).add(courseId));
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      throw error;
    }
  }, []);

  const removeFromWishlist = useCallback(async (courseId: string | number) => {
    try {
      await courseService.removeFromWishlist(courseId);
      setWishlistItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      throw error;
    }
  }, []);

  const toggleWishlist = useCallback(
    async (courseId: string | number) => {
      if (isInWishlist(courseId)) {
        await removeFromWishlist(courseId);
      } else {
        await addToWishlist(courseId);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  return {
    wishlistItems,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
}
