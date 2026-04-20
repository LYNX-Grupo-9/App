import { useState } from 'react';

const COMMENT_LIMIT = 500;

/**
 * Manages all form state for the Rating screen.
 *
 * @param {() => void} onSuccess  - called after the simulated submit delay
 * @returns {{
 *   rating: number,
 *   setRating: (v: number) => void,
 *   hoverRating: number,
 *   setHoverRating: (v: number) => void,
 *   displayRating: number,       // hoverRating if set, otherwise rating
 *   comment: string,
 *   setComment: (v: string) => void,
 *   charsLeft: number,
 *   counterColor: string,
 *   isAnonymous: boolean,
 *   setIsAnonymous: (v: boolean) => void,
 *   isSubmitting: boolean,
 *   ratingError: boolean,
 *   handleSubmit: () => void,
 *   COMMENT_LIMIT: number,
 * }}
 */
export function useRatingForm(onSuccess) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const displayRating = hoverRating || rating;

  const charsLeft = COMMENT_LIMIT - comment.length;
  const counterColor =
    charsLeft <= 50 ? '#E53935' : charsLeft <= 100 ? '#F57F17' : '#666666';

  const handleSubmit = () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    setIsSubmitting(true);

    // Simulates backend call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess?.();
    }, 1200);
  };

  return {
    rating,
    setRating: (v) => { setRating(v); setRatingError(false); },
    hoverRating,
    setHoverRating,
    displayRating,
    comment,
    setComment,
    charsLeft,
    counterColor,
    isAnonymous,
    setIsAnonymous,
    isSubmitting,
    ratingError,
    handleSubmit,
    COMMENT_LIMIT,
  };
}