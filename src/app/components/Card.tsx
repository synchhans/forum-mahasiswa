interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mt-4">{description}</p>
    <a href={link} className="text-indigo-600 mt-6 block hover:underline">
      Lihat Selengkapnya &rarr;
    </a>
  </div>
);

export default Card;
