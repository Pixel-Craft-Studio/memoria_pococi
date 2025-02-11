/* eslint-disable react/prop-types */
const TeamCard = ({ partner }) => {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 w-64 text-center">
        <img 
          src={partner.photo_url} 
          alt={partner.name} 
          className="w-full h-40 object-cover rounded-lg"
        />
        <h3 className="text-lg font-semibold mt-3">{partner.name}</h3>
        <p className="text-sm text-gray-600 font-medium">{partner.role}</p>
        <p className="text-gray-500 text-sm mt-2">{partner.description}</p>
        <div className="flex justify-center gap-3 mt-3">
          {partner.social_media.map((social) => (
            <a 
              key={social.platform_id} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <img 
                src={social.icon_url} 
                alt={social.platform} 
                className="w-5 h-5"
              />
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default TeamCard;
  