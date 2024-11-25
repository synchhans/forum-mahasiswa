interface NavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  onClick,
  children,
  className,
  target
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-sm text-gray-900 hover:text-indigo-600 font-medium transition duration-300 ${className}`}
    target={target}
  >
    {children}
  </a>
);

export default NavLink;
