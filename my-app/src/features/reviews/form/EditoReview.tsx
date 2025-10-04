import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { IReview } from "../../../app/layout/models/review";

interface IProps {
  review: IReview;
  editReview: (review: IReview) => void;
  show: boolean;
  onHide: () => void;
}

const EditoReview: React.FC<IProps> = ({
  show,
  onHide,
  review: initialFormState,
  editReview,
}) => {
  // Initialize form state from the passed-in review
  const initializeForm = (): IReview => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        reviewId: 0,
        username: "",
        isbn: "",
        komenti: "",
        date: new Date(),
        isEdited: false,
        id: "",
      };
    }
  };

  const [review, setReview] = useState<IReview>(initializeForm);

  const handleSubmit = () => {
    editReview(review);
    onHide();
  };

  return (
    <Dialog
      header="Edito Review"
      visible={show}
      style={{ width: "30vw" }}
      onHide={onHide}
    >
      <div className="modal-flex" style={{ marginTop: "5px" }}>
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            id="editReviewInput"
            required
            value={review.komenti}
            onChange={(e) =>
              setReview({ ...review, komenti: e.target.value, isEdited: true })
            }
          />
          <label>Edit review</label>
        </div>
      </div>
      <div className="modal-btn" style={{ marginTop: "1rem" }}>
        <button className="submitbtn" onClick={handleSubmit}>
          Ruaj
        </button>
      </div>
    </Dialog>
  );
};

export default EditoReview;