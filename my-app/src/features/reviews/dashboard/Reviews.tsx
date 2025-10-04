import { useEffect, useState } from "react";
import { IReview } from "../../../app/layout/models/review";
import agent from "../../../app/layout/api/agent";
import ReviewList from "./ReviewList";
import React from "react";

const Reviews = ({ isbn }: { isbn: string | undefined }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCreateReview = (review: IReview) => {
    // Kontrollojmë nëse komenti është null, bosh ose përmban vetëm hapësira
    if (!review.komenti || review.komenti.trim() === "") {
      alert("Ju lutem shkruani një koment para se të dërgoni.");
      return;
    }
  
    // Nëse komenti është valid, e dërgojmë tek API
    agent.Reviews.create(review).then((response) => {
      setReviews([...reviews, response]); // E shtojmë në listë
      setSelectedReview(response.data);   // E zgjedhim për shfaqje ose editim
    }).catch(error => {
      console.error("Gabim gjatë krijimit të komentit:", error);
      alert("Ndodhi një gabim gjatë ruajtjes së komentit.");
    });
  };

  const handleEditReview = (review: IReview) => {
    agent.Reviews.update(review).then(() => {
      setReviews([...reviews.filter((r) => r.reviewId !== review.reviewId), review]);
      setSelectedReview(review);
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    agent.Reviews.delete(reviewId).then(() => {
      setReviews([...reviews.filter((r) => r.reviewId !== reviewId)]);
    });
  };

  const handleSelectReview = (reviewId: number) => {
    setSelectedReview(reviews.filter((r) => r.reviewId === reviewId)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Reviews.list().then((response: IReview[]) => {
      setReviews(response);
    });
  }, []);

  return (
    <ReviewList
      reviews={reviews}
      key={(selectedReview && selectedReview.reviewId) || 0}
      review={selectedReview!}
      isbn={isbn}
      createReview={handleCreateReview}
      selectReview={handleSelectReview}
      deleteReview={handleDeleteReview}
      selectedReview={selectedReview!}
      setSelectedReview={setSelectedReview}
      editReview={handleEditReview} 
      editMode={editMode} 
      setEditMode={setEditMode}    />
  );
};

export default Reviews;
