import React, { MouseEvent } from "react";
import "@styles/_LikeButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => (
  <button
    className={`favorite-button ${isFavorite ? "liked" : ""}`}
    onClick={onClick}
  >
    {isFavorite ? (
      <FontAwesomeIcon icon={faHeart} />
    ) : (
      <FontAwesomeIcon icon={faHeartRegular} />
    )}
  </button>
);

export default FavoriteButton;
