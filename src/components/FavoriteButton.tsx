import React, { type MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import "@styles/LikeButton.scss";

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
