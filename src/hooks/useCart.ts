"use client";

import { courseService } from "@/services/course.service";
import { useCallback, useState } from "react";

interface UseCartResult {
  cartItems: Set<string | number>;
  isInCart: (courseId: string | number) => boolean;
  addToCart: (courseId: string | number) => Promise<void>;
  removeFromCart: (courseId: string | number) => Promise<void>;
  toggleCart: (courseId: string | number) => Promise<void>;
}

/**
 * Custom hook for managing cart
 */
export function useCart(): UseCartResult {
  const [cartItems, setCartItems] = useState<Set<string | number>>(new Set());

  const isInCart = useCallback((courseId: string | number) => cartItems.has(courseId), [cartItems]);

  const addToCart = useCallback(async (courseId: string | number) => {
    try {
      await courseService.addToCart(courseId);
      setCartItems(prev => new Set(prev).add(courseId));
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  }, []);

  const removeFromCart = useCallback(async (courseId: string | number) => {
    try {
      setCartItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    }
  }, []);

  const toggleCart = useCallback(
    async (courseId: string | number) => {
      if (isInCart(courseId)) {
        await removeFromCart(courseId);
      } else {
        await addToCart(courseId);
      }
    },
    [isInCart, addToCart, removeFromCart]
  );

  return {
    cartItems,
    isInCart,
    addToCart,
    removeFromCart,
    toggleCart,
  };
}
