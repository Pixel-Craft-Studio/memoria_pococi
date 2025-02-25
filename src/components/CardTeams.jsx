import PropTypes from "prop-types";
import { API_URL } from "../api/api_constants";
import { AiOutlinePicture } from "react-icons/ai"; // Importa el ícono
import "animate.css";
import { useState } from "react";

const TeamCard = ({ partner, index }) => {
  const [isImageError, setIsImageError] = useState(false);

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <div
      className={`bg-white shadow-2xl rounded-xl p-4 w-64 text-center group animate__animated animate__fadeInUp`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="overflow-hidden h-40">
        { !isImageError &&
          <img
          src={isImageError ? "" : `${API_URL}/image${partner.photo_url}`} 
          alt={partner.name}
          className="w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
        />
        }
        {isImageError && (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <AiOutlinePicture className="text-gray-500 w-10 h-10" /> 
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-3 capitalize">{partner.name}</h3>
      <p className="text-sm text-gray-600 font-medium capitalize">{partner.role}</p>
      <p className="text-gray-500 text-sm mt-2">{partner.description}</p>
      <div className="flex justify-center gap-3 mt-3">
        {partner.social_media.map((social) => (
          <a
            key={social.platform_id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-500"
          >
            <img
              src={`${API_URL}/image${social.image_url}`}
              alt={social.platform}
              className="w-5 h-5"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  index: PropTypes.number,
  partner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo_url: PropTypes.string.isRequired,
    social_media: PropTypes.arrayOf(
      PropTypes.shape({
        platform_id: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon_url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default TeamCard;
